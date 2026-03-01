import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Building2, Calculator, Briefcase } from 'lucide-react';

// --- 데이터 정의 ---
const TABS = [
    { id: 'basic', label: '비상주 패키지', icon: Building2 },
    { id: 'tax', label: '세무기장 패키지', icon: Calculator },
    { id: 'corp', label: '법인설립 패키지', icon: Briefcase },
] as const;

type TabId = typeof TABS[number]['id'];

type Plan = {
    months: number;
    originalPrice?: string;
    price: string;
    total: string;
    originalTotal?: string;
    isBest: boolean;
    suffix?: string;
};

type PackageInfo = {
    banner: {
        badge: string;
        title: string;
        desc: string;
    };
    plans: Plan[];
};

const PACKAGE_DATA: Record<TabId, PackageInfo> = {
    basic: {
        banner: {
            badge: '월 15,000원 부터',
            title: '비상주 패키지',
            desc: '거품을 뺀 정직한 가격. 플러스오피스 최저가 보장제',
        },
        plans: [
            { months: 3, originalPrice: '', price: '40,000', total: '120,000', isBest: false, suffix: '' },
            { months: 6, originalPrice: '', price: '30,000', total: '180,000', isBest: false, suffix: '' },
            { months: 12, originalPrice: '', price: '20,000', total: '240,000', isBest: false, suffix: '' },
            { months: 24, originalPrice: '', price: '18,000', total: '432,000', isBest: true, suffix: '' },
            { months: 36, originalPrice: '', price: '15,000', total: '540,000', isBest: false, suffix: '' },
        ]
    },
    tax: {
        banner: {
            badge: '최대 24만원 할인',
            title: '세무기장 패키지',
            desc: '비상주사무실과 세무기장서비스를 함께 이용하면 월 1만원 파격 할인',
        },
        plans: [
            { months: 12, originalPrice: '20,000', price: '10,000', originalTotal: '240,000', total: '120,000', isBest: false, suffix: '' },
            { months: 24, originalPrice: '18,000', price: '8,000', originalTotal: '432,000', total: '192,000', isBest: true, suffix: '' },
        ]
    },
    corp: {
        banner: {
            badge: '50만원 상당 혜택',
            title: '법인설립 패키지',
            desc: '비상주사무실과 세무기장서비스를 함께 이용하면 법인설립 100% 무료',
        },
        plans: [
            { months: 12, originalPrice: '', price: '20,000', total: '240,000', originalTotal: '240,000+500,000', isBest: false, suffix: '+ 무료법인설립' },
            { months: 24, originalPrice: '', price: '18,000', total: '432,000', originalTotal: '432,000+500,000', isBest: true, suffix: '+ 무료법인설립' },
        ]
    }
};

