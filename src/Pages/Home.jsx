import React from 'react';
import HeroSlider from '../Components/HeroSlider/HeroSlider';
import HowItWorks from '../Components/ExtraSection/HowItWorks';
import Testimonials from '../Components/ExtraSection/Testimonials';
import WhyBuildHabits from '../Components/ExtraSection/WhyBuildHabits';
import FeaturedHabits from '../Components/FeaturedHabits/FeaturedHabits';


const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <FeaturedHabits></FeaturedHabits>
            <WhyBuildHabits></WhyBuildHabits>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;