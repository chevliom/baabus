"use client"; // Only needed if using in Next.js app router (app directory)

import Image from "next/image";
import React from "react";
// import { BarByAnima } from "@/app/category/components/BarByAnima";
import { FrameByAnima } from "@/app/whishlist/componet/FrameByAnima";
import { WishlistByAnima } from "@/app/whishlist/componet/WishlistByAnima";
import { HeaderSection } from "@/app/sections/HeaderSection";

export const WishlistScreen = (): JSX.Element => {
	return (
		<div className="flex min-h-screen w-full flex-col overflow-hidden bg-white">
			<HeaderSection />

			{/* Header Section with Decorative Background */}
			{/* Hero Banner */}
			<div className="relative mt-24 h-[219px] w-full bg-[url(/image.png)] bg-cover bg-[50%_50%]">
				<h1 className="absolute left-1/2 top-[33px] -translate-x-1/2 transform text-8xl font-normal leading-[normal] tracking-[0] text-[#ea518f] [font-family:'Baloo',Helvetica]">
					Wishlist
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

			<WishlistByAnima />
			<FrameByAnima />
		</div>
	);
};
