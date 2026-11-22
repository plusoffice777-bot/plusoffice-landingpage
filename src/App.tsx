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
import PaymentTestModal from './components/PaymentTestModal';
import PolicyModal from './components/PolicyModal';
import type { PolicyType } from './components/PolicyModal';
import Footer from './components/Footer';
// import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/react';
import { useEffect } from 'react';
import { track, isProductionHost } from './lib/analytics';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);
  const [isTestPayment, setIsTestPayment] = useState(false);

  const openModal = (ctaLocation: string) => {
    track('open_form', { cta_location: ctaLocation });
    setIsModalOpen(true);
  };

  // 전화·카카오 채널 클릭 측정 (링크가 여러 컴포넌트에 흩어져 있어 한 곳에서 감지)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const where = link.closest('header')
        ? 'header'
        : link.closest('section[id]')?.id || link.closest('section, footer')?.tagName.toLowerCase() || 'page';
      if (href.startsWith('tel:')) track('click_call', { cta_location: where });
      else if (href.includes('pf.kakao.com')) track('click_kakao', { cta_location: where });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    // UTM 파라미터 캡처 및 세션 저장 로직
    const urlParams = new URLSearchParams(window.location.search);

    // 테스트 결제 화면은 운영 주소에서는 열지 않는다 (미리보기·로컬 전용)
    if (!isProductionHost() && urlParams.get('test_payment') === 'true') {
      setIsTestPayment(true);
    }

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
      <HeroSection onOpenModal={() => openModal('hero')} />
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
          플러스오피스만의<br className="md:hidden" /> 4가지 핵심 서비스
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
      <CTASection onOpenModal={() => openModal('cta')} />

      {/* 7. 푸터 */}
      <Footer onOpenPolicy={(type) => setActivePolicy(type)} />

      {/* 8. 신청 모달 (ApplicationModal or PaymentTestModal) */}
      {isTestPayment ? (
        <PaymentTestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onOpenPrivacy={() => setActivePolicy('privacy')} />
      ) : (
        <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onOpenPrivacy={() => setActivePolicy('privacy')} />
      )}

      {/* 9. 약관 모달 (PolicyModal) */}
      <PolicyModal type={activePolicy} onClose={() => setActivePolicy(null)} />
    </main>
  );
}
