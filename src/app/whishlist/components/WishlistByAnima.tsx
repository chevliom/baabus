"use client";

import { X } from "lucide-react";
import React from "react";
import Image from "next/image";

// Import UI components with explicit paths to avoid import errors
// Note: Adjust these paths based on your actual project structure
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { Separator } from "@/ui/components/separator";

// TypeScript interface for wishlist item
interface WishlistItem {
	id: number;
	name: string;
	image: string;
	price: string;
	originalPrice?: string;
	stockStatus: string;
	stockStatusColor: string;
	stockStatusBg: string;
	buttonColor: string;
	buttonTextColor: string;
	lowStock?: boolean;
	lowStockMessage?: string;
}

type Props = {
	onExploreMore: () => void;
};

// Named export to match the import in WishlistScreen
export function WishlistByAnima({ onExploreMore }: Props): JSX.Element {
	// Product data for mapping
	const wishlistItems: WishlistItem[] = [
		{
			id: 1,
			name: "Bus Bottle",
			image: "/image-7.png",
			price: "₹14.99",
			originalPrice: "₹20.99",
			stockStatus: "In Stock",
			stockStatusColor: "#5f0b2d",
			stockStatusBg: "#f7bfd5",
			buttonColor: "#ea518f",
			buttonTextColor: "text-gray-scalewhite",
			lowStock: true,
			lowStockMessage: "1 Item left, Hurry!",
		},
		{
			id: 2,
			name: "Bus Bottle",
			image: "/image-7.png",
			price: "₹45.00",
			stockStatus: "In Stock",
			stockStatusColor: "#5f0b2d",
			stockStatusBg: "#f7bfd5",
			buttonColor: "#ea518f",
			buttonTextColor: "text-gray-scalewhite",
		},
		{
			id: 3,
			name: "Bus Bottle",
			image: "/image-7.png",
			price: "₹09.00",
			stockStatus: "Out of Stock",
			stockStatusColor: "text-brandingerror",
			stockStatusBg: "#e94b4833",
			buttonColor: "bg-gray-scalegray-50",
			buttonTextColor: "text-gray-scalegray-300",
		},
	];

	return (
		<Card className="w-full rounded-lg border border-solid border-[#e6e6e6]">
			<div className="p-6">
				{/* Header */}
				<div className="mb-4 flex">
					<div className="w-[535px]">
						<span className="font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500 text-[length:var(--CAPS-LOCK-medium-caps-lock-font-size)] font-[number:var(--CAPS-LOCK-medium-caps-lock-font-weight)] leading-[var(--CAPS-LOCK-medium-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-medium-caps-lock-letter-spacing)] [font-style:var(--CAPS-LOCK-medium-caps-lock-font-style)]">
							PRODUCT
						</span>
					</div>
					<div className="w-[336px]">
						<span className="font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500 text-[length:var(--CAPS-LOCK-medium-caps-lock-font-size)] font-[number:var(--CAPS-LOCK-medium-caps-lock-font-weight)] leading-[var(--CAPS-LOCK-medium-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-medium-caps-lock-letter-spacing)] [font-style:var(--CAPS-LOCK-medium-caps-lock-font-style)]">
							PRICE
						</span>
					</div>
					<div>
						<span className="font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500 text-[length:var(--CAPS-LOCK-medium-caps-lock-font-size)] font-[number:var(--CAPS-LOCK-medium-caps-lock-font-weight)] leading-[var(--CAPS-LOCK-medium-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-medium-caps-lock-letter-spacing)] [font-style:var(--CAPS-LOCK-medium-caps-lock-font-style)]">
							STOCK STATUS
						</span>
					</div>
				</div>

				<Separator className="mb-6 w-full" />

				{/* Product Items */}
				{wishlistItems.map((item, index) => (
					<div key={item.id}>
						<div className="mb-5 flex items-center">
							{/* Product */}
							<div className="flex w-[535px] items-center gap-5">
								<div className="relative h-[100px] w-[100px]">
									<Image src={item.image} alt={`${item.name} image`} fill className="object-cover" />
								</div>
								<span className="font-body-medium-body-medium-400 text-gray-scalegray-900 text-[length:var(--body-medium-body-medium-400-font-size)] font-[number:var(--body-medium-body-medium-400-font-weight)] leading-[var(--body-medium-body-medium-400-line-height)] tracking-[var(--body-medium-body-medium-400-letter-spacing)] [font-style:var(--body-medium-body-medium-400-font-style)]">
									{item.name}
								</span>
							</div>

							{/* Price */}
							<div className="w-[336px]">
								<div className="flex items-start gap-0.5">
									<span className="font-body-medium-body-medium-500 text-gray-scalegray-900 text-[length:var(--body-medium-body-medium-500-font-size)] font-[number:var(--body-medium-body-medium-500-font-weight)] leading-[var(--body-medium-body-medium-500-line-height)] tracking-[var(--body-medium-body-medium-500-letter-spacing)] [font-style:var(--body-medium-body-medium-500-font-style)]">
										{item.price}
									</span>
									{item.originalPrice && (
										<span className="text-gray-scalegray-400 text-base font-normal leading-6 tracking-[0] line-through [font-family:'Poppins',Helvetica]">
											{item.originalPrice}
										</span>
									)}
								</div>
							</div>

							{/* Stock Status */}
							<div className="flex items-center gap-6">
								<Badge
									className="rounded px-2 py-1"
									style={{
										backgroundColor: item.stockStatusBg,
										color: item.stockStatusColor,
									}}
								>
									<span className="font-body-small-body-small-400 text-[length:var(--body-small-body-small-400-font-size)] font-[number:var(--body-small-body-small-400-font-weight)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)] [font-style:var(--body-small-body-small-400-font-style)]">
										{item.stockStatus}
									</span>
								</Badge>

								{/* Actions */}
								<div className="ml-auto flex items-center gap-6">
									<Button
										className="rounded-[43px] px-8 py-3.5"
										style={{
											backgroundColor: item.buttonColor,
										}}
									>
										<span
											className={`${item.buttonTextColor} font-body-small-body-small-600 text-[length:var(--body-small-body-small-600-font-size)] font-[number:var(--body-small-body-small-600-font-weight)] leading-[var(--body-small-body-small-600-line-height)] tracking-[var(--body-small-body-small-600-letter-spacing)] [font-style:var(--body-small-body-small-600-font-style)]`}
										>
											Add to Cart
										</span>
									</Button>
									<button>
										<X className="h-6 w-6" />
									</button>
								</div>
							</div>
						</div>

						{/* Low Stock Message */}
						{item.lowStock && (
							<div className="mb-5 text-sm font-medium leading-[21px] tracking-[0] text-[#61ab59] [font-family:'Poppins',Helvetica]">
								{item.lowStockMessage}
							</div>
						)}

						{index < wishlistItems.length - 1 && <Separator className="mb-5 w-full" />}
					</div>
				))}

				<Separator className="my-6 w-full" />

				{/* Footer */}
				<div className="flex items-center justify-between">
					<div className="text-xl font-normal leading-[26px] tracking-[0] text-[#f188b2] [font-family:'Baloo-Regular',Helvetica]">
						Love it? Someone else does too! Buy before it&apos;s too late.
					</div>
					<Button
						onClick={onExploreMore}
						variant="outline"
						className="bg-gray-scalegray-50 rounded-[43px] px-8 py-3.5"
					>
						<span className="text-gray-scalegray-700 font-body-small-body-small-600 text-[length:var(--body-small-body-small-600-font-size)] font-[number:var(--body-small-body-small-600-font-weight)] leading-[var(--body-small-body-small-600-line-height)] tracking-[var(--body-small-body-small-600-letter-spacing)] [font-style:var(--body-small-body-small-600-font-style)]">
							Explore More
						</span>
					</Button>
				</div>
			</div>
		</Card>
	);
}
