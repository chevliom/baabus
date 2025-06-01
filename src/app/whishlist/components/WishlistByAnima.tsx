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
		stockStatusBg: "#f7bfd5",
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
		stockStatusBg: "#f7bfd5",
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
						buttonTextColor: "text-gray-scalewhite",
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
										<span className={`${item.buttonTextColor} font-body-small-body-small-600`}
											onClick={() => {
												if (item?.variantId) addToCart(item?.variantId.toString());
											}}
										>
											Add to Cart
										</span>
									</Button>
									<button >
										<X className="h-6 w-6" onClick={() => {
											if (item?.variantId) deleteWithlist(item?.variantId.toString());
										}} />
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

				{/* Footer */}
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
