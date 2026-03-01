import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, FileText, Sparkles, CheckCircle2, Building2, HeartPulse, UploadCloud } from 'lucide-react';

const Typewriter = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        setDisplayedText("");
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 60);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className="text-gray-200 text-base md:text-lg font-medium">
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-0.5 h-5 bg-blue-400 ml-1 align-middle"
            />
        </span>
    );
};

const Step0 = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10 flex flex-col items-center p-8 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
    >
        <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
            <Mail className="text-yellow-500 w-8 h-8" />
        </div>
        <span className="text-white font-semibold text-lg">나만의 우편함</span>
        <span className="text-gray-400 text-sm mt-1">비상주 우편 시스템</span>
    </motion.div>
);

const Step1 = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center w-full max-w-sm"
    >
        <div className="flex flex-col items-center p-5 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-full mb-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <UploadCloud className="text-blue-400 w-6 h-6" />
            </div>
            <span className="text-white font-semibold">새로운 우편물 스캔 완료</span>
        </div>

        <div className="flex flex-col gap-3 w-full">
            {[
                { title: "국세청", desc: "부가가치세 신고 안내", color: "bg-red-500", icon: Building2 },
                { title: "서초세무서", desc: "종합소득세 고지서", color: "bg-blue-500", icon: FileText },
                { title: "국민건강보험", desc: "보험료 납부 안내", color: "bg-green-500", icon: HeartPulse }
            ].map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, type: "spring", stiffness: 200, damping: 20 }}
                    className="flex items-center gap-4 p-4 bg-[#1a1a1a]/60 backdrop-blur-md rounded-xl border border-white/5 hover:bg-[#2a2a2a]/60 transition-colors"
                >
                    <div className={`w-10 h-10 rounded-lg ${item.color}/20 flex items-center justify-center`}>
                        <item.icon className={`w-5 h-5 ${item.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-100 text-sm font-medium">{item.title}</span>
                        <span className="text-gray-500 text-xs mt-0.5">{item.desc}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

const Step2 = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
    >
        <div className="flex items-center gap-3 p-4 md:p-5 bg-[#1a1a1a]/90 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
            <Sparkles className="text-gray-400 w-5 h-5 md:w-6 md:h-6 ml-2 flex-shrink-0" />
            <Typewriter text="나만의 우편함 확인하기" />
        </div>
    </motion.div>
);

const Step3 = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 w-full max-w-lg flex flex-col h-full justify-center"
    >
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="self-end mb-6 px-4 py-2 md:px-5 md:py-3 bg-[#2a2a2a]/80 backdrop-blur-xl rounded-2xl rounded-tr-sm border border-white/10 shadow-lg"
        >
            <span className="text-gray-200 text-xs md:text-sm">우편시스템을 통해서 나만의 우편물 관리를 확인하세요</span>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="p-5 md:p-7 bg-[#1a1a1a]/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
        >
            <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Sparkles className="text-blue-400 w-4 h-4" />
                </div>
                <span className="text-white font-medium text-sm md:text-base">우편물 스캔 및 내용 확인</span>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed">
                <div className="grid grid-cols-[60px_1fr] gap-2">
                    <span className="text-gray-500">발송처</span>
                    <span className="text-gray-100 font-medium">국세청</span>
                    <span className="text-gray-500">제목</span>
                    <span className="text-gray-100 font-medium">2023년 2기 확정 부가가치세 신고 안내</span>
                </div>

                <div className="p-4 bg-black/40 rounded-xl border border-white/5 mt-4">
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                            <span><strong>신고 기한:</strong> 2026년 1월 25일까지</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                            <span><strong>납부 세액:</strong> 1,500,000원</span>
                        </li>
                    </ul>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full text-[10px] md:text-xs font-medium mt-4 border border-green-500/20"
                >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    방금 고객님께 알림톡이 발송되었습니다.
                </motion.div>
            </div>
        </motion.div>
    </motion.div>
);

export default function Feature1() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const runSequence = async () => {
            while (isMounted) {
                setStep(0);
                await new Promise(r => setTimeout(r, 2500));
                if (!isMounted) break;
                setStep(1);
                await new Promise(r => setTimeout(r, 3500));
                if (!isMounted) break;
                setStep(2);
                await new Promise(r => setTimeout(r, 3000));
                if (!isMounted) break;
                setStep(3);
                await new Promise(r => setTimeout(r, 5000));
            }
        };
        runSequence();
        return () => { isMounted = false; };
    }, []);

    return (
        <section className="bg-white flex items-center justify-center px-6 py-[60px] md:py-[100px] lg:py-[120px] font-sans border-b border-gray-100">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Text */}
                <div className="flex flex-col items-start">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-gray-200 shadow-sm mb-6">
                        <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                        <span className="text-xs md:text-sm font-semibold text-gray-700">실시간 우편 알림 서비스</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold text-[#111111] mb-[40px] md:mb-[50px] lg:mb-[60px] leading-[1.25] tracking-tight break-keep">
                        대표님만의 우편 관리<br className="hidden md:block" />시스템을 제공합니다.
                    </h1>
                    <p className="text-sm md:text-lg text-gray-500 leading-relaxed max-w-lg break-keep">
                        중요 우편물 도착 즉시 알림톡을 발송해 드립니다. 편리한 스캔 서비스로 어디서 보낸 우편물인지 그리고 내용물 까지 모두 스캔해서 전달드립니다.<br />
                        비상주 서비스의 핵심은 믿을 수 있는 우편 관리 시스템 입니다.
                    </p>
                </div>

                {/* Right Animation Container */}
                <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#050505] rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100/10 flex items-center justify-center p-6 md:p-10">
                    {/* Mesh Gradient Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{
                                background: [
                                    "radial-gradient(circle at 50% 50%, rgba(76, 175, 80, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 193, 7, 0.15) 0%, transparent 50%)",
                                    "radial-gradient(circle at 40% 60%, rgba(33, 150, 243, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(156, 39, 176, 0.15) 0%, transparent 50%)",
                                    "radial-gradient(circle at 50% 50%, rgba(76, 175, 80, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 193, 7, 0.15) 0%, transparent 50%)"
                                ]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 blur-[60px] opacity-80"
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 0 && <Step0 key="step0" />}
                        {step === 1 && <Step1 key="step1" />}
                        {step === 2 && <Step2 key="step2" />}
                        {step === 3 && <Step3 key="step3" />}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
