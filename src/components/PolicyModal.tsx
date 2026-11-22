import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TERMS_HTML, PRIVACY_HTML, REFUND_HTML } from '../content/policyHtml';

export type PolicyType = 'terms' | 'privacy' | 'refund' | null;

const POLICIES = {
    terms: { title: '서비스 이용약관', html: TERMS_HTML },
    privacy: { title: '개인정보처리방침', html: PRIVACY_HTML },
    refund: { title: '환불정책', html: REFUND_HTML },
} as const;

interface PolicyModalProps {
    type: PolicyType;
    onClose: () => void;
}

export default function PolicyModal({ type, onClose }: PolicyModalProps) {
    // Body Scroll 방지
    // 신청 창 위에서 열릴 수도 있으므로, 닫을 때는 열기 전 상태로 되돌린다
    useEffect(() => {
        if (!type) return;
        const prevOverflow = document.body.style.overflow;
        const prevTouch = document.body.style.touchAction;
        document.body.style.overflow = 'hidden';
        // 모바일 사파리 등에서 뒤 배경 터치 스크롤 방지
        document.body.style.touchAction = 'none';
        return () => {
            document.body.style.overflow = prevOverflow;
            document.body.style.touchAction = prevTouch;
        };
    }, [type]);

    if (!type) return null;

    const { title, html } = POLICIES[type];

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

                    {/* Scrollable Content (Policy Text) — 정책 본문은 src/content/policyHtml.ts 한 곳에서 관리 */}
                    <div
                        className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 text-sm text-gray-600 leading-relaxed font-sans scrollbar-hide
                            [&_h3]:font-bold [&_h3]:text-gray-800 [&_h3]:text-base [&_h3]:mt-6 [&_h3]:mb-2 [&_h3:first-child]:mt-0
                            [&_h4]:font-semibold [&_h4]:text-gray-700 [&_h4]:mt-4 [&_h4]:mb-1
                            [&_p]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-1
                            [&_strong]:text-gray-900
                            [&_table]:w-full [&_table]:my-3 [&_table]:text-xs [&_table]:border-collapse [&_table]:block [&_table]:overflow-x-auto
                            [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:p-2 [&_th]:text-left [&_th]:whitespace-nowrap
                            [&_td]:border [&_td]:border-gray-200 [&_td]:p-2 [&_td]:align-top"
                        // 신뢰할 수 있는 고정 문서(사이트 소스에 포함된 정책 본문)만 넣는다
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
