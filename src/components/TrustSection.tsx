import { motion } from 'motion/react';
import { ShieldCheck, RefreshCcw, ReceiptText } from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: "전 지점 본사 직영 운영",
        description: "비상주사무실 전문 법인이 직접 운영하여 폐업 걱정 없이 안전합니다."
    },
    {
        icon: RefreshCcw,
        title: "사업자등록 반려 시 100% 환불",
        description: "1:1 전담 매니저의 업종 컨설팅 후, 반려 시 복잡한 절차 없이 즉시 환불해 드립니다."
    },
    {
        icon: ReceiptText,
        title: "추가 요금 없는 투명한 가격",
        description: "보증금, 예치금, 우편 알림, 실사 지원 및 회의실 이용료 모두 0원입니다."
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function TrustSection() {
    return (
        <section
            aria-labelledby="trust-section-title"
            className="bg-[#f8fafc] py-[60px] md:py-[100px] lg:py-[120px] min-h-screen flex items-center font-sans"
        >
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
                {/* 타이틀 영역 */}
                <div className="text-center mb-[40px] md:mb-[50px] lg:mb-[60px]">
                    <motion.h2
                        id="trust-section-title"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold text-slate-900 tracking-tight leading-tight mb-4 md:mb-5 break-keep"
                    >
                        신뢰할 수 있는 플러스오피스
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-xl text-gray-500 font-medium tracking-tight break-keep"
                    >
                        법인 직영의 안정성과 100% 환불 정책으로 대표님의 시작을 보호합니다
                    </motion.p>
                </div>

                <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
                    role="list"
                >
                    {features.map((feature, index) => (
                        <motion.li
                            key={index}
                            variants={itemVariants}
                            className="relative bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 flex flex-col items-center text-center group"
                        >
                            {/* TRUSTED 배지 */}
                            <div className="mb-8">
                                <span className="bg-blue-900 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide">
                                    TRUSTED
                                </span>
                            </div>

                            {/* 부유하는 아이콘 영역 */}
                            <motion.div
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                                className="mb-8"
                            >
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                                    <feature.icon className="w-10 h-10 text-blue-400 group-hover:text-blue-600 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" strokeWidth={1.5} aria-hidden="true" />
                                </div>
                            </motion.div>

                            {/* 텍스트 콘텐츠 */}
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 break-keep">
                                {feature.title}
                            </h3>
                            <p className="text-base md:text-lg text-slate-600 leading-relaxed break-keep">
                                {feature.description}
                            </p>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}
