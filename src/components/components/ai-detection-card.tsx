import React from "react";
import { ShieldCheck, Scan } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { BorderBeam } from "../magicui/border-beam";

const AIDetectionCard = () => {
    return (
        <Card className="h-[70%] w-[350px] bp6:-mt-[450px] bg-gradient-to-br from-[#2E3139] to-[#1E2536] overflow-hidden relative group">
            <div className="relative h-full bg-gradient-to-br from-[#2E3139] to-[#1E2536] rounded-xl overflow-hidden border-0">
                <BorderBeam
                    duration={6}
                    delay={3}
                    size={700}
                    className="from-transparent via-blue-500 to-transparent"
                />
                <div className="absolute inset-0 flex items-center justify-center -translate-y-12">
                    {/* Radar/Scan Effect */}
                    <div className="relative w-[280px] h-[280px] rounded-full border border-blue-300/30 flex items-center justify-center">
                        {/* Rotating Scan Line */}
                        <motion.div
                            className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-r from-blue-300/20 to-transparent"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />

                        {/* Middle Circle */}
                        <div className="absolute w-[180px] h-[180px] rounded-full border border-blue-300/40" />

                        {/* Inner Circle */}
                        <div className="absolute w-[80px] h-[80px] rounded-full border border-blue-300/50 flex items-center justify-center bg-blue-500/10">
                            <ShieldCheck size={40} className="text-blue-300" />
                        </div>

                        {/* Scanning Icon Animation */}
                        <motion.div
                            className="absolute top-10 right-10"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        >
                            <Scan size={24} className="text-blue-300/70" />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-10 left-10"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                        >
                            <Scan size={24} className="text-blue-300/70" />
                        </motion.div>
                    </div>
                </div>

                {/* Card Content */}
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-[16px] text-white">
                        AI Detection & Fraud Prevention
                    </h3>
                    <p className="text-gray-400 text-sm">
                        Protect your platform with real-time AI content analysis. Detect deepfakes, synthetic text, and fraud instantly.
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default AIDetectionCard;
