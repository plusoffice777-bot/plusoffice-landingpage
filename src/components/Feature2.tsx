import { User } from 'lucide-react';
import InteractiveDemo from './InteractiveDemo';

export default function Feature2() {
    return (
        <section className="bg-[#fafafa] text-[#1a1a1a] flex items-center justify-center px-6 py-[60px] md:py-[100px] lg:py-[120px] font-sans selection:bg-purple-200 border-b border-gray-100">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-gray-200 shadow-sm mb-6">
                        <User className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                        <span className="text-xs md:text-sm font-semibold text-gray-700">1:1 전담 매니저 지정</span>
                    </div>

                    <div>
                        <h1 className="text-3xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.25] tracking-tight text-gray-900 break-keep mb-[40px] md:mb-[50px] lg:mb-[60px]">
                            대표님은 사업에만<br className="hidden md:block" />
                            집중하세요.
                        </h1>

                        <p className="text-sm md:text-lg text-gray-500 leading-relaxed max-w-lg break-keep">
                            사업의 시작을 전문 컨설턴트가 모두 가이드 해 드립니다.<br />
                            복잡한 업종과 각종 인허가 사항, 복잡한 세금 신고, 법인과 개인사업자 유불리, 사업자 통장과 카드 사용 등
                        </p>
                    </div>
                </div>

                {/* Right Interactive Area */}
                <InteractiveDemo />
            </div>
        </section>
    );
}
