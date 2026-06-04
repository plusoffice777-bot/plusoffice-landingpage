# 플러스오피스 랜딩페이지 개발 가이드 (Development Guide)

본 문서는 프로젝트를 100% 동일한 구조와 스펙으로 재구축하기 위한 심화 개발 가이드입니다. 

## 1. 기술 스택 스펙 (Tech Stack Spec)
- **Framework:** React 19 (`^19.2.0`)
- **Language:** TypeScript (`~5.9.3`)
- **Bundler:** Vite 7 (`^7.3.1`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`, `tailwindcss: ^4.2.0`)
- **Animation:** 
  - GSAP (`^3.14.2`) - 스크롤 기반 타임라인 애니메이션
  - Motion (`^12.34.3`, 구 Framer Motion) - 컴포넌트 마이크로 인터랙션
  - Three.js (`^0.183.1`) - 히어로 섹션 3D 파티클
- **Icons:** `lucide-react` (`^0.575.0`)
- **Others:** `express` (서버리스 렌더링 또는 API용), `better-sqlite3`

## 2. 프로젝트 핵심 아키텍처 및 설정

### 2.1. 빌드 및 설정 (Vite + Tailwind v4)
Tailwind CSS v4가 적용되어 있으므로 `vite.config.ts`에서 플러그인을 명시해야 합니다.
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```
글로벌 CSS(`src/index.css`)에는 `@import "tailwindcss";`가 선언되어야 하며, 테마 확장은 `@theme` 디렉티브를 사용합니다.

### 2.2. 최상위 상태 관리 및 라우팅 (`App.tsx`)
- 단일 페이지 앱(SPA) 구조를 띄며, React State를 활용해 모달 상태를 관리합니다.
- **UTM 트래킹 및 결제 모드:** 컴포넌트 마운트 시(`useEffect`) URL의 Search Params를 파싱합니다.
  - `test_payment=true` 파라미터가 있을 경우 `PaymentTestModal`을, 없을 경우 일반 `ApplicationModal`을 렌더링합니다.
  - UTM 파라미터(`utm_source`, `utm_medium` 등)는 `sessionStorage`에 저장되어 이후 신청 폼 제출 시 추적 용도로 사용됩니다.

## 3. 주요 컴포넌트 구현 명세

### 3.1. HeroSection.tsx
- **Three.js 파티클:** `useEffect` 내부에서 Vanilla Three.js 코드로 작성되었습니다 (React Three Fiber 비사용).
- **메모리 누수 방지:** `useEffect`의 cleanup 함수(return)에서 `requestAnimationFrame`을 취소(`cancelAnimationFrame`), 이벤트 리스너 제거, `renderer.dispose()`를 반드시 호출해야 합니다.
- **ScrollTrigger 패치:** `gsap.registerPlugin(ScrollTrigger);`가 선언되어 있으며, 컴포넌트 언마운트 시 `ScrollTrigger.getAll().forEach(t => t.kill());`로 초기화합니다.

### 3.2. PricingSection.tsx
- **데이터 구조화:** 하드코딩을 피하기 위해 `TABS` 배열과 `PACKAGE_DATA` 객체를 정의하여 관리합니다. 탭(Tab) 변경 시 React 상태(`activeTab`)가 업데이트되고, 렌더링할 데이터 셋이 변경됩니다.
- **AnimatePresence:** 탭 간 전환 시 `motion.div`의 `initial`, `animate`, `exit` 속성을 결합하여 부드러운 페이드 및 슬라이드 트랜지션을 구현합니다.

## 4. 모달 및 폼 핸들링
- **ApplicationModal.tsx / PaymentTestModal.tsx:** 
  - 모달의 `isOpen` Props에 따라 조건부 렌더링 됩니다.
  - 배경은 `bg-black/50 backdrop-blur-sm`으로 처리되며, 모달 콘텐츠는 `motion.div`를 사용해 화면 하단에서 슬라이드 업(`y: "100%" -> 0`)하는 구조입니다.
- **PolicyModal.tsx:** 
  - 서비스 이용약관, 개인정보 처리방침 등의 타입(`PolicyType`)을 인자로 받아 각 내용에 맞는 텍스트를 렌더링하는 범용 모달입니다.

## 5. 실행 및 배포
```bash
# 의존성 설치
npm install

# 로컬 개발 환경 실행 (기본 포트: 5173)
npm run dev

# 빌드 및 프리뷰 (TypeScript 체크 우선 실행)
npm run build && npm run preview
```
- 프로젝트는 Vercel 환경에 최적화되어 있으며 `@vercel/analytics`, `@vercel/speed-insights` 패키지가 의존성으로 설치되어 있습니다. 배포 시 Vercel 설정 파일(`vercel.json`)을 기반으로 동작합니다.
