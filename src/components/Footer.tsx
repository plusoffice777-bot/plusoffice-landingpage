import type { PolicyType } from './PolicyModal';

interface FooterProps {
    onOpenPolicy: (type: PolicyType) => void;
}

export default function Footer({ onOpenPolicy }: FooterProps) {
    return (
        <footer className="w-full bg-[#f8f9fa] border-t border-gray-200 pt-12 pb-8 px-6 lg:px-12 text-sm text-gray-500 font-sans break-keep">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                {/* 왼쪽 회사 정보 영역 */}
                <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#1DB0F6] to-[#7B61FF] flex items-center justify-center shadow-sm">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v12m-6-6h12" />
                            </svg>
                        </div>
                        <span className="text-2xl font-black tracking-tight text-gray-900" style={{ letterSpacing: '-0.03em' }}>
                            Plus Office
                        </span>
                    </div>

                    <div className="space-y-1.5 leading-relaxed">
                        <p>
                            <span className="font-semibold text-gray-700">법인명 :</span> (주)플러스오피스<span className="mx-2 text-gray-300">|</span>
                            <span className="font-semibold text-gray-700">사업자등록번호 :</span> 890-86-03495
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">주소 :</span> 서울특별시 송파구 풍성로 20길 5, 2층 전체
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">통신판매업 신고번호 :</span> 2023-서울송파-6612호
                        </p>
                        <p className="pt-2 flex flex-wrap gap-x-2 gap-y-1 items-center">
                            <span className="font-semibold text-gray-700">고객센터 :</span>
                            <strong className="text-gray-900 text-base">1551-5586</strong>
                            <span className="mx-1 text-gray-300">|</span>
                            <span className="font-semibold text-gray-700">이메일 :</span>
                            <a href="mailto:plusoffice777@gmail.com" className="hover:text-blue-600 transition-colors">plusoffice777@gmail.com</a>
                        </p>
                        <p className="text-gray-400">
                            운영 시간 : 09:00 ~ 19:00 (월~금, 주말 및 공휴일 휴무)
                        </p>
                    </div>
                </div>

                {/* 오른쪽 정책 및 약관 링크 영역 */}
                <div className="flex justify-start md:justify-end w-full md:w-auto">
                    <div className="flex gap-4 sm:gap-6 font-medium text-gray-600">
                        <button
                            onClick={() => onOpenPolicy('terms')}
                            className="hover:text-gray-900 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
                            aria-label="서비스 이용약관 보기"
                        >
                            서비스 이용약관
                        </button>
                        <button
                            onClick={() => onOpenPolicy('privacy')}
                            className="hover:text-gray-900 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded font-semibold"
                            aria-label="개인정보처리방침 보기"
                        >
                            개인정보처리방침
                        </button>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                <p>Copyright © Plus Office. All rights reserved.</p>
                <div className="grayscale opacity-50 flex items-center gap-2">
                    {/* 결제 파트너 로고 (이미지 표시 위치 보존) */}
                    <span>Payments Partner</span>
                    <span className="font-bold tracking-tighter text-sm">Payple</span>
                </div>
            </div>
        </footer>
    );
}
