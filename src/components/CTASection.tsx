import { useEffect, useRef } from 'react';

interface CTASectionProps {
    onOpenModal?: () => void;
}

export default function CTASection({ onOpenModal }: CTASectionProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 영상과 유사한 퍼져나가는 파티클 애니메이션 효과 (반응형 및 성능 최적화)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            // 반응형 처리를 위해 부모 요소의 크기를 기준으로 설정
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight || 600;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        // ResizeObserver를 사용하여 보다 부드러운 반응형 리사이징 적용
        const resizeObserver = new ResizeObserver(() => resize());
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            angle!: number;
            radius!: number;
            distance!: number;
            speed!: number;
            color!: string;
            x!: number;
            y!: number;

            constructor() {
                this.reset();
            }
            reset() {
                this.angle = Math.random() * Math.PI * 2;
                this.radius = Math.random() * 1.5 + 0.5; // 입자 크기
                this.distance = Math.random() * 150; // 시작 거리
                this.speed = Math.random() * 1 + 0.2; // 이동 속도
                // 영상처럼 약간 푸른빛이 도는 화이트 색상
                const r = 200 + Math.random() * 55;
                const g = 220 + Math.random() * 35;
                const b = 255;
                const a = Math.random() * 0.8 + 0.2;
                this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
            }
            update(width: number, height: number) {
                this.distance += this.speed;
                this.speed *= 1.015; // 밖으로 나갈수록 살짝 가속
                this.angle += 0.002; // 약간의 나선형 회전 추가

                this.x = width / 2 + Math.cos(this.angle) * this.distance;
                this.y = height / 2 + Math.sin(this.angle) * this.distance;

                // 화면 밖으로 나가면 다시 중앙 부근에서 생성
                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.reset();
                    this.distance = Math.random() * 20;
                }
            }
            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const numParticles = 300; // 파티클 개수
        const particles: Particle[] = Array.from({ length: numParticles }, () => new Particle());

        const render = () => {
            // 잔상 효과를 위해 투명도가 있는 검은색으로 덮음
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update(canvas.width, canvas.height);
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section
            className="relative w-full bg-black py-16 md:py-24 lg:py-32 flex items-center justify-center px-6 overflow-hidden min-h-[500px] md:min-h-[600px]"
            aria-labelledby="cta-heading"
        >
            {/* 배경 파티클 캔버스 */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* 중앙 포인트 그라데이션 빛 효과 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[300px] bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />

            {/* 콘텐츠 영역 */}
            <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
                {/* 메인 카피 (SEO 최적화를 위해 heading 태그 사용 및 ID 부여) */}
                <h2 id="cta-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold text-white leading-tight tracking-tight break-keep mb-6">
                    2026년 최고의 선택이<br className="md:hidden" /> 되어드리겠습니다
                </h2>

                {/* 서브 카피 */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium tracking-tight break-keep max-w-2xl mx-auto mb-8 md:mb-10">
                    빠르게 나만의 사업장을 확보하고 성장에만 집중하세요.
                    <span className="block mt-2 sm:mt-3 text-gray-400 text-sm sm:text-base font-normal">
                        (무상 상담 신청 1분 소요)
                    </span>
                </p>

                {/* 버튼 그룹 (접근성 향상 및 여백 조정) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full">
                    <button
                        onClick={onOpenModal}
                        className="px-6 sm:px-8 py-4 bg-white text-black text-base md:text-lg font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 w-full sm:w-auto min-w-[240px]"
                        aria-label="빠른 계약 신청하기 모달 열기"
                    >
                        빠른계약신청하기
                    </button>
                    <a
                        href="http://pf.kakao.com/_xnWMwG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 sm:px-8 py-4 bg-transparent text-white text-base md:text-lg font-semibold rounded-full shadow-lg border border-gray-600 hover:bg-white/10 hover:border-gray-400 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-gray-500/50 transition-all duration-300 w-full sm:w-auto min-w-[240px] no-underline"
                        aria-label="카카오톡 1:1 전담 매니저 상담하기"
                    >
                        1:1 전담 매니저 상담하기
                    </a>
                </div>
            </div>
        </section>
    );
}
