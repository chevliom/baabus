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
			icon: <Image src="/group-1.png" alt="Safe Toys" width={34} height={36} />,
			iconBg: "bg-[#f7bfd5]",
			title: "100% Safe Toys",
			description: "100% Safe & Friendly Toys.",
			textColor: "text-gray-500",
		},
		{
			icon: <Image src="/group-4.png" alt="Customer Feedback" width={34} height={36} />,
			iconBg: "bg-[#f7bfd5]",
			title: "Customer Feedback",
			description: "Our happy customer",
			textColor: "text-gray-400",
		},
		{
			icon: <Image src="/group-2.png" alt="Free Shipping" width={34} height={36} />,
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
			icon: <Image src="/group-3.png" alt="Secure Payment" width={34} height={36} />,
			iconBg: "bg-[#f7bfd5]",
			title: "100% Secure Payment",
			description: "We ensure your money is safe",
			textColor: "text-gray-400",
		},
		{
			icon: <Image src="/group-6.png" alt="Organic" width={33} height={36} />,
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
			<div className="relative h-[180px] md:h-[219px] w-full bg-[url(/image.png)] bg-cover bg-center mt-16 md:mt-24">
				<h1 className="absolute mt-[85px] md:mt-[70px] left-1/2 -translate-x-1/2 transform text-4xl md:text-8xl font-normal leading-none text-[#ea518f] text-center [font-family:'Baloo',Helvetica]">
					About Us
				</h1>

				<Image
					className="absolute right-2 md:right-[22px] w-[100px] h-[130px] md:w-[160px] md:h-[211px] object-cover mt-[30px] md:mt-0"
					alt="Decorative image"
					src="/image-71.png"
					width={160}
					height={211}
					priority
				/>
				<Image
					className="absolute left-2 md:left-[22px] w-[100px] h-[130px] md:w-[160px] md:h-[211px] object-cover mt-[30px] md:mt-0"
					alt="Decorative image"
					src="/image-71.png"
					width={160}
					height={211}
					priority
				/>
			</div>

			<AboutUsByAnima />


			{/* Feature cards section */}
			<section className="flex w-full flex-col gap-8 px-4 md:py-16 py:8 md:flex-row md:gap-16">
				<div className="container mx-auto flex md:flex-row flex-col align-start gap-16">
					<div className="md:w-1/3 hidden md:block">
						<Image
							src="/image-99.png"
							alt="Feature image"
							width={600}
							height={500}
							className="h-auto w-full object-cover"
						/>
					</div>

					<div className="grid grid-cols-1 gap-4 md:gap-16 md:w-2/3">
						<HeadingByAnima />
						<div className="trusted-parents grid grid-cols-1 gap-6 sm:grid-cols-2 ">
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
					</div>
				</div>
			</section>
			<WeDelvieredYouByAnima />
		</div>
	);
};
