# 플러스오피스 랜딩페이지 디자인 가이드 (Design Guide)

본 문서는 플러스오피스 랜딩페이지를 동일한 퀄리티로 완벽하게 재구현할 수 있도록 구체적인 시각적 요소와 사용자 경험(UX), 애니메이션 스펙을 상세히 정의합니다.

## 1. 타이포그래피 (Typography)
최적의 가독성과 모던한 브랜드 이미지를 위해 두 가지 폰트를 조합하여 사용합니다.

- **기본 폰트 (Primary Font):** `Pretendard`
  - **CDN:** `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css`
  - 주로 한글 본문 및 제목에 사용됩니다.
- **영문/숫자 보조 폰트 (Secondary Font):** `Inter`
  - **CDN:** `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`
- **적용 방식:** Tailwind v4 `@theme`를 통해 전역 변수 설정.
  ```css
  --font-sans: "Pretendard", "Inter", ui-sans-serif, system-ui, sans-serif;
  ```

## 2. 컬러 팔레트 (Color Palette)
투명도와 그라데이션을 적극 활용하여 프리미엄 느낌을 강조합니다.

- **배경색 (Background):**
  - 메인 배경: `#fafafa` (완전한 화이트가 아닌 미세한 오프화이트로 눈의 피로도 감소)
  - 카드/섹션 배경: `bg-white`, 다크 모드 포인트 배경 `bg-slate-900`
- **텍스트 색상 (Text):**
  - 메인 텍스트: `#111` 또는 `text-gray-900`
  - 서브 텍스트: `text-gray-500`, `text-gray-700`
- **포인트 그라데이션 (Primary Gradient):**
  - 버튼 및 텍스트 강조 시 사용: `bg-gradient-to-r from-blue-500 to-cyan-400`
  - (응용) `from-blue-600 to-cyan-500`, `from-blue-700 via-blue-500 to-sky-400`

## 3. 핵심 애니메이션 스펙 (Core Animations)

### 3.1. 히어로 섹션 3D 파티클 (Three.js)
- **파티클 수:** 4000개
- **컬러 스킴:** `#0088ff`, `#6b21ff`, `#a855f7`, `#38bdf8`, `#111827` 혼합.
- **인터랙션:** 마우스 커서 위치에 따른 Repulsion(밀어내기) 효과. 
  - 반경 100px(`repulsionRadius: 100`) 이내의 파티클이 밀려났다가 원래 위치로 복귀(`returnSpeed: 0.05`).
- **가시성 제어:** 스크롤 시 화면 밖으로 나가면 렌더링을 중단하여 성능 최적화 진행.

### 3.2. 스크롤 텔링 애니메이션 (GSAP ScrollTrigger)
- **대상:** 히어로 섹션 하단의 '문제 제기(해결 과제)' 섹션
- **작동 방식:** 
  - 1200vh 높이의 래퍼(Wrapper) 내에서 콘텐츠를 뷰포트에 고정(`pin: true`).
  - 5개의 텍스트 블록이 스크롤에 맞춰 투명도 0 -> 1 -> 0, Y축 50px -> 0px -> -50px 로 순차적으로 나타나고 사라짐.
  - 마지막 텍스트는 `ease: "back.out(1.2)"`로 강조되며 화면에 남음.

### 3.3. UI 트랜지션 (Framer Motion)
- **등장 애니메이션:** 각 섹션 타이틀 및 카드는 뷰포트 진입 시 위로 떠오름.
  - `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}`
- **탭 전환 (PricingSection 등):** 
  - `AnimatePresence`를 사용하여 탭 전환 시 좌우 슬라이드(`x: 20 -> 0 -> -20`) 부드럽게 처리.
  - 활성화된 탭 배경은 `layoutId`를 이용해 스프링 애니메이션(`type: "spring", bounce: 0.2`)으로 자연스럽게 이동.

## 4. UI 컴포넌트 스타일링 규칙
- **버튼 (Buttons):**
  - **CTA 버튼:** `rounded-full` 혹은 `rounded-2xl`, 그라데이션 배경, 호버 시 약간 위로 이동(`hover:-translate-y-0.5` 또는 `hover:-translate-y-1`)
  - **그림자 스펙:** 다중 그림자 사용 `shadow-[0_4px_10px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_15px_rgba(37,99,235,0.3)]`
- **요금제/서비스 카드 (Cards):**
  - 기본 상태: `border border-gray-100 shadow-sm rounded-2xl` 또는 `3xl`
  - BEST 추천 상품: `ring-2 ring-blue-500 shadow-xl shadow-blue-500/10 scale-105 z-10`을 부여하여 시각적 대비 극대화.
- **아이콘 (Icons):** `lucide-react`를 표준으로 사용하여 깔끔한 라인 형태의 아이콘 배치 (크기는 주로 `w-5 h-5`).
