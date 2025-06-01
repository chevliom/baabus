"use client";

import React, { useState } from "react";
import Image from "next/image";

// Custom components

import { FrameByAnima } from "./FrameByAnima";
import { FrameWrapperByAnima } from "./FrameWrapperByAnima";
import { DescriptionByAnima } from "./DescriptionByAnima";
import { FeatureByAnima } from "./FeatureByAnima";

// UI components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Separator } from "@/ui/components/separator";
import { Card, CardContent } from "@/ui/Card";
import { HeaderSection } from "@/app/sections/HeaderSection";

export const SingleProductView = (): JSX.Element => {
	const thumbnails = [
		{ id: 1, src: "/image-60-2.png", alt: "Product Thumbnail 1" },
		{ id: 2, src: "/image-60-2.png", alt: "Product Thumbnail 2" },
		{ id: 3, src: "/image-60-2.png", alt: "Product Thumbnail 3" },
		{ id: 4, src: "/image-60-2.png", alt: "Product Thumbnail 4" },
	];

	const reviews = [
		{
			name: "Kristin Watson",
			avatar: "https://randomuser.me/api/portraits/women/1.jpg",
			rating: 5,
			text: "Duis at ullamcorper nulla, eu dictum eros.",
			time: "2 min ago",
		},
		{
			name: "Jane Cooper",
			avatar: "https://via.placeholder.com/48.jpg",
			rating: 4,
			text: `Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to "bolt"...`,
			time: "30 Apr, 2021",
		},
		{
			name: "Jacob Jones",
			avatar: "https://randomuser.me/api/portraits/men/1.jpg",
			rating: 5,
			text: "Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus.",
			time: "2 min ago",
		},
	];

	const [mainImage, setMainImage] = useState(thumbnails[0].src);

	return (
		<div className="relative w-full bg-white">
			{/* Navigation */}
			<HeaderSection />

			<div className="container mx-auto mt-40 px-4">
				{/* Product Gallery and Info */}
				<div className="mx-auto mt-8 flex max-w-7xl flex-col gap-12 border-b-2 px-4 pb-12 md:flex-row md:items-start">
					<FrameByAnima />
				</div>

				<Separator className="my-8" />

				{/* Tabs Section */}
				<Tabs defaultValue="description" className="w-full">
					<TabsList className="flex flex-wrap justify-start gap-6  px-2 md:flex-nowrap md:justify-center md:px-0">
						{["description", "additional", "reviews"].map((tab) => (
							<TabsTrigger
								key={tab}
								value={tab}
								className="rounded-none border-0 bg-transparent px-0
        pb-4
        font-['Poppins']
        text-lg
        font-medium
        text-[#9F9F9F]
        shadow-none
        data-[state=active]:bg-transparent
        data-[state=active]:text-black
        data-[state=active]:shadow-none"
							>
								{tab === "description" && "Description"}
								{tab === "additional" && "Additional information"}
								{tab === "reviews" && "Reviews [5]"}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value="description">
						<div className="flex flex-col justify-center gap-8 md:flex-row md:items-center md:gap-16">
							{/* Left: Description */}
							<div className="w-full md:w-1/2">
								<DescriptionByAnima />
							</div>

							{/* Right: Video and Features */}
							<div className="mt-[50px] flex w-full flex-col items-center justify-center md:w-1/2 md:items-start">
								<div className="relative h-[300px] w-full rounded-lg bg-[url(/Video.png)] bg-cover bg-center md:h-[336px] md:w-[536px]">
									<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
										<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#ea518f]">
											<Image
												loading="lazy"
												width={14}
												height={18}
												className="h-[18px] w-3.5"
												alt="Play"
												src="/play.png"
											/>
										</div>
									</div>
								</div>

								<div className="mt-10 w-full">
									<FeatureByAnima />
								</div>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="additional">
						<div className="mt-[50px] grid grid-cols-1 gap-8 font-['Inter'] text-sm leading-[24px] text-[#808080] md:grid-cols-4">
							{/* Column 1 */}
							<div>
								<p className="mb-2 font-semibold text-black">Specification</p>
								<p>
									<b>Weight:</b> 30 Kg
								</p>
								<p>
									<b>Color:</b> Blue
								</p>
								<p>
									<b>Type:</b> Baby Walker
								</p>
								<p>
									<b>Category:</b> Walker
								</p>
								<p>
									<b>Stock Status:</b> Available
								</p>
								<p>
									<b>Age:</b> 6–24 months
								</p>
							</div>
							{/* Column 2 */}
							<div>
								<p className="mb-2 font-semibold text-black">Body Specifications</p>
								<p>
									<b>Rattle Features:</b> Yes
								</p>
								<p>
									<b>Seat Height Adjustable:</b> 2
								</p>
								<p>
									<b>Brake Position:</b> Back Wheel
								</p>
								<p>
									<b>Light & Music:</b> Yes
								</p>
								<p>
									<b>Child tray Adjustable:</b> Yes
								</p>
								<p>
									<b>Stopper:</b> Yes
								</p>
							</div>
							{/* Column 3 */}
							<div>
								<p className="mb-2 font-semibold text-black">Technical Specifications</p>
								<p>
									<b>Overall Dimension:</b> L 55 X B 19.7 X H 67.3 cm
								</p>
								<p>
									<b>Carrying Capacity:</b> 20 Kg
								</p>
								<p>
									<b>Brake Position:</b> Back Wheel
								</p>
								<p>
									<b>Light & Music:</b> Yes
								</p>
								<p>
									<b>Child tray Adjustable:</b> Yes
								</p>
								<p>
									<b>Stopper:</b> Yes
								</p>
							</div>
							{/* Column 4 */}
							<div>
								<p className="mb-2 font-semibold text-black">Items included in the Package:</p>
								<p>1 Baby Walker</p>
								<p className="mb-2 mt-4 font-semibold text-black">Additional Information:</p>
								<p>Adult assembly required</p>
								<p className="mb-2 mt-4 font-semibold text-black">Country of Origin:</p>
								<p>India</p>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="reviews">
						<Card className="ml-[60px] mt-[100px] h-[479px] w-[760px] rounded-lg border-none shadow-none outline-none">
							<CardContent className="gap-[20px] space-y-6 pt-6">
								{reviews.map((review, index) => (
									<div key={index} className="flex gap-4 border-b border-gray-200 pb-6">
										<Image
											src={review.avatar}
											alt={`${review.name} avatar`}
											className="h-16 w-16 rounded-full object-cover"
											width={64}
											height={64}
										/>
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<p className="text-lg font-semibold">{review.name}</p>
												<span className="text-sm text-gray-500">{review.time}</span>
											</div>
											<div className="mt-1 flex items-center">
												{Array.from({ length: 5 }, (_, i) => (
													<span
														key={i}
														className={`text-xl text-orange-400 ${i < review.rating ? "" : "opacity-30"}`}
													>
														★
													</span>
												))}
											</div>
											<p className="text mt-2 text-base text-[#808080]">{review.text}</p>
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>

			{/* Footer or Bottom Frame */}
			<FrameWrapperByAnima />
		</div>
	);
};
