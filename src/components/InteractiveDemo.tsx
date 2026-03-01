import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles } from 'lucide-react';

const questions = [
    "내가 하는 사업의 업종이 뭐지?",
    "어떤 업종을 추가해야 유리하지?",
    "법인이랑 개인사업자 뭐가 더 유리하지?",
    "사업자 통장, 카드 어떻게 사용하지?",
    "홈페이지 개발은 어디가 잘하지?",
    "자금 조달도 받고 싶은데.."
];

const solutions = [
    "최저가 세금신고 O",
    "무료법인설립 O",
    "정부지원금진단 O",
    "최저가 홈페이지 제작 O",
    "사업자카드발급 O"
];

function TypewriterText({ text, start }: { text: string, start: boolean }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        if (!start) {
            setDisplayedText(text);
            return;
        }

        setDisplayedText("");
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 60);
        return () => clearInterval(timer);
    }, [text, start]);

    return (
        <span className="text-white text-base md:text-lg font-medium flex-1 truncate">
            {displayedText}
            {start && displayedText.length < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-0.5 h-5 bg-white ml-1 align-middle"
                />
            )}
        </span>
    );
}

export default function InteractiveDemo() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        let timeout1: ReturnType<typeof setTimeout>, timeout2: ReturnType<typeof setTimeout>, timeout3: ReturnType<typeof setTimeout>;

        const runSequence = () => {
            setStep(0);
            timeout1 = setTimeout(() => setStep(1), 4500);
            timeout2 = setTimeout(() => setStep(2), 7000);
            timeout3 = setTimeout(runSequence, 15000);
        };

        runSequence();

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, []);

    return (
        <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#0f0f11] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 md:p-10 ring-1 ring-white/10">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 opacity-50 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
            </div>

            <AnimatePresence mode="popLayout">
                {step === 0 && (
                    <motion.div
                        key="questions"
                        className="flex flex-col gap-3 w-full max-w-sm z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                        transition={{ duration: 0.6 }}
                    >
                        {questions.map((q, i) => (
                            <motion.div
                                key={i}
                                className={`bg-white/10 backdrop-blur-md border border-white/10 text-white/90 px-4 py-3 rounded-2xl shadow-lg text-sm md:text-base ${i % 2 === 0 ? 'self-start' : 'self-end'}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.3, type: "spring", stiffness: 100, damping: 15 }}
                            >
                                {q}
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {(step === 1 || step === 2) && (
                    <motion.div
                        key="interaction"
                        className="w-full max-w-md flex flex-col items-center z-10"
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            layoutId="search-bar"
                            className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-4 flex items-center shadow-2xl mb-6"
                        >
                            <Sparkles className="text-purple-400 w-5 h-5 mr-3 shrink-0" />
                            <TypewriterText text="대표님은 사업에만 집중하세요" start={step === 1} />
                        </motion.div>

                        <AnimatePresence>
                            {step === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30, filter: "blur(8px)", scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                                    className="w-full bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
                                >
                                    <div className="mb-6">
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                                            전담 컨설턴트가 모두<br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">무료로 가이드</span> 해 드립니다.
                                        </h3>
                                        <p className="text-gray-400 text-sm md:text-base">전문가가 모든 복잡한 과정을 해결해 드립니다.</p>
                                    </div>

                                    <div className="space-y-3">
                                        {solutions.map((sol, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 100 }}
                                                className="flex items-center text-gray-200 bg-white/5 rounded-xl p-3 md:p-4 border border-white/5 hover:bg-white/10 transition-colors"
                                            >
                                                <CheckCircle2 className="w-5 h-5 text-blue-400 mr-3 shrink-0" />
                                                <span className="font-medium text-sm md:text-base">{sol}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
