
import React from "react";
import ContactSection from "./Components/ContactSection";
import HeroSection from "../../components/top-title/HeroSection";

const Contact: React.FC = () => {
    return (
        <main className="flex flex-col items-center">
            <HeroSection title="Contact" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius mod tempor incididunt ut labore et dolore magna"/>
            <div className="flex flex-col items-center lg:px-0 px-[30px]">
                <ContactSection />
            </div>
        </main>
    );
};

export default Contact;
