import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";

export const BillingShippingSection = (): JSX.Element => {
	// Data for billing and shipping information
	const addressData = {
		name: "Dainne Russell",
		address: "4140 Parker Rd. Allentown, New Mexico 31134",
		email: "dainne.ressell@gmail.com",
		phone: "(671) 555-0110",
	};

	// Function to render address column
	const renderAddressColumn = (title: string) => (
		<div className="flex h-full flex-col">
			<div className="px-5">
				<h3 className="font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-400 leading-[var(--CAPS-LOCK-medium-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-medium-caps-lock-letter-spacing)]">
					{title}
				</h3>
			</div>

			<Separator className="mb-3 mt-2" />

			<div className="flex flex-col gap-4 px-5">
				<p className="font-body-medium-body-medium-400 text-gray-scalegray-900 leading-[var(--body-medium-body-medium-400-line-height)] tracking-[var(--body-medium-body-medium-400-letter-spacing)]">
					{addressData.name}
				</p>

				<p className="font-body-small-body-small-400 text-gray-scalegray-600 leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]">
					{addressData.address}
				</p>

				<div className="flex flex-col gap-1">
					<span className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-400 leading-[var(--CAPS-LOCK-small-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-small-caps-lock-letter-spacing)]">
						EMAIL
					</span>
					<span className="font-body-small-body-small-400 text-gray-scalegray-900 leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]">
						{addressData.email}
					</span>
				</div>

				<div className="flex flex-col gap-1">
					<span className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-400 leading-[var(--CAPS-LOCK-small-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-small-caps-lock-letter-spacing)]">
						PHONE
					</span>
					<span className="font-body-small-body-small-400 text-gray-scalegray-900 leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]">
						{addressData.phone}
					</span>
				</div>
			</div>
		</div>
	);

	return (
		<Card className="bg-gray-scalewhite w-full rounded-md border border-solid border-[#e6e6e6]">
			<CardContent className="p-0">
				<div className="flex">
					<div className="flex-1 py-[18px]">{renderAddressColumn("BILLING ADDRESS")}</div>

					<Separator orientation="vertical" className="h-full" />

					<div className="flex-1 py-[18px]">{renderAddressColumn("SHIPPING ADDRESS")}</div>
				</div>
			</CardContent>
		</Card>
	);
};
