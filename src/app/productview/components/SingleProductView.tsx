"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";

// Custom components

import { FrameByAnima } from "./FrameByAnima";
import { FrameWrapperByAnima } from "./FrameWrapperByAnima";
import { DescriptionByAnima } from "./DescriptionByAnima";
import { FeatureByAnima } from "./FeatureByAnima";
import { formatDistanceToNow } from "date-fns";

// UI components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Separator } from "@/ui/components/separator";
import { Card, CardContent } from "@/ui/Card";
import { HeaderSection } from "@/app/sections/HeaderSection";
import { fetchProductReviews, ProductReview } from "@/lib/graphqlClient";
import { useSearchParams } from "next/navigation";

export const SingleProductView = (): JSX.Element => {
	const thumbnails = [
		{ id: 1, src: "/image-60-2.png", alt: "Product Thumbnail 1" },
		{ id: 2, src: "/image-60-2.png", alt: "Product Thumbnail 2" },
		{ id: 3, src: "/image-60-2.png", alt: "Product Thumbnail 3" },
		{ id: 4, src: "/image-60-2.png", alt: "Product Thumbnail 4" },
	];

	const [reviews, setReviews] = useState<ProductReview[]>([]);
	const searchParams = useSearchParams();
	const productId = searchParams.get("id")?.trim() ?? "";

	useEffect(() => {
		if (!productId) return;
		fetchProductReviews(productId)
			.then(setReviews)
			.catch(console.error);
	}, [productId]);

	const tabsRef = useRef<HTMLDivElement | null>(null);
	useLayoutEffect(() => {
		tabsRef.current?.scrollTo({ left: 0, behavior: "auto" });
	}, []);

	const [related, setRelated] = useState<any[]>([]);
	const [mainImage, setMainImage] = useState(thumbnails[0].src);

	return (
		<div className="relative w-full bg-white">
			{/* Navigation */}
			<HeaderSection />

			<div className="container mx-auto mt-40 px-4">
				{/* Product Gallery and Info */}
				<div className="mx-auto mt-8 flex max-w-7xl flex-col gap-12 border-b-2 px-4 pb-12 md:flex-row md:items-start">
					<FrameByAnima setRelated={setRelated} />
				</div>

				<Separator className="my-8" />

				{/* Tabs Section */}
				<Tabs defaultValue="description" className="w-full">
					<TabsList
						ref={tabsRef}
						className="flex w-full overflow-y-hidden overflow-x-auto whitespace-nowrap gap-4 px-4 md:justify-center scroll-smooth snap-x justify-start"
					>
						{["description", "additional", "reviews"].map((tab) => (
							<TabsTrigger
								key={tab}
								value={tab}
								className="snap-start flex-shrink-0 rounded-none border-0 bg-transparent px-1 pb-4 font-['Poppins'] text-base md:text-[24px] font-medium text-[#9F9F9F] shadow-none
								data-[state=active]:bg-transparent
								data-[state=active]:text-black
								data-[state=active]:shadow-none"
							>
								{tab === "description" && "Description"}
								{tab === "additional" && "Additional information"}
								{tab === "reviews" && `Reviews [${reviews.length}]`}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value="description">
						<div className="flex flex-col justify-center gap-8 md:flex-row md:items-center md:gap-[130px]">
							<div className="w-full md:w-1/2">
								<DescriptionByAnima />
							</div>

							<div className="mt-[50px] flex w-full flex-col items-center justify-center md:w-1/2 md:items-start">
								<div className="relative h-[300px] w-full rounded-lg bg-[url(/Video.png)] bg-no-repeat bg-center md:h-[336px] md:w-[536px]">
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
						<div className="mt-[30px] md:mt-[50px] grid grid-cols-1 gap-8 font-['Inter'] text-sm leading-[24px] text-[#808080] md:grid-cols-4">
							{/* Column 1 */}
							<div>
								<p className="mb-2 font-bold text-[#000000] text-[16px]">Specification</p>
								<div className="flex flex-col space-y-2">
									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Weight:</p>
										<p className="text-gray-600 text-[14px]">30 Kg</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Color:</p>
										<p className="text-gray-600 text-[14px]">Blue</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Type:</p>
										<p className="text-gray-600 text-[14px]">Baby Walker</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Category:</p>
										<p className="text-gray-600 text-[14px]">Walker</p>
									</div>


									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Stock Status:</p>
										<p className="text-gray-600 text-[14px]">Available</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Age:</p>
										<p className="text-gray-600 text-[14px]">6–24 months</p>
									</div>
								</div>

							</div>
							{/* Column 2 */}
							<div>

								<p className="mb-2 font-bold text-[#000000] text-[16px]">Body Specifications</p>

								<div className="flex flex-col space-y-2">
									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Rattle Features:</p>
										<p className="text-gray-600 text-[14px]">Yes</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Seat Height Adjustable:</p>
										<p className="text-gray-600 text-[14px]">2</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Brake Position:</p>
										<p className="text-gray-600 text-[14px]">Back Wheel</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Light & Music:</p>
										<p className="text-gray-600 text-[14px]">Yes</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Child tray Adjustable:</p>
										<p className="text-gray-600 text-[14px]">Yes</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Stopper:</p>
										<p className="text-gray-600 text-[14px]">Yes</p>
									</div>
								</div>
							</div>
							{/* Column 3 */}
							<div>
								<p className="mb-2 font-bold text-[#000000] text-[16px]">Technical Specifications</p>

								<div className="flex flex-col space-y-2">
									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Overall Dimension:</p>
										<p className="text-gray-600 text-[14px]">L 55 X B 19.7 X H 67.3 cm</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Carrying Capacity:</p>
										<p className="text-gray-600 text-[14px]"> 20 Kg</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Brake Position:</p>
										<p className="text-gray-600 text-[14px]"> Back Wheel</p>
									</div>


									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Light & Music:</p>
										<p className="text-gray-600 text-[14px]">Yes</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Child tray Adjustable:</p>
										<p className="text-gray-600 text-[14px]">Yes</p>
									</div>

									<div className="flex items-center space-x-2">
										<p className="text-gray-900 text-[14px]">Stopper:</p>
										<p className="text-gray-600 text-[14px]">Yes</p>
									</div>
								</div>
							</div>
							{/* Column 4 */}
							<div>
								<p className="mb-2 font-bold text-[#000000] text-[16px]">Items included in the Package:</p>
								<p className="text-gray-900">1 Baby Walker</p>
								<p className="mb-2 mt-4 font-bold text-[#000000] text-[16px]">Additional Information:</p>
								<p className="text-gray-900">Adult assembly required</p>
								<p className="mb-2 mt-4 font-bold text-[#000000] text-[16px]">Country of Origin:</p>
								<p className="text-gray-900">India</p>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="reviews">
						<Card className="ml-0 sm:ml-[60px] mt-[20px] md:mt-[30px] w-full sm:w-[760px] rounded-lg border-none shadow-none">
							<CardContent className="space-y-6 pt-6 px-4 sm:px-0">
								{reviews.map((review, index) => (
									<div
										key={index}
										className="border-b border-[#e5e7eb] pb-4"
									>
										{/* Top row: Avatar + name + time + stars */}
										<div className="flex gap-4">
											<Image
												src={review.user.avatar?.url || "https://randomuser.me/api/portraits/men/1.jpg"}
												alt={`${review.user.firstName} ${review.user.lastName || ""} avatar`}
												className="h-12 w-12 rounded-full object-cover"
												width={48}
												height={48}
											/>

											<div className="flex-1">
												<div className="flex items-center justify-between">
													<p className="font-semibold text-sm text-gray-900">
														{review.user.firstName} {review.user.lastName}
													</p>
													<span className="text-xs text-gray-400">{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</span>
												</div>
												<div className="flex items-center">
													{Array.from({ length: 5 }, (_, i) => (
														<span
															key={i}
															className={`text-[16px] ${i < review.rating ? "text-[#ff9900]" : "text-[#ff9900]/30"
																}`}
														>
															★
														</span>
													))}
												</div>
											</div>
										</div>

										{/* Review text aligned under the avatar */}
										<p className="ml-2 mt-3 text-sm text-gray-500 leading-snug">
											{review.review}
										</p>
									</div>
								))}
							</CardContent>
						</Card>
					</TabsContent>



				</Tabs>
			</div>

			{/* Footer or Bottom Frame */}
			<FrameWrapperByAnima products={related} />
		</div >
	);
};
