"use client";

import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const CartTotalByAnima = (): JSX.Element => {
	const cartData = {
		subtotal: "₹84.00",
		shipping: "Free",
		total: "₹84.00",
	};

	return (
		<Card className="w-full max-w-[424px] rounded-lg border border-[#e6e6e6]">
			<CardHeader className="pb-0 pt-6">
				<CardTitle className="text-xl font-semibold text-gray-900">Cart Total</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 pt-4">
				<div className="space-y-0">
					{/* Subtotal */}
					<div className="flex items-center justify-between bg-white py-3 shadow-sm">
						<span className="text-sm text-gray-700">Subtotal:</span>
						<span className="text-sm font-medium text-gray-900">{cartData.subtotal}</span>
					</div>

					{/* Shipping */}
					<div className="flex items-center justify-between bg-white py-3 shadow-sm">
						<span className="text-sm text-gray-700">Shipping:</span>
						<span className="text-sm font-medium text-gray-900">{cartData.shipping}</span>
					</div>

					<Separator className="my-4" />

					{/* Total */}
					<div className="flex items-center justify-between bg-white py-3">
						<span className="text-base font-medium text-gray-700">Total:</span>
						<span className="text-base font-semibold text-gray-900">{cartData.total}</span>
					</div>
				</div>

				<Button className="mt-4 w-full rounded-full bg-[#ea518f] py-4 text-base font-semibold text-white hover:bg-[#d3407e]">
					Proceed to checkout
				</Button>
			</CardContent>
		</Card>
	);
};
