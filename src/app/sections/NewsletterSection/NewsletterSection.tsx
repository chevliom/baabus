import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { useRouter } from 'next/navigation';
import { fetchTrendingProducts } from "@/lib/graphqlClient";

// Product card data
const productCards = [
	{
		id: 1,
		title: "",
		titleColor: "#ea518f",
		buttonColor: "#f188b2",
		bgColor: "bg-[#fce6ec]",
		mainImage: "",
		secondaryImage: "/image-44-3.png",
		categoryId: "",
	},
	{
		id: 2,
		title: "",
		titleColor: "#3587d3",
		buttonColor: "#6ca7df",
		bgColor: "bg-[#d9e8f6]",
		mainImage: "",
		secondaryImage: "/image-33.png",
		categoryId: "",
	},
	{
		id: 4,
		title: "",
		titleColor: "#3587d3",
		buttonColor: "#6ca7df",
		bgColor: "bg-[#d9e8f6]",
		mainImage: "",
		secondaryImage: "/image-39.png",
		categoryId: "",
	},
	{
		id: 3,
		title: "",
		titleColor: "#f188b2",
		buttonColor: "#f188b2",
		bgColor: "bg-[#fce6ec]",
		mainImage: "",
		secondaryImage: "/image-36.png",
		categoryId: "",
	},
];

// Decorative elements
const decorativeImages = [
	{
		src: "/image-46.png",
		width: "w-[202px]",
		height: "h-[202px]",
		position: "top-[70%] left-[10%]",
	},
	{
		src: "/image-43.png",
		width: "w-[215px]",
		height: "h-[218px]",
		position: "top-[50px] right-[10%]",
	},
	{
		src: "/image-42.png",
		width: "w-[318px]",
		height: "h-[354px]",
		position: "top-0 left-0",
	},
	{
		src: "/image-45.png",
		width: "w-[244px]",
		height: "h-[244px]",
		position: "bottom-[40px] right-[5%]",
	},
	{
		src: "/image-40.png",
		width: "w-[278px]",
		height: "h-[290px]",
		position: "top-[100px] right-0",
	},
	{
		src: "/image-41.png",
		width: "w-[98px]",
		height: "h-[134px]",
		position: "bottom-[0px] left-[0px]",
	},
];
type CardData = {
	id: string;
	title: string;
	mainImage: string;
	secondaryImage?: string;
	titleColor: string;
	buttonColor: string;
	bgColor: string;
};

export const NewsletterSection = (): JSX.Element => {
	const router = useRouter();

	const [finalCards, setFinalCards] = useState(productCards);

	useEffect(() => {
		(async () => {
			const apiProducts = await fetchTrendingProducts();
			const updated = productCards.map((card, index) => ({
				...card,
				title: apiProducts?.[index]?.name ?? "Coming Soon!",
				mainImage: apiProducts?.[index]?.media?.[0]?.url ?? "/fallback.png",
				categoryId: apiProducts?.[index]?.category?.id ?? "",
			}));
			setFinalCards(updated);
		})();
	}, []);

	console.log("Final Cards:", finalCards);

	return (
		<section className="font-baloo relative w-full overflow-hidden bg-white pb-32 pt-10 font-extrabold">
			{/* Decorative images */}
			{decorativeImages.map((img, i) => (
				<img
					key={i}
					src={img.src}
					alt="Decorative"
					className={`absolute ${img.width} ${img.height} ${img.position} z-0 object-contain`}
				/>
			))}

			{/* Overlay */}
			<div className="pointer-events-none absolute inset-0 z-10  bg-white bg-opacity-50" />

			{/* Content */}
			<div className="relative z-20 mx-auto md:h-[943px] auto max-w-[858px] px-4">
				<div className="grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-2">
					{finalCards.map((product, index) => {
						const isPink = product.bgColor === "bg-[#fce6ec]";
						const cardSize = isPink ? "w-full h-[230px] md:w-[350px] md:h-[300px] lg:w-[400px] lg:h-[420px]" : "w-full h-[320px] md:w-[350px] md:h-[400px] lg:w-[400px] lg:h-[500px]";
						const secondRow = product.id === 4 ? "-mt-24" : "";

						return (
							<Card
								key={product.id}
								className={`relative ${product.bgColor} ${cardSize} overflow-hidden rounded-[40px] ${secondRow}`}
							>
								<CardContent className="relative h-full w-full p-0">
									<div
										className="absolute text-[16px] left-4 top-4 md:text-[24px] leading-tight lg:text-[26px]"
										style={{ color: product.titleColor }}
									>
										{product.title}
									</div>
									<div className="flex justify-center items-center h-full w-full">
										<img
											className="h-[167px] w-[127px] md:h-[230px] md:w-[230px] lg:h-[300px] lg:w-[300px] xl:w-[250px] xl:h-[250px] object-contain"
											alt="Main product"
											src={product.mainImage}
										/>
									</div>
									{index === 0 && (
										<img
											className="absolute bottom-[0px] left-[260px] z-10 h-[120px] w-[120px] object-contain"
											alt="Decoration"
											src="/image-44-3.png"
										/>
									)}
									{index === 1 && (
										<img
											src="/image-33.png"
											alt="Flying Flower"
											className="hidden md:block absolute -bottom-0 -right-[11px] md:-right-[18px] w-[90px] h-[90px] md:w-[170px] md:h-[170px] object-contain z-20 rotate-[280deg]"
										/>
									)}
									{index === 2 && (
										<img
											src="/image-39.png"
											alt="Flying Flower"
											className="hidden md:block absolute -bottom-4 -right-[11px] md:-right-[10px] w-[90px] h-[90px] md:w-[200px] md:h-[200px] object-contain z-20"
										/>
									)}

									{index === 3 && (
										<img
											src="/image-36.png"
											alt="Flying Flower"
											className="hidden md:block absolute -bottom-6 -right-[11px] md:-right-[30px] w-[90px] h-[90px] md:w-[160px] md:h-[160px] object-contain z-20"
										/>
									)}

									<Button
										onClick={() => router.push(`/productlist?id=${product.categoryId}`)}
										className="font-baloo absolute bottom-[25px] left-[24px] md:h-[40px] md:w-[140px] lg:h-[67px] lg:w-[168px] rounded-[20px] text-xl font-extrabold text-white"
										style={{ backgroundColor: product.buttonColor }}
									>
										Shop Now!
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
};
