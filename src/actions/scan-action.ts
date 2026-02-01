export const runtime = "nodejs";
"use server";

import { scanPDF, scanImage, scanCode } from "@/lib/gemini-scanner";
import { scanTextWithPerplexity, scanCodeWithPerplexity } from "@/lib/perplexity-scanner";

export interface ScanResult {
    score: number;
    isHuman: boolean;
    reasoning?: string;
    verdict?: string;
}

export async function scanFileAction(formData: FormData): Promise<ScanResult> {
    try {
        const file = formData.get("file") as File;

        console.log("------- NEW SCAN REQUEST -------");
        if (file) {
            console.log(`File received: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`);
        }

        if (!file) {
            throw new Error("No file uploaded");
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const mimeType = file.type;
        const fileName = file.name;
        const ext = fileName.split('.').pop()?.toLowerCase();

        let result: ScanResult;

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
                throw new Error(`File type ${ext} not supported.`);
            }
        } catch (geminiError) {
            console.error("Gemini Scan Failed. Attempting fallback to Perplexity...", geminiError);

            // Fallback Logic
            if (!process.env.PERPLEXITY_API_KEY) {
                throw new Error("Gemini failed and PERPLEXITY_API_KEY is not set.");
            }

            if (mimeType === "application/pdf" || ext === "pdf") {
                // Extract text from PDF for Perplexity
                const { PDFParse } = await import("pdf-parse");
                const pdfParser = new PDFParse({ data: buffer });
                const data = await pdfParser.getText();
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

        return result;
    } catch (error: any) {
        console.error("Error processing file:", error);
        throw new Error(error.message || "Internal server error processing file");
    }
}
