"use client";

import Image from "next/image";
import React from "react";

type FeatureItem = {
	icon: string;
	iconAlt: string;
	title: string;
	description: string;
	isBackgroundImage?: boolean;
};

const features: FeatureItem[] = [
	{
		icon: "/high.png",
		iconAlt: "High Quality",
		title: "High Quality",
		description: "crafted from top materials",
		isBackgroundImage: true,
	},
	{
		icon: "/guarantee.png",
		iconAlt: "Group",
		title: "Warranty Protection",
		description: "Over 2 years",
		isBackgroundImage: false,
	},
	{
		icon: "/shipping.png",
		iconAlt: "Shipping",
		title: "Free Shipping",
		description: "Order over 150 $",
		isBackgroundImage: false,
	},
	{
		icon: "/customer-support.png",
		iconAlt: "Customer support",
		title: "24 / 7 Support",
		description: "Dedicated support",
		isBackgroundImage: false,
	},
];

export const FrameByAnima = (): JSX.Element => {
	return (
		<section className="w-full bg-[#FFF7F4] py-12 md:py-20">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
					{features.map((feature, index) => (
						<div key={index} className="flex items-start gap-4">
							<div className="relative h-[60px] min-w-[60px]">
								{feature.isBackgroundImage ? (
									<div
										className="h-[60px] w-[60px] bg-contain bg-center bg-no-repeat"
										style={{ backgroundImage: `url(${feature.icon})` }}
									/>
								) : (
									<Image
										src={feature.icon}
										alt={feature.iconAlt}
										width={60}
										height={60}
										className="object-contain"
									/>
								)}
							</div>

							<div className="flex flex-col">
								<h3 className="font-['Poppins'] text-lg font-semibold leading-[1.4] text-[#242424] md:text-xl">
									{feature.title}
								</h3>
								<p className="font-['Poppins'] text-sm font-medium leading-[1.6] text-[#898989] md:text-base">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
