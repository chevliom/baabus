"use client";

import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/Accordion";

export const AllCategoriesByAnima = (): JSX.Element => {
	const categories = [
		{ name: "Kick Scooter", count: 134 },
		{ name: "Kick Scooter", count: 150 },
		{ name: "Kick Scooter", count: 54 },
		{ name: "Kick Scooter", count: 47 },
		{ name: "Kick Scooter", count: 43 },
		{ name: "Kick Scooter", count: 38 },
		{ name: "Kick Scooter", count: 15 },
	];

	const [selectedCategory, setSelectedCategory] = useState("1");
	const [openItem, setOpenItem] = useState("categories");

	return (
		<div className="flex w-full flex-col items-start">
			<Accordion
				type="single"
				collapsible
				value={openItem}
				onValueChange={(value) => setOpenItem(value)}
				className="w-full"
			>
				<AccordionItem value="categories" className="border-0">
					<AccordionTrigger
						className="px-0 py-5 font-[Poppins] text-[20px] font-medium leading-[30px] tracking-[0px] text-[#1A1A1A]"
						onClick={(e) => {
							// prevent default toggle behavior
							e.preventDefault();
							setOpenItem(openItem === "categories" ? "categories" : "categories");
						}}
					>
						All Categories
					</AccordionTrigger>

					<AccordionContent className="space-y-4 pt-4">
						{categories.map((category, index) => (
							<div key={index} className="flex items-center gap-3">
								<div className="relative h-[12px] w-[12px]">
									<input
										type="radio"
										id={`category-${index}`}
										name="category"
										value={index.toString()}
										checked={selectedCategory === index.toString()}
										onChange={() => setSelectedCategory(index.toString())}
										className="peer absolute h-full w-full cursor-pointer opacity-0"
									/>
									<div
										className={`h-full w-full rounded-full border-2 transition-colors 
                      ${selectedCategory === index.toString() ? "border-[#EA518F]" : "border-[#CCCCCC]"}`}
									/>
									{selectedCategory === index.toString() && (
										<div className="absolute left-[2px] top-[2px] h-[8px] w-[8px] rounded-full bg-[#EA518F]" />
									)}
								</div>

								<label
									htmlFor={`category-${index}`}
									className="flex cursor-pointer items-center gap-1 font-[Poppins] text-[16px] font-normal leading-[24px] text-[#1A1A1A]"
								>
									{category.name}
									<span className="text-[#666666]">({category.count})</span>
								</label>
							</div>
						))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
