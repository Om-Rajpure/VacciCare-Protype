import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
    Shield,
    Syringe,
    Users,
    HeartHandshake,
    CheckCircle,
} from "lucide-react";

/* ─────────────────────────────────────────────
   4-step intro sequence configuration
   Each step: icon + label + accent color
───────────────────────────────────────────── */
const STEPS = [
    {
        id: "brand",
        Icon: Shield,
        accent: "#2F80ED",
        ring: "#EBF4FF",
        label: "VacciCare",
        sub: "Smart Immunization Compliance System",
        isBrand: true,
    },
    {
        id: "vaccine",
        Icon: Syringe,
        accent: "#2F80ED",
        ring: "#EBF4FF",
        label: "Vaccine Tracking",
        sub: "Complete Indian UIP schedule coverage",
    },
    {
        id: "family",
        Icon: Users,
        accent: "#27AE60",
        ring: "#E8F7EE",
        label: "Family-Centric Care",
        sub: "Track every member's immunization journey",
    },
    {
        id: "asha",
        Icon: HeartHandshake,
        accent: "#9B51E0",
        ring: "#F3EEFF",
        label: "ASHA Integration",
        sub: "Empowering community health workers",
    },
] as const;

/* Timing config (ms) */
const FADE_IN = 320;
const HOLD = 560;
const FADE_OUT = 260;
const STEP_TOTAL = FADE_IN + HOLD + FADE_OUT; // ~1140ms per step × 4 = ~4.56s total
const FINAL_DELAY = 200;

interface IntroSplashScreenProps {
    /** Called when animation sequence finishes — parent handles navigation */
    onComplete?: () => void;
}

export default function IntroSplashScreen({ onComplete }: IntroSplashScreenProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [done, setDone] = useState(false);
    const hasCompleted = useRef(false);

    const complete = () => {
        if (!hasCompleted.current) {
            hasCompleted.current = true;
            onComplete?.();
        }
    };

    /* ── Safety fallback: call onComplete after 5s no matter what ── */
    useEffect(() => {
        const fallback = setTimeout(complete, 5000);
        return () => clearTimeout(fallback);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /* ── Main orchestrated sequence ── */
    useEffect(() => {
        let cancelled = false;

        const runSequence = async () => {
            for (let i = 0; i < STEPS.length; i++) {
                if (cancelled) return;
                setActiveStep(i);
                await sleep(STEP_TOTAL);
                if (cancelled) return;
            }

            // Trigger exit animation
            setDone(true);
            await sleep(FINAL_DELAY + 380);

            if (!cancelled) complete();
        };

        runSequence();

        return () => { cancelled = true; };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const step = STEPS[activeStep];

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    key="intro-root"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.38, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5FAFF] select-none overflow-hidden"
                >
                    {/* Soft decorative background blobs — color follows the active step */}
                    <div
                        className="absolute top-12 left-8 w-64 h-64 rounded-full blur-3xl opacity-40 transition-colors duration-700"
                        style={{ backgroundColor: step.ring }}
                    />
                    <div
                        className="absolute bottom-16 right-6 w-56 h-56 rounded-full blur-3xl opacity-40 transition-colors duration-700"
                        style={{ backgroundColor: step.ring }}
                    />

                    {/* ── Icon stage ── */}
                    <div className="relative z-10 flex flex-col items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, scale: 0.88, y: 14 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.94, y: -10 }}
                                transition={{ duration: 0.32, ease: "easeOut" }}
                                className="flex flex-col items-center"
                            >
                                {/* Pulse glow behind icon */}
                                <motion.div
                                    animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.85, 0.45] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute w-40 h-40 rounded-3xl blur-xl"
                                    style={{ backgroundColor: step.ring }}
                                />

                                {/* Icon card */}
                                <div className="relative w-36 h-36 rounded-3xl bg-white flex items-center justify-center shadow-2xl mb-8">
                                    {step.isBrand ? (
                                        <div className="relative">
                                            <Shield
                                                className="w-16 h-16"
                                                style={{ color: step.accent }}
                                                strokeWidth={1.5}
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                                                <CheckCircle
                                                    className="w-5 h-5 text-[#27AE60]"
                                                    strokeWidth={2}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <step.Icon
                                            className="w-16 h-16"
                                            style={{ color: step.accent }}
                                            strokeWidth={1.5}
                                        />
                                    )}

                                    {/* Corner accent dot */}
                                    <div
                                        className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: step.accent, opacity: 0.5 }}
                                    />
                                </div>

                                {/* Label + subtitle */}
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.12, duration: 0.28 }}
                                    className="text-center"
                                >
                                    <h2
                                        className="text-2xl font-bold mb-2 tracking-tight"
                                        style={{ color: "#1a2b4a" }}
                                    >
                                        {step.label}
                                    </h2>
                                    <p className="text-gray-500 text-sm max-w-[240px] leading-relaxed">
                                        {step.sub}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── Step indicator dots ── */}
                    <div className="absolute bottom-16 flex items-center space-x-2">
                        {STEPS.map((s, i) => (
                            <motion.div
                                key={s.id}
                                animate={{
                                    width: i === activeStep ? 28 : 8,
                                    backgroundColor:
                                        i === activeStep
                                            ? STEPS[activeStep].accent
                                            : i < activeStep
                                                ? "#94a3b8"
                                                : "#e2e8f0",
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="h-2 rounded-full"
                            />
                        ))}
                    </div>

                    {/* Brand lockup at bottom */}
                    <div className="absolute bottom-6 flex items-center space-x-1.5 opacity-40">
                        <Shield className="w-3.5 h-3.5 text-[#2F80ED]" />
                        <span className="text-[11px] text-gray-500 font-semibold tracking-widest uppercase">
                            VacciCare
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
