import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type PolicyType = 'terms' | 'privacy' | null;

interface PolicyModalProps {
    type: PolicyType;
    onClose: () => void;
}

export default function PolicyModal({ type, onClose }: PolicyModalProps) {
    // Body Scroll 방지
    useEffect(() => {
        if (type) {
            document.body.style.overflow = 'hidden';
            // 모바일 사파리 등에서 뒤 배경 터치 스크롤 방지
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [type]);

    if (!type) return null;

    const isTerms = type === 'terms';
    const title = isTerms ? "서비스 이용약관" : "개인정보처리방침";

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pb-[30px] sm:pb-[40px]">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                    aria-hidden="true"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, y: "100%", scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: "100%", scale: 0.95 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col h-[85vh] sm:h-[80vh] overflow-hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="policy-dialog-title"
                >
                    {/* Header */}
                    <div className="sticky top-0 z-20 flex justify-between items-center px-6 sm:px-8 py-5 sm:py-6 bg-white border-b border-gray-100">
                        <h2 id="policy-dialog-title" className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 w-10 h-10 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                            aria-label={`${title} 창 닫기`}
                        >
                            <X size={20} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Scrollable Content (Policy Text) */}
                    <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 text-sm text-gray-600 leading-relaxed font-sans scrollbar-hide">
                        {isTerms ? (
                            <div className="space-y-6">
                                <section>
                                    <h3 className="font-bold text-gray-800 text-base mb-2">제1조 (목적)</h3>
                                    <p>본 약관은 플러스오피스(이하 "회사"라 함)가 제공하는 비상주 사무실 및 관련 제반 서비스의 이용과 관련하여 회사와 이용 고객 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
                                </section>
                                <section>
                                    <h3 className="font-bold text-gray-800 text-base mb-2">제2조 (용어의 정의)</h3>
                                    <p>1. "서비스"란 회사가 고객에게 제공하는 사업자등록용 주소지 임대, 우편물 수발신, 회의실 대여 등의 비상주 사무실 서비스를 의미합니다.<br />
                                        2. "고객"이란 본 약관에 따라 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 개인 또는 법인을 의미합니다.</p>
                                </section>
                                <section>
                                    <h3 className="font-bold text-gray-800 text-base mb-2">제3조 (약관의 명시와 개정)</h3>
                                    <p>1. 회사는 본 약관의 내용을 고객이 쉽게 알 수 있도록 서비스 초기 화면 또는 연결 화면을 통하여 게시합니다.<br />
                                        2. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며, 개정 시에는 적용 일자 및 개정 사유를 명시하여 사전에 공지합니다.</p>
                                </section>
                                <section>
                                    <h3 className="font-bold text-gray-800 text-base mb-2">제4조 (계약의 성립 및 해지)</h3>
                                    <p>1. 서비스 이용계약은 고객이 회사에서 정한 소정의 양식에 따라 신청 후, 요금을 결제함으로써 성립됩니다.<br />
                                        2. 계약의 해지 및 환불 규정은 회사의 별도 환불 정책에 따르며, 불법적인 용도로 주소지를 사용하는 경우 회사는 즉시 계약을 직권 해지할 수 있습니다.</p>
                                </section>
                                <section>
                                    <h3 className="font-bold text-gray-800 text-base mb-2">제5조 (회사의 의무)</h3>
                                    <p>회사는 본 약관이 정하는 바에 따라 지속적이고 안정적으로 서비스를 제공하기 위해 최선을 다하며, 고객의 개인정보를 보호하기 위해 보안 시스템을 갖추어야 합니다.</p>
                                </section>
                                <section>
                                    <h3 className="font-bold text-gray-800 text-base mb-2">제6조 (고객의 의무)</h3>
                                    <p>고객은 관계 법령, 본 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안 됩니다.</p>
                                </section>
                                <p className="text-gray-400 mt-6">- 본 약관은 2026년 3월 1일부터 적용됩니다.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <section>
                                    <h3 className="font-bold text-gray-800 text-base mb-2">1. 개인정보의 수집 및 이용 목적</h3>
                                    <p>플러스오피스(이하 "회사"라 함)는 수집한 개인정보를 다음의 목적을 위해 활용합니다.<br />
                                        - 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금 정산, 계약서 발송, 우편물 수발신 알림<br />
                                        - 고객 관리: 회원제 서비스 이용에 따른 본인확인, 가입 의사 확인, 불만 처리 등 민원 처리<br />
                                        - 마케팅 및 광고에 활용: 신규 서비스 및 이벤트 맞춤 정보 제공</p>
                                </section>
                                <section>
                                    <h3 className="font-bold text-gray-800 text-base mb-2">2. 수집하는 개인정보의 항목</h3>
                                    <p>회사는 서비스 가입, 상담, 계약 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.<br />
                                        - 수집항목: 성명, 연락처, 이메일, 회사명, 업종, 결제기록<br />
                                        - 개인정보 수집방법: 홈페이지 양식 폼 제출, 서면양식, 전화/팩스</p>
                                </section>
                                <section>
                                    <h3 className="font-bold text-gray-800 text-base mb-2">3. 개인정보의 보유 및 이용기간</h3>
                                    <p>원칙적으로, 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.<br />
                                        - 계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)<br />
                                        - 대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)<br />
                                        - 소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</p>
                                </section>
                                <section>
                                    <h3 className="font-bold text-gray-800 text-base mb-2">4. 개인정보의 파기절차 및 방법</h3>
                                    <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.<br />
                                        - 파기절차: 고객이 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 보존 사유에 따라 일정 기간 저장된 후 파기됩니다.<br />
                                        - 파기방법: 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</p>
                                </section>
                                <section>
                                    <h3 className="font-bold text-gray-800 text-base mb-2">5. 개인정보 처리 담당자 및 연락처</h3>
                                    <p>고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보관리책임자를 지정하고 있습니다.<br />
                                        - 개인정보관리책임자: 플러스오피스 관리팀<br />
                                        - 전화번호: 1551-5586<br />
                                        - 이메일: plusoffice777@gmail.com</p>
                                </section>
                                <p className="text-gray-400 mt-6">- 본 방침은 2026년 3월 1일부터 시행됩니다.</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
