import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/ui/Card";

export const FeatureByAnima = (): JSX.Element => {
	const features = [
		{
			icon: "/group-7.png",
			title: "64% Discount",
			description: "Save your 64% money with us",
		},
		{
			icon: "/hugeicons-safe.svg",
			title: "100% Safe",
			description: "100% Safe to play",
			isIconSvg: true,
		},
	];

	return (
		<Card className="w-full max-w-[537px] rounded-md border border-[#e6e6e6]">
			<CardContent className="flex items-center justify-between p-6">
				{features.map((feature, index) => (
					<div key={index} className="flex items-center gap-3">
						{feature.isIconSvg ? (
							<Image width={24} height={24} className="h-6 w-6" alt="Safe icon" src={feature.icon} />
						) : (
							<div className="relative h-8 w-8">
								<Image
									width={25}
									height={32}
									className="absolute left-[3px] top-0 h-8 w-[25px]"
									alt="Discount icon"
									src={feature.icon}
								/>
							</div>
						)}

						<div className="flex flex-col gap-1.5">
							<div className="font-body-small-body-small-500 text-gray-scalegray-900 text-[length:var(--body-small-body-small-500-font-size)] leading-[var(--body-small-body-small-500-line-height)] tracking-[var(--body-small-body-small-500-letter-spacing)]">
								{feature.title}
							</div>
							<div className="max-w-[198px] font-['Poppins',Helvetica] text-[13px] font-normal leading-[19.5px] text-[#808080]">
								{feature.description}
							</div>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};
