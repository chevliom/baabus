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
		icon: "/group.png",
		iconAlt: "High Quality",
		title: "High Quality",
		description: "crafted from top materials",
		isBackgroundImage: true,
	},
	{
		icon: "/group-1.png",
		iconAlt: "Group",
		title: "Warranty Protection",
		description: "Over 2 years",
		isBackgroundImage: false,
	},
	{
		icon: "/shipping.svg",
		iconAlt: "Shipping",
		title: "Free Shipping",
		description: "Order over 150 $",
		isBackgroundImage: false,
	},
	{
		icon: "/customer-support.svg",
		iconAlt: "Customer support",
		title: "24 / 7 Support",
		description: "Dedicated support",
		isBackgroundImage: false,
	},
];

export const FrameByAnima = (): JSX.Element => {
	return (
		<section className="bg-primaryp-900 w-full py-16">
			<div className="container mx-auto">
				<div className="flex flex-wrap justify-between gap-6">
					{features.map((feature, index) => (
						<div key={index} className="flex items-center gap-2.5">
							<div className="relative h-[60px] w-[60px]">
								{feature.isBackgroundImage ? (
									<div
										className="relative left-1 h-[60px] w-[53px] bg-cover bg-center"
										style={{ backgroundImage: `url(${feature.icon})` }}
									/>
								) : (
									<Image src={feature.icon} alt={feature.iconAlt} width={60} height={60} />
								)}
							</div>

							<div className="flex flex-col items-start gap-0.5">
								<h3 className="mt-[-1.00px] font-['Poppins',Helvetica] text-[25px] font-semibold leading-[37.5px] text-[#242424]">
									{feature.title}
								</h3>
								<p className="text-color-gray-3 font-['Poppins',Helvetica] text-xl font-medium leading-[30px]">
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
