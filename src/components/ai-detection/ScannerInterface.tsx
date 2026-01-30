"use client";

import React from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Scan, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useFileScanner } from "@/hooks/useFileScanner";

const ScannerInterface: React.FC = () => {
    const { status, progress, result, file, error, startScan, resetScan } = useFileScanner();

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            startScan(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        disabled: status !== "idle" && status !== "error",
    });

    return (
        <div className="w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden">
            {/* Radar Scan Overlay */}
            <AnimatePresence>
                {status === "scanning" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#629FAD]/20 to-transparent animate-scan" />
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1 bg-[#629FAD] shadow-[0_0_20px_#629FAD]"
                            animate={{ top: ["0%", "100%"] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear",
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10">
                {(status === "idle" || status === "error") && (
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${isDragActive
                            ? "border-[#629FAD] bg-[#629FAD]/10"
                            : status === "error" ? "border-red-500/50 hover:border-red-500/70" : "border-white/20 hover:border-white/40 hover:bg-white/5"
                            }`}
                    >
                        <input {...getInputProps()} />
                        {status === "error" ? (
                            <XCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
                        ) : (
                            <Upload className="w-12 h-12 mx-auto text-[#629FAD] mb-4" />
                        )}
                        <p className="text-lg text-white font-medium">
                            {status === "error" ? "Scan Failed. Try again." : "Drag & drop a file here, or click to select"}
                        </p>
                        {status === "error" && (
                            <p className="text-sm text-red-400 mt-2">{error}</p>
                        )}
                        <p className="text-sm text-white/50 mt-2">
                            Supports .txt, .pdf, .docx, .cpp, .js, .py, .png, .jpg
                        </p>
                    </div>
                )}

                {status === "uploading" && (
                    <div className="text-center py-12">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mb-6"
                        >
                            <div className="w-16 h-16 mx-auto border-4 border-white/10 border-t-[#629FAD] rounded-full animate-spin" />
                        </motion.div>
                        <h3 className="text-xl text-white font-medium mb-2">Uploading...</h3>
                        <p className="text-white/60 mb-6">{file?.name}</p>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#629FAD]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {status === "scanning" && (
                    <div className="text-center py-12">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="mb-6 inline-block"
                        >
                            <Scan className="w-16 h-16 text-[#629FAD]" />
                        </motion.div>
                        <h3 className="text-xl text-white font-medium animate-pulse">
                            Analyzing Content Patterns...
                        </h3>
                        <p className="text-white/60 mt-2">Checking for AI fingerprints</p>
                    </div>
                )}

                {status === "result" && result && (
                    <div className="text-center py-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring" }}
                        >
                            <div className="relative w-48 h-48 mx-auto mb-6">
                                {/* Gauge Background */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="transparent"
                                        className="text-white/10"
                                    />
                                    <motion.circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="transparent"
                                        className={result.isHuman ? "text-green-500" : "text-red-500"}
                                        strokeDasharray={2 * Math.PI * 88}
                                        initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                                        animate={{
                                            strokeDashoffset:
                                                2 * Math.PI * 88 * (1 - result.score / 100),
                                        }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-white">
                                        {result.score}%
                                    </span>
                                    <span className="text-sm text-white/60">Human Score</span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {result.isHuman ? "Human Verified" : "AI Generated"}
                                </h3>
                                <p className="text-white/60 mb-4">
                                    {result.reasoning || (result.isHuman
                                        ? "This content appears to be written by a human."
                                        : "High probability of AI-generated content detected.")}
                                </p>
                            </div>

                            <button
                                onClick={resetScan}
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/10"
                            >
                                Scan Another File
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScannerInterface;
