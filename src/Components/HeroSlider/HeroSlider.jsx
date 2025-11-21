import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
    {
        id: 1,
        title: "Build Habits, Transform Your Life",
        subtitle:
            "Stay consistent, track your daily progress, and achieve your personal goals one day at a time.",
        buttonText: "Get Started",
        image: "https://i.ibb.co.com/mpz62xL/15-05-Simple-habits-that-can-transform-your-life-completely.jpg",
        align: "left"
    },
    {
        id: 2,
        title: "Track Progress Effortlessly",
        subtitle:
            "Visualize your habit streaks, stay motivated, and celebrate every milestone you achieve.",
        buttonText: "Track Now",
        image: "https://i.ibb.co.com/9K8TMX9/workout-progress.jpg",
        align: "right"
    },
    {
        id: 3,
        title: "Join a Community of Doers",
        subtitle:
            "Browse public habits, share your progress, and get inspired by others’ success stories.",
        buttonText: "Explore Habits",
        image: "https://i.ibb.co.com/fY19fqJZ/10-Healthy-Habits-That-Keep-Your-Brain-Young.webp",
        align: "left"
    }
];

const HeroSlider = () => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <div className="w-full mx-auto mt-8 relative">

            <button className="custom-prev absolute left-3 top-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-40 p-3 rounded-full text-white transition">
                <FaArrowLeft size={20} />
            </button>
            <button className="custom-next absolute right-3 top-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-40 p-3 rounded-full text-white transition">
                <FaArrowRight size={20} />
            </button>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
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
                            className={`relative h-[350px] sm:h-[420px] md:h-[500px] lg:h-[600px] 
                                flex items-center 
                                ${slide.align === "left" ? "justify-start pl-10" : "justify-end pr-10"}
                                text-white`}
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >


                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                            <div data-aos="fade-up" className="relative z-10 max-w-xl">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-500 mb-4 drop-shadow-xl">
                                    {slide.title}
                                </h2>

                                <p className="text-base sm:text-lg md:text-xl mb-6 drop-shadow-md">
                                    {slide.subtitle}
                                </p>


                                <button className="px-7 py-3 bg-blue-600 hover:bg-blue-800 rounded-full text-white font-semibold text-lg transition transform hover:scale-105 active:scale-95 shadow-md">
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
