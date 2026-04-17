import { useState } from 'react';
import { motion } from 'motion/react';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import Feature1 from './components/Feature1';
import Feature2 from './components/Feature2';
import Feature3 from './components/Feature3';
import Feature4 from './components/Feature4';
import LocationSection from './components/LocationSection';
import PricingSection from './components/PricingSection';
import ProcessSection from './components/ProcessSection';
import ReviewSection from './components/ReviewSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import ApplicationModal from './components/ApplicationModal';
import PolicyModal from './components/PolicyModal';
import type { PolicyType } from './components/PolicyModal';
import Footer from './components/Footer';
// import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/react';
import { useEffect } from 'react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  useEffect(() => {
    // UTM 파라미터 캡처 및 세션 저장 로직
    const urlParams = new URLSearchParams(window.location.search);
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    utms.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        sessionStorage.setItem(param, value);
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col font-sans relative">
      {/* <Analytics />
      <SpeedInsights /> */}
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />
      <TrustSection />

      <motion.section
        id="hero-service"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-white py-[60px] md:py-[100px] lg:py-[120px] flex flex-col items-center justify-center text-center px-4 border-b border-gray-100"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4 md:mb-5">
          플러스오피스만의<br className="md:hidden" /> 5가지 압도적인 서비스
        </h2>
        <p className="text-base md:text-xl text-gray-500 font-medium tracking-tight break-keep mb-[40px] md:mb-[50px] lg:mb-[60px]">
          대표님만을 위한 전담 매니저부터 사업자등록 대행까지, 플러스오피스에선 당연한 서비스입니다
        </p>
      </motion.section>
      <Feature1 />
      <Feature2 />
      <Feature3 />
      <Feature4 />

      <LocationSection />

      {/* 2. 요금제 (PricingSection) */}
      <PricingSection />

      {/* 3. 진행 절차 (ProcessSection - 다크 테마 배경 전환) */}
      <ProcessSection />

      {/* 4. 고객 리뷰 (ReviewSection - 다크 테마 유지 후 부드럽게 밝아짐) */}
      <ReviewSection />

      {/* 5. 자주 묻는 질문 (FAQSection) */}
      <FAQSection />

      {/* 6. 하단 최종 CTA 섹션 */}
      <CTASection onOpenModal={() => setIsModalOpen(true)} />

      {/* 7. 푸터 */}
      <Footer onOpenPolicy={(type) => setActivePolicy(type)} />

      {/* 8. 신청 모달 (ApplicationModal) */}
      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* 9. 약관 모달 (PolicyModal) */}
      <PolicyModal type={activePolicy} onClose={() => setActivePolicy(null)} />
    </main>
  );
}
