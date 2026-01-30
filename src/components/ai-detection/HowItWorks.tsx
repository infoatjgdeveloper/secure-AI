"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    BrainCircuit,
    ShieldCheck,
    Code2,
    Fingerprint,
    Eye,
    Zap,
} from "lucide-react";

import { BorderBeam } from "../magicui/border-beam";

interface FeatureCardProps {
    title: string;
    text: string;
    icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, text, icon }) => {
    return (
        <div className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 transition-all duration-300 group hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <BorderBeam
                duration={6}
                size={250}
                className="from-transparent via-[#629FAD] to-transparent"
            />
            <div className="mb-6 p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors relative z-10">
                {icon}
            </div>
            <h3 className="text-xl font-light text-white mb-3 relative z-10">{title}</h3>
            <p className="text-white/60 text-sm leading-relaxed relative z-10">{text}</p>
        </div>
    );
};

const HowItWorks: React.FC = () => {
    return (
        <div className="w-full py-20 relative z-10">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-light text-white mb-4"
                >
                    Powerful Detection Features
                </motion.h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                    Our advanced AI detection engine analyzes multiple layers of data to
                    ensure authenticity and prevent fraud.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                <FeatureCard
                    title="AI Text Analysis"
                    text="Advanced linguistic analysis detects patterns common in LLM-generated text, identifying synthetic content with high precision."
                    icon={<BrainCircuit className="w-10 h-10 text-[#629FAD]" />}
                />

                <FeatureCard
                    title="Deepfake Detection"
                    text="Analyze video and image frames for subtle artifacts and inconsistencies that reveal AI manipulation."
                    icon={<Eye className="w-10 h-10 text-[#629FAD]" />}
                />

                <FeatureCard
                    title="Code Integrity"
                    text="Scans source code for known AI-generation patterns and vulnerabilities often introduced by automated coding tools."
                    icon={<Code2 className="w-10 h-10 text-[#629FAD]" />}
                />

                <FeatureCard
                    title="Identity Verification"
                    text="Cross-reference biometric data and behavioral patterns to ensure the person behind the screen is real."
                    icon={<Fingerprint className="w-10 h-10 text-[#629FAD]" />}
                />

                <FeatureCard
                    title="Synthetic Voice Detection"
                    text="Analyze audio frequencies and speech patterns to distinguish between human voices and AI-generated clones."
                    icon={<Zap className="w-10 h-10 text-[#629FAD]" />}
                />

                <FeatureCard
                    title="Real-time Fraud Prevention"
                    text="Instant scanning and API integration allow you to block fraudulent activity and bots in real-time."
                    icon={<ShieldCheck className="w-10 h-10 text-[#629FAD]" />}
                />
            </div>
        </div>
    );
};

export default HowItWorks;
