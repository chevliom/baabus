"use client";

import React from "react";
import Image from "next/image";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/Accordion";
// import { Checkbox } from "@/ui/Checkbox";
import { FrameByAnima, CategoryProvider } from "@/app/category/components/AllCategoriesByAnima1";
import { HeaderSection } from "@/app/sections/HeaderSection";

// const ResultCount = () => {
// 	const { categories, selectedCategoryId, loading } = useCategory();

// 	if (loading) return null;

// 	const count = selectedCategoryId
// 		? categories.find((c) => c.node.id === selectedCategoryId)?.node.products.edges.length || 0
// 		: categories.reduce((acc, c) => acc + (c.node.products.edges.length || 0), 0);

// 	return (
// 		<div className="mt-4 font-[Poppins] text-lg font-medium text-gray-900 sm:ml-72 sm:text-xl">
// 			Showing {count} Results
// 		</div>
// 	);
// };

export const AllCategoryOption = (): JSX.Element => {
	// const ratingOptions = [
	// 	{ value: "5.0", label: "5.0", checked: false },
	// 	{ value: "4.0", label: "4.0 & up", checked: true },
	// 	{ value: "3.0", label: "3.0 & up", checked: false },
	// 	{ value: "2.0", label: "2.0 & up", checked: false },
	// 	{ value: "1.0", label: "1.0 & up", checked: false },
	// ];

	return (
		<CategoryProvider>
			<div className="min-h-screen w-full bg-white">
				<HeaderSection />

				{/* Hero Banner */}
				<div className="relative mt-24 h-[140px] md:h-[180px] w-full bg-[url(/image.png)] bg-cover bg-center sm:h-[219px]">
					<h1 className="absolute left-1/2 top-8 md:top-14 -translate-x-1/2 transform text-4xl font-normal text-[#ea518f] [font-family:'Baloo',Helvetica] sm:text-8xl mt-8 md:mt-0">
						Category
					</h1>

					<Image
						className="absolute left-1 md:left-4 top-0 h-auto w-[100px] md:w-28 object-cover sm:w-40"
						alt="Decorative left"
						src="/image-71.png"
						width={160}
						height={211}
						priority
					/>
					<Image
						className="absolute right-1 md:right-4 top-0 h-auto w-[100px] md:w-28 object-cover sm:w-40"
						alt="Decorative right"
						src="/image-71.png"
						width={160}
						height={211}
						priority
					/>
				</div>

				{/* Filters + Content */}
				<div className="flex flex-col px-4 sm:flex-row sm:gap-6">
					{/* Sidebar */}
					{/* <div className="mt-8 w-full sm:w-[242px]"> */}
					{/* <AllCategoriesByAnima1 /> */}

					{/* Price Filter */}
					{/* <Accordion type="single" collapsible className="w-full">
							<AccordionItem value="price" className="border-b-0 border-t border-[#E5E5E5]">
								<AccordionTrigger className="py-5 text-lg font-medium text-[#1A1A1A]">Price</AccordionTrigger>
								<AccordionContent className="pb-6">
									<div className="relative mb-4 h-[18px] w-full">
										<div className="absolute left-0 top-[6px] h-[6px] w-full rounded-full border border-[#EA518F] bg-[#F2F2F2]" />
										<div className="absolute left-[33px] top-[6px] h-[6px] w-[155px] rounded-full bg-[#EA518F]" />
										<div className="absolute left-[26px] top-0 h-[18px] w-[14px] rounded-full border-2 border-[#EA518F] bg-white" />
										<div className="absolute left-[179px] top-0 h-[18px] w-[14px] rounded-full border-2 border-[#EA518F] bg-white" />
									</div>
									<div className="text-sm text-[#4C4C4C]">
										Price:
										<span className="ml-1 font-medium text-[#191919]">50 — 1,500</span>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion> */}

					{/* Rating Filter */}
					{/* <Accordion type="single" collapsible className="w-full">
							<AccordionItem value="rating" className="border-0">
								<AccordionTrigger className="py-5 text-lg font-medium text-[#1A1A1A]">
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
											{option.checked ? (
												<Checkbox
													id={`rating-${option.value}`}
													checked={option.checked}
													className="h-5 w-5 rounded-[3px] border data-[state=checked]:bg-[#00B207] data-[state=unchecked]:bg-white"
												/>
											) : (
												<div className="h-5 w-5 rounded-[3px] border border-[#CCCCCC] bg-white" />
											)}

											<div className="flex items-center gap-2">
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
												<label
													htmlFor={`rating-${option.value}`}
													className="cursor-pointer text-sm text-[#1A1A1A]"
												>
													{option.label}
												</label>
											</div>
										</div>
									))}
								</AccordionContent>
							</AccordionItem>
						</Accordion> */}
					{/* </div> */}

					{/* Main Content */}
					<div className="mt-6 flex-1">
						{/* <ResultCount /> */}
						<FrameByAnima />
					</div>
				</div>
			</div>
		</CategoryProvider>
	);
};
