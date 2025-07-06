"use client";

import { HeartIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { fetchTrendingProducts } from "@/lib/graphqlClient";
import { useRouter } from 'next/navigation';

export const CallToActionSection = (): JSX.Element => {
	const [isFavorited, setIsFavorited] = useState<boolean>(false);
	const router = useRouter();

	const products = [
		{
			id: 3,
			name: "",
			price: "",
			mainImage: "",
			overlayImage: "/overlay-1.png",
			position: { top: 0, left: 905 },
			categoryId: "",
		},
		{
			id: 2,
			name: "",
			price: "",
			mainImage: "",
			overlayImage: "/overlay-2.png",
			position: { top: 100, left: 451 },
			categoryId: "",
		},
		{
			id: 1,
			name: "",
			price: "",
			mainImage: "",
			overlayImage: "/overlay-3.png",
			position: { top: 0, left: 0 },
			categoryId: "",
		},
	];

	const [finalCards, setFinalCards] = useState(products);

	useEffect(() => {
		(async () => {
			const apiProducts = await fetchTrendingProducts();

			const updated = products.map((card, index) => {
				const apiCard = apiProducts[index + 4];
				if (!apiCard) return card;
				const firstMedia = apiCard.media?.[0]?.url ?? card.mainImage;
				const grossObj = apiCard.pricing?.priceRange?.start?.gross;
				const categoryId = apiCard.category?.id ?? null;

				const price = grossObj
					? `${grossObj.currency} ${grossObj.amount}`
					: card.price;

				return {
					...card,
					name: apiCard.name,
					mainImage: firstMedia,
					price,
					categoryId
				};
			});

			setFinalCards(updated);
		})();
	}, []);



	return (
		<section className="relative mx-auto w-full p-4 md:p-12 lg:p-16">
			<div className="mb-4 lg:mb-12">
				<p className="font-baloo text-2xl font-extrabold text-[#ea518f]">Our Products</p>
				<h2 className="mt-0 md:mt-2 font-baloo md:text-3xl lg:text-5xl font-extrabold">
					<span className="text-[#ea518f]">Our </span>
					<span className="text-[#5398d9]">Best Sellers</span>
					<span className="text-[#ea518f]"> Products</span>
				</h2>
			</div>

			<div className="relative w-full">
				<div className="grid grid-cols-3 gap-5 md:gap-10 md:grid-cols-3 lg:grid-cols-3">
					{finalCards.map((product, index) => (
						<div
							onClick={() => router.push(`/productlist?id=${product.categoryId}`)}
							key={product.id}
							className={`relative h-[200px] md:h-[433px] w-full transition-transform duration-300 ease-in-out hover:scale-105 ${index === 1 ? "mt-10 lg:mt-20" : "mt-0"}`}
						>
							<Card className="h-[135px] md:h-[90%] lg:h-[394px] w-full border-0 shadow-none rounded-xl cursor-pointer ">
								<CardContent className="relative p-0">
									<div className="relative h-[110px] md:h-[358px] w-full overflow-hidden shadow-lg rounded-xl mb-[10px]">
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
												className="object-contain px-2 py-2 md:px-10 md:py-10"
												alt={product.name}
												src={product.mainImage}
												fill
												sizes=""
											/>
										</div>
									</div>
									<h3 className="mt-2 font-baloo text-[12px] md:text-[18px] lg:text-2xl font-semibold text-black">{product.name}</h3>
								</CardContent>
							</Card>
							<div className="w-full mt-3 overflow-x-auto scrollbar-hide hidden md:block lg:block xl:block">
								<div className="flex justify-start gap-2 md:gap-4 whitespace-nowrap">
									{["Safe & Secure", "Sturdy Design", "Built-in Toys"].map((text, i) => (
										<span
											key={i}
											className="font-baloo text-[13px] md:text-[16px] lg:text-lg font-bold text-[#37061A] bg-pink-100 px-4 py-1.5 rounded-full border border-dashed border-black"
										>
											{text}
										</span>
									))}
								</div>
							</div>

						</div>
					))}
				</div>

				<div className="absolute -right-[10px] md:-right-[30px] lg:-right-[5px] top-[245px] sm:top-[210px] md:top-[450px] lg:top-[500px]">
					<div className="h-full w-full" style={{ transform: "scaleX(-1)" }}>
						<Image
							className="object-cover w-[70px] md:w-[200px] sm:w-[160px]"
							alt="Decorative image (mirrored)"
							src="/image-44-3.png"
							width={290}
							height={200}
						/>
					</div>
				</div>

				<div className="md:mt-12 flex justify-center">
					<Button
						onClick={() => router.push('/productlist')}
						style={{
							backgroundColor: "rgba(248, 191, 214, 1)",
							color: "rgba(151, 18, 72, 1)",
						}}
						className="rounded-[30px] md:p-6 p-4 text-[12px] md:text-2xl shadow-[0px_4px_4px_#00000040] mb-[20px] transition-colors duration-300 hover:bg-[#ea518f] hover:text-white"
					>
						View All Products
					</Button>
				</div>
			</div>
		</section>
	);
};
