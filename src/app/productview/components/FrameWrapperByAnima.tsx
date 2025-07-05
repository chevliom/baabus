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
		<section className="mx-auto w-full max-w-[1303px] py-8">
			<h2 className="mb-8 text-center font-['Poppins',Helvetica] text-4xl font-normal text-black">
				Related Products
			</h2>

			<div className="flex flex-wrap justify-center gap-20">
				{products.map((product: any) => {
					const variant = product.productVariants.edges?.[0]?.node;
					const image = variant?.images?.[0]?.url || "/image-7.png";
					const price = product.pricing?.priceRange?.start?.gross?.amount || 0;
					console.log("Product Data:", product);
					const background = "/image-6.png";

					return (
						<Card
							key={product.id}
							onClick={() => router.push(`/productlist?id=${product.category?.id}`)}
							className="w-[336px] overflow-hidden rounded-[10px] shadow-[0px_4px_4px_#00000040]"
						>
							<CardContent className="p-0">
								<div className="relative">
									<div
										className="relative h-60 w-full bg-cover bg-center"
										style={{ backgroundImage: `url(${background})` }}
									>
										<button
											className="absolute right-4 top-4 z-10"
											onClick={() => setLiked(!liked)}
										>
											<Image
												src={liked ? "/redheart.png" : "/whiteheart.png"}
												alt="Heart"
												className="transition duration-200 ease-in-out"
												width={24}
												height={24}
											/>
										</button>

										<Image
											className="mx-auto object-contain px-4 py-6"
											alt={product.name}
											src={image}
											width={240}
											height={240}
										/>
									</div>

									<div className="p-2">
										<h3 className="mt-2 font-['Poppins',Helvetica] text-xl font-semibold text-[#36061a]">
											{product.name}
										</h3>

										<div className="mt-2 flex items-center">
											<Image
												className="h-4 w-4"
												alt="Star Icon"
												src="/star-6.svg"
												width={16} // 1rem = 16px
												height={16}
											/>
											<span className="ml-2 font-['Poppins',Helvetica] text-xs font-light text-[#00000066]">
												{product.averageRating}
											</span>
											<span className="ml-1 font-['Poppins',Helvetica] text-xs font-light text-[#00000066]">
												({product.reviews} Reviews)
											</span>
										</div>

										<div className="mt-2 flex items-center justify-between">
											<span className="font-['Poppins',Helvetica] text-xl font-bold text-black">
												Rs {price}
											</span>
										</div>

										<div className="mb-2 mt-4 flex justify-between">
											<Button
												variant="outline"
												className="h-10 w-[120px] rounded-[10px] border-[#ea518f] font-['Baloo',Helvetica] text-[13px] font-bold text-[#ea518f]"
											>
												Add To Cart
											</Button>

											<Button className="h-10 w-[120px] rounded-[10px] bg-[#ea518f] font-['Baloo',Helvetica] text-[13px] font-bold text-white hover:text-[#ea518f] shadow-[0px_4px_4px_#00000040]">
												Buy Now
											</Button>
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
