"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/ui/Button";
import { fetchWishlist } from "@/lib/graphqlClient";
import type { WishlistResponse, WishlistGraphQLItem } from "@/app/whishlist/components/types/wishlist"; // You need to define this or adjust according to your GraphQL response

interface WishlistItem {
	id: string | number;
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
	disabled?: boolean;
}

type Props = {
	onExploreMore: () => void;
};

const staticWishlistItems: WishlistItem[] = [
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
		disabled: true,
	},
];

export function WishlistByAnima({ onExploreMore }: Props): JSX.Element {
	const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
	// const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const loadWishlist = async (): Promise<void> => {
			try {
				const wishlist: WishlistResponse = await fetchWishlist();

				if (!wishlist?.items?.length) {
					setWishlistItems(staticWishlistItems);
					return;
				}

				const mapped: WishlistItem[] = wishlist.items.map((item: WishlistGraphQLItem) => {
					const priceAmount = item?.variant?.pricing?.price?.gross?.amount;

					return {
						id: item.id,
						name: item.variant.name ?? "Unnamed Product",
						image: "/image-7.png",
						price: `₹${priceAmount?.toFixed(2) ?? "0.00"}`,
						originalPrice: undefined,
						stockStatus: "In Stock",
						stockStatusColor: "#5f0b2d",
						stockStatusBg: "#f7bfd5",
						buttonColor: "#ea518f",
						buttonTextColor: "text-gray-scalewhite",
					};
				});

				setWishlistItems(mapped);
			} catch (error) {
				console.error("Failed to fetch wishlist, using fallback.", error);
				setWishlistItems(staticWishlistItems);
			}
		};

		void loadWishlist(); // ✅ now recognized as a typed async function
	}, []);

	return (
		<div className="flex min-h-screen justify-center bg-white px-6 py-[72px]">
			<div className="w-full max-w-[1300px] rounded-lg border border-[#e6e6e6] bg-white text-black shadow-sm">
				<div className="p-8">
					{/* Header */}
					<div className="mb-4 flex">
						<div className="w-[535px]">
							<span className="text-sm font-semibold uppercase tracking-wide text-[#666]">Product</span>
						</div>
						<div className="w-[336px]">
							<span className="text-sm font-semibold uppercase tracking-wide text-[#666]">Price</span>
						</div>
						<div>
							<span className="text-sm font-semibold uppercase tracking-wide text-[#666]">Stock Status</span>
						</div>
					</div>

					<div className="border-t border-[#e6e6e6]" />

					{wishlistItems.map((item, index) => (
						<div key={item.id}>
							<div className="flex items-center py-6">
								{/* Product */}
								<div className="flex w-[535px] items-center gap-5">
									<div className="relative h-[80px] w-[80px]">
										<Image src={item.image} alt={item.name} fill className="object-contain" />
									</div>
									<span className="text-[16px] font-semibold text-[#2f2f2f]">{item.name}</span>
								</div>

								{/* Price */}
								<div className="w-[336px]">
									<div className="flex items-center gap-2">
										<span className="text-[16px] font-bold text-[#2f2f2f]">{item.price}</span>
										{item.originalPrice && (
											<span className="text-[16px] text-[#999] line-through">{item.originalPrice}</span>
										)}
									</div>
								</div>

								{/* Status + Buttons */}
								<div className="flex items-center gap-20">
									<span
										className="rounded px-2 py-1 text-sm font-medium"
										style={{
											backgroundColor: item.stockStatusBg,
											color: item.stockStatusColor,
										}}
									>
										{item.stockStatus}
									</span>

									<div className="ml-auto flex items-center gap-6">
										<Button
											disabled={item.disabled}
											className={`rounded-full px-8 py-3.5 text-sm font-semibold text-white ${
												item.disabled ? "cursor-not-allowed bg-[#e6e6e6] text-[#aaa]" : ""
											}`}
											style={!item.disabled ? { backgroundColor: item.buttonColor } : {}}
										>
											Add to Cart
										</Button>
										<button>
											<X className="h-6 w-6 text-[#2f2f2f]" />
										</button>
									</div>
								</div>
							</div>

							{item.lowStock && (
								<div className="mb-4 ml-[105px] text-sm font-medium text-[#61ab59]">
									{item.lowStockMessage}
								</div>
							)}

							{index < wishlistItems.length - 1 && <div className="border-t border-[#e6e6e6]" />}
						</div>
					))}

					{/* Footer */}
					<div className="mt-6 flex items-center justify-between border-t border-[#e6e6e6] pt-6">
						<div className="text-[18px] font-bold text-[#f188b2]">
							Love it? Someone else does too! Buy before it&apos;s too late.
						</div>
						<Button
							onClick={onExploreMore}
							variant="outline"
							className="rounded-full bg-[#e6e6e6] px-8 py-3.5 text-sm font-semibold text-black"
						>
							Explore More
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
