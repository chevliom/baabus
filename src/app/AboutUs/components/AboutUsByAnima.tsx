"use client";

import Image from "next/image";
import React from "react";

export const AboutUsByAnima = (): JSX.Element => {
	return (
		<section className="w-full px-4 py-16 md:px-8 lg:px-10">
			<div className="container mx-auto flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
				{/* Text Content */}
				<div className="w-full space-y-8 lg:w-1/2">
					<h2 className="font-['Poppins',Helvetica] text-[40px] font-semibold text-black">
						Parent-Friendly Shopping
					</h2>

					<p className="font-body-large-body-large-400 text-gray-scalegray-600 text-[length:var(--body-large-body-large-400-font-size)] leading-[var(--body-large-body-large-400-line-height)] tracking-[var(--body-large-body-large-400-letter-spacing)]">
						At Babus, we believe that every baby deserves the best care, comfort, and joy. We are an exclusive
						online store dedicated to offering safe, high-quality, and adorable baby care products, making
						parenting easier and more enjoyable.
					</p>
				</div>

				{/* Image Section */}
				<div className="w-full lg:w-1/2">
					<Image
						src="/image-98.png"
						alt="Parent shopping with baby products"
						width={600}
						height={400}
						className="h-auto w-full rounded-lg object-cover"
					/>
				</div>
			</div>
		</section>
	);
};
