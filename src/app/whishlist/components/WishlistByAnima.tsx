"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Badge } from "@/ui/badge";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { Separator } from "@/ui/components/separator";
import { fetchWishlist } from "@/lib/graphqlClient"; // adjust path as needed

interface WishlistItem {
	id: string;
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

export function WishlistByAnima({ onExploreMore }: Props): JSX.Element {
	const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

	useEffect(() => {
		async function loadWishlist() {
			const wishlist = await fetchWishlist();
			if (!wishlist) return;

			const mapped: WishlistItem[] = wishlist.items.map((item: any) => ({
				id: item.id,
				name: item.variant.name,
				image: "/image-7.png", // Placeholder image, replace with real if available
				price: `₹${item.variant.pricing?.price?.gross?.amount?.toFixed(2) ?? "0.00"}`,
				originalPrice: undefined,
				stockStatus: "In Stock", // Assuming all fetched are in stock
				stockStatusColor: "#5f0b2d",
				stockStatusBg: "#f7bfd5",
				buttonColor: "#ea518f",
				buttonTextColor: "text-gray-scalewhite",
				lowStock: false,
			}));

			setWishlistItems(mapped);
		}

		loadWishlist();
	}, []);

	return (
		<Card className="w-full rounded-lg border border-solid border-[#e6e6e6]">
			<div className="p-6">
				{/* Header */}
				<div className="mb-4 flex">
					<div className="w-[535px]">
						<span className="font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500">PRODUCT</span>
					</div>
					<div className="w-[336px]">
						<span className="font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500">PRICE</span>
					</div>
					<div>
						<span className="font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500">STOCK STATUS</span>
					</div>
				</div>

				<Separator className="mb-6 w-full" />

				{/* Product Items */}
				{wishlistItems.map((item, index) => (
					<div key={item.id}>
						<div className="mb-5 flex items-center">
							<div className="flex w-[535px] items-center gap-5">
								<div className="relative h-[100px] w-[100px]">
									<Image src={item.image} alt={`${item.name} image`} fill className="object-cover" />
								</div>
								<span className="font-body-medium-body-medium-400 text-gray-scalegray-900">{item.name}</span>
							</div>

							<div className="w-[336px]">
								<div className="flex items-start gap-0.5">
									<span className="font-body-medium-body-medium-500 text-gray-scalegray-900">
										{item.price}
									</span>
									{item.originalPrice && (
										<span className="text-gray-scalegray-400 text-base line-through">
											{item.originalPrice}
										</span>
									)}
								</div>
							</div>

							<div className="flex items-center gap-6">
								<Badge
									className="rounded px-2 py-1"
									style={{
										backgroundColor: item.stockStatusBg,
										color: item.stockStatusColor,
									}}
								>
									<span className="font-body-small-body-small-400">{item.stockStatus}</span>
								</Badge>

								<div className="ml-auto flex items-center gap-6">
									<Button
										className="rounded-[43px] px-8 py-3.5"
										style={{ backgroundColor: item.buttonColor }}
									>
										<span className={`${item.buttonTextColor} font-body-small-body-small-600`}>
											Add to Cart
										</span>
									</Button>
									<button>
										<X className="h-6 w-6" />
									</button>
								</div>
							</div>
						</div>

						{item.lowStock && (
							<div className="mb-5 text-sm font-medium text-[#61ab59]">{item.lowStockMessage}</div>
						)}

						{index < wishlistItems.length - 1 && <Separator className="mb-5 w-full" />}
					</div>
				))}

				<Separator className="my-6 w-full" />

				<div className="flex items-center justify-between">
					<div className="text-xl font-normal text-[#f188b2]">
						Love it? Someone else does too! Buy before it&apos;s too late.
					</div>
					<Button
						onClick={onExploreMore}
						variant="outline"
						className="bg-gray-scalegray-50 rounded-[43px] px-8 py-3.5"
					>
						<span className="text-gray-scalegray-700 font-body-small-body-small-600">Explore More</span>
					</Button>
				</div>
			</div>
		</Card>
	);
}
