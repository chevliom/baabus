"use client";

import React, { useState } from "react";
import { MinusIcon, PlusIcon, StarHalfIcon, StarIcon } from "lucide-react";
import Image from "next/image"; // Import Image component from Next.js
import { Button } from "@/ui/Button";
import { Card, CardContent } from "@/ui/Card";

const productDetails = [
	{ label: "SKU", value: "SS001" },
	{ label: "Category", value: "Swing Car" },
];

const socialIcons = [
	{ id: 1, src: "/akar-icons_facebook-fill.svg", alt: "Facebook" },
	{ id: 2, src: "/akar-icons_linkedin-box-fill.svg", alt: "LinkedIn" },
	{ id: 3, src: "/ant-design_twitter-circle-filled.svg", alt: "Twitter" },
];

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
		{ color: "#D4AF37", name: "Gold" },
	],
};

export const FrameByAnima = (): JSX.Element => {
	const [selectedColor, setSelectedColor] = useState<string>(productData.colors[0].name);
	const [quantity, setQuantity] = useState<number>(1);

	return (
		<Card className="w-full max-w-[616px] border-none bg-transparent px-4 shadow-none md:px-0">
			<CardContent className="p-0">
				<h1 className="mb-6 font-['Poppins',Helvetica] text-[40px] font-semibold text-black">
					{productData.name}
				</h1>

				<p className="mb-6 font-['Poppins',Helvetica] text-[24px] font-medium text-[#9f9f9f]">
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

					<span className="font-['Poppins',Helvetica] text-[13px] text-[#9f9f9f]">
						{productData.reviewCount} Customer Review
					</span>
				</div>

				<p className="mb-6 max-w-[424px] font-['Poppins',Helvetica] text-[13px] text-black">
					{productData.description}
				</p>

				<div className="mb-6">
					<p className="mb-3 font-['Poppins',Helvetica] text-sm text-[#9f9f9f]">Color</p>
					<div className="flex gap-4">
						{productData.colors.map((colorOption, index) => (
							<div
								key={index}
								onClick={() => setSelectedColor(colorOption.name)}
								className={`h-[30px] w-[30px] cursor-pointer rounded-full border-2 ${
									selectedColor === colorOption.name ? "border-black" : "border-transparent"
								}`}
								style={{ backgroundColor: colorOption.color }}
								aria-label={`Select ${colorOption.name} color`}
							/>
						))}
					</div>
				</div>

				<div className="mt-8 flex flex-wrap items-center gap-6">
					<div className="flex items-center rounded-full border border-[#e6e6e6] bg-[#f8f8f8]">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setQuantity((q) => Math.max(1, q - 1))}
							className="h-[34px] w-[34px] rounded-full"
							aria-label="Decrease quantity"
						>
							<MinusIcon className="h-3.5 w-3.5" />
						</Button>

						<span className="w-10 text-center font-['Poppins',Helvetica] text-base font-medium text-black">
							{quantity}
						</span>

						<Button
							variant="ghost"
							size="icon"
							onClick={() => setQuantity((q) => q + 1)}
							className="h-[34px] w-[34px] rounded-full"
							aria-label="Increase quantity"
						>
							<PlusIcon className="h-3.5 w-3.5" />
						</Button>
					</div>

					<Button className="rounded-full bg-[#ea518f] px-10 py-4 text-base font-medium text-white transition hover:bg-[#d93d7a]">
						Add to Cart
					</Button>
				</div>

				<div className="mt-12 h-px w-full bg-gray-200" />
			</CardContent>
			{/* Product Details */}
			<div className="mt-8">
				<div className="flex flex-col gap-4">
					{productDetails.map((detail, index) => (
						<div key={index} className="flex">
							<div className="w-24 font-['Poppins',Helvetica] text-base font-normal text-[#9f9f9f]">
								{detail.label}
							</div>
							<div className="font-['Poppins',Helvetica] text-base font-normal text-[#9f9f9f]">
								{detail.value}
							</div>
						</div>
					))}

					{/* Social Share */}
					<div className="flex">
						<div className="w-24 font-['Poppins',Helvetica] text-base font-normal text-[#9f9f9f]">Share</div>
						<div className="flex gap-4">
							{socialIcons.map((icon) => (
								<button key={icon.id} aria-label={`Share on ${icon.alt}`} className="h-5 w-5">
									<Image
										loading="lazy"
										width={20}
										height={20}
										alt={icon.alt}
										src={icon.src}
										className="object-contain"
									/>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};
