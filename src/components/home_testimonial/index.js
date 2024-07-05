import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
// import { Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>

<section id="team" className="section mod--team">
<div className="sticky mod--team">
    <div className="content mod--team">
        <div data-swiper="team" className="swiper mod--team mod--even">
            <Swiper navigation={true}    className="swiper-wrapper mySwiper">
                <SwiperSlide className="swiper-slide mod--team">
                    <div className="team__slide">
                        <div data-remodal-target="form" className="overflow-hidden mod--team">
                            <img src="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d50aeae24f90093de5_team-01.webp" loading="eager" srcset="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d50aeae24f90093de5_team-01-p-500.webp 500w, https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d50aeae24f90093de5_team-01.webp 708w" sizes="263.359375px" alt="" className="img mod--team"/>
                        </div>
                        <div>
                            <div className="text-style-allcaps text-weight-bold margin-bottom-10 text-letterspacing-0_03">Guy Hawkins</div>
                            <div className="text-size-12 text-opacity-50 text-letterspacing-0_03 text-style-allcaps">CEO &amp;Founder of Databest</div>
                        </div>
                    </div>
                    </SwiperSlide>
                <SwiperSlide className="swiper-slide mod--team">
                    <div className="team__slide">
                        <div data-remodal-target="form" className="overflow-hidden mod--team">
                            <img src="https://assets.website-files.com/637614467ad6ef67f0af2c24/63809129490c21402e963816_team-02.webp" loading="eager" srcset="https://assets.website-files.com/637614467ad6ef67f0af2c24/63809129490c21402e963816_team-02-p-500.webp 500w, https://assets.website-files.com/637614467ad6ef67f0af2c24/63809129490c21402e963816_team-02.webp 709w" sizes="263.734375px" alt="" className="img mod--team"/>
                        </div>
                        <div>
                            <div className="text-style-allcaps text-weight-bold margin-bottom-10 text-letterspacing-0_03">Albert Flores</div>
                            <div className="text-size-12 text-opacity-50 text-letterspacing-0_03 text-style-allcaps">Creator &amp;Developer</div>
                        </div>
                    </div>
</SwiperSlide>
                <SwiperSlide className="swiper-slide mod--team">
                    <div className="team__slide">
                        <div data-remodal-target="form" className="overflow-hidden mod--team">
                            <img src="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d5c7a7e95fbad01a06_team-03.webp" loading="eager" srcset="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d5c7a7e95fbad01a06_team-03-p-500.webp 500w, https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d5c7a7e95fbad01a06_team-03.webp 708w" sizes="263.359375px" alt="" className="img mod--team"/>
                        </div>
                        <div>
                            <div className="text-style-allcaps text-weight-bold margin-bottom-10 text-letterspacing-0_03">Jane Cooper</div>
                            <div className="text-size-12 text-opacity-50 text-letterspacing-0_03 text-style-allcaps">CO-Founder &amp;Head of Marketing</div>
                        </div>
                    </div>
                    </SwiperSlide>
                <SwiperSlide className="swiper-slide mod--team">
                    <div data-remodal-target="form" className="team__slide">
                        <div data-remodal-target="form" className="overflow-hidden mod--team">
                            <img src="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d524da196f967f1586_team-04.webp" loading="eager" srcset="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d524da196f967f1586_team-04-p-500.webp 500w, https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d524da196f967f1586_team-04.webp 708w" sizes="263.359375px" alt="" className="img mod--team"/>
                        </div>
                        <div>
                            <div className="text-style-allcaps text-weight-bold margin-bottom-10 text-letterspacing-0_03">Esther Howard</div>
                            <div className="text-size-12 text-opacity-50 text-letterspacing-0_03 text-style-allcaps">Head of Digital Advertisement</div>
                        </div>
                    </div>
              </SwiperSlide>
                <SwiperSlide className="swiper-slide mod--team">
                    <div className="team__slide">
                        <div data-remodal-target="form" className="overflow-hidden mod--team">
                            <img src="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d5086ed5e05ed2688b_team-05.webp" loading="eager" srcset="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d5086ed5e05ed2688b_team-05-p-500.webp 500w, https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d5086ed5e05ed2688b_team-05.webp 708w" sizes="263.359375px" alt="" className="img mod--team"/>
                        </div>
                        <div>
                            <div className="text-style-allcaps text-weight-bold margin-bottom-10 text-letterspacing-0_03">Alan Wilson</div>
                            <div className="text-size-12 text-opacity-50 text-letterspacing-0_03 text-style-allcaps">Director of Databest</div>
                        </div>
                    </div>
                    </SwiperSlide>
                <SwiperSlide className="swiper-slide mod--team">
                    <div className="team__slide">
                        <div data-remodal-target="form" className="overflow-hidden mod--team">
                            <img src="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d5ca9a1614d492ae56_team-06.webp" loading="eager" srcset="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d5ca9a1614d492ae56_team-06-p-500.webp 500w, https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d5ca9a1614d492ae56_team-06.webp 708w" sizes="263.359375px" alt="" className="img mod--team"/>
                        </div>
                        <div>
                            <div className="text-style-allcaps text-weight-bold margin-bottom-10 text-letterspacing-0_03">Ronald Richards</div>
                            <div className="text-size-12 text-opacity-50 text-letterspacing-0_03 text-style-allcaps">Developer of support part</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide mod--team">
                    <div className="team__slide">
                        <div data-remodal-target="form" className="overflow-hidden mod--team">
                            <img src="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d5f4c5ffb7a1673955_team-07.webp" loading="eager" srcset="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d5f4c5ffb7a1673955_team-07-p-500.webp 500w, https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d5f4c5ffb7a1673955_team-07.webp 708w" sizes="263.359375px" alt="" className="img mod--team"/>
                        </div>
                        <div>
                            <div className="text-style-allcaps text-weight-bold margin-bottom-10 text-letterspacing-0_03">Kathryn Murphy</div>
                            <div className="text-size-12 text-opacity-50 text-letterspacing-0_03 text-style-allcaps">HR Manager</div>
                        </div>
                    </div>
                    </SwiperSlide>
                <SwiperSlide className="swiper-slide mod--team">
                    <div className="team__slide">
                        <div data-remodal-target="form" className="overflow-hidden mod--team">
                            <img src="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d58fe63b945569515e_team-08.webp" loading="eager" srcset="https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d58fe63b945569515e_team-08-p-500.webp 500w, https://assets.website-files.com/637614467ad6ef67f0af2c24/637759d58fe63b945569515e_team-08.webp 708w" sizes="263.359375px" alt="" className="img mod--team"/>
                        </div>
                        <div>
                            <div className="text-style-allcaps text-weight-bold margin-bottom-10 text-letterspacing-0_03">Theresa Webb</div>
                            <div className="text-size-12 text-opacity-50 text-letterspacing-0_03 text-style-allcaps">Social Media Consultant</div>
                        </div>
                    </div>
                    </SwiperSlide>
            </Swiper>
        </div>
    </div>
</div>
</section>

</>
  );
}
