import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

export const PricingSection = (): JSX.Element => {
	// Product data for mapping
	const products = [
		{
			id: 1,
			name: "BAABUS Magic Swing Car",
			price: "Rs 890",
			mainImage: "/image-10.png",
			overlayImage: "/image-44-1.png",
		},
		{
			id: 2,
			name: "BAABUS DISCOVER Kick Scooter",
			price: "Rs 890",
			mainImage: "/image-11.png",
			overlayImage: "/image-8.png",
		},
		{
			id: 3,
			name: "Bus Water Bottle With Strap For Kids",
			price: "Rs 890",
			mainImage: "/image-13.png",
			overlayImage: "/image-44-2.png",
		},
	];

	return (
		<section className="relative mx-auto w-full max-w-[1396px]">
			{/* Section Header */}
			<div className="mb-12">
				<p className="font-['Baloo-Regular',Helvetica] text-2xl text-[#ea518f]">Our Products</p>
				<h2 className="mt-2 font-['Baloo-Regular',Helvetica] text-5xl">
					<span className="text-[#ea518f]">Our </span>
					<span className="text-[#5398d9]">Best Sellers</span>
					<span className="text-[#ea518f]"> Products</span>
				</h2>
			</div>

			{/* Products Grid */}
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<Card key={product.id} className="border-none shadow-none">
						<CardContent className="p-0">
							<div className="relative h-[358px] w-full">
								<img className="h-full w-full object-cover" alt={product.name} src={product.mainImage} />
								<img
									className="absolute left-1/2 top-1/2 max-h-[85%] max-w-[90%] -translate-x-1/2 -translate-y-1/2 transform"
									alt={`${product.name} detail`}
									src={product.overlayImage}
								/>
							</div>
							<h3 className="font-baloo mt-4 text-2xl font-extrabold text-black">{product.name}</h3>
							<p className="font-baloo mt-2 text-2xl font-extrabold text-black">{product.price}</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Bottom decoration image */}
			<div className="relative">
				<img
					className="absolute bottom-[-100px] right-0 h-[290px] w-[290px] object-cover"
					alt="Decoration"
					src="/image-44-3.png"
				/>
			</div>

			{/* View All Button */}
			<div className="mt-12 flex justify-center">
				<Button className="bg-primaryp-800 text-primaryp-300 hover:bg-primaryp-800/90 rounded-[30px] px-16 py-12 font-['Poppins',Helvetica] text-2xl font-semibold shadow-[0px_4px_4px_#00000040]">
					View All Products
				</Button>
			</div>
		</section>
	);
};
