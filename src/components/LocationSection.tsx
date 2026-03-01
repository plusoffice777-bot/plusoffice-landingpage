import { useState } from 'react';
import { motion } from 'motion/react';

const branches = [
    { id: 'gangnam', name: '강남점', query: '강남역 2호선' },
    { id: 'seocho', name: '서초점', query: '서초역' },
    { id: 'songpa', name: '송파점', query: '잠실역' },
    { id: 'mapo', name: '마포점', query: '공덕역' },
    { id: 'yeouido', name: '여의도점', query: '여의도역' },
    { id: 'yongin', name: '용인점', query: '용인 처인구' },
    { id: 'dongtan', name: '동탄점', query: '동탄역 SRT' },
];

export default function LocationSection() {
    const [activeBranch, setActiveBranch] = useState(branches[0]);

    return (
        <div id="location" className="min-h-screen bg-white font-sans text-gray-800 selection:bg-blue-100">
            <main className="max-w-6xl mx-auto px-4 py-[60px] md:py-[100px] lg:py-[120px] flex flex-col items-center">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-[40px] md:mb-[50px] lg:mb-[60px] w-full"
                >
                    <h1 className="text-3xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-extrabold tracking-tight text-gray-900 mb-4 md:mb-5 break-keep">
                        플러스오피스 지점 위치 안내
                    </h1>
                    <p className="text-base md:text-xl text-gray-500 font-medium tracking-tight break-keep">
                        프리미엄 주소지로 사업의 신뢰도를 확보하세요
                    </p>
                </motion.header>

                <motion.nav
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    aria-label="지점 선택" className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto mb-12"
                >
                    {branches.map((branch) => {
                        const isActive = activeBranch.id === branch.id;
                        return (
                            <button
                                key={branch.id}
                                onClick={() => setActiveBranch(branch)}
                                aria-pressed={isActive}
                                aria-label={`${branch.name} 선택`}
                                className={`
                  relative px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 ease-in-out cursor-pointer
                  ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-[0_8px_16px_rgba(59,130,246,0.3)] scale-105 ring-2 ring-blue-300 ring-offset-2 border-none'
                                        : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-300 hover:text-blue-500 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2'
                                    }
                `}
                            >
                                {branch.name}
                            </button>
                        );
                    })}
                </motion.nav>

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    aria-label={`${activeBranch.name} 지도 및 위치 정보`} className="w-full max-w-5xl mx-auto bg-gray-50 rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative"
                >
                    <h2 className="sr-only">{activeBranch.name} 위치 지도</h2>
                    <div className="absolute inset-0 pointer-events-none border-4 border-white rounded-2xl z-10"></div>
                    <article className="w-full h-[400px] md:h-[550px]">
                        <iframe
                            title={`구글 지도 - ${activeBranch.name} (${activeBranch.query} 인근)`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(activeBranch.query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                            className="w-full h-full transition-opacity duration-500"
                        />
                    </article>
                </motion.section>
            </main>
        </div>
    );
}
