import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

export const OrderDetailsHeadingSection = (): JSX.Element => {
	// Data for the order details
	const orderData = {
		date: "April 24, 2021",
		productsCount: 3,
	};

	return (
		<Card className="shadow-line-shadow w-full rounded-t-lg">
			<CardContent className="flex items-center justify-between p-4">
				<div className="flex items-center gap-2">
					<h2 className="font-body-XL-body-XL-500 text-gray-scalegray-900">Order Details</h2>

					<span className="font-body-small-body-small-400 text-gray-scalegray-700">•</span>

					<span className="font-body-small-body-small-400 text-gray-scalegray-700">{orderData.date}</span>

					<span className="font-body-small-body-small-400 text-gray-scalegray-700">•</span>

					<span className="font-body-small-body-small-400 text-gray-scalegray-700">
						{orderData.productsCount} Products
					</span>
				</div>

				<Button
					variant="ghost"
					className="font-body-medium-body-medium-500 p-0 text-[#ea518f] hover:bg-transparent"
				>
					Back to List
				</Button>
			</CardContent>
		</Card>
	);
};