export default function PricingSection() {
    const [activeTab, setActiveTab] = useState<TabId>('basic');

    const currentData = PACKAGE_DATA[activeTab];

    // 애니메이션 Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div id="pricing" className="bg-[#fafafa] font-sans">
            <section className="py-[60px] md:py-[100px] lg:py-[120px]" aria-labelledby="pricing-heading">
                <div className="max-w-7xl mx-auto px-4 md:px-6">

                    {/* 헤더 영역 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-[40px] md:mb-[50px] lg:mb-[60px]"
                    >
                        <h2 id="pricing-heading" className="text-3xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold tracking-tight leading-tight text-gray-900 mb-6 whitespace-pre-line break-keep">
                            {'플러스 오피스만의\n국내 최저가 요금제!'}
                        </h2>
                        <p className="text-sm md:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto break-keep">
                            사업 단계에 딱 맞는 패키지를 선택하세요. 길게 이용할수록 할인율이 커집니다.
                        </p>
                    </motion.div>

                    {/* 탭 컨트롤 */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
                        role="tablist"
                        aria-label="요금제 패키지 선택"
                    >
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={`panel-${tab.id}`}
                                    id={`tab-${tab.id}`}
                                    onClick={() => setActiveTab(tab.id as TabId)}
                                    className={`
                                        relative flex items-center gap-2 px-6 py-3.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 cursor-pointer
                                        ${isActive
                                            ? 'text-white shadow-lg shadow-blue-500/25 -translate-y-0.5 border-none'
                                            : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:shadow-md border border-gray-200'
                                        }
                                    `}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pricing-tab"
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                            initial={false}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Icon className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                                        {tab.label}
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* 콘텐츠 영역 */}
                    <div className="relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                role="tabpanel"
                                id={`panel-${activeTab}`}
                                aria-labelledby={`tab-${activeTab}`}
                            >
                                {/* 패키지 배너 */}
                                <header className="relative w-full h-[240px] md:h-[300px] rounded-3xl mb-8 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-center px-4 shadow-xl">
                                    {/* 데코레이션 효과 */}
                                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                                        <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-gradient-to-r from-blue-500/30 to-transparent rotate-12 blur-3xl" />
                                        <div className="absolute -bottom-[50%] -right-[10%] w-[70%] h-[150%] bg-gradient-to-l from-cyan-400/30 to-transparent -rotate-12 blur-3xl" />
                                    </div>

                                    <div className="relative z-10 flex flex-col items-center">
                                        {currentData.banner.badge && (
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="inline-block px-4 py-1.5 mb-4 text-xs md:text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-lg"
                                            >
                                                {currentData.banner.badge}
                                            </motion.span>
                                        )}
                                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight break-keep">
                                            {currentData.banner.title}
                                        </h3>
                                        <p className="text-slate-300 text-sm md:text-base max-w-lg break-keep">
                                            {currentData.banner.desc}
                                        </p>
                                    </div>
                                </header>

                                {/* 요금제 카드 그리드 */}
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className={`grid gap-4 md:gap-6 ${currentData.plans.length > 3
                                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
                                        : 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                                        }`}
                                >
                                    {currentData.plans.map((plan, idx) => (
                                        <motion.article
                                            key={idx}
                                            variants={itemVariants}
                                            whileHover={{ y: -8 }}
                                            className={`
                                                relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white transition-all duration-300
                                                flex flex-col justify-between
                                                ${plan.isBest
                                                    ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-500/10 scale-100 lg:scale-105 z-10'
                                                    : 'border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-100'
                                                }
                                            `}
                                        >
                                            {/* 베스트 뱃지 */}
                                            {plan.isBest && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                                                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                                                    BEST
                                                </div>
                                            )}

                                            <header className="mb-6">
                                                <h4 className={`text-lg md:text-xl font-bold mb-4 ${plan.isBest ? 'text-blue-600' : 'text-gray-900'}`}>
                                                    {plan.months}개월
                                                </h4>

                                                <div className="flex flex-col gap-1">
                                                    {/* 기존 가격 (할인 전) */}
                                                    {plan.originalPrice && (
                                                        <span className="text-sm text-gray-400 line-through">
                                                            <span className="sr-only">기존 가격:</span>월 {plan.originalPrice}원
                                                        </span>
                                                    )}

                                                    {/* 현재 가격 */}
                                                    <div className="flex items-end gap-1 flex-wrap">
                                                        <span className={`text-2xl md:text-3xl font-bold tracking-tight ${plan.isBest ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400' : 'text-gray-900'}`}>
                                                            <span className="sr-only">할인 가격:</span>월 {plan.price}원
                                                        </span>
                                                        {plan.suffix && (
                                                            <span className={`text-sm md:text-base font-bold ${plan.isBest ? 'text-blue-500' : 'text-blue-600'}`}>
                                                                {plan.suffix}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </header>

                                            {/* 총 금액 */}
                                            <footer className="pt-4 border-t border-gray-100 mt-auto">
                                                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                                    {plan.originalTotal && (
                                                        <>
                                                            <span className="line-through">
                                                                <span className="sr-only">기존 총 금액:</span>총 {plan.originalTotal}원
                                                            </span>
                                                            <span aria-hidden="true">→</span>
                                                        </>
                                                    )}
                                                    <span className={plan.isBest ? 'font-semibold text-gray-700' : ''}>
                                                        <span className="sr-only">현재 총 금액:</span>총 {plan.total}원
                                                    </span>
                                                </div>
                                            </footer>
                                        </motion.article>
                                    ))}
                                </motion.div>

                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </section>
        </div>
    );
}
