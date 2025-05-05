"use client";

import React from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/ui/Button";

export const WeDelvieredYouByAnima = (): JSX.Element => {
	const features = [
		{ id: 1, text: "Premium Quality" },
		{ id: 2, text: "Adorable & Engaging Designs" },
		{ id: 3, text: "Every product is made to bring smiles to little faces" },
	];

	return (
		<section className="flex w-full flex-col items-center justify-between gap-8 px-4 py-20 md:flex-row">
			<div className="flex w-full flex-col gap-10 md:w-[556px]">
				<h2 className="font-['Poppins',Helvetica] text-[40px] font-semibold text-black">
					We Delivered, You Enjoy Your Order.
				</h2>

				<p className="font-body-medium-body-medium-400 text-gray-scalegray-600 text-[length:var(--body-medium-body-medium-400-font-size)] leading-[var(--body-medium-body-medium-400-line-height)] tracking-[var(--body-medium-body-medium-400-letter-spacing)] [font-style:var(--body-medium-body-medium-400-font-style)]">
					Ut suscipit egestas suscipit. Sed posuere pellentesque nunc, ultrices consectetur velit dapibus eu.
					Mauris sollicitudin dignissim diam, ac mattis eros accumsan rhoncus. Curabitur auctor bibendum nunc
					eget elementum.
				</p>

				<div className="flex flex-col gap-4">
					{features.map((feature) => (
						<div key={feature.id} className="flex items-start gap-2">
							<div className="relative h-5 w-5">
								<div className="absolute left-0 top-0 h-5 w-5 rounded-full bg-[#ea518f] opacity-10" />
								<div className="absolute left-1 top-1 flex h-3 w-3 items-center justify-center">
									<CheckIcon className="h-[7px] w-2.5 text-[#ea518f]" />
								</div>
							</div>
							<p className="text-gray-scalegray-600 w-full text-sm font-normal leading-[19.6px] [font-family:'Poppins',Helvetica]">
								{feature.text}
							</p>
						</div>
					))}
				</div>

				<Button className="text-gray-scalewhite mt-4 flex h-auto items-center gap-4 rounded-[43px] bg-[#ea518f] px-10 py-4 hover:bg-[#d03e7a]">
					<span className="font-body-medium-body-medium-600 text-[length:var(--body-medium-body-medium-600-font-size)] leading-[var(--body-medium-body-medium-600-line-height)] tracking-[var(--body-medium-body-medium-600-letter-spacing)] [font-style:var(--body-medium-body-medium-600-font-style)]">
						Shop Now
					</span>
					<svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M16.25 6.75H1.25M16.25 6.75L10.75 1.25M16.25 6.75L10.75 12.25"
							stroke="white"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</Button>
			</div>

			<div className="w-full md:w-[757px]">
				<img className="h-auto w-full object-cover" alt="Product showcase" src="/image-100.png" />
			</div>
		</section>
	);
};
