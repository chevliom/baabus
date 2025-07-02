"use client";

import { HeartIcon } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

export const CallToActionSection = (): JSX.Element => {
	const [isFavorited, setIsFavorited] = useState<boolean>(false);

	// Product data for mapping
	const products = [
		{
			id: 3,
			name: "Bus Water Bottle With Strap For Kids",
			price: "Rs 890",
			mainImage: "/image-38.png",
			overlayImage: "/overlay-1.png",
			position: { top: 0, left: 905 },
		},
		{
			id: 2,
			name: "BAABUS DISCOVER Kick Scooter",
			price: "Rs 890",
			mainImage: "/image-bus.png",
			overlayImage: "/overlay-2.png",
			position: { top: 100, left: 451 },
		},
		{
			id: 1,
			name: "BAABUS Magic Swing Car",
			price: "Rs 890",
			mainImage: "/image-35.png",
			overlayImage: "/overlay-3.png",
			position: { top: 0, left: 0 },
		},
	];

	return (
		<section className="relative mx-auto w-full max-w-[1396px] pl-4 pr-4 md:pb-16 lg:pb-20 pt-8 md:pl-4 md:pr-4">
			<div className="mb-12">
				<p className="font-baloo text-2xl font-extrabold text-[#ea518f]">Our Products</p>
				<h2 className="mt-0 md:mt-2 font-baloo md:text-3xl lg:text-5xl font-extrabold">
					<span className="text-[#ea518f]">Our </span>
					<span className="text-[#5398d9]">Best Sellers</span>
					<span className="text-[#ea518f]"> Products</span>
				</h2>
			</div>

			<div className="relative w-full">
				<div className="grid grid-cols-3 gap-5 md:grid-cols-3 lg:grid-cols-3">
					{products.map((product, index) => (
						<div
							key={product.id}
							className={`relative h-[200px] md:h-[433px] w-full ${index === 1 ? "mt-10 lg:mt-20" : "mt-0"}`}
						>
							<Card className="h-[154px] md:h-[96%] lg:h-[394px] w-full border-0 shadow-none">
								<CardContent className="relative p-0">
									<div className="relative h-[110px] md:h-[358px] w-full overflow-hidden">
										<div className="pointer-events-none absolute inset-0 z-0">
											<Image
												className="rounded-xl object-cover"
												alt={`${product.name} background`}
												src={product.overlayImage}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											/>
										</div>

										{/* Main Product Image on top */}
										<div className="relative z-10 h-full w-full">
											<Image
												className="object-contain"
												alt={product.name}
												src={product.mainImage}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												priority
											/>
										</div>

										{/* Favorite button on top */}
										<button
											className="absolute right-3 top-3 md:right-7 md:top-7 z-20 flex h-[20px] w-[20px] md:h-[30px] md:w-[30px] items-center justify-center border-none"
											onClick={() => setIsFavorited(!isFavorited)}
											aria-label="Toggle favorite"
										>
											<HeartIcon
												className="h-[30px] w-[30px] transition-colors duration-200"
												color={isFavorited ? "red" : "white"}
												fill={isFavorited ? "red" : "white"}
											/>
										</button>
									</div>
									<h3 className="mt-2 font-baloo text-[12px] md:text-[18px] lg:text-2xl font-extrabold text-black">{product.name}</h3>
								</CardContent>
							</Card>
							<p className="mt-1 font-baloo text-[14px] md:text-[18px] lg:text-2xl font-extrabold text-black">{product.price}</p>
						</div>
					))}
				</div>

				<div className="absolute right-0 -mt-14 md:-mt-24 h-[110px] w-[110px] md:h-[200px] md:w-[290px]">
					<div className="h-full w-full" style={{ transform: "scaleX(-1)" }}>
						<Image
							className="object-cover w-[100px] md:w-[200px]"
							alt="Decorative image (mirrored)"
							src="/image-44-3.png"
							width={290}
							height={200}
						/>
					</div>
				</div>

				<div className="mt-12 flex justify-center">
					<Button
						style={{
							backgroundColor: "rgba(248, 191, 214, 1)",
							color: "rgba(151, 18, 72, 1)",
						}}
						className="rounded-[30px] md:p-6 p-4 text-[12px] md:text-2xl shadow-[0px_4px_4px_#00000040] mb-[20px]"
					>
						View All Products
					</Button>
				</div>
			</div>
		</section>
	);
};
