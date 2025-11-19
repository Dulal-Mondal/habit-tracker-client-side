
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Aos from 'aos'
import 'aos/dist/aos.css'


const slides = [
    {
        id: 1,
        title: "Build Habits, Transform Your Life",
        subtitle:
            "Stay consistent, track your daily progress, and achieve your personal goals one day at a time.",
        buttonText: "Get Started",
        image: "https://i.ibb.co.com/mpz62xL/15-05-Simple-habits-that-can-transform-your-life-completely.jpg"
    },
    {
        id: 2,
        title: "Track Progress Effortlessly",
        subtitle:
            "Visualize your habit streaks, stay motivated, and celebrate every milestone you achieve.",
        buttonText: "Track Now",
        image: "https://i.ibb.co.com/9K8TMX9/workout-progress.jpg"
    },
    {
        id: 3,
        title: "Join a Community of Doers",
        subtitle:
            "Browse public habits, share your progress, and get inspired by others’ success stories.",
        buttonText: "Explore Habits",
        image: "https://i.ibb.co.com/fY19fqJZ/10-Healthy-Habits-That-Keep-Your-Brain-Young.webp"
    }
];


const HeroSlider = () => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);
    return (
        <div className="w-full  mx-auto mt-8  overflow-hidden shadow-lg">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative h-[500px]  flex items-center px-8 md:px-20  text-white"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: "100% 100%",
                                backgroundPosition: "center",
                                backgroundColor: "black",
                                backgroundRepeat: 'no-repeat',

                            }}
                        >

                            <div className="absolute inset-0 bg-opacity-80"></div>


                            <div data-aos="fade-left" className="relative z-10 px-6 animate__backInLeft">
                                <h2 className="text-4xl text-red-600 md:text-5xl font-bold mb-3 drop-shadow-lg">
                                    {slide.title}
                                </h2>
                                <p className="text-lg  md:text-xl mb-5 max-w-2xl mx-auto drop-shadow-md">
                                    {slide.subtitle}
                                </p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300">
                                    {slide.buttonText}
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSlider;