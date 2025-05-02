"use client";

import { MinusIcon, PlusIcon, StarHalfIcon, StarIcon } from "lucide-react";
import React from "react";
import { Button } from "@/ui/Button";
import { Card, CardContent } from "@/ui/Card";

interface ProductColor {
	color: string;
	name: string;
}

const productData: {
	name: string;
	price: string;
	rating: number;
	reviewCount: number;
	description: string;
	colors: ProductColor[];
} = {
	name: "BAABUS Magic Swing Car",
	price: "Rs. 250,000.00",
	rating: 4.5,
	reviewCount: 5,
	description:
		"Let your little one cruise in style with this easy-to-ride swing car. Built for smooth rides, it's perfect for active play indoors and outdoors!",
	colors: [
		{ color: "#806df9", name: "Purple" },
		{ color: "#000000", name: "Black" },
		{ color: "var(--app-primary)", name: "Gold" },
	],
};

export const FrameByAnima = (): JSX.Element => {
	return (
		<Card className="w-full max-w-[616px] border-none">
			<CardContent className="p-0">
				<h1 className="mb-6 font-['Poppins',Helvetica] text-5xl font-semibold text-black">
					{productData.name}
				</h1>

				<p className="mb-6 font-['Poppins',Helvetica] text-2xl font-medium text-[#9f9f9f]">
					{productData.price}
				</p>

				<div className="mb-6 flex items-center">
					<div className="flex">
						{Array.from({ length: 4 }, (_, index) => (
							<StarIcon key={index} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
						))}
						<StarHalfIcon className="h-5 w-5 fill-yellow-500 text-yellow-500" />
					</div>

					<div className="mx-4 h-[30px] w-px bg-gray-300"></div>

					<span className="font-['Poppins',Helvetica] text-[13px] font-normal text-[#9f9f9f]">
						{productData.reviewCount} Customer Review
					</span>
				</div>

				<p className="mb-6 max-w-[424px] font-['Poppins',Helvetica] text-[13px] font-normal text-black">
					{productData.description}
				</p>

				<div className="mb-6">
					<p className="mb-3 font-['Poppins',Helvetica] text-sm font-normal text-[#9f9f9f]">Color</p>
					<div className="flex gap-4">
						{productData.colors.map((colorOption, index) => (
							<div
								key={index}
								className="h-[30px] w-[30px] cursor-pointer rounded-full"
								style={{ backgroundColor: colorOption.color }}
								aria-label={`Select ${colorOption.name} color`}
							/>
						))}
					</div>
				</div>

				<div className="mt-8 flex items-center gap-6">
					<div className="flex items-center rounded-full border border-[#e6e6e6]">
						<Button
							variant="ghost"
							size="icon"
							className="bg-gray-scalegray-50 h-[34px] w-[34px] rounded-full"
							aria-label="Decrease quantity"
						>
							<MinusIcon className="h-3.5 w-3.5" />
						</Button>

						<span className="text-gray-scalegray-900 w-10 text-center font-['Poppins',Helvetica]">5</span>

						<Button
							variant="ghost"
							size="icon"
							className="bg-gray-scalegray-50 h-[34px] w-[34px] rounded-full"
							aria-label="Increase quantity"
						>
							<PlusIcon className="h-3.5 w-3.5" />
						</Button>
					</div>

					<Button className="rounded-full bg-[#ea518f] px-8 py-[15px] text-white hover:bg-[#d93d7a]">
						Add to Cart
					</Button>
				</div>

				<div className="mt-12 h-px w-full bg-gray-200"></div>
			</CardContent>
		</Card>
	);
};
