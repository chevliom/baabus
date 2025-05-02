"use client";

import React from "react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/Accordion";
import { Checkbox } from "@/ui/Checkbox";
import { AllCategoriesByAnima } from "@/app/category/components/AllCategoriesByAnima";
import { BarByAnima } from "@/app/category/components/BarByAnima";
import { FrameByAnima } from "@/app/category/components/FrameByAnima";

export const AllCategoryOption = (): JSX.Element => {
	// Rating options data
	const ratingOptions = [
		{ value: "5.0", label: "5.0", checked: false },
		{ value: "4.0", label: "4.0 & up", checked: true },
		{ value: "3.0", label: "3.0 & up", checked: false },
		{ value: "2.0", label: "2.0 & up", checked: false },
		{ value: "1.0", label: "1.0 & up", checked: false },
	];

	return (
		<div className="relative min-h-screen w-full bg-white" data-model-id="870:5170">
			<BarByAnima />

			{/* Hero Banner */}
			<div className="relative h-[219px] w-full bg-[url(/image.png)] bg-cover bg-[50%_50%]">
				<h1 className="absolute left-1/2 top-[33px] -translate-x-1/2 transform text-8xl font-normal leading-[normal] tracking-[0] text-[#ea518f] [font-family:'Baloo',Helvetica]">
					Category
				</h1>

				<Image
					className="absolute right-[22px] top-0 object-cover"
					alt="Decorative image"
					src="/image-71.png"
					width={160} // same as w-40 (10rem)
					height={211} // matches h-[211px]
					priority // optional: preload for performance if above-the-fold
				/>

				<Image
					className="absolute right-[22px] top-0 object-cover"
					alt="Decorative image"
					src="/image-71.png"
					width={160} // same as w-40 (10rem)
					height={211} // matches h-[211px]
					priority // optional: preload for performance if above-the-fold
				/>
			</div>

			<div className="mt-5 flex flex-row px-4">
				{/* Results count */}
				<div className="ml-[276px] whitespace-nowrap font-[Poppins] text-[20px] font-medium leading-[30px] tracking-[0px] text-gray-900">
					Showing 239 Results
				</div>
			</div>

			<div className="flex flex-row">
				{/* Sidebar */}
				<div className="ml-[15px] mt-[30px] w-[242px]">
					<AllCategoriesByAnima />
					{/* Price Filter */}
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="price" className="border-b-0 border-t border-[#E5E5E5]">
							<AccordionTrigger className="py-5 font-[Poppins] text-[20px] font-medium leading-[30px] tracking-[0px] text-[#1A1A1A]">
								Price
							</AccordionTrigger>
							<AccordionContent className="pb-6">
								{/* Slider track */}
								<div className="relative mb-4 h-[18px] w-full">
									<div className="relative h-[18px]">
										{/* Background Track */}
										<div className="absolute left-0 top-[6px] h-[6px] w-full rounded-[15px] border border-solid border-[#EA518F] bg-[#F2F2F2]" />

										{/* Active Range Track */}
										<div className="absolute left-[33px] top-[6px] h-[6px] w-[155px] rounded-[15px] bg-[#EA518F]" />

										{/* Left Thumb */}
										<div className="absolute left-[26px] top-0 h-[18px] w-[14px] rounded-[7px/9px] border-2 border-[#EA518F] bg-white" />

										{/* Right Thumb */}
										<div className="absolute left-[179px] top-0 h-[18px] w-[14px] rounded-[7px/9px] border-2 border-[#EA518F] bg-white" />
									</div>
								</div>

								{/* Price Label */}
								<div className="font-[Poppins] text-[14px] leading-[21px] tracking-[0px] text-[#4C4C4C]">
									Price:
									<span className="ml-1 font-medium text-[#191919]">50 — 1,500</span>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					{/* Rating Filter */}
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="rating" className="border-0">
							<AccordionTrigger className="py-5 font-[Poppins] text-[20px] font-medium leading-[30px] tracking-[0px] text-[#1A1A1A]">
								Rating
							</AccordionTrigger>
							<AccordionContent>
								{ratingOptions.map((option, index) => (
									<div
										key={option.value}
										className={`flex items-center gap-2 py-2.5 ${
											index === ratingOptions.length - 1 ? "pb-6" : ""
										}`}
									>
										{/* Checkbox */}
										{option.checked ? (
											<Checkbox
												id={`rating-${option.value}`}
												checked={option.checked}
												className="h-5 w-5 rounded-[3px] border data-[state=checked]:bg-[#00B207] data-[state=unchecked]:bg-[#FFFFFF]"
											/>
										) : (
											<div className="h-5 w-5 rounded-[3px] border border-[#CCCCCC] bg-white" />
										)}

										{/* Stars + Label */}
										<div className="flex items-center gap-2">
											{/* Static Stars */}
											{Array.from({ length: 5 }, (_, i) => (
												<Image
													key={i}
													src="/star-6.svg"
													alt="Star"
													width={15}
													height={14}
													className="h-[14px] w-[15px]"
												/>
											))}

											{/* Label */}
											<label
												htmlFor={`rating-${option.value}`}
												className="cursor-pointer font-[Poppins] text-[14px] leading-[21px] tracking-[0px] text-[#1A1A1A]"
											>
												{option.label}
											</label>
										</div>
									</div>
								))}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>

				{/* Main Content */}
				<div className="flex-1">
					<FrameByAnima />
				</div>
			</div>
		</div>
	);
};
