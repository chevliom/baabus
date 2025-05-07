"use client";

import Image from "next/image";
import { ShieldCheckIcon, TruckIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/ui/Card";
import { AboutUsByAnima } from "@/app/AboutUs/components/AboutUsByAnima";
// import { BarByAnima } from "@/app/category/components/BarByAnima";
import { HeadingByAnima } from "@/app/AboutUs/components/HeadingByAnima";
import { WeDelvieredYouByAnima } from "@/app/AboutUs/components/WeDelvieredYouByAnima";
import { HeaderSection } from "@/app/sections/HeaderSection";

export const AboutUsScreen = (): JSX.Element => {
	const featureCards = [
		{
			icon: <ShieldCheckIcon className="text-brand-pink h-6 w-6" />,
			iconBg: "bg-[#f7bfd5]",
			title: "100% Safe Toys",
			description: "100% Safe & Friendly Toys.",
			textColor: "text-gray-500",
		},
		{
			icon: <div className="h-10 w-10 bg-[url('/group-4.png')] bg-contain bg-center bg-no-repeat" />,
			iconBg: "bg-[#f7bfd5]",
			title: "Customer Feedback",
			description: "Our happy customer",
			textColor: "text-gray-400",
		},
		{
			icon: <TruckIcon className="text-brand-pink h-10 w-10" />,
			iconBg: "bg-[#f7bfd5]",
			title: "Free Shipping",
			description: "Free shipping with discount",
			textColor: "text-gray-400",
		},
		{
			icon: <Image src="/group-5.png" alt="Support" width={34} height={36} />,
			iconBg: "bg-[#f7bfd5]",
			title: "Great Support 24/7",
			description: "Instant access to Contact",
			textColor: "text-gray-400",
		},
		{
			icon: <div className="ml-1 h-9 w-7 bg-[url('/group-6.png')] bg-contain bg-center bg-no-repeat" />,
			iconBg: "bg-[#f7bfd5]",
			title: "100% Secure Payment",
			description: "We ensure your money is safe",
			textColor: "text-gray-400",
		},
		{
			icon: <Image src="/group-7.png" alt="Organic" width={33} height={36} />,
			iconBg: "bg-[#f7bfd5]",
			title: "100% Organic Food",
			description: "100% healthy & Fresh food.",
			textColor: "text-gray-400",
		},
	];

	return (
		<div className="w-full bg-white">
			{/* Section imports */}
			<HeaderSection />

			{/* Hero Banner */}
			<div className="relative mt-24 h-[219px] w-full bg-[url(/image.png)] bg-cover bg-[50%_50%]">
				<h1 className="absolute left-1/2 top-[33px] -translate-x-1/2 transform text-8xl font-normal leading-[normal] tracking-[0] text-[#ea518f] [font-family:'Baloo',Helvetica]">
					About Us
				</h1>

				<Image
					className="absolute right-[22px] top-0 object-cover"
					alt="Decorative image"
					src="/image-71.png"
					width={160} // same as w-40 (10rem)
					height={211} // matches h-[211px]
					priority // optional: preload for performance if above-the-fold
				/>

				<Image
					className="absolute left-[22px] top-0 object-cover"
					alt="Decorative image"
					src="/image-71.png"
					width={160} // same as w-40 (10rem)
					height={211} // matches h-[211px]
					priority // optional: preload for performance if above-the-fold
				/>
			</div>

			<AboutUsByAnima />
			<HeadingByAnima />

			{/* Feature cards section */}
			<section className="flex w-full flex-col gap-8 px-4 py-16 md:flex-row md:gap-16">
				<div className="md:w-1/3">
					<Image
						src="/image-99.png"
						alt="Feature image"
						width={600}
						height={500}
						className="h-auto w-full object-cover"
					/>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:w-2/3">
					{featureCards.map((feature, index) => (
						<Card key={index} className="border-none shadow-none">
							<CardContent className="p-0">
								<div className="flex items-center gap-4">
									<div className={`flex items-center justify-center p-4 ${feature.iconBg} rounded-full`}>
										{feature.icon}
									</div>
									<div className="flex flex-col gap-1">
										<h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
										<p className={`text-sm ${feature.textColor}`}>{feature.description}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>
			<WeDelvieredYouByAnima />
		</div>
	);
};
