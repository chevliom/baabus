"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/Accordion";
import { Checkbox } from "@/ui/Checkbox";
import {
	AllCategoriesByAnima1,
	FrameByAnima,
	CategoryProvider,
	useCategory,
} from "@/app/productlist/components/AllCategoriesByAnima1";
import { HeaderSection } from "@/app/sections/HeaderSection";

const ResultCount = () => {
	const { categories, selectedCategoryId, loading, filters } = useCategory();
	const edges = selectedCategoryId
		? categories.find((c) => c.node.id === selectedCategoryId)?.node.products.edges ?? []
		: categories.flatMap((c) => c.node.products.edges);

	const count = edges.filter(({ node }) => {
		const price = node.pricing?.priceRange?.start?.gross?.amount ?? 0;
		const rating = node.averageRating ?? 0;
		return (
			price >= filters.minPrice &&
			price <= filters.maxPrice &&
			rating >= filters.minRating
		);
	}).length;
	return (
		<div className="mt-4 font-[Poppins] text-lg font-medium text-gray-900 sm:ml-2 sm:text-xl">
			Showing {count} Results
		</div>
	);
};

export const AllProductOption = (): JSX.Element => (
	<CategoryProvider>
		<AllProductOptionInner />
	</CategoryProvider>
);

export const AllProductOptionInner = (): JSX.Element => {
	const { filters, setFilters } = useCategory();
	const { minPrice, maxPrice, minRating } = filters;
	const minLimit = 0;
	const maxLimit = 2000;

	const ratingOptions = [
		{ value: "5.0", label: "5.0" },
		{ value: "4.0", label: "4.0 & up" },
		{ value: "3.0", label: "3.0 & up" },
		{ value: "2.0", label: "2.0 & up" },
		{ value: "1.0", label: "1.0 & up" },
	];

	return (
		<div className="min-h-screen w-full bg-white">
			<HeaderSection />
			<div className="relative mt-24 flex items-center justify-center h-[180px] w-full bg-[url(/image.png)] bg-cover bg-center sm:h-[219px]">
				<h1 className="absolute left-1/2 top-12 -translate-x-1/2 transform text-4xl font-normal text-[#ea518f] [font-family:'Baloo',Helvetica] sm:text-8xl">Category</h1>
				<Image className="absolute left-4 top-0 h-auto w-28 object-cover sm:w-40 hidden md:block" alt="Left" src="/image-71.png" width={160} height={211} priority />
				<Image className="absolute right-4 top-0 h-auto w-28 object-cover sm:w-40 hidden md:block" alt="Right" src="/image-71.png" width={160} height={211} priority />
			</div>

			<div className="flex flex-col px-4 sm:flex-row sm:gap-6">
				<div className="mt-8 w-full sm:w-[242px]">
					<AllCategoriesByAnima1 />

					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="price" className="border-b-0 border-t border-[#E5E5E5]">
							<AccordionTrigger className="py-5 text-lg font-medium text-[#1A1A1A]">Price</AccordionTrigger>
							<AccordionContent className="py-2">
								<div className="mb-8">
									<div className="relative h-2 rounded-full bg-[#F2F2F2]">
										<div
											className="absolute top-0 h-2 bg-[#EA518F] rounded-full"
											style={{
												left: `${((minPrice - minLimit) / (maxLimit - minLimit)) * 100}%`,
												width: `${((maxPrice - minPrice) / (maxLimit - minLimit)) * 100}%`,
											}}
										/>
									</div>
									<div className="relative -mt-2">
										<input
											type="range"
											min={minLimit}
											max={maxLimit}
											value={minPrice}
											onChange={(e) =>
												setFilters((f) => ({
													...f,
													minPrice: Math.min(Number(e.target.value), f.maxPrice - 50),
												}))
											}
											className="thumb-range absolute w-full appearance-none bg-transparent z-30 pointer-events-auto"
										/>
										<input
											type="range"
											min={minLimit}
											max={maxLimit}
											value={maxPrice}
											onChange={(e) =>
												setFilters((f) => ({
													...f,
													maxPrice: Math.max(Number(e.target.value), f.minPrice + 50),
												}))
											}
											className="thumb-range absolute w-full appearance-none bg-transparent z-20 pointer-events-auto"
										/>
									</div>
								</div>
								<div className="text-sm text-[#4C4C4C]">
									Price: <span className="ml-1 font-medium text-[#191919]">₹{minPrice} — ₹{maxPrice}</span>
								</div>

								<style jsx>{`
									.thumb-range::-webkit-slider-thumb {
									-webkit-appearance: none;
									appearance: none;
									height: 18px;
									width: 18px;
									border-radius: 50%;
									background: white;
									border: 2px solid #EA518F;
									margin-top: -6px;
									cursor: pointer;
									position: relative;
									z-index: 50;
									}
									.thumb-range::-moz-range-thumb {
									height: 18px;
									width: 18px;
									border-radius: 50%;
									background: white;
									border: 2px solid #EA518F;
									cursor: pointer;
									z-index: 20;
									}
									.thumb-range::-webkit-slider-runnable-track,
									.thumb-range::-moz-range-track {
									height: 2px;
									background: transparent;
									z-index: 20;
									}
                  `}</style>
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="rating" className="border-0">
							<AccordionTrigger className="py-5 text-lg font-medium text-[#1A1A1A]">Rating</AccordionTrigger>
							<AccordionContent>
								{ratingOptions.map((option, index) => (
									<div key={option.value} className={`flex items-center gap-2 py-2.5 ${index === ratingOptions.length - 1 ? "pb-6" : ""}`}>
										<Checkbox
											id={`rating-${option.value}`}
											checked={minRating === Number(option.value)}
											onCheckedChange={() =>
												setFilters((f) => ({
													...f,
													minRating: f.minRating === Number(option.value) ? 0 : Number(option.value),
												}))
											}
											className="h-5 w-5 rounded-[3px] border data-[state=checked]:bg-[#00B207] data-[state=unchecked]:bg-white"
										/>
										<label htmlFor={`rating-${option.value}`} className="flex items-center gap-2 cursor-pointer">
											{Array.from({ length: 5 }, (_, i) => (
												<Image
													key={i}
													src={i < Number(option.value) ? "/star-6.svg" : "/star-outline.svg"}
													alt="Star"
													width={15}
													height={14}
													className="h-[14px] w-[15px]"
												/>
											))}
											<span className="text-sm text-[#1A1A1A]">{option.label}</span>
										</label>
									</div>
								))}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>

				<div className="mt-6 flex-1">
					<ResultCount />
					<FrameByAnima />
				</div>
			</div>
		</div>
	);
};
