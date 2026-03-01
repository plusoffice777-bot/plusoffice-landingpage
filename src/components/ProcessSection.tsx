import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, FileSignature, Building2 } from 'lucide-react';

// 진행 단계 데이터
const steps = [
    {
        id: '01',
        title: '온라인 선택 및 간편 결제',
        desc: '원하는 지점과 이용 기간을 선택 후, 신용카드/네이버페이/카카오페이 등으로 즉시 결제.',
        icon: CreditCard,
        iconLabel: '신용카드 결제 및 온라인 선택 단계 아이콘',
    },
    {
        id: '02',
        title: '비대면 전자계약 서명',
        desc: '카카오톡 또는 이메일로 발송된 계약서 링크를 클릭하여 모바일로 간편하게 서명.',
        icon: FileSignature,
        iconLabel: '비대면 모바일 전자 서명 단계 아이콘',
    },
    {
        id: '03',
        title: '임대차계약서 수령 및 사업자등록',
        desc: '서명 즉시 계약서 PDF 파일이 발급되며, 사업자등록 직접 발급 또는 대행 가능.',
        icon: Building2,
        iconLabel: '계약서 수령 및 사업자등록 완료 단계 아이콘',
    }
];

export default function ProcessSection() {
    // 진입 애니메이션 (가이드라인 템플릿)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    // 순차적 반짝임(Glow) 애니메이션
    const glowVariants = {
        animate: (custom: number) => ({
            boxShadow: [
                "0px 0px 0px 0px rgba(56, 189, 248, 0)",
                "0px 0px 40px 12px rgba(56, 189, 248, 0.75)",
                "0px 0px 0px 0px rgba(56, 189, 248, 0)"
            ],
            borderColor: ["#334155", "#38bdf8", "#334155"],
            transition: {
                duration: 4.5,
                repeat: Infinity,
                delay: custom * 1.5,
                ease: "easeInOut" as const
            }
        })
    };

    return (
        <section
            className="relative w-full py-[60px] md:py-[100px] lg:py-[120px] bg-[#0f131a] overflow-hidden font-sans flex items-center selection:bg-[#38bdf8] selection:text-white"
            aria-labelledby="process-heading"
        >
            <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
            {/* 콘텐츠 최대 너비 제어 (가이드라인 규격) */}
            <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10 w-full">

                {/* 헤더 영역 (진입 애니메이션 적용) */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center max-w-3xl mx-auto mb-[40px] md:mb-[50px] lg:mb-[60px]"
                >
                    {/* 메인 카피: SEO를 위해 break-keep를 적용했으나 의미적 한 단락 */}
                    <h2
                        id="process-heading"
                        className="text-3xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold tracking-tight leading-tight text-white mb-5 md:mb-6 break-keep"
                    >
                        간편한 진행 절차
                    </h2>
                    {/* 서브 카피 */}
                    <p className="text-sm md:text-lg text-gray-400 leading-relaxed break-keep px-2 sm:px-4">
                        커피 한 잔 마시는 5분이면 계약과 사업자등록 준비가 끝납니다.
                    </p>
                </motion.header>

                {/* 타임라인 영역 */}
                <div className="relative">

                    {/* 연결선 (데스크톱 가로 / 모바일 세로) */}
                    <div className="hidden md:block absolute top-[3rem] lg:top-[3.5rem] left-[16%] right-[16%] h-[2px] bg-slate-800/80 z-0" aria-hidden="true" />
                    <div className="md:hidden absolute top-8 bottom-8 left-[2rem] sm:left-[2.5rem] w-[2px] bg-slate-800/80 z-0" aria-hidden="true" />

                    {/* Stagger가 적용된 그리드 컨테이너 */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        role="list"
                        aria-label="서비스 진행 3단계"
                    >
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.article
                                    key={step.id}
                                    variants={itemVariants}
                                    className="relative z-10 flex flex-row md:flex-col items-start md:items-center text-left md:text-center group"
                                    role="listitem"
                                >
                                    {/* 아이콘 컨테이너 (반짝임 애니메이션 + 사이즈 가이드라인 반영) */}
                                    <div className="relative">
                                        <motion.div
                                            custom={index}
                                            variants={glowVariants}
                                            animate="animate"
                                            className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-[3px] border-slate-700 bg-slate-800/80 flex items-center justify-center relative z-10 mr-5 sm:mr-6 md:mr-0 md:mb-6 lg:mb-8 shadow-2xl backdrop-blur-md"
                                            aria-hidden="true"
                                        >
                                            <Icon
                                                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#38bdf8] transition-transform duration-300 group-hover:scale-110"
                                                strokeWidth={2}
                                                aria-label={step.iconLabel}
                                            />
                                        </motion.div>
                                    </div>

                                    {/* 텍스트 정보 */}
                                    <div className="flex-1 pt-1 sm:pt-2 md:pt-0">
                                        <span className="block text-xs md:text-sm font-bold text-[#38bdf8] tracking-widest uppercase mb-1.5 md:mb-3">
                                            STEP {step.id}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2.5 md:mb-4 break-keep line-clamp-2 md:line-clamp-none leading-snug">
                                            {step.title.split(' ').map((word, i) => (
                                                <React.Fragment key={i}>
                                                    {word} {i === 1 && <br className="hidden md:block lg:hidden" />}
                                                </React.Fragment>
                                            ))}
                                        </h3>
                                        <p className="text-sm md:text-lg text-gray-400 leading-relaxed break-keep">
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </div>

            </div>

            {/* 하단 부드러운 그라데이션 및 구분선 (리뷰 섹션과의 자연스러운 연결) */}
            <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-[#0f131a] to-transparent pointer-events-none z-0" aria-hidden="true" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50 z-10" aria-hidden="true" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] max-w-[600px] h-[100px] bg-blue-500/10 blur-[60px] pointer-events-none z-0" aria-hidden="true" />
        </section>
    );
}
