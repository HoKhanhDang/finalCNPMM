/**
 * This code was generated by Builder.io.
 */
import React from "react";
import HeroSection from "../../components/top-title/HeroSection";
import StorySection from "./Components/StorySection";
import OurStorySection from "./Components/OurStorySection";
import ChefSection from "./Components/ChefSection";
import SpecialServices from "./Components/SpecialService/SpecialServices";
import TeamSection from "./Components/TeamSection/TeamSection";
const services = [
    {
        title: "Birthday Party",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
        title: "Wedding Party",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
];

const AboutUs: React.FC = () => {
    return (
        <main className="flex flex-col items-center">
            <HeroSection title="About us" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"/>
            <div className="w-screen h-auto flex flex-col justify-center items-center bg-main overflow-x-hidden gap-[50px] lg:px-0 px-[30px]">
                <StorySection />
                <OurStorySection />
                <ChefSection />
                <SpecialServices services={services} />
                <TeamSection />
            </div>
        </main>
    );
};

export default AboutUs;
