import { useEffect } from 'react';
import * as THREE from 'three';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HeroSectionProps {
    onOpenModal?: () => void;
}

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
    useEffect(() => {
        // Three.js 파티클 로직
        const container = document.getElementById('canvas-container');
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        scene.fog = new THREE.FogExp2(0xffffff, 0.001);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 300;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Clear children
        while (container?.firstChild) {
            container.removeChild(container.firstChild);
        }
        container?.appendChild(renderer.domElement);

        const particleCount = 4000;
        const positions = new Float32Array(particleCount * 3);
        const originalPositions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const colorPalette = [
            new THREE.Color('#0088ff'),
            new THREE.Color('#6b21ff'),
            new THREE.Color('#a855f7'),
            new THREE.Color('#38bdf8'),
            new THREE.Color('#111827')
        ];

        const geometry = new THREE.BufferGeometry();

        for (let i = 0; i < particleCount; i++) {
            // 중앙 텍스트 가독성을 위해 최소 반지름을 부여하고 전체 범위를 넓게 퍼트림
            const radius = 250 + Math.random() * 1000;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            // 좌우로 더 흩어지도록 X축에 가중치 부여
            const x = radius * Math.sin(phi) * Math.cos(theta) * 1.5;
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = (radius * Math.cos(phi)) * 0.3;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = Math.random() * 3 + 1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0 } },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    float alpha = smoothstep(0.5, 0.1, dist);
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.NormalBlending
        });

        const particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);

        const mouse = new THREE.Vector2(-9999, -9999);
        const targetMouse = new THREE.Vector2(-9999, -9999);
        const raycaster = new THREE.Raycaster();
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const pointOfIntersection = new THREE.Vector3();

        const handleMouseMove = (event: MouseEvent) => {
            const heroRect = document.getElementById('hero-section')?.getBoundingClientRect();
            if (heroRect && event.clientY >= heroRect.top && event.clientY <= heroRect.bottom) {
                targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                targetMouse.y = -((event.clientY - heroRect.top) / window.innerHeight) * 2 + 1;
            }
        };
        document.addEventListener('mousemove', handleMouseMove, { passive: true });

        const clock = new THREE.Clock();
        const repulsionRadius = 100;
        const repulsionForce = 4.0;
        const returnSpeed = 0.05;

        let animationFrameId: number;

        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();
            material.uniforms.time.value = elapsedTime;

            particleSystem.rotation.y = elapsedTime * 0.05;
            particleSystem.rotation.z = elapsedTime * 0.02;

            mouse.x += (targetMouse.x - mouse.x) * 0.1;
            mouse.y += (targetMouse.y - mouse.y) * 0.1;

            raycaster.setFromCamera(mouse, camera);
            raycaster.ray.intersectPlane(plane, pointOfIntersection);

            const positionsArray = geometry.attributes.position.array;

            if (pointOfIntersection) {
                const localMousePosition = pointOfIntersection.clone();
                particleSystem.worldToLocal(localMousePosition);

                for (let i = 0; i < particleCount; i++) {
                    const ix = i * 3;
                    const iy = i * 3 + 1;
                    const iz = i * 3 + 2;

                    let px = positionsArray[ix];
                    let py = positionsArray[iy];
                    let pz = positionsArray[iz];

                    const ox = originalPositions[ix];
                    const oy = originalPositions[iy];
                    const oz = originalPositions[iz];

                    const dx = px - localMousePosition.x;
                    const dy = py - localMousePosition.y;
                    const dz = pz - localMousePosition.z;
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (distance < repulsionRadius) {
                        const force = (repulsionRadius - distance) / repulsionRadius;
                        px += (dx / distance) * force * repulsionForce;
                        py += (dy / distance) * force * repulsionForce;
                        pz += (dz / distance) * force * repulsionForce;
                    }

                    px += (ox - px) * returnSpeed;
                    py += (oy - py) * returnSpeed;
                    pz += (oz - pz) * returnSpeed;

                    px += Math.sin(elapsedTime * 2.0 + i) * 0.1;
                    py += Math.cos(elapsedTime * 1.5 + i) * 0.1;

                    positionsArray[ix] = px;
                    positionsArray[iy] = py;
                    positionsArray[iz] = pz;
                }

                geometry.attributes.position.needsUpdate = true;
            }

            const rect = document.getElementById('hero-section')?.getBoundingClientRect();
            if (rect && rect.bottom > 0) {
                renderer.render(scene, camera);
            }
        }

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize, { passive: true });

        // GSAP
        const section = document.getElementById('gsap-section'); // 트리거 섹션
        const content = document.getElementById('gsap-content'); // 고정될 콘텐츠
        const texts = document.querySelectorAll('.gsap-text');

        if (section && content) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.2,
                    pin: content,
                    pinSpacing: true,
                }
            });

            texts.forEach((text, index) => {
                if (index < texts.length - 1) {
                    tl.fromTo(text,
                        { opacity: 0, y: 50 },
                        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
                    )
                        .to(text, {
                            opacity: 0,
                            y: -50,
                            duration: 1,
                            ease: "power2.in"
                        }, "+=0.8");
                } else {
                    tl.fromTo(text,
                        { opacity: 0, y: 50 },
                        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "back.out(1.2)" }
                    );
                }
            });
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(t => t.kill());
            renderer.dispose();
            container?.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div className="bg-white overflow-x-hidden">
            {/* 1. 히어로 섹션 */}
            <section id="hero-section" className="relative w-full h-screen overflow-hidden bg-white">
                <div id="canvas-container" aria-hidden="true" className="absolute top-0 left-0 w-full h-full z-1 pointer-events-none"></div>

                <header className="fixed top-0 left-0 w-full px-6 py-4 md:px-12 md:py-5 flex items-center justify-between z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
                    {/* Left: Logo */}
                    <div className="flex-1 flex justify-start">
                        <a href="#" className="flex items-center gap-2 text-xl font-extrabold text-[#111] tracking-tighter cursor-pointer no-underline" aria-label="Plus Office 홈으로 가기">
                            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 40 40" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="url(#header_grad)" />
                                <path d="M20 10V30M10 20H30" stroke="white" strokeWidth="4" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="header_grad" x1="0" y1="0" x2="40" y2="40"
                                        gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#00C6FF" />
                                        <stop offset="1" stopColor="#8B5CF6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span>Plus Office</span>
                        </a>
                    </div>

                    {/* Center: Nav */}
                    <nav className="hidden lg:flex flex-none gap-8" aria-label="메인 네비게이션" role="navigation">
                        <a href="#hero-service" className="no-underline text-gray-800 text-[15px] font-semibold transition-colors hover:text-blue-500">서비스</a>
                        <a href="#pricing" className="no-underline text-gray-800 text-[15px] font-semibold transition-colors hover:text-blue-500">이용요금</a>
                        <a href="#review" className="no-underline text-gray-800 text-[15px] font-semibold transition-colors hover:text-blue-500">후기</a>
                        <a href="#location" className="no-underline text-gray-800 text-[15px] font-semibold transition-colors hover:text-blue-500">위치안내</a>
                        <a href="#faq" className="no-underline text-gray-800 text-[15px] font-semibold transition-colors hover:text-blue-500">자주 묻는 질문</a>
                    </nav>

                    {/* Right: Buttons & Phone */}
                    <div className="flex-1 flex justify-end gap-3 items-center">
                        <a href="tel:1551-5586" className="text-gray-900 font-bold text-[14px] sm:text-[15px] hover:text-blue-500 transition-colors mr-1 sm:mr-3" aria-label="대표전화로 전화걸기">
                            1551-5586
                        </a>
                        <a href="http://pf.kakao.com/_xnWMwG" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center justify-center font-inherit text-sm font-semibold px-4 py-2 min-h-[40px] rounded-full cursor-pointer transition-all border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm no-underline" aria-label="카카오톡 1:1 문의하기">1:1 문의</a>
                        <button onClick={onOpenModal} className="font-inherit text-sm font-semibold px-5 py-2 min-h-[40px] rounded-full cursor-pointer transition-all border-none bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md hover:opacity-90 hover:-translate-y-0.5" aria-label="신청하기">신청하기</button>
                    </div>
                </header>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full max-w-[800px] pointer-events-none">

                    <h1 className="text-3xl md:text-5xl lg:text-[clamp(2rem,5vw,4.5rem)] font-extrabold text-[#111] leading-tight tracking-tight pointer-events-auto shadow-[0_4px_30px_rgba(255,255,255,0.9)] mb-6">
                        초기 창업 비용,<br className="md:hidden" /> 이제 성장에 투자하세요.
                    </h1>
                    <p className="text-base md:text-xl lg:text-2xl text-gray-700 font-medium tracking-tight break-keep pointer-events-auto max-w-2xl mx-auto shadow-[0_4px_30px_rgba(255,255,255,0.9)]">
                        강남 및 주요 역세권 주소지를 <strong className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">월 1만원대</strong>로 이용하고 비즈니스 신뢰도를 높이세요.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 md:mt-10 pointer-events-auto">
                        <button
                            onClick={onOpenModal}
                            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gray-900 text-white text-base font-semibold rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-[180px]"
                            aria-label="빠른 신청하기 폼 열기">
                            빠른 신청하기
                        </button>
                        <a
                            href="http://pf.kakao.com/_xnWMwG"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-gray-900 text-base font-semibold rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-[180px] no-underline"
                            aria-label="카카오톡 1:1 문의하기">
                            1:1 문의
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. 해결 과제 (문제제기) / GSAP 스크롤 애니메이션 섹션 */}
            <section id="gsap-section" className="relative h-[1200vh] bg-white w-full z-10" aria-label="고객 문제 해결 제안">
                <div id="gsap-content" className="w-full h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none mix-blend-multiply"
                        aria-hidden="true"></div>

                    <div className="relative z-20 w-full flex items-center justify-center">

                        <div className="gsap-text absolute px-6 text-center opacity-0 w-full max-w-5xl mx-auto will-change-transform">
                            <h3 className="text-2xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold text-slate-900 leading-[1.4] md:leading-[1.5] break-keep">
                                사업의 시작이<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">막막하셨나요?</span>
                            </h3>
                        </div>

                        <div className="gsap-text absolute px-6 text-center opacity-0 w-full max-w-5xl mx-auto will-change-transform">
                            <h3 className="text-2xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold text-slate-900 leading-[1.4] md:leading-[1.5] break-keep">
                                절세를 위한<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">컨설팅이 필요하신가요?</span>
                            </h3>
                        </div>

                        <div className="gsap-text absolute px-6 text-center opacity-0 w-full max-w-5xl mx-auto will-change-transform">
                            <h3 className="text-2xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold text-slate-900 leading-[1.4] md:leading-[1.5] break-keep">
                                믿을 수 있는<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">비상주사무실을 찾고계신가요?</span>
                            </h3>
                        </div>

                        <div className="gsap-text absolute px-6 text-center opacity-0 w-full max-w-5xl mx-auto will-change-transform">
                            <h3 className="text-2xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold text-slate-900 leading-[1.4] md:leading-[1.5] break-keep">
                                사업에 필요한 모든 것을<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">한곳에서 해결하고 싶으신가요?</span>
                            </h3>
                        </div>

                        <div className="gsap-text absolute px-6 text-center opacity-0 w-full max-w-5xl mx-auto will-change-transform">
                            <h2 className="text-3xl md:text-6xl lg:text-[clamp(2.5rem,5vw,5rem)] font-extrabold text-slate-900 leading-[1.3] md:leading-[1.4] drop-shadow-2xl break-keep">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400 inline-block pb-2">
                                    플러스오피스
                                </span>에서<br />
                                모두 해결해드립니다
                            </h2>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
