"use client";

import { XIcon } from "lucide-react";
import React from "react";
import Image from "next/image"; // Import next/image for optimized images
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const ShoppingCartByAnima = (): JSX.Element => {
	// Cart items data
	const cartItems = [
		{
			id: 1,
			name: "Bus Bottle",
			price: "₹14.00",
			quantity: 5,
			subtotal: "₹70.00",
			image: "/image-1.png",
		},
		{
			id: 2,
			name: "Bus Bottle",
			price: "₹14.00",
			quantity: 5,
			subtotal: "₹14.00",
			image: "/image-1.png",
		},
	];

	return (
		<Card className="w-full rounded-lg border border-solid border-[#e6e6e6]">
			<CardContent className="p-0">
				{/* Table Header */}
				<div className="p-5 pb-0">
					<div className="flex w-full">
						<div className="font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500 w-2/5 text-[14px]">
							PRODUCT
						</div>
						<div className="font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500 w-1/5 text-[14px]">
							PRICE
						</div>
						<div className="font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500 w-1/5 text-[14px]">
							QUANTITY
						</div>
						<div className="font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500 w-1/5 text-[14px]">
							SUBTOTAL
						</div>
					</div>
					<Separator className="mt-3.5 w-full" />
				</div>

				{/* Cart Items */}
				{cartItems.map((item, index) => (
					<div key={item.id} className="px-5">
						<div className="flex items-center py-5">
							<div className="flex w-2/5 items-center gap-3">
								<div className="relative h-[100px] w-[100px]">
									<Image
										className="absolute left-[15px] top-[15px] h-[70px] w-[70px] object-cover"
										alt={item.name}
										src={item.image}
										width={70}
										height={70}
									/>
								</div>
								<div className="text-gray-scalegray-900 text-[14px]">{item.name}</div>
							</div>

							<div className="text-gray-scalegray-900 w-1/5 text-[14px]">{item.price}</div>

							<div className="w-1/5">
								<div className="bg-gray-scalewhite flex w-fit items-center justify-center rounded-[170px] border border-solid border-[#e6e6e6] p-2">
									<div className="bg-gray-scalegray-50 relative flex h-[34px] w-[34px] items-center justify-center rounded-[170px]">
										<Image
											className="h-0.5 w-[11px] object-cover"
											alt="Decrease"
											src="/group-2.png"
											width={11}
											height={1}
										/>
									</div>
									<div className="text-gray-scalegray-900 w-10 text-center text-[14px]">{item.quantity}</div>
									<div className="bg-gray-scalegray-50 relative flex h-[34px] w-[34px] items-center justify-center rounded-[170px]">
										<Image
											className="h-[11px] w-[11px]"
											alt="Increase"
											src={index === 0 ? "/group-3.png" : "/group-5.png"}
											width={11}
											height={11}
										/>
									</div>
								</div>
							</div>

							<div className="flex w-1/5 items-center justify-between">
								<div className="text-gray-scalegray-900 text-[14px] font-medium">{item.subtotal}</div>
								<button className="flex items-center justify-center">
									<XIcon className="text-gray-scalegray-500 h-6 w-6" />
								</button>
							</div>
						</div>

						{index < cartItems.length - 1 && <Separator className="w-full" />}
					</div>
				))}

				<Separator className="w-full" />

				{/* Footer */}
				<div className="flex justify-end p-4">
					<Button
						variant="secondary"
						className="bg-gray-scalegray-50 hover:bg-gray-scalegray-100 rounded-[43px] px-8 py-3.5"
					>
						<span className="text-gray-scalegray-700 text-[14px] leading-6">Return to shop</span>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
