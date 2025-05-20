"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MinusIcon, PlusIcon, StarHalfIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/ui/Button";
import { Card, CardContent } from "@/ui/Card";

const socialIcons = [
	{ id: 1, src: "/akar-icons_facebook-fill.svg", alt: "Facebook" },
	{ id: 2, src: "/akar-icons_linkedin-box-fill.svg", alt: "LinkedIn" },
	{ id: 3, src: "/ant-design_twitter-circle-filled.svg", alt: "Twitter" },
];

interface ProductColor {
	color: string;
	name: string;
}

interface Product {
	id: string;
	name: string;
	description: string;
	rating: number;
	isAvailable: boolean;
	availableForPurchase: boolean;
	availableForPurchaseAt: string | null;
	productType: {
		name: string;
	};
	category: {
		name: string;
	};
}

export const FrameByAnima = (): JSX.Element => {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const [productData, setProductData] = useState<Product | null>(null);
	const [selectedColor, setSelectedColor] = useState<string>("Purple");
	const [quantity, setQuantity] = useState<number>(1);

	const colors: ProductColor[] = [
		{ color: "#806df9", name: "Purple" },
		{ color: "#000000", name: "Black" },
		{ color: "#D4AF37", name: "Gold" },
	];

	useEffect(() => {
		if (!id) return;

		const fetchProduct = async () => {
			const res = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					query: `
            query GetProduct($id: ID!) {
              product(id: $id, channel: "default-channel") {
                id
                name
                description
                rating
                isAvailable
                availableForPurchase
                availableForPurchaseAt
                productType {
                  name
                }
                category {
                  name
                }
              }
            }
          `,
					variables: { id },
				}),
			});

			const json = await res.json();
			setProductData(json.data.product);
		};

		fetchProduct();
	}, [id]);

	if (!id) return <p className="text-red-500">No product ID in URL.</p>;
	if (!productData) return <p className="text-gray-500">Loading...</p>;

	const formatDate = (dateString: string | null): string => {
		if (!dateString) return "N/A";
		return new Date(dateString).toLocaleDateString();
	};

	return (
		<Card className="w-full max-w-[616px] border-none bg-transparent px-4 shadow-none md:px-0">
			<CardContent className="p-0">
				<h1 className="mb-6 font-['Poppins',Helvetica] text-[40px] font-semibold text-black">
					{productData.name}
				</h1>

				<p className="mb-6 font-['Poppins',Helvetica] text-[24px] font-medium text-[#9f9f9f]">
					Rs. 250,000.00
				</p>

				<div className="mb-6 flex items-center">
					<div className="flex">
						{Array.from({ length: 4 }, (_, index) => (
							<StarIcon key={index} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
						))}
						<StarHalfIcon className="h-5 w-5 fill-yellow-500 text-yellow-500" />
					</div>
					<div className="mx-4 h-[30px] w-px bg-gray-300" />
					<span className="font-['Poppins',Helvetica] text-[13px] text-[#9f9f9f]">
						{productData.rating ?? 5} Customer Reviews
					</span>
				</div>

				<p className="mb-6 max-w-[424px] font-['Poppins',Helvetica] text-[13px] text-black">
					{productData.description}
				</p>

				<div className="mb-6">
					<p className="mb-3 font-['Poppins',Helvetica] text-sm text-[#9f9f9f]">Color</p>
					<div className="flex gap-4">
						{colors.map((colorOption, index) => (
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
					<div className="flex">
						<div className="w-24 font-['Poppins',Helvetica] text-base text-[#9f9f9f]">Type</div>
						<div className="font-['Poppins',Helvetica] text-base text-[#9f9f9f]">
							{productData.productType?.name ?? "N/A"}
						</div>
					</div>

					<div className="flex">
						<div className="w-24 font-['Poppins',Helvetica] text-base text-[#9f9f9f]">Category</div>
						<div className="font-['Poppins',Helvetica] text-base text-[#9f9f9f]">
							{productData.category?.name ?? "N/A"}
						</div>
					</div>

					<div className="flex">
						<div className="w-24 font-['Poppins',Helvetica] text-base text-[#9f9f9f]">Available</div>
						<div className="font-['Poppins',Helvetica] text-base text-[#9f9f9f]">
							{productData.isAvailable ? "In Stock" : "Out of Stock"}
						</div>
					</div>

					{/* <div className="flex">
						<div className="w-24 font-['Poppins',Helvetica] text-base text-[#9f9f9f]">Purchase At</div>
						<div className="font-['Poppins',Helvetica] text-base text-[#9f9f9f]">
							{formatDate(productData.availableForPurchaseAt)}
						</div>
					</div> */}

					{/* Social Share */}
					<div className="flex">
						<div className="w-24 font-['Poppins',Helvetica] text-base text-[#9f9f9f]">Share</div>
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
