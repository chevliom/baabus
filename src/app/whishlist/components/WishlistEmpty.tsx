"use client"; // Required if used in app directory

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";


type WishlistEmptyProps = {
	onStartShopping: () => void;
};

export const WishlistEmpty: React.FC<WishlistEmptyProps> = () => {
	const router = useRouter();

	return (
		<div className="flex min-h-[300px] flex-col items-center justify-center bg-white px-4 text-center mb-[100px]">
			<div className="relative h-64 w-64">
				<Image src="/wishlist-empty.png" alt="Empty Wishlist" layout="fill" objectFit="contain" />
			</div>

			<h1
				className="mt-4 text-[40px] font-normal leading-[100%] tracking-[0%] text-[#1A5CA6]"
				style={{ fontFamily: "Baloo, Helvetica" }}
			>
				Your Wishlist is Empty!
			</h1>
			<p className="mt-2 text-base text-[#4A90E2] sm:text-lg">Explore more and shortlist more items</p>

			<button
				onClick={() => router.push("/category")}
				className="mt-6 rounded-2xl bg-[#E0F0FF] px-6 py-3 text-lg font-semibold text-[#1A5CA6] shadow-md transition-all duration-200 hover:shadow-lg"
			>
				Start Shopping
			</button>
		</div>
	);
};
