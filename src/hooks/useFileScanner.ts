import { useState, useCallback } from "react";
import { scanFileAction } from "@/actions/scan-action";

export type ScanStatus = "idle" | "uploading" | "scanning" | "result" | "error";

export interface ScanResult {
    score: number;
    isHuman: boolean;
    reasoning?: string;
    verdict?: string;
}

export const useFileScanner = () => {
    const [status, setStatus] = useState<ScanStatus>("idle");
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startScan = useCallback(async (uploadedFile: File) => {
        setFile(uploadedFile);
        setStatus("uploading");
        setProgress(0);
        setError(null);

        // Simulate upload progress
        const uploadInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(uploadInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 200);

        try {
            const formData = new FormData();
            formData.append("file", uploadedFile);

            // Call Server Action instead of API route
            const data = await scanFileAction(formData);

            clearInterval(uploadInterval);
            setProgress(100);
            setStatus("scanning");

            // Artificial delay to show scanning animation
            setTimeout(() => {
                setResult({
                    score: data.score,
                    isHuman: data.isHuman,
                    reasoning: data.reasoning,
                    verdict: data.verdict
                });
                setStatus("result");
            }, 1500);

        } catch (err) {
            console.error("Scan error:", err);
            setError(err instanceof Error ? err.message : "An unknown error occurred");
            setStatus("error");
            clearInterval(uploadInterval);
        }
    }, []);

    const resetScan = useCallback(() => {
        setStatus("idle");
        setProgress(0);
        setResult(null);
        setFile(null);
        setError(null);
    }, []);

    return {
        status,
        progress,
        result,
        file,
        error,
        startScan,
        resetScan,
    };
};
