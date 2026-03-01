import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ChevronDown } from 'lucide-react';

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormState {
    name: string;
    contact: string;
    region: string;
    duration: string;
    benefit: string;
    mailConsent: string;
    message: string;
    agreement: boolean;
    marketing: boolean;
}

export default function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
    const defaultFormState: FormState = {
        name: '',
        contact: '',
        region: '',
        duration: '',
        benefit: '',
        mailConsent: '',
        message: '',
        agreement: false,
        marketing: false,
    };

    const [form, setForm] = useState<FormState>(defaultFormState);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Shake animation keys to trigger re-renders of the animation for specific fields
    const [shakeKeys, setShakeKeys] = useState<Partial<Record<keyof FormState, number>>>({});

    const nameInputRef = useRef<HTMLInputElement>(null);
    const firstInvalidRef = useRef<HTMLElement>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Reset form when opening freshly
            if (!isSuccess) {
                setTimeout(() => {
                    nameInputRef.current?.focus();
                }, 100);
            }
        } else {
            document.body.style.overflow = '';
            // Delay reset slightly for exit animation
            setTimeout(() => {
                if (!isOpen) {
                    setForm(defaultFormState);
                    setErrors({});
                    setIsSubmitting(false);
                    setIsSuccess(false);
                }
            }, 500);
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setForm(prev => ({ ...prev, [name]: checked }));
            if (errors[name as keyof FormState]) {
                setErrors(prev => ({ ...prev, [name]: undefined }));
            }
            return;
        }

        if (name === 'contact') {
            // Auto hyphen format
            let val = value.replace(/[^0-9]/g, '');
            let formatted = '';
            if (val.length < 4) formatted = val;
            else if (val.length < 8) formatted = val.slice(0, 3) + '-' + val.slice(3);
            else formatted = val.slice(0, 3) + '-' + val.slice(3, 7) + '-' + val.slice(7, 11);

            setForm(prev => ({ ...prev, [name]: formatted }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }

        // Clear error on change
        if (errors[name as keyof FormState]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const triggerShake = (fieldName: keyof FormState) => {
        setShakeKeys(prev => ({ ...prev, [fieldName]: Date.now() }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof FormState, string>> = {};
        let isValid = true;
        firstInvalidRef.current = null;

        const setInvalid = (field: keyof FormState, msg: string, elId: string) => {
            newErrors[field] = msg;
            triggerShake(field);
            isValid = false;
            // Capture first element for focusing
            if (!firstInvalidRef.current) {
                const el = document.getElementById(elId);
                if (el) firstInvalidRef.current = el;
            }
        };

        if (!form.name.trim()) {
            setInvalid('name', '성함을 입력해 주세요.', 'modal-name');
        }

        const cleanContact = form.contact.replace(/-/g, '').trim();
        const phoneRegex = /^010\d{8}$/;
        if (!phoneRegex.test(cleanContact)) {
            setInvalid('contact', '정확한 연락처를 입력해 주세요.', 'modal-contact');
        }

        if (!form.region) setInvalid('region', '지역을 선택해 주세요.', 'modal-region');
        if (!form.duration) setInvalid('duration', '이용기간을 선택해 주세요.', 'modal-duration');
        if (!form.benefit) setInvalid('benefit', '관심 베네핏을 선택해 주세요.', 'modal-benefit');
        if (!form.mailConsent) setInvalid('mailConsent', '우편물개봉동의를 선택해 주세요.', 'modal-mailConsent');
        if (!form.agreement) setInvalid('agreement', '개인정보 수집 및 이용에 동의해 주세요.', 'modal-agreement');

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            setIsSubmitting(true);

            const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
            const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
            const AIRTABLE_PAT = import.meta.env.VITE_AIRTABLE_PAT;

            // API 정보가 없는 경우 경고 후 중단 (개발용)
            if (!AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME || !AIRTABLE_PAT) {
                console.warn('Airtable credentials are missing. Falling back to simulation.');
                setTimeout(() => {
                    setIsSubmitting(false);
                    setIsSuccess(true);
                }, 800);
                return;
            }

            try {
                const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${AIRTABLE_PAT}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fields: {
                            "⛔유입경로": "홈페이지",
                            "⛔성함": form.name,
                            "⛔연락처": form.contact,
                            "⛔지점": form.region,
                            "⛔계약기간": form.duration,
                            "⛔우편물개봉동의": form.mailConsent,
                            "⛔관심 베네핏": form.benefit,
                            "⛔문의내용(비고)": form.message,
                            "⛔개인정보수집동의": form.agreement ? "동의" : "미동의",
                            "⛔마케팅수신동의": form.marketing ? "동의" : "미동의"
                        },
                        typecast: true
                    })
                });

                if (response.ok) {
                    setIsSuccess(true);
                } else {
                    const errorData = await response.json();
                    console.error('Airtable Error Detail:', JSON.stringify(errorData, null, 2));
                    const errorMsg = errorData.error?.message || 'Airtable 설정 오류가 발생했습니다.';

                    // 디버깅을 위한 상세 정보 (마스킹 처리)
                    const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
                    const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
                    const debugInfo = `\n\n(참고: ${AIRTABLE_BASE_ID?.substring(0, 5)}... / ${AIRTABLE_TABLE_NAME})`;

                    if (errorMsg.includes('select option')) {
                        alert(`신청 중 오류: 에어테이블 필드에서 '동의' 항목을 찾을 수 없습니다. 필드 타입을 'Single line text'로 변경해 주세요.${debugInfo}`);
                    } else if (errorMsg.includes('Invalid permissions') || errorMsg.includes('not found')) {
                        alert(`신청 중 오류: 에어테이블 권한 또는 설정 오류입니다. Vercel의 환경변수(Base ID, Table Name, PAT)를 확인하고 'Redeploy' 해주세요.${debugInfo}`);
                    } else {
                        alert(`신청 중 오류가 발생했습니다: ${errorMsg}${debugInfo}`);
                    }
                }
            } catch (error) {
                console.error('Network Error:', error);
                alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.');
            } finally {
                setIsSubmitting(false);
            }
        } else {
            if (firstInvalidRef.current) {
                firstInvalidRef.current.focus();
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* 모달 오버레이 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex justify-center items-center p-4 sm:p-6"
                        onClick={onClose}
                    >
                        {/* 모달 컨텐츠 창 */}
                        <motion.dialog
                            open
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative flex flex-col max-h-[92vh] border border-white/20 m-0 overflow-hidden"
                            aria-labelledby="modal-title"
                            aria-modal="true"
                        >
                            <style>{`
                                .modal-scroll::-webkit-scrollbar { width: 6px; }
                                .modal-scroll::-webkit-scrollbar-track { background: rgba(243, 244, 246, 0.5); border-radius: 8px; }
                                .modal-scroll::-webkit-scrollbar-thumb { background-color: rgba(156, 163, 175, 0.8); border-radius: 8px; }
                                @keyframes shake {
                                    0%, 100% { transform: translateX(0); }
                                    20%, 60% { transform: translateX(-4px); }
                                    40%, 80% { transform: translateX(4px); }
                                }
                                .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
                            `}</style>

                            {/* 그라데이션 장식요소 */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-10"></div>

                            {/* 닫기 버튼 */}
                            <button
                                onClick={onClose}
                                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-300 z-20"
                                aria-label="신청 창 닫기"
                            >
                                <X className="w-5 h-5" strokeWidth={2.5} />
                            </button>

                            {!isSuccess ? (
                                <>
                                    {/* 헤더 영역 */}
                                    <div className="px-8 pt-10 pb-6 relative overflow-hidden shrink-0 bg-white">
                                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-70 pointer-events-none"></div>
                                        <div className="relative z-10">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-xs font-bold text-blue-700 bg-blue-100 rounded-full">
                                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                                                Premium Service
                                            </span>
                                            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 tracking-tight">맞춤형 컨설팅 신청</h2>
                                            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                                                아래 정보를 남겨주시면 <strong className="text-blue-600 font-semibold">최고의 전문 상담사</strong>가<br className="hidden sm:block" />
                                                가장 빠르고 정확하게 안내해 드리겠습니다.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 스크롤 가능 폼 영역 */}
                                    <div className="p-8 pt-2 overflow-y-auto modal-scroll relative bg-white pb-28">
                                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
                                                {/* 성함 필드 */}
                                                <div key={shakeKeys.name} className={`relative group mt-2 sm:mt-0 ${errors.name ? 'animate-shake' : ''}`}>
                                                    <input type="text" id="modal-name" name="name" placeholder=" " required aria-invalid={!!errors.name}
                                                        ref={nameInputRef}
                                                        value={form.name} onChange={handleChange}
                                                        className={`peer w-full px-4 py-3.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all text-slate-800 font-medium placeholder-transparent
                                                            ${errors.name ? 'border-red-500 bg-red-50 text-red-900 focus:ring-red-500/30' : 'border-slate-200 focus:ring-blue-500/30 focus:border-blue-500'}`} />
                                                    <label htmlFor="modal-name" className="absolute left-4 top-3.5 text-slate-400 text-sm font-medium transition-all duration-200 pointer-events-none peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1 peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:px-1">
                                                        성함 <span className="text-blue-500 ml-0.5">*</span>
                                                    </label>
                                                    {errors.name && (
                                                        <p className="text-red-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                                                            <X className="w-3 h-3" /> <span>{errors.name}</span>
                                                        </p>
                                                    )}
                                                </div>

                                                {/* 연락처 필드 */}
                                                <div key={shakeKeys.contact} className={`relative group mt-2 sm:mt-0 ${errors.contact ? 'animate-shake' : ''}`}>
                                                    <input type="tel" id="modal-contact" name="contact" placeholder=" " required aria-invalid={!!errors.contact} maxLength={13}
                                                        value={form.contact} onChange={handleChange}
                                                        className={`peer w-full px-4 py-3.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all text-slate-800 font-medium placeholder-transparent
                                                            ${errors.contact ? 'border-red-500 bg-red-50 text-red-900 focus:ring-red-500/30' : 'border-slate-200 focus:ring-blue-500/30 focus:border-blue-500'}`} />
                                                    <label htmlFor="modal-contact" className="absolute left-4 top-3.5 text-slate-400 text-sm font-medium transition-all duration-200 pointer-events-none peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1 peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:px-1">
                                                        연락처 <span className="text-blue-500 ml-0.5">*</span>
                                                    </label>
                                                    {errors.contact && (
                                                        <p className="text-red-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                                                            <X className="w-3 h-3 shrink-0" /> <span>{errors.contact}</span>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                {/* 지역 필드 */}
                                                <div key={shakeKeys.region} className={errors.region ? 'animate-shake' : ''}>
                                                    <label htmlFor="modal-region" className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                                                        희망 지역 <span className="text-blue-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <select id="modal-region" name="region" required value={form.region} onChange={handleChange}
                                                            className={`appearance-none w-full px-4 py-3.5 rounded-xl border bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all text-slate-700 font-medium cursor-pointer
                                                                ${errors.region ? 'border-red-500 bg-red-50 text-red-900 focus:ring-red-500/30' : 'border-slate-200 focus:ring-blue-500/30 focus:border-blue-500'}`}>
                                                            <option value="" disabled>선택해 주세요</option>
                                                            <option value="강남점">강남 지점</option>
                                                            <option value="서초점">서초 지점</option>
                                                            <option value="송파점">송파 지점</option>
                                                            <option value="여의도점">여의도 지점</option>
                                                            <option value="마포점">마포 지점</option>
                                                            <option value="용인점">용인 지점</option>
                                                            <option value="동탄점">동탄 지점</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                                            <ChevronDown className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                    {errors.region && (
                                                        <p className="text-red-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                                                            <X className="w-3 h-3" /> {errors.region}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* 이용기간 필드 */}
                                                <div key={shakeKeys.duration} className={errors.duration ? 'animate-shake' : ''}>
                                                    <label htmlFor="modal-duration" className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                                                        이용기간 <span className="text-blue-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <select id="modal-duration" name="duration" required value={form.duration} onChange={handleChange}
                                                            className={`appearance-none w-full px-4 py-3.5 rounded-xl border bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all text-slate-700 font-medium cursor-pointer
                                                                ${errors.duration ? 'border-red-500 bg-red-50 text-red-900 focus:ring-red-500/30' : 'border-slate-200 focus:ring-blue-500/30 focus:border-blue-500'}`}>
                                                            <option value="" disabled>선택해 주세요</option>
                                                            <option value="3개월">3개월</option>
                                                            <option value="6개월">6개월</option>
                                                            <option value="12개월">12개월</option>
                                                            <option value="24개월">24개월</option>
                                                            <option value="36개월">36개월</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                                            <ChevronDown className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                    {errors.duration && (
                                                        <p className="text-red-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                                                            <X className="w-3 h-3" /> {errors.duration}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                {/* 베네핏 필드 */}
                                                <div key={shakeKeys.benefit} className={errors.benefit ? 'animate-shake' : ''}>
                                                    <label htmlFor="modal-benefit" className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                                                        관심 베네핏 <span className="text-blue-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <select id="modal-benefit" name="benefit" required value={form.benefit} onChange={handleChange}
                                                            className={`appearance-none w-full px-4 py-3.5 rounded-xl border bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all text-slate-700 font-medium cursor-pointer
                                                                ${errors.benefit ? 'border-red-500 bg-red-50 text-red-900 focus:ring-red-500/30' : 'border-slate-200 focus:ring-blue-500/30 focus:border-blue-500'}`}>
                                                            <option value="" disabled>선택해 주세요</option>
                                                            <option value="비상주 패키지">🏢 비상주 패키지</option>
                                                            <option value="세무기장 패키지">📊 세무기장 패키지</option>
                                                            <option value="법인설립 패키지">📝 법인설립 패키지</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                                            <ChevronDown className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                    {errors.benefit && (
                                                        <p className="text-red-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                                                            <X className="w-3 h-3" /> {errors.benefit}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* 우편물동의 필드 */}
                                                <div key={shakeKeys.mailConsent} className={errors.mailConsent ? 'animate-shake' : ''}>
                                                    <label htmlFor="modal-mailConsent" className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                                                        우편물개봉동의 <span className="text-blue-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <select id="modal-mailConsent" name="mailConsent" required value={form.mailConsent} onChange={handleChange}
                                                            className={`appearance-none w-full px-4 py-3.5 rounded-xl border bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all text-slate-700 font-medium cursor-pointer
                                                                ${errors.mailConsent ? 'border-red-500 bg-red-50 text-red-900 focus:ring-red-500/30' : 'border-slate-200 focus:ring-blue-500/30 focus:border-blue-500'}`}>
                                                            <option value="" disabled>선택해 주세요</option>
                                                            <option value="동의">✅ 동의</option>
                                                            <option value="미동의">❌ 미동의</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                                            <ChevronDown className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                    {errors.mailConsent && (
                                                        <p className="text-red-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                                                            <X className="w-3 h-3" /> {errors.mailConsent}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 문의사항 */}
                                            <div>
                                                <label htmlFor="modal-message" className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide flex justify-between">
                                                    <span>문의사항</span>
                                                    <span className="text-slate-400 font-medium">(선택)</span>
                                                </label>
                                                <textarea id="modal-message" name="message" rows={3} placeholder="추가로 궁금하신 사항이나 남기실 말씀을 자유롭게 적어주세요."
                                                    value={form.message} onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-slate-700 font-medium placeholder-slate-400 resize-none"></textarea>
                                            </div>

                                            {/* 약관 동의 */}
                                            <div className="pt-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <label key={shakeKeys.agreement} className={`flex items-start cursor-pointer group mb-3 ${errors.agreement ? 'animate-shake' : ''}`}>
                                                    <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 mr-3 shrink-0">
                                                        <input id="modal-agreement" name="agreement" type="checkbox" required aria-invalid={!!errors.agreement}
                                                            checked={form.agreement} onChange={handleChange}
                                                            className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded cursor-pointer checked:bg-blue-600 checked:border-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500/50" />
                                                        <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 peer-checked:scale-100 scale-50 transition-all duration-200 pointer-events-none" strokeWidth={3} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                                                            <span className="text-blue-600">[필수]</span> 상담을 위한 개인정보 수집 및 이용 동의
                                                        </span>
                                                        <a href="#" className="text-[11px] text-slate-400 ml-1 underline hover:text-slate-600" onClick={(e) => e.preventDefault()}>전문보기</a>
                                                        {errors.agreement && (
                                                            <p className="text-red-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                                                                <X className="w-3 h-3" /> {errors.agreement}
                                                            </p>
                                                        )}
                                                    </div>
                                                </label>

                                                <label className="flex items-start cursor-pointer group">
                                                    <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 mr-3 shrink-0">
                                                        <input id="modal-marketing" name="marketing" type="checkbox"
                                                            checked={form.marketing} onChange={handleChange}
                                                            className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded cursor-pointer checked:bg-blue-600 checked:border-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500/50" />
                                                        <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 peer-checked:scale-100 scale-50 transition-all duration-200 pointer-events-none" strokeWidth={3} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-800 transition-colors">
                                                            <span className="text-slate-400">[선택]</span> 맞춤형 혜택 및 마케팅 정보 수신 동의
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>

                                            {/* CTA 버튼 (고정) */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 pt-5 bg-white z-10 before:absolute before:inset-x-0 before:-top-6 before:h-6 before:bg-gradient-to-t before:from-white before:to-transparent border-t border-gray-50/50 rounded-b-3xl">
                                                <button type="submit" disabled={isSubmitting}
                                                    className={`w-full relative overflow-hidden group bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-900/10 flex justify-center items-center gap-2 focus:outline-none focus:ring-4 focus:ring-slate-900/20
                                                        ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:-translate-y-0.5 active:translate-y-0 hover:shadow-slate-900/20'}`}>

                                                    {isSubmitting ? (
                                                        <>
                                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            처리 중...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="relative z-10 flex items-center gap-2">
                                                                빠른 상담 신청하기
                                                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                                </svg>
                                                            </span>
                                                            <style>{`
                                                                @keyframes shimmer { 100% { transform: translateX(100%); } }
                                                                .animate-shimmer { animation: shimmer 1.5s infinite; }
                                                            `}</style>
                                                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                /* 제출 완료 메시지 */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12 px-6 flex flex-col items-center justify-center min-h-[400px] bg-white rounded-3xl"
                                >
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-2 relative z-10 shadow-sm border border-emerald-100">
                                            <Check className="w-10 h-10 text-emerald-500 animate-[bounce_1s_ease-out_1]" strokeWidth={3} />
                                        </div>
                                        <div className="absolute inset-0 w-full h-full animate-[ping_1.5s_ease-out_1] rounded-full bg-emerald-400 opacity-20"></div>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">신청이 접수되었습니다!</h3>
                                    <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-[280px] mx-auto">
                                        담당 매니저가 내용을 확인한 후,<br />
                                        입력해주신 <strong className="text-slate-700 font-semibold">연락처로 빠르게 안내</strong>해 드리겠습니다.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-8 rounded-xl transition duration-200 focus:outline-none focus:ring-4 focus:ring-slate-200/50"
                                    >
                                        메인으로 돌아가기
                                    </button>
                                </motion.div>
                            )}
                        </motion.dialog>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
