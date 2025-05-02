"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/ui/Button";
import { Card, CardContent } from "@/ui/Card";

interface RelatedProduct {
	id: number;
	title: string;
	rating: number;
	reviews: string;
	price: string;
	image: string;
	imageBackground: string;
}

export const FrameWrapperByAnima = (): JSX.Element => {
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
			image: "/.png",
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
				{relatedProducts.map((product) => (
					<Card
						key={product.id}
						className="w-[336px] overflow-hidden rounded-[10px] shadow-[0px_4px_4px_#00000040]"
					>
						<CardContent className="p-0">
							<div className="relative">
								<div
									className="relative h-60 w-full bg-cover bg-center"
									style={{ backgroundImage: `url(${product.imageBackground})` }}
								>
									<button aria-label="Add to Wishlist" className="absolute right-[15px] top-[19px] z-10">
										<Image className="h-[30px] w-[30px]" alt="Heart Icon" src="/mdi_heart.svg" />
									</button>

									<Image
										className="mx-auto object-contain"
										alt={product.title}
										src={product.image}
										width={240} // You can adjust based on layout
										height={240} // Matches h-[240px]
									/>
								</div>

								<div className="p-2">
									<h3 className="mt-2 font-['Poppins',Helvetica] text-xl font-semibold text-[#36061a]">
										{product.title}
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
											{product.rating}
										</span>
										<span className="ml-1 font-['Poppins',Helvetica] text-xs font-light text-[#00000066]">
											({product.reviews} Reviews)
										</span>
									</div>

									<div className="mt-2 flex items-center justify-between">
										<span className="font-['Poppins',Helvetica] text-xl font-bold text-black">
											{product.price}
										</span>
									</div>

									<div className="mb-2 mt-4 flex justify-between">
										<Button
											variant="outline"
											className="h-10 w-[120px] rounded-[10px] border-[#ea518f] font-['Baloo-Regular',Helvetica] text-[13px] text-[#ea518f]"
										>
											Add To Cart
										</Button>

										<Button className="h-10 w-[120px] rounded-[10px] bg-[#ea518f] font-['Baloo-Regular',Helvetica] text-[13px] text-white shadow-[0px_4px_4px_#00000040]">
											Buy Now
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
};
