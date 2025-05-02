"use client";

import React, { useState } from "react";
import Image from "next/image";

// Import sections
import { BarByAnima } from "./BarByAnima";
import { DescriptionByAnima } from "./DescriptionByAnima";
import { FeatureByAnima } from "./FeatureByAnima";
import { FrameByAnima } from "./FrameByAnima";
import { FrameWrapperByAnima } from "./FrameWrapperByAnima";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Separator } from "@/ui/Separator";
import { Card, CardContent } from "@/ui/Card";

export const SingleProductView = (): JSX.Element => {
	const thumbnails = [
		{ id: 1, src: "/image-60-2.png", alt: "Product Thumbnail 1" },
		{ id: 2, src: "/image-60-2.png", alt: "Product Thumbnail 2" },
		{ id: 3, src: "/image-60-2.png", alt: "Product Thumbnail 3" },
		{ id: 4, src: "/image-60-2.png", alt: "Product Thumbnail 4" },
	];

	const productDetails = [
		{ label: "SKU", value: "SS001" },
		{ label: "Category", value: "Swing Car" },
	];

	const socialIcons = [
		{ id: 1, src: "/akar-icons_facebook-fill.svg", alt: "Facebook" },
		{ id: 2, src: "/akar-icons_linkedin-box-fill.svg", alt: "LinkedIn" },
		{ id: 3, src: "/ant-design_twitter-circle-filled.svg", alt: "Twitter" },
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
			avatar: "https://via.placeholder.com/48",
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
		{
			name: "Ralph Edwards",
			avatar: "https://randomuser.me/api/portraits/men/2.jpg",
			rating: 5,
			text: "200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO...",
			time: "2 min ago",
		},
	];

	const [mainImage, setMainImage] = useState(thumbnails[0].src);

	return (
		<div className="relative w-full bg-white">
			{/* Navigation */}
			<BarByAnima />

			<div className="container mx-auto px-4">
				{/* Product Gallery */}
				<div className="mt-8 flex flex-col gap-8 md:flex-row">
					{/* Image Column */}
					<div className="w-full md:w-[530px]">
						<div className="flex flex-col gap-8 md:flex-row">
							{/* Thumbnails */}
							<div className="flex gap-4 overflow-x-auto md:flex-col md:gap-7">
								{thumbnails.map((thumbnail) => (
									<div
										key={thumbnail.id}
										className={`flex h-20 w-[76px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-[#d9e8f6] ${
											mainImage === thumbnail.src ? "ring-2 ring-[#ea518f]" : ""
										}`}
										onClick={() => setMainImage(thumbnail.src)}
									>
										<Image
											loading="lazy"
											className="h-[70px] w-[70px] object-cover"
											alt={thumbnail.alt}
											src={thumbnail.src}
										/>
									</div>
								))}
							</div>

							{/* Main Image */}
							<div className="relative flex h-[400px] w-full items-center justify-center rounded-lg bg-[url(/image-6.png)] bg-cover bg-center md:h-[500px] md:w-[423px]">
								<Image
									loading="lazy"
									className="h-[279px] w-[279px] object-cover"
									alt="Main Product"
									src={mainImage}
								/>
							</div>
						</div>
					</div>

					{/* Product Info */}
					<FrameByAnima />
				</div>

				{/* Product Details */}
				<div className="mt-8">
					{productDetails.map((detail, index) => (
						<div key={index} className="mb-4 flex gap-8">
							<div className="font-['Poppins',Helvetica] text-base font-normal text-[#9f9f9f]">
								{detail.label}
							</div>
							<div className="font-['Poppins',Helvetica] text-base font-normal text-[#9f9f9f]">
								{detail.value}
							</div>
						</div>
					))}

					{/* Social Share */}
					<div className="mb-8 flex items-center gap-4">
						<div className="font-['Poppins',Helvetica] text-base font-normal text-[#9f9f9f]">Share</div>
						<div className="flex gap-4">
							{socialIcons.map((icon) => (
								<button key={icon.id} aria-label={`Share on ${icon.alt}`} className="h-5 w-5">
									<Image loading="lazy" alt={icon.alt} src={icon.src} />
								</button>
							))}
						</div>
					</div>
				</div>

				<Separator className="my-8" />

				{/* Tabs */}
				<Tabs defaultValue="description" className="w-full">
					<TabsList className="mb-8 flex justify-start gap-6 bg-transparent">
						<TabsTrigger
							value="description"
							className="bg-transparent font-['Poppins',Helvetica] text-2xl font-medium data-[state=active]:text-black data-[state=inactive]:text-[#9f9f9f]"
						>
							Description
						</TabsTrigger>
						<TabsTrigger
							value="additional"
							className="bg-transparent font-['Poppins',Helvetica] text-2xl font-medium data-[state=active]:text-black data-[state=inactive]:text-[#9f9f9f]"
						>
							Additional information
						</TabsTrigger>
						<TabsTrigger
							value="reviews"
							className="bg-transparent font-['Poppins',Helvetica] text-2xl font-medium data-[state=active]:text-black data-[state=inactive]:text-[#9f9f9f]"
						>
							Reviews [5]
						</TabsTrigger>
					</TabsList>

					<TabsContent value="description">
						<div className="flex flex-col gap-8 md:flex-row">
							<DescriptionByAnima />

							{/* Video Section */}
							<div className="flex flex-col items-center">
								<div className="relative h-[300px] w-full rounded-lg bg-[url(/Video.png)] bg-cover md:w-[536px]">
									<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
										<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#ea518f]">
											<Image loading="lazy" className="h-[18px] w-3.5" alt="Play" src="/play.png" />
										</div>
									</div>
								</div>
								{/* Gap added between video and feature */}
								<div className="mt-10 w-full">
									<FeatureByAnima />
								</div>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="additional">
						<Card>
							<CardContent className="pt-6">
								<div className="grid grid-cols-1 gap-8 font-['Inter'] text-[14px] leading-[24px] text-[#4B4B4B] md:grid-cols-4">
									{/* Column 1 */}
									<div>
										<p className="mb-2 font-semibold text-black">Specification</p>
										<p>
											<span className="font-medium text-black">Weight:</span> 30 Kg
										</p>
										<p>
											<span className="font-medium text-black">Color:</span> Blue
										</p>
										<p>
											<span className="font-medium text-black">Type:</span> Baby Walker
										</p>
										<p>
											<span className="font-medium text-black">Category:</span> Walker
										</p>
										<p>
											<span className="font-medium text-black">Stock Status:</span> Available
										</p>
										<p>
											<span className="font-medium text-black">Age:</span> 6–24 months
										</p>
									</div>

									{/* Column 2 */}
									<div>
										<p className="mb-2 font-semibold text-black">Body Specifications:</p>
										<p>
											<span className="font-medium text-black">Rattle Features:</span> Yes
										</p>
										<p>
											<span className="font-medium text-black">Seat Height Adjustable:</span> 2
										</p>
										<p>
											<span className="font-medium text-black">Brake Position:</span> Back Wheel
										</p>
										<p>
											<span className="font-medium text-black">Light & Music:</span> Yes
										</p>
										<p>
											<span className="font-medium text-black">Child tray Adjustable:</span> Yes
										</p>
										<p>
											<span className="font-medium text-black">Stopper:</span> Yes
										</p>
									</div>

									{/* Column 3 */}
									<div>
										<p className="mb-2 font-semibold text-black">Technical Specifications:</p>
										<p>
											<span className="font-medium text-black">Overall Dimension:</span> L 55 X B 19.7 X H
											67.3 cm
										</p>
										<p>
											<span className="font-medium text-black">Carrying Capacity:</span> 20 Kg
										</p>
										<p>
											<span className="font-medium text-black">Brake Position:</span> Back Wheel
										</p>
										<p>
											<span className="font-medium text-black">Light & Music:</span> Yes
										</p>
										<p>
											<span className="font-medium text-black">Child tray Adjustable:</span> Yes
										</p>
										<p>
											<span className="font-medium text-black">Stopper:</span> Yes
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
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="reviews">
						<Card>
							<CardContent className="space-y-6 pt-6">
								{reviews.map((review, index) => (
									<div key={index} className="flex gap-4 border-b border-gray-700 pb-4">
										<Image
											src={review.avatar}
											alt={`${review.name} avatar`}
											className="h-12 w-12 rounded-full object-cover"
										/>
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<p className="font-semibold text-white">{review.name}</p>
												<span className="text-sm text-gray-400">{review.time}</span>
											</div>
											<div className="mt-1 flex items-center">
												{Array.from({ length: 5 }, (_, i) => (
													<span
														key={i}
														className={`text-lg text-orange-400 ${i < review.rating ? "" : "opacity-30"}`}
													>
														★
													</span>
												))}
											</div>
											<p className="mt-2 text-gray-300">{review.text}</p>
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				<FrameWrapperByAnima />
			</div>
		</div>
	);
};
