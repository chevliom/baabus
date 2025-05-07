"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/ui/Button";
import { Card, CardContent } from "@/ui/Card";
// Product data to map over
const products = [
	{
		id: 1,
		title: "BAABUS DISCOVER Kick Scooter",
		rating: 5.0,
		reviews: "1.2k",
		price: "Rs 725.00",
		image: "/image-7.png",
		backgroundImage: "/image-6.png",
	},
	{
		id: 2,
		title: "BAABUS DISCOVER Kick Scooter",
		rating: 5.0,
		reviews: "1.2k",
		price: "Rs 725.00",
		image: "/image-60-2.png",
		backgroundImage: "/image-6.png",
	},
	{
		id: 3,
		title: "BAABUS DISCOVER Kick Scooter",
		rating: 5.0,
		reviews: "1.2k",
		price: "Rs 725.00",
		image: "/image-44.png",
		backgroundImage: "/image-6.png",
	},
	{
		id: 4,
		title: "BAABUS DISCOVER Kick Scooter",
		rating: 5.0,
		reviews: "1.2k",
		price: "Rs 725.00",
		image: "/image-60-2.png",
		backgroundImage: "/image-6.png",
	},
	{
		id: 5,
		title: "BAABUS DISCOVER Kick Scooter",
		rating: 5.0,
		reviews: "1.2k",
		price: "Rs 725.00",
		image: "/image-44-1.png",
		backgroundImage: "/image-6.png",
	},
	{
		id: 6,
		title: "BAABUS DISCOVER Kick Scooter",
		rating: 5.0,
		reviews: "1.2k",
		price: "Rs 725.00",
		image: "/image-44-2.png",
		backgroundImage: "/image-6.png",
	},
];

export const FrameByAnima = (): JSX.Element => {
	const [liked, setLiked] = useState(false);

	return (
		<div className="flex w-full justify-center py-8 pr-24">
			<div className="grid w-[1100px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<Card
						key={product.id}
						className="w-full overflow-hidden rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
					>
						<div
							className="relative h-[240px] bg-cover bg-center"
							style={{ backgroundImage: `url(${product.backgroundImage})` }}
						>
							<button
								className="absolute right-4 top-4 z-10"
								onClick={() => setLiked(!liked)} // Toggle liked state on click
							>
								<Image
									src={liked ? "/redheart.png" : "/whiteheart.png"}
									alt="Heart"
									className="transition duration-200 ease-in-out"
									width={24}
									height={24}
								/>
							</button>

							<div className="flex h-full items-center justify-center">
								<Image
									src={product.image}
									alt={product.title}
									className="object-contain"
									width={180}
									height={180}
								/>
							</div>
						</div>
						<CardContent className="p-5">
							<h3 className="mb-2 font-['Poppins'] text-lg font-semibold leading-snug text-[#36061a]">
								{product.title}
							</h3>
							<div className="mb-3 flex items-center">
								<Image
									className="mr-1 h-4 w-4"
									alt="Star"
									src="/star-6.svg"
									width={16} // w-4 = 1rem = 16px
									height={16} // h-4 = 1rem = 16px
								/>
								<span className="mr-1 font-['Poppins'] text-xs font-light text-[#00000066]">
									{product.rating}
								</span>
								<span className="font-['Poppins'] text-xs font-light text-[#00000066]">
									({product.reviews} Reviews)
								</span>
								<span className="ml-auto font-['Poppins'] text-base font-bold text-black">
									{product.price}
								</span>
							</div>
							<div className="flex gap-3">
								<Button
									variant="outline"
									className="h-9 flex-1 rounded-[10px] border-[#ea518f] font-['Baloo'] text-sm font-bold text-[#ea518f]"
								>
									Add To Cart
								</Button>
								<Button className="h-9 flex-1 rounded-[10px] bg-[#ea518f] font-['Baloo'] text-sm font-bold text-white shadow-md">
									Buy Now
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};
