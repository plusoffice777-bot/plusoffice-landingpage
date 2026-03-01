import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqData = [
    {
        id: 1,
        question: "Q1. 사무실 공간 없이 주소지만 빌려 사업자 등록을 하는 것이 합법인가요?",
        answer: "A. 네, 100% 합법입니다. IT 개발, 전자상거래, 컨설팅 등 물리적 공간이 필수적이지 않은 업종은 비상주사무실을 통한 등록이 법적으로 완전히 인정되며, 현재 수많은 기업이 이용하고 있습니다."
    },
    {
        id: 2,
        question: "Q2. 세무서나 금융기관에서 현장 실사가 나오면 어떻게 하나요?",
        answer: "A. 걱정하지 않으셔도 됩니다. 플러스오피스는 정식 임대차 계약을 기반으로 운영됩니다. 실사 방문 시 전문 매니저가 현장에서 대응을 지원하며, 비즈니스 센터 내 공용 공간 및 지정석 활용을 안내하여 원활한 검토를 돕습니다."
    },
    {
        id: 3,
        question: "Q3. 계약했는데 세무서에서 사업자 등록이 반려되면 어떡하나요?",
        answer: "A. 결제 후 사업자 등록이 최종 반려될 경우, 100% 전액 환불해 드립니다. 계약 전 매니저가 업종을 1차로 확인하여 안전한 진행이 가능하도록 지원하고 있습니다."
    },
    {
        id: 4,
        question: "Q4. 비상주사무실로 등록할 수 없는 제한 업종도 있나요?",
        answer: "A. 네, 있습니다. 제조업(OEM 제외), 소독업, 대부업, 식품소분업 등 법적으로 반드시 별도의 특수 시설이나 전용 창고가 필요한 인허가 업종은 등록이 어렵습니다. 상담을 통해 명확히 안내해 드립니다."
    },
    {
        id: 5,
        question: "Q5. 용인, 동탄(비과밀억제권역) 지점 계약 시 어떤 세금 혜택이 있나요?",
        answer: "A. 수도권 과밀억제권역 법인 설립 시 발생하는 취등록세 3배 중과세가 면제됩니다. 또한 요건을 충족하는 청년 창업자의 경우, 법인세 및 소득세 감면 혜택을 받을 수 있어 절세 효과가 매우 큽니다."
    },
    {
        id: 6,
        question: "Q6. 우편물이나 등기, 택배 관리는 어떻게 진행되나요?",
        answer: "A. 스마트하게 관리해 드립니다. 우편물 도착 시 당일 알림톡을 발송하며, 대표님의 요청에 따라 스캔본 전송, 자택 배송, 폐기 등 원하시는 방식으로 안전하게 처리합니다."
    },
    {
        id: 7,
        question: "Q7. 계약한 지점 외에 다른 지점의 회의실도 사용할 수 있나요?",
        answer: "A. 네, 가능합니다. 플러스오피스 멤버라면 전국 7개 지점의 프리미엄 라운지와 회의실을 통합 예약 시스템을 통해 자유롭게 이용하실 수 있습니다."
    },
    {
        id: 8,
        question: "Q8. 전대차 계약이라 나중에 지점이 폐업하면 주소지가 사라지지 않나요?",
        answer: "A. 플러스오피스는 안전합니다. 개인의 불투명한 재임대가 아닌, 전문 법인이 직접 소유하거나 본 본사가 직영으로 운영하므로 계약의 연속성이 보장됩니다. 법적 효력이 확실한 임대차 계약서가 발급됩니다."
    },
    {
        id: 9,
        question: "Q9. 전자 계약 시 서류 발급까지 얼마나 걸리나요?",
        answer: "A. 약 5분이면 충분합니다. 온라인 결제 후 카카오톡 전자서명을 완료하시면 즉시 PDF 계약서를 다운로드하실 수 있으며, 이를 홈택스에 업로드하여 바로 신청하시면 됩니다."
    },
    {
        id: 10,
        question: "Q10. 계약 기간 중간에 다른 지점으로 이전이 가능한가요?",
        answer: "A. 네, 지원해 드립니다. 사업 전략에 따라 지점 이동이 필요한 경우, 남은 계약 기간을 보장하여 유연하게 주소지를 이전해 드리는 책임 서비스를 운영하고 있습니다."
    }
];

// JSON-LD Schema 생성기 (SEO용)
const generateFAQSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };
    return JSON.stringify(schema);
};

// 개별 FAQ 아이템 컴포넌트
interface FaqItemProps {
    item: { id: number; question: string; answer: string };
    isOpen: boolean;
    onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ item, isOpen, onClick }) => {
    return (
        <motion.article
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
        >
            <div
                className={`bg-white/60 backdrop-blur-md rounded-2xl transition-all duration-300 border ${isOpen ? 'shadow-lg border-blue-500/30' : 'hover:shadow-md hover:border-gray-200 border-white/50'
                    }`}
            >
                <button
                    onClick={onClick}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full p-5 md:p-6 sm:p-7 flex items-start justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl group cursor-pointer"
                >
                    <div className="pr-4 flex-1">
                        <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-500'
                            }`}>
                            {item.question}
                        </h3>
                    </div>
                    <motion.div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-50'
                            }`}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] as any }}
                    >
                        <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-blue-600' : 'text-gray-500'}`} />
                    </motion.div>
                </button>

                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            id={`faq-answer-${item.id}`}
                            role="region"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] as any }}
                            className="overflow-hidden"
                        >
                            <div className="p-5 md:p-6 sm:p-7 pt-0 md:pt-0 sm:pt-0 text-gray-600 leading-relaxed text-base md:text-lg">
                                <div className="pt-4 border-t border-gray-100">
                                    {item.answer}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.article>
    );
};

export default function FAQSection() {
    const [openId, setOpenId] = useState<number | null>(1);

    const handleToggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <>
            {/* SEO Schema.org 주입 */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateFAQSchema() }} />

            <section id="faq" className="py-[60px] md:py-[100px] lg:py-[120px] relative overflow-hidden bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] min-h-screen">

                {/* 장식용 배경 요소들 */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-100/40 blur-[120px]" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

                    {/* 헤더 섹션 */}
                    <motion.div
                        className="text-center mb-[40px] md:mb-[50px] lg:mb-[60px]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold tracking-tight text-gray-900 mb-6 leading-tight break-keep">
                            무엇이든 물어보세요
                        </h2>
                        <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto break-keep">
                            플러스오피스 서비스에 대해 궁금하신 점을 해결해 드립니다.<br className="hidden md:block" />
                            더 자세한 상담이 필요하시다면 언제든 문의해 주세요.
                        </p>
                    </motion.div>

                    {/* FAQ 리스트 섹션 */}
                    <div className="space-y-4">
                        {faqData.map((item) => (
                            <FaqItem
                                key={item.id}
                                item={item}
                                isOpen={openId === item.id}
                                onClick={() => handleToggle(item.id)}
                            />
                        ))}
                    </div>

                    {/* 추가 문의 유도 섹션 삭제 완료 (CTASection으로 이관) */}
                </div>
            </section>
        </>
    );
}
