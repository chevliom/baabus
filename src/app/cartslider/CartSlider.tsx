"use client"

import React, { useState } from "react";
import { Card, CardContent } from "../../ui/Card";
import { Separator } from "../ui/separator";
import { BillingShippingSection } from "../profile/Section/BillingShippingSection";
import {
	DashboardNavigationSection,
	defaultNavigationItems,
} from "../profile/Section/DashboardNavigationSection ";
import { OrderDetailsHeadingSection } from "../profile/Section/OrderDetailsHeadingSection";
import { OrderProgressTrackerSection } from "../profile/Section/OrderProgressTrackerSection";
import { ProductsListSection } from "../profile/Section/ProductsListSection ";
import { ShoppingCartPopupSection } from "../profile/Section/ShoppingCartPopupSection";
import { HeaderSection } from "../sections/HeaderSection";

export const CartSlider = (): JSX.Element => {
	const [activeLabel, setActiveLabel] = useState("Shopping Cart");

	// Order summary data
	const orderSummary = {
		orderId: "#4152",
		paymentMethod: "Paypal",
		subtotal: "₹365.00",
		discount: "20%",
		shipping: "Free",
		total: "₹84.00",
	};

	return (
		<div className="w-full max-w-[1440px] overflow-hidden bg-white">
			<div className="relative w-full">
				<HeaderSection />

				<DashboardNavigationSection
					items={defaultNavigationItems}
					activeLabel={activeLabel}
					onItemClick={(label) => setActiveLabel(label)}
				/>

				<OrderDetailsHeadingSection />
				<BillingShippingSection />

				<Card className="absolute right-[calc(1440px-1055px)] top-[206px] flex flex-col rounded-md border border-solid border-[#e6e6e6]">
					<div className="flex items-start gap-5 px-5 py-[18px]">
						<div className="flex flex-col items-start gap-1.5">
							<div className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-400 mt-[-1.00px] w-fit whitespace-nowrap text-[12px] font-[500] leading-[100%] tracking-[0.36px]">
								ORDER ID:
							</div>
							<div className="font-body-small-body-small-400 text-gray-scalegray-900 w-20 text-[14px] font-[400] leading-[150%] tracking-[0px]">
								{orderSummary.orderId}
							</div>
						</div>

						<Separator orientation="vertical" className="h-10" />

						<div className="flex flex-col items-start gap-1.5">
							<div className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-400 mt-[-1.00px] w-fit whitespace-nowrap text-[12px] font-[500] leading-[100%] tracking-[0.36px]">
								PAYMENT METHOD:
							</div>
							<div className="font-body-small-body-small-400 text-gray-scalegray-900 w-32 text-[14px] font-[400] leading-[150%] tracking-[0px]">
								{orderSummary.paymentMethod}
							</div>
						</div>
					</div>

					<Separator className="w-full" />

					<CardContent className="flex flex-col items-start gap-px p-0">
						<div className="mt-[18px] flex w-full items-center justify-between px-5 pb-3 pt-0">
							<div className="text-gray-scalegray-600 text-[14px] font-[400]">Subtotal:</div>
							<div className="text-gray-scalegray-900 text-[14px] font-[500]">{orderSummary.subtotal}</div>
						</div>

						<Separator className="mx-5 w-[248px]" />

						<div className="flex w-full items-center justify-between px-5 py-3">
							<div className="text-gray-scalegray-600 text-[14px] font-[400]">Discount</div>
							<div className="text-gray-scalegray-900 text-[14px] font-[500]">{orderSummary.discount}</div>
						</div>

						<Separator className="mx-5 w-[248px]" />

						<div className="flex w-full items-center justify-between px-5 py-3">
							<div className="text-gray-scalegray-600 text-[14px] font-[400]">Shipping</div>
							<div className="text-gray-scalegray-900 text-[14px] font-[500]">{orderSummary.shipping}</div>
						</div>

						<Separator className="mx-5 w-[248px]" />

						<div className="flex w-full items-center justify-between px-5 pb-[18px] pt-3">
							<div className="text-gray-scalegray-900 text-[18px] font-[400]">Total</div>
							<div className="text-[18px] font-[600] text-[#b61556]">{orderSummary.total}</div>
						</div>
					</CardContent>
				</Card>

				<OrderProgressTrackerSection />
				<ProductsListSection />

				{/* Modal overlay */}
				<div className="fixed inset-0 z-40 bg-[#00000070]" />

				<ShoppingCartPopupSection />
			</div>
		</div>
	);
};
