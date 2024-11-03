/**
 * This code was generated by Builder.io.
 */
import React from "react";
import FeatureCard from "./FeatureCard";

interface Feature {
    number: number;
    title: string;
    description: string;
    imageSrc: string;
    isRed?: boolean;
}

const features: Feature[] = [
    {
        number: 1,
        title: "Passionate Chefs",
        description:
            "Beguiled and demoralized by all get charms pleasure the moments ever so blinded by desire.",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/0753952c68f2030882c54ad3751d7b6b67f364416ef27d58bdb7665b5564f86f?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
    },
    {
        number: 2,
        title: "100 % Fresh Foods",
        description:
            "Beguiled and demoralized by all get charms pleasure the moments ever so blinded by desire.",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/fca8ce5c2faa9a201c1f5a16675e0b7e9d5e2fd2361694154113d9174eb043a5?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
        isRed: true,
    },
    {
        number: 3,
        title: "Memorable Ambience",
        description:
            "Beguiled and demoralized by all get charms pleasure the moments ever so blinded by desire.",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/a0db41a159c607280e35273d0788ec09bc782e80247392e1bf71a1118bc856be?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
    },
];

const WhyWeAreBest: React.FC = () => {
    return (
        <section className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-red-600">
                Why We are the best
            </h2>
            <div className="mt-8 w-full max-w-[1220px] max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyWeAreBest;
