"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/ui/Button";
import { Card, CardContent } from "@/ui/Card";
import { useRouter } from "next/navigation";

interface RelatedProduct {
	id: number;
	title: string;
	rating: number;
	reviews: string;
	price: string;
	image: string;
	imageBackground: string;
}

export const FrameWrapperByAnima = ({ products = [] }: { products: any[] }): JSX.Element => {
	const [liked, setLiked] = useState(false);
	const router = useRouter();
	const relatedProducts: RelatedProduct[] = [
		{
			id: 1,
			title: "BAABUS DISCOVER Kick Scooter",
			rating: 5.0,
			reviews: "1.2k",
			price: "Rs 725.00",
			image: "/image-7.png",
			imageBackground: "/image-6.png",
		},
		{
			id: 2,
			title: "BAABUS DISCOVER Kick Scooter",
			rating: 5.0,
			reviews: "1.2k",
			price: "Rs 725.00",
			image: "/image-60-2.png",
			imageBackground: "/image-6.png",
		},
		{
			id: 3,
			title: "BAABUS DISCOVER Kick Scooter",
			rating: 5.0,
			reviews: "1.2k",
			price: "Rs 725.00",
			image: "/image-44.png",
			imageBackground: "/image-6.png",
		},
	];

	return (
		<section className="mx-auto w-full max-w-[1303px] py-8 mt-10">
			<h2 className="mb-8 text-center font-['Poppins',Helvetica] text-4xl font-normal text-black">
				Related Products
			</h2>

			<div className="flex flex-wrap justify-center gap-20">
				{products.map((product: any) => {
					const variant = product.productVariants.edges?.[0]?.node;
					const image = variant?.images?.[0]?.url || "/image-7.png";
					const price = product.pricing?.priceRange?.start?.gross?.amount || 0;
					const background = "/image-6.png";

					return (
						<Card
							key={product.id}
							onClick={() => router.push(`/productlist?id=${product.category?.id}`)}
							className="w-[336px] overflow-hidden rounded-[10px] shadow-[0px_4px_4px_#00000040] cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-[0px_6px_6px_#00000040] md:w-[336px] lg:w-[336px] xl:w-[336px] 2xl:w-[336px]"
						>
							<CardContent className="p-0">
								<div className="relative">
									{/* Background with product image */}
									<div
										className="relative h-60 w-full bg-cover bg-center"
										style={{ backgroundImage: `url(${background})` }}
									>
										<Image
											className="mx-auto object-contain px-4 py-6"
											alt={product.name}
											src={image}
											width={240}
											height={240}
										/>
									</div>

									{/* Product details */}
									<div className="p-2">
										<h3 className="text-[15px] font-bold uppercase text-[#37061A] font-[Poppins] line-clamp-2">
											{product.name}
										</h3>

										<div className="flex items-center justify-between w-full mt-1">
											<div className="flex items-center gap-1 text-xs">
												<Image src="/star-6.svg" alt="Star" width={14} height={14} />
												<span className="text-[13px] text-[#4C4C4C]">
													{Number(product.averageRating ?? 0).toFixed(1)}
												</span>
												<span className="text-[13px] text-[#B0B0B0]">Rating</span>
											</div>

											<span className="text-[18px] font-bold text-[#000000] font-[Poppins]">
												Rs {product.pricing?.priceRange?.start?.gross?.amount ?? "N/A"}
											</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}

			</div>
		</section>
	);
};
