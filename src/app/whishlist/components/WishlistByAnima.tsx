"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { Separator } from "@/ui/components/separator";
import { fetchWishlist } from "@/lib/graphqlClient";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

interface WishlistItem {
	id: string | number;
	variantId: string | number;
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
	items: WishlistItem[];
	onExploreMore: () => void;
};

const staticWishlistItems: WishlistItem[] = [
	{
		id: 1,
		variantId: 1,
		name: "Bus Bottle",
		image: "/image-7.png",
		price: "₹14.99",
		originalPrice: "₹20.99",
		stockStatus: "In Stock",
		stockStatusColor: "#5f0b2d",
		stockStatusBg: "#600B2E",
		buttonColor: "#ea518f",
		buttonTextColor: "text-gray-scalewhite",
		lowStock: true,
		lowStockMessage: "1 Item left, Hurry!",
	},
	{
		id: 2,
		variantId: 1,
		name: "Bus Bottle",
		image: "/image-7.png",
		price: "₹45.00",
		stockStatus: "In Stock",
		stockStatusColor: "#5f0b2d",
		stockStatusBg: "#F8BFD6",
		buttonColor: "#ea518f",
		buttonTextColor: "text-gray-scalewhite",
	},
	{
		id: 3,
		variantId: 1,
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

export function WishlistByAnima({ items, onExploreMore }: Props): JSX.Element {
	const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const deleteWithlist = async (variantId: string): Promise<void> => {
		const query = `
				mutation WishlistRemoveItem($input:WishlistRemoveItemInput!){
				wishlistRemoveItem(input: $input){
					errors{
						field
						message
					}
					wishlist{
						id
						user{
							email
						}
						items{
							id
							variant{
								id
								channel
								name
							}
						}
						
					}
					
				}
			}
	  `;

		const variables = {
			input: {
				variantId,
			},
		};

		try {
			const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Cookies.get("token") || ""}`,
				},
				body: JSON.stringify({ query, variables }),
			});

			const result: any = await response.json();

			if (result.errors?.length) {
				toast.error("Failed to delete to wishlist.");
			} else if (result.data?.wishlistRemoveItem.errors?.length) {
				toast.error(result.data.wishlistRemoveItem.errors[0].message);
			} else {
				toast.success("Delete Successfully!");
				const remainingVariants = result.data.wishlistRemoveItem.wishlist.items.map((item: any) => item.variant.id);
				setWishlistItems(prev =>
					prev.filter(item => remainingVariants.includes(item.variantId.toString()))
				);
			}
		} catch (err) {
			toast.error("Something went wrong.");
		}
	};

	useEffect(() => {
		async function loadWishlist() {
			try {
				const wishlist = await fetchWishlist();

				if (!wishlist || !wishlist.items || wishlist.items.length === 0) {
					setWishlistItems(staticWishlistItems);
				} else {
					const mapped: any = wishlist.items.map((item: any) => ({
						id: item.id,
						variantId: item?.variant?.id,
						name: item.variant?.product?.name,
						image: item?.variant?.images?.[0]?.url || "",
						price: `₹${item.variant.pricing?.price?.gross?.amount?.toFixed(2) ?? "0.00"}`,
						originalPrice: undefined,
						stockStatus: "In Stock",
						stockStatusColor: "#5f0b2d",
						stockStatusBg: "#f7bfd5",
						buttonColor: "#ea518f",
						buttonTextColor: "text-[#FFFFFF]",
					}));
					setWishlistItems(mapped);
				}
			} catch (error) {
				setWishlistItems(staticWishlistItems);
			} finally {
				setIsLoading(false);
			}
		}
		loadWishlist();
	}, []);

	const addToCart = async (variantId: string): Promise<void> => {
		const checkoutId = Cookies.get("use_checkout_id");
		const quantity = 1;

		if (!checkoutId || !variantId) {
			toast.error("Missing checkout ID or variant ID.");
			return;
		}

		const query = `
		mutation CheckoutLinesAdd($checkoutId: ID!, $lines: [CheckoutLineInput!]!) {
			checkoutLinesAdd(id: $checkoutId, lines: $lines) {
				errors {
					field
					code
					message
				}
				checkout {
					quantity
					lines {
						id
						quantity
						variant {
							id
							name
						}
					}
					totalPrice {
						gross {
							amount
							currency
						}
					}
				}
			}
		}
	`;

		const variables = {
			checkoutId,
			lines: [
				{
					quantity,
					variantId,
				},
			],
		};

		try {
			const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Cookies.get("token") || ""}`,
				},
				body: JSON.stringify({ query, variables }),
			});

			const result: any = await response.json();

			if (result.errors?.length > 0) {
				toast.error(result.errors[0]?.message || "Unexpected GraphQL error.");
				return;
			}

			const gqlErrors = result.data?.checkoutLinesAdd?.errors;
			if (gqlErrors?.length) {
				const errorMessage = gqlErrors.map((e: any) => e.message).join(", ");
				toast.error(errorMessage || "Failed to add item to cart.");
				return;
			}

			toast.success("Item added to cart!");
		} catch (err: any) {
			console.error("Network error:", err);
			toast.error("Network error while adding to cart.");
		}
	};


	return (
		<Card className="mx-auto w-[95%] max-w-[98%] rounded-xl border border-[#e6e6e6] bg-white overflow-hidden mt-10 mb-8">
			{/* Full-width top border */}
			<div className="w-full border-t border-gray-200" />

			{/* Card content */}
			<div className="">
				{/* Header */}
				<div className="md:p-4 hidden md:flex">
					<div className="w-1/2">
						<span className="text-sm font-semibold text-gray-500">PRODUCT</span>
					</div>
					<div className="w-1/4">
						<span className="text-sm font-semibold text-gray-500">PRICE</span>
					</div>
					<div className="w-1/4">
						<span className="text-sm font-semibold text-gray-500">STOCK STATUS</span>
					</div>
					<div className="w-1/4">
						<span className="text-sm font-semibold text-gray-500"></span>
					</div>
				</div>

				{/* Wishlist items */}
				{wishlistItems.map((item) => (
					<div key={item.id}>
						<div className="md:p-4 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 py-4 border-t border-gray-200 hidden md:flex">
							{/* Product Info */}
							<div className="flex items-center gap-4 md:w-1/2">
								<div className="relative h-[80px] w-[80px] md:h-[100px] md:w-[100px] flex-shrink-0">
									<Image src={item.image} alt={item.name} fill className="object-cover rounded" />
								</div>
								<span className="text-gray-900 font-medium">{item.name}</span>
							</div>

							{/* Price */}
							<div className="md:w-1/4 flex md:justify-start items-center gap-2">
								<span className="text-gray-900 font-semibold">{item.price}</span>
								{item.originalPrice && (
									<span className="text-gray-400 line-through text-sm">{item.originalPrice}</span>
								)}
							</div>

							{/* Actions */}


							<div className="md:w-1/4 flex items-center justify-between md:justify-start gap-3">
								<Badge
									className="rounded px-2 py-1"
									style={{
										backgroundColor: item.stockStatusBg,
										color: item.stockStatusColor,
									}}
								>
									<span className="text-sm">{item.stockStatus}</span>
								</Badge>
							</div>

							<div className="md:w-1/4 flex items-center justify-between md:justify-start gap-3">
								<Button
									disabled={item.stockStatus === 'Out of Stock'}
									onClick={() => {
										if (item?.variantId) addToCart(item?.variantId.toString());
									}}
									className={`rounded-full px-6 py-2 text-sm ${item.stockStatus === 'Out of Stock' ? 'bg-gray-200 text-gray-500' : ''
										}`}
									style={{
										backgroundColor: item.stockStatus !== 'Out of Stock' ? item.buttonColor : undefined,
									}}
								>
									<span className={`${item.buttonTextColor} font-semibold`}>
										Add to Cart
									</span>
								</Button>

								<button
									onClick={() => deleteWithlist(item.variantId.toString())}
									className="p-1 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-100"
									aria-label="Remove item"
								>
									<X className="h-4 w-4 text-gray-500" />
								</button>
							</div>
						</div>

						{/* Mobile Responsive */}
						<div className="md:p-4 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 py-4 border-t border-gray-200 md:hidden">
							<div className="flex items-center gap-12 md:w-1/2 ml-4">
								<div className="relative h-[80px] w-[80px] md:h-[100px] md:w-[100px] flex-shrink-0">
									<Image src={item.image} alt={item.name} fill className="object-cover rounded" />
								</div>

								<div className="gap-2 flex">
									<div className="md:w-1/4 flex items-center justify-between md:justify-start gap-3">
										<Badge
											className="rounded "
											style={{
												backgroundColor: item.stockStatusBg,
												color: item.stockStatusColor,
											}}
										>
											<span className="text-sm">{item.stockStatus}</span>
										</Badge>
									</div>

									<div className="md:w-1/4 flex items-center justify-between md:justify-start gap-3">
										<Button
											disabled={item.stockStatus === 'Out of Stock'}
											onClick={() => {
												if (item?.variantId) addToCart(item?.variantId.toString());
											}}
											className={`rounded-full  text-sm ${item.stockStatus === 'Out of Stock' ? 'bg-gray-200 text-gray-500' : ''
												}`}
											style={{
												backgroundColor: item.stockStatus !== 'Out of Stock' ? item.buttonColor : undefined,
											}}
										>
											<span className={`${item.buttonTextColor} font-semibold`}>
												Add to Cart
											</span>
										</Button>

										<button
											onClick={() => deleteWithlist(item.variantId.toString())}
											className="p-1 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-100"
											aria-label="Remove item"
										>
											<X className="h-4 w-4 text-gray-500" />
										</button>
									</div>
								</div>

							</div>

							{/* Price */}
							<div className="md:w-1/4 flex md:justify-start items-center gap-2 ml-4">
								<span className="text-gray-900 font-medium">{item.name}</span>
								<span className="text-gray-900 font-semibold">{item.price}</span>
								{item.originalPrice && (
									<span className="text-gray-400 line-through text-sm">{item.originalPrice}</span>
								)}
							</div>
						</div>

						{/* Low stock message */}
						{item.lowStock && (
							<div className="px-2 pb-4 text-sm font-medium text-green-600">
								{item.lowStockMessage}
							</div>
						)}
					</div>
				))}

				{/* Footer */}
				<div className="md:p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-4 mt-6 mb-4 md:mb-0">
					<div className="text-center md:text-left text-pink-500 text-sm md:text-base font-semibold">
						Love it? Someone else does too! Buy before it&apos;s too late.
					</div>

					<Button
						onClick={onExploreMore}
						variant="outline"
						className="bg-gray-50 rounded-full px-6 py-2 text-sm border border-gray-300"
					>
						<span className="text-gray-700 font-semibold">Explore More</span>
					</Button>
				</div>

			</div>
		</Card>




	);
}
