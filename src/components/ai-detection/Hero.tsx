"use client";

import React from "react";
import { motion } from "framer-motion";
import ScannerInterface from "./ScannerInterface";
import HowItWorks from "./HowItWorks";
import { WandSparkles } from "lucide-react";

const Hero: React.FC = () => {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-start pt-32 overflow-hidden bg-[#151921]">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-full bg-grid-black/[0.2] dark:bg-grid-white/[0.43] bg-[length:50px_50px]"
                    style={{
                        maskImage:
                            "radial-gradient(circle at center, rgba(112, 109, 109, 1) 0%, rgba(133, 124, 124, 0) 70%)",
                        WebkitMaskImage:
                            "radial-gradient(circle at center, rgba(71, 69, 69, 1) 0%, rgba(136, 126, 126, 0) 70%)",
                    }}
                />
                {/* Horizontal Line Effect */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-[1px]" />
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            </div>




            {/* <WandSparkles className="w-4 h-4 relative z-10" />*/}
            <span className="relative px-4 py-2 rounded-xl flex flex-row gap-2 items-center bg-white/10 text-sm text-white/90 backdrop-blur-sm border border-white/10 overflow-hidden">
                {/* Tinted Glowing Line */}
                <motion.div
                    className="absolute top-0 w-[10px] h-full bg-blue-300 opacity-60 blur-md shadow-2xl"
                    initial={{ left: "-10%" }}
                    animate={{ left: "110%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                    }}
                />
                <p className="relative z-10">
                    POWERFUL AI DETECTION & FRAUD PREVENTION
                </p>
            </span>
            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl"
                >
                    <div
                        className="absolute w-[300px] h-[150px] bg-[#5B698B]/50 opacity-80 blur-[100px]"
                        style={{ borderRadius: "50%" }}
                    />
                    <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
                        Distinguishing Human Truth from{" "}
                        <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="text-[#5b698b] font-semibold"
                        >
                            AI Deception
                        </motion.span>
                    </h1>

                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Ensure the authenticity of your content, code, and media with our
                        advanced detection suite.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="w-full"
                >
                    <ScannerInterface />
                </motion.div>

                <HowItWorks />
            </div>
        </section>
    );
};

export default Hero;
