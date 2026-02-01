export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { scanPDF, scanImage, scanCode } from "@/lib/gemini-scanner";
import { scanTextWithPerplexity, scanCodeWithPerplexity } from "@/lib/perplexity-scanner";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const mimeType = file.type;
        const ext = file.name.split(".").pop()?.toLowerCase();

        let result;

        try {
            if (mimeType === "application/pdf" || ext === "pdf") {
                result = await scanPDF(buffer);
            } else if (mimeType.startsWith("image/")) {
                result = await scanImage(buffer, mimeType);
            } else {
                const text = buffer.toString("utf-8");
                result = await scanCode(text);
            }
        } catch {
            if (!process.env.PERPLEXITY_API_KEY) {
                throw new Error("Fallback API key missing");
            }

            const text = buffer.toString("utf-8");
            result = await scanTextWithPerplexity(text);
        }

        return NextResponse.json(result);
    } catch (err: any) {
        console.error(err);
        return NextResponse.json(
            { error: err.message || "Scan failed" },
            { status: 500 }
        );
    }
}
