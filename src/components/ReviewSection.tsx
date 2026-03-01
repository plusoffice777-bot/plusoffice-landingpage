import './ReviewSection.css';
import { motion } from 'motion/react';

export default function ReviewSection() {
    return (
        <div id="review" className="review-section-wrapper antialiased overflow-x-hidden relative">
            <section aria-labelledby="review-section-title" className="py-[60px] md:py-[100px] lg:py-[120px] relative overflow-hidden flex flex-col items-center w-full">

                {/* 약한 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f131a] via-transparent to-[#0f131a] pointer-events-none z-0"></div>

                {/* 헤더 영역 */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-[40px] md:mb-[50px] lg:mb-[60px] z-10 px-4"
                >
                    <h1 id="review-section-title" className="text-3xl md:text-5xl lg:text-[clamp(1.875rem,5vw,3rem)] font-bold mb-6 tracking-tight leading-tight break-keep">실제 고객님들의<br className="md:hidden" /> 생생한 후기</h1>

                    <div className="inline-flex items-center gap-2 md:gap-3 bg-white/5 border border-white/10 rounded-full px-4 md:px-6 py-2 md:py-2.5 backdrop-blur-sm shadow-xl">
                        <span className="font-medium text-sm md:text-lg">고객 이용후기</span>
                        <div className="flex text-[#FFD700] text-xs md:text-sm" aria-label="별점 5점 만점에 4.86점">
                            <i className="fa-solid fa-star" aria-hidden="true"></i>
                            <i className="fa-solid fa-star" aria-hidden="true"></i>
                            <i className="fa-solid fa-star" aria-hidden="true"></i>
                            <i className="fa-solid fa-star" aria-hidden="true"></i>
                            <i className="fa-solid fa-star-half-stroke" aria-hidden="true"></i>
                        </div>
                        <span className="text-[#FFD700] font-bold text-base md:text-lg">4.86</span>
                        <span className="text-gray-400 text-sm md:text-base">/ 5.0</span>
                    </div>
                </motion.header>

                {/* 슬라이더 컨테이너 (마스크 적용) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-[1920px] mx-auto slider-mask flex flex-col gap-6 md:gap-8 relative z-10 py-4"
                >

                    {/* [첫 번째 줄] 왼쪽으로 스크롤 */}
                    <div className="flex w-max animate-scroll-left gap-6 px-3">

                        {/* 1 */}
                        <article className="review-card w-[280px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl p-6 md:p-7 flex flex-col cursor-pointer">
                            <header className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-base md:text-lg text-white">플라워OO</h3>
                                <div className="text-[#FFD700] text-xs md:text-sm tracking-widest" aria-label="별점 5점">★★★★★</div>
                            </header>
                            <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-400 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot w-4 text-center" aria-hidden="true"></i>
                                    <span>지점 : 강남점</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-calendar-check w-4 text-center" aria-hidden="true"></i>
                                    <span>이용기간 : 24개월</span>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-[14px] md:text-[15px] whitespace-pre-line flex-grow">"쇼핑몰 시작하면서 집 주소 노출되는 게 꺼림칙했는데, 강남 주소지를 한 달 1만 5천 원에 쓸 수 있다니 진짜 혜자네요. 우편물도 올 때마다 카톡으로 바로바로 알려줘서 집에서 일하기 너무 편합니다!"</p>
                        </article>

                        {/* 2 */}
                        <article className="review-card w-[280px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl p-6 md:p-7 flex flex-col cursor-pointer">
                            <header className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-base md:text-lg text-white">(주)피어나OO</h3>
                                <div className="text-[#FFD700] text-xs md:text-sm tracking-widest" aria-label="별점 5점">★★★★★</div>
                            </header>
                            <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-400 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot w-4 text-center" aria-hidden="true"></i>
                                    <span>지점 : 용인점</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-calendar-check w-4 text-center" aria-hidden="true"></i>
                                    <span>이용기간 : 36개월</span>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-[14px] md:text-[15px] whitespace-pre-line flex-grow">"과밀억제권역 피하려고 비과밀 용인점 계약했습니다. 덕분에 법인 설립할 때 등록면허세 3배 중과세 피하고 수백만 원 아꼈네요. 세무 패키지 묶어서 법인 설립도 무료로 했습니다. 강력 추천!"</p>
                        </article>

                        {/* 3 */}
                        <article className="review-card w-[280px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl p-6 md:p-7 flex flex-col cursor-pointer">
                            <header className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-base md:text-lg text-white">(주)브라운커OO</h3>
                                <div className="text-[#FFD700] text-xs md:text-sm tracking-widest" aria-label="별점 5점">★★★★★</div>
                            </header>
                            <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-400 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot w-4 text-center" aria-hidden="true"></i>
                                    <span>지점 : 서초점</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-calendar-check w-4 text-center" aria-hidden="true"></i>
                                    <span>이용기간 : 12개월</span>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-[14px] md:text-[15px] whitespace-pre-line flex-grow">"갑자기 신용보증기금에서 현장 실사 나온다고 해서 멘붕이었는데, 매니저님이 명판 세팅부터 실사 응대까지 완벽하게 준비해주셔서 대출 승인 무사히 받았습니다 ㅠㅠ 진짜 여긴 찐입니다."</p>
                        </article>

                        {/* 4 */}
                        <article className="review-card w-[280px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl p-6 md:p-7 flex flex-col cursor-pointer">
                            <header className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-base md:text-lg text-white">루나OO</h3>
                                <div className="text-[#FFD700] text-xs md:text-sm tracking-widest" aria-label="별점 5점">★★★★★</div>
                            </header>
                            <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-400 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot w-4 text-center" aria-hidden="true"></i>
                                    <span>지점 : 동탄점</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-calendar-check w-4 text-center" aria-hidden="true"></i>
                                    <span>이용기간 : 24개월</span>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-[14px] md:text-[15px] whitespace-pre-line flex-grow">"다른 데서 전대차 계약했다가 업체 도망가서 직권폐업 당할 뻔한 트라우마가 있습니다. 여긴 전 지점 직영이라 건물주랑 직접 계약하는 형태라 너무 안심됩니다."</p>
                        </article>

                        {/* 5 */}
                        <article className="review-card w-[280px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl p-6 md:p-7 flex flex-col cursor-pointer">
                            <header className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-base md:text-lg text-white">씨앤피OO</h3>
                                <div className="text-[#FFD700] text-xs md:text-sm tracking-widest" aria-label="별점 5점">★★★★★</div>
                            </header>
                            <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-400 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot w-4 text-center" aria-hidden="true"></i>
                                    <span>지점 : 마포점</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-calendar-check w-4 text-center" aria-hidden="true"></i>
                                    <span>이용기간 : 12개월</span>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-[14px] md:text-[15px] whitespace-pre-line flex-grow">"해외 구매대행 투잡러입니다. 퇴근하고 밤 11시에 스마트폰으로 결제하고 5분 만에 전자계약서 받아서 바로 홈택스로 사업자 신청했어요. 속도 미쳤습니다."</p>
                        </article>

                        {/* 복제 1 */}
                        <article aria-hidden="true" className="review-card w-[280px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl p-6 md:p-7 flex flex-col cursor-pointer">
                            <header className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-base md:text-lg text-white">플라워OO</h3>
                                <div className="text-[#FFD700] text-xs md:text-sm tracking-widest">★★★★★</div>
                            </header>
                            <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-400 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot w-4 text-center"></i>
                                    <span>지점 : 강남점</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-calendar-check w-4 text-center"></i>
                                    <span>이용기간 : 24개월</span>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-[14px] md:text-[15px] whitespace-pre-line flex-grow">"쇼핑몰 시작하면서 집 주소 노출되는 게 꺼림칙했는데, 강남 주소지를 한 달 1만 5천 원에 쓸 수 있다니 진짜 혜자네요. 우편물도 올 때마다 카톡으로 바로바로 알려줘서 집에서 일하기 너무 편합니다!"</p>
                        </article>
                    </div>

                    {/* [두 번째 줄] 오른쪽으로 스크롤 */}
                    <div className="flex w-max animate-scroll-right gap-6 px-3">

                        {/* 6 */}
                        <article className="review-card w-[280px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl p-6 md:p-7 flex flex-col cursor-pointer">
                            <header className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-base md:text-lg text-white">(주)바이오랜OO</h3>
                                <div className="text-[#FFD700] text-xs md:text-sm tracking-widest" aria-label="별점 5점">★★★★★</div>
                            </header>
                            <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-400 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot w-4 text-center" aria-hidden="true"></i>
                                    <span>지점 : 여의도점</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-calendar-check w-4 text-center" aria-hidden="true"></i>
                                    <span>이용기간 : 36개월</span>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-[14px] md:text-[15px] whitespace-pre-line flex-grow">"여의도 주소지가 필요해서 계약했는데 부가 서비스가 엄청나네요. 지방에 거주 중인데 여의도에서 미팅 있을 때 무료로 회의실 예약해서 쓸 수 있어서 클라이언트한테 신뢰도 팍팍 줍니다."</p>
                        </article>

                        {/* 7 */}
                        <article className="review-card w-[280px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl p-6 md:p-7 flex flex-col cursor-pointer">
                            <header className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-base md:text-lg text-white">프O</h3>
                                <div className="text-[#FFD700] text-xs md:text-sm tracking-widest" aria-label="별점 5점">★★★★★</div>
                            </header>
                            <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-400 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot w-4 text-center" aria-hidden="true"></i>
                                    <span>지점 : 송파점</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-calendar-check w-4 text-center" aria-hidden="true"></i>
                                    <span>이용기간 : 24개월</span>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-[14px] md:text-[15px] whitespace-pre-line flex-grow">"사업자 카드가 계속 안 나와서 고생했는데, 제휴된 곳 통해서 신청하니까 한 번에 통과됐습니다. 그냥 주소만 빌려주는 게 아니라 진짜 사업 파트너 같아요."</p>
                        </article>

                        {/* 8 */}
                        <article className="review-card w-[280px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl p-6 md:p-7 flex flex-col cursor-pointer">
                            <header className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-base md:text-lg text-white">(주)플라이엔OO</h3>
                                <div className="text-[#FFD700] text-xs md:text-sm tracking-widest" aria-label="별점 5점">★★★★★</div>
                            </header>
                            <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-400 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot w-4 text-center" aria-hidden="true"></i>
                                    <span>지점 : 용인점</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-calendar-check w-4 text-center" aria-hidden="true"></i>
                                    <span>이용기간 : 24개월</span>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-[14px] md:text-[15px] whitespace-pre-line flex-grow">"IT 스타트업 창업했습니다. 정부지원금 때문에 비과밀 주소지가 필수였는데 위치 컨설팅부터 사업자등록 반려 시 100% 환불 보장까지 해줘서 마음 편하게 계약했어요."</p>
                        </article>

                        {/* 9 */}
                        <article className="review-card w-[280px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl p-6 md:p-7 flex flex-col cursor-pointer">
                            <header className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-base md:text-lg text-white">리치플러스OO</h3>
                                <div className="text-[#FFD700] text-xs md:text-sm tracking-widest" aria-label="별점 5점">★★★★★</div>
                            </header>
                            <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-400 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot w-4 text-center" aria-hidden="true"></i>
                                    <span>지점 : 강남점</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-calendar-check w-4 text-center" aria-hidden="true"></i>
                                    <span>이용기간 : 6개월</span>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-[14px] md:text-[15px] whitespace-pre-line flex-grow">"보증금 0원이라는 게 초기 자본 없는 프리랜서한테는 최고 장점입니다. 숨겨진 추가 요금 일절 없고 깔끔합니다."</p>
                        </article>

                        {/* 복제 6 */}
                        <article aria-hidden="true" className="review-card w-[280px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl p-6 md:p-7 flex flex-col cursor-pointer">
                            <header className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-base md:text-lg text-white">(주)바이오랜OO</h3>
                                <div className="text-[#FFD700] text-xs md:text-sm tracking-widest">★★★★★</div>
                            </header>
                            <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-400 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot w-4 text-center"></i>
                                    <span>지점 : 여의도점</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-calendar-check w-4 text-center"></i>
                                    <span>이용기간 : 36개월</span>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-[14px] md:text-[15px] whitespace-pre-line flex-grow">"여의도 주소지가 필요해서 계약했는데 부가 서비스가 엄청나네요. 지방에 거주 중인데 여의도에서 미팅 있을 때 무료로 회의실 예약해서 쓸 수 있어서 클라이언트한테 신뢰도 팍팍 줍니다."</p>
                        </article>
                    </div>
                </motion.div>

                {/* 하단 화이트 그라데이션 (다음 FAQ 섹션과의 자연스러운 연결) */}
                <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
            </section>
        </div>
    );
}
