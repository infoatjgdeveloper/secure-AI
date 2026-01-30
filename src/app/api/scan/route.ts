import { NextRequest, NextResponse } from "next/server";
import { scanPDF, scanImage, scanCode } from "@/lib/gemini-scanner";
import { scanTextWithPerplexity, scanCodeWithPerplexity } from "@/lib/perplexity-scanner";

const pdfParse = require("pdf-parse");

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        console.log("------- NEW SCAN REQUEST -------");
        if (file) {
            console.log(`File received: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`);
        }

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const mimeType = file.type;
        const fileName = file.name;
        const ext = fileName.split('.').pop()?.toLowerCase();

        let result;

        try {
            // Attempt with Gemini first
            if (mimeType === "application/pdf" || ext === "pdf") {
                console.log("Detected PDF. Initiating Gemini PDF Scan...");
                result = await scanPDF(buffer);
            } else if (
                mimeType.startsWith("image/") ||
                ["jpg", "jpeg", "png", "webp"].includes(ext || "")
            ) {
                // Image scanning only supported by Gemini for now
                console.log("Detected Image. Initiating Gemini Image Scan...");
                result = await scanImage(buffer, mimeType || "image/jpeg");
            } else if (
                ["py", "js", "html", "css", "cpp", "java", "ts", "txt", "tsx", "jsx"].includes(ext || "")
            ) {
                const textContent = buffer.toString("utf-8");
                console.log("Detected Text/Code. Initiating Gemini Code Scan...");
                result = await scanCode(textContent);
            } else {
                return NextResponse.json(
                    { error: `File type ${ext} not supported.` },
                    { status: 400 }
                );
            }
        } catch (geminiError) {
            console.error("Gemini Scan Failed. Attempting fallback to Perplexity...", geminiError);

            // Fallback Logic
            if (!process.env.PERPLEXITY_API_KEY) {
                throw new Error("Gemini failed and PERPLEXITY_API_KEY is not set.");
            }

            if (mimeType === "application/pdf" || ext === "pdf") {
                // Extract text from PDF for Perplexity
                const data = await pdfParse(buffer);
                console.log("Falling back to Perplexity for PDF Text...");
                result = await scanTextWithPerplexity(data.text);
            } else if (
                ["py", "js", "html", "css", "cpp", "java", "ts", "txt", "tsx", "jsx"].includes(ext || "")
            ) {
                const textContent = buffer.toString("utf-8");
                console.log("Falling back to Perplexity for Code...");
                result = await scanCodeWithPerplexity(textContent);
            } else {
                // Re-throw if it was an image or unsupported type for fallback
                throw geminiError;
            }
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Error processing file:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error processing file" },
            { status: 500 }
        );
    }
}
