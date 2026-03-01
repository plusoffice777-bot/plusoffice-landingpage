import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileSignature, CheckCircle2, ChevronDown, MousePointer2, PenTool } from 'lucide-react';

export default function Feature3() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 5);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-white text-[#1a1a1a] flex items-center justify-center px-6 py-[60px] md:py-[100px] lg:py-[120px] font-sans selection:bg-blue-200 border-b border-gray-100">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left Content */}
                <div className="flex flex-col items-start pr-0 lg:pr-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-gray-200 shadow-sm mb-6">
                        <FileSignature className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                        <span className="text-xs md:text-sm font-semibold text-gray-700">비대면 간편 계약</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold text-[#111111] mb-[40px] md:mb-[50px] lg:mb-[60px] leading-[1.25] tracking-tight break-keep">
                        단 5분이면 끝!<br />
                        <span className="text-[#111111]">
                            100% 비대면 간편 계약
                        </span>
                    </h1>

                    <div className="flex flex-col gap-4">
                        <p className="text-sm md:text-lg text-gray-500 leading-relaxed max-w-lg mb-6 break-keep">
                            대표님의 귀한 시간, 복잡한 절차에 뺏기지 마세요. 시공간 제약 없는 24시간 비대면 시스템으로 법적 보호는 강력하게 챙기고, 결제는 평소 쓰시던 페이로 가볍게 끝냅니다.
                        </p>

                        <div className="space-y-6">
                            <FeatureItem text="24시간 언제든 비대면 계약 진행" delay={0.1} />
                            <FeatureItem text="단 5분 만에 법적 효력 100% 보장" delay={0.2} />
                            <FeatureItem text="번거로운 신용카드 등록 절차 NO" delay={0.3} />
                            <FeatureItem text="네이버페이·카카오페이 간편 결제 OK" delay={0.4} />
                        </div>
                    </div>
                </div>

                {/* Right Interactive Card */}
                <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] bg-[#0f0f11] border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center p-4 md:p-8 ring-1 ring-white/10">
                    {/* Mesh Gradient Background */}
                    <div className="absolute inset-0 opacity-60">
                        <div className="absolute top-[10%] left-[20%] w-[30rem] h-[30rem] bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
                        <div className="absolute bottom-[10%] right-[10%] w-[25rem] h-[25rem] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>

                    {/* Content Area */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                        <AnimatePresence mode="wait">
                            {step === 0 && (
                                <motion.div
                                    key="step0"
                                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.8, type: "spring" }}
                                    className="text-center space-y-6"
                                >
                                    <div className="w-24 h-24 mx-auto bg-white/5 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] relative group">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <FileSignature className="w-12 h-12 text-white/90 relative z-10" />
                                    </div>
                                    <h2 className="text-3xl font-semibold text-white tracking-tight leading-snug">
                                        초간편 5분<br />비대면 전자 계약
                                    </h2>
                                </motion.div>
                            )}

                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -40, scale: 0.95 }}
                                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                                    className="w-full max-w-md relative"
                                >
                                    <div className="absolute -inset-4 bg-gradient-to-b from-white/5 to-transparent rounded-3xl blur-xl" />
                                    <div className="w-full bg-[#555555] rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col relative z-10">
                                        {/* Top bar */}
                                        <div className="bg-[#333333] h-10 flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold">1</div>
                                            <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-bold">2</div>
                                            <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-bold">3</div>
                                        </div>
                                        {/* Content */}
                                        <div className="p-5 space-y-3 flex-1 bg-[#555555]">
                                            <div className="bg-white rounded-xl p-3 space-y-2 shadow-sm">
                                                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                                                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                                            </div>
                                            <div className="bg-white rounded-xl p-3 space-y-2 shadow-sm">
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                                    첫 번째 <span className="border rounded px-1.5 py-0.5 text-[10px] flex items-center gap-1 font-normal">서명자 <ChevronDown className="w-3 h-3" /></span>
                                                </div>
                                                <div className="bg-gray-100 rounded-lg p-2 text-xs text-gray-600">갑</div>
                                                <div className="bg-gray-100 rounded-lg p-2 text-xs text-gray-600">example@naver.com</div>
                                            </div>
                                            <div className="bg-white rounded-xl p-3 space-y-2 shadow-sm">
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                                    두 번째 <span className="border rounded px-1.5 py-0.5 text-[10px] flex items-center gap-1 font-normal">서명자 <ChevronDown className="w-3 h-3" /></span>
                                                </div>
                                                <div className="bg-gray-100 rounded-lg p-2 text-xs text-gray-600">을</div>
                                                <div className="bg-gray-100 rounded-lg p-2 text-xs text-gray-600">0101234XXXX</div>
                                            </div>
                                            <button className="w-full py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-medium transition-colors mt-2">
                                                서명자 추가하기
                                            </button>
                                        </div>
                                        {/* Bottom bar */}
                                        <div className="bg-[#333333] p-3 flex justify-center">
                                            <button className="bg-[#FF4A6B] text-white px-8 py-1.5 rounded-lg font-bold text-xs shadow-md">다음</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -40, scale: 0.95 }}
                                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                                    className="w-full max-w-lg relative"
                                >
                                    <div className="absolute -inset-4 bg-gradient-to-b from-white/5 to-transparent rounded-3xl blur-xl" />
                                    <div className="w-full bg-[#555555] rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col relative z-10">
                                        {/* Top bar */}
                                        <div className="bg-[#333333] h-10 flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-bold">1</div>
                                            <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold">2</div>
                                            <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-bold">3</div>
                                        </div>
                                        {/* Content */}
                                        <div className="flex flex-1 h-[320px] bg-[#555555]">
                                            {/* Document */}
                                            <div className="flex-1 bg-white m-3 rounded-lg p-5 relative overflow-hidden flex flex-col shadow-inner">
                                                <h3 className="text-lg font-bold mb-3 text-gray-800">계약서</h3>
                                                <div className="space-y-2.5 flex-1 opacity-60">
                                                    <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                                                    <div className="h-1.5 bg-gray-200 rounded w-5/6"></div>
                                                    <div className="h-1.5 bg-gray-200 rounded w-full mt-3"></div>
                                                    <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
                                                    <div className="h-1.5 bg-gray-200 rounded w-full mt-3"></div>
                                                    <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
                                                </div>
                                                <div className="flex gap-4 mt-6 justify-center">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-gray-700 text-sm">갑</span>
                                                        <div className="w-12 h-12 border-2 border-blue-200 bg-blue-50 rounded-lg flex items-center justify-center">
                                                            <PenTool className="w-5 h-5 text-blue-400" />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-gray-700 text-sm">을</span>
                                                        <div className="w-12 h-12 border-2 border-red-200 bg-red-50 rounded-lg flex items-center justify-center">
                                                            <PenTool className="w-5 h-5 text-red-400" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Sidebar (hidden on very small screens if necessary, but here scaled) className="hidden sm:flex ..." */}
                                            <div className="w-32 bg-[#f8f9fa] border-l border-gray-200 flex flex-col hidden sm:flex">
                                                <div className="p-2 border-b border-gray-200 bg-white">
                                                    <div className="text-[9px] text-gray-500 mb-0.5">첫 번째 서명자</div>
                                                    <div className="text-[11px] font-bold text-gray-800">갑</div>
                                                    <div className="text-[9px] text-gray-500 truncate">(example@naver...)</div>
                                                </div>
                                                <div className="p-2 space-y-1.5 bg-white">
                                                    <div className="flex items-center justify-between border border-gray-200 rounded p-1 bg-white">
                                                        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-red-500"></div><span className="text-[9px] text-gray-600">서명</span></div>
                                                        <ChevronDown className="w-2.5 h-2.5 text-gray-400" />
                                                    </div>
                                                    <div className="flex items-center justify-between border border-gray-200 rounded p-1 bg-white">
                                                        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-red-500"></div><span className="text-[9px] text-gray-600">텍스트</span></div>
                                                        <ChevronDown className="w-2.5 h-2.5 text-gray-400" />
                                                    </div>
                                                </div>
                                                <div className="p-2 border-b border-t border-gray-200 bg-white mt-1">
                                                    <div className="text-[9px] text-gray-500 mb-0.5">두 번째 서명자</div>
                                                    <div className="text-[11px] font-bold text-gray-800">을</div>
                                                </div>
                                                <div className="p-2 space-y-1.5 bg-white flex-1">
                                                    <div className="flex items-center justify-between border border-gray-200 rounded p-1 bg-white">
                                                        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-red-500"></div><span className="text-[9px] text-gray-600">서명</span></div>
                                                        <ChevronDown className="w-2.5 h-2.5 text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Bottom bar */}
                                        <div className="bg-[#333333] p-3 flex justify-center relative">
                                            <button className="bg-[#FF4A6B] text-white px-8 py-1.5 rounded-lg font-bold text-xs shadow-md relative z-10">
                                                다음
                                            </button>
                                            <motion.div
                                                initial={{ opacity: 0, x: 20, y: 20 }}
                                                animate={{ opacity: 1, x: 10, y: 5 }}
                                                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                                                className="absolute top-1/2 left-1/2 z-20 text-white drop-shadow-lg"
                                            >
                                                <MousePointer2 className="w-6 h-6 fill-white text-black" />
                                            </motion.div>
                                            <motion.div
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1.5, opacity: 0 }}
                                                transition={{ delay: 0.8, duration: 1, repeat: Infinity, repeatDelay: 1 }}
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-blue-400 rounded-full pointer-events-none z-0"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.8, type: "spring" }}
                                    className="text-center space-y-10 w-full"
                                >
                                    <h2 className="text-3xl font-semibold text-white tracking-tight">
                                        편리한 간편 결제
                                    </h2>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, rotate: -5 }}
                                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                                            transition={{ delay: 0.2, type: "spring" }}
                                            className="bg-white px-8 py-4 rounded-full flex items-center justify-center shadow-2xl border border-white/10"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="bg-[#00C73C] rounded-full w-8 h-8 flex items-center justify-center">
                                                    <span className="text-white font-extrabold text-lg leading-none mt-0.5">N</span>
                                                </div>
                                                <span className="text-[#00C73C] font-bold text-2xl tracking-tighter">pay</span>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, rotate: 5 }}
                                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                                            transition={{ delay: 0.4, type: "spring" }}
                                            className="bg-[#FFEB00] px-8 py-4 rounded-full flex items-center justify-center shadow-2xl border border-white/10"
                                        >
                                            <div className="flex items-center gap-2">
                                                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16 4C7.163 4 0 9.598 0 16.5c0 4.428 2.862 8.313 7.188 10.5l-1.875 6.875L13.125 28.625c.938.125 1.875.25 2.875.25 8.837 0 16-5.598 16-12.5S24.837 4 16 4z" fill="#000" />
                                                </svg>
                                                <span className="font-bold text-2xl tracking-tighter text-black">pay</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -40 }}
                                    transition={{ duration: 0.8, type: "spring" }}
                                    className="w-full max-w-sm bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10" />
                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                                            className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30"
                                        >
                                            <CheckCircle2 className="w-8 h-8 text-green-400" />
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-white mb-2">계약 및 결제 완료</h3>
                                        <p className="text-white/60 text-sm mb-6">모든 절차가 성공적으로 마무리되었습니다.</p>

                                        <div className="w-full space-y-2">
                                            <div className="flex justify-between text-xs text-white/50 px-1">
                                                <span>진행 상태</span>
                                                <span className="text-green-400 font-bold">100%</span>
                                            </div>
                                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                                                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Progress Indicators */}
                    <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <button
                                key={i}
                                onClick={() => setStep(i)}
                                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${step === i ? 'w-10 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                                aria-label={`Go to step ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureItem({ text, delay }: { text: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="flex items-center gap-3"
        >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-gray-700 font-medium">{text}</span>
        </motion.div>
    );
}
