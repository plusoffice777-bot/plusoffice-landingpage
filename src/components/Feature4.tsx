import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { MapPin } from 'lucide-react';

const styles = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
`;

const locations = [
    { name: "마포", top: "30%", left: "25%" },
    { name: "여의도", top: "45%", left: "20%" },
    { name: "서초", top: "55%", left: "42%" },
    { name: "강남", top: "50%", left: "55%" },
    { name: "송파", top: "45%", left: "75%" },
    { name: "용인", top: "75%", left: "65%" },
    { name: "동탄", top: "85%", left: "40%" },
];

function LocationDemo() {
    const [step, setStep] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    useEffect(() => {
        let timeout1: ReturnType<typeof setTimeout>, timeout2: ReturnType<typeof setTimeout>, timeout3: ReturnType<typeof setTimeout>;

        if (isInView) {
            const runSequence = () => {
                setStep(0);
                timeout1 = setTimeout(() => setStep(1), 500); // 핀이 떨어지기 시작
                timeout2 = setTimeout(() => setStep(2), 4000); // 요약 카드 등장
                timeout3 = setTimeout(runSequence, 12000); // 전체 시퀀스 반복
            };
            runSequence();
        } else {
            setStep(0);
        }

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, [isInView]);

    return (
        <div ref={ref} className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] bg-[#0f0f11] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 md:p-10 ring-1 ring-white/10">
            <style>{styles}</style>
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
            </div>

            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

            {/* Abstract Map Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/[0.02] rounded-full border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%] bg-white/[0.03] rounded-full border border-white/10" />

            <AnimatePresence mode="popLayout">
                {step >= 1 && (
                    <div className="absolute inset-0 z-10">
                        {locations.map((loc, i) => (
                            <div
                                key={loc.name}
                                className="absolute"
                                style={{ top: loc.top, left: loc.left, transform: 'translate(-50%, -100%)' }}
                            >
                                <motion.div
                                    className="flex flex-col items-center"
                                    initial={{ y: -60, opacity: 0, scale: 0.5 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ delay: i * 0.2, type: "spring", bounce: 0.6, duration: 0.8 }}
                                >
                                    {/* Custom Pin Shape */}
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#7B61FF] rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(123,97,255,0.4)] rounded-br-none rotate-45 border-2 border-white/20 relative">
                                        <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full -rotate-45 shadow-inner" />
                                        {/* Ripple effect */}
                                        <motion.div
                                            className="absolute inset-0 rounded-full border-2 border-[#7B61FF]"
                                            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 + 0.8 }}
                                        />
                                    </div>
                                    <span className="mt-2 text-[10px] md:text-xs font-bold text-white bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 whitespace-nowrap">
                                        {loc.name}
                                    </span>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                )}

                {step === 2 && (
                    <motion.div
                        key="interaction"
                        className="w-full max-w-md flex flex-col items-center z-20 mt-auto mb-2 md:mb-4"
                        layout
                        initial={{ opacity: 0, y: 30, filter: "blur(8px)", scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                    >
                        <div className="w-full bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-purple-400" />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">프리미엄 상권</span> 확보
                                </h3>
                            </div>
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                단돈 1만원대로 강남, 서초, 송파 등 핵심 비즈니스 지역의 프리미엄 주소지를 이용하세요.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Feature4() {
    return (
        <section className="bg-white flex items-center justify-center px-6 py-[60px] md:py-[100px] lg:py-[120px] font-sans border-b border-gray-100">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Content */}
                <div className="flex flex-col items-start pr-0 lg:pr-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-gray-200 shadow-sm mb-6">
                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                        <span className="text-xs md:text-sm font-semibold text-gray-700">프리미엄 상권 확보</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold text-[#111111] mb-[40px] md:mb-[50px] lg:mb-[60px] leading-[1.25] tracking-tight break-keep">
                        프리미엄 주소지로<br className="hidden md:block" />
                        사업장의 신뢰를 확보하세요.
                    </h1>

                    <p className="text-sm md:text-lg text-gray-500 leading-relaxed max-w-lg break-keep">
                        주소 하나로 사업의 품격이 달라집니다.<br />
                        단돈 1만원대로 강남, 서초, 송파 프리미엄 주소지를 확보하세요.
                    </p>
                </div>

                {/* Right Interactive Area */}
                <LocationDemo />
            </div>
        </section>
    );
}
