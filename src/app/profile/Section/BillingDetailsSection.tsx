import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

export const BillingDetailsSection = (): JSX.Element => {
	// Billing details data
	const billingData = {
		name: "Dainne Russell",
		address:
			"Baabus Baby Care Products, Plot No. 6/7, Survey No.41, Village - Rib, Taluka : Gondal, Dis. : Rajkot.",
		email: "dainne.ressell@gmail.com",
		phone: "(671) 555-0110",
	};

	return (
		<div className="w-full max-w-[428px]">
			<Card className="w-full rounded-[0px_8px_8px_8px] border border-solid border-[#e6e6e6]">
				<CardContent className="p-8">
					<div className="flex flex-col space-y-8">
						<div className="font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-400 text-[length:var(--CAPS-LOCK-medium-caps-lock-font-size)] font-[number:var(--CAPS-LOCK-medium-caps-lock-font-weight)] leading-[var(--CAPS-LOCK-medium-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-medium-caps-lock-letter-spacing)] [font-style:var(--CAPS-LOCK-medium-caps-lock-font-style)]">
							BILLING ADDRESS
						</div>

						<div className="flex flex-col space-y-4">
							<div className="font-body-large-body-large-500 text-gray-scalegray-900 text-[length:var(--body-large-body-large-500-font-size)] font-[number:var(--body-large-body-large-500-font-weight)] leading-[var(--body-large-body-large-500-line-height)] tracking-[var(--body-large-body-large-500-letter-spacing)] [font-style:var(--body-large-body-large-500-font-style)]">
								{billingData.name}
							</div>

							<div className="font-body-small-body-small-400 text-gray-scalegray-600 text-[length:var(--body-small-body-small-400-font-size)] font-[number:var(--body-small-body-small-400-font-weight)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)] [font-style:var(--body-small-body-small-400-font-style)]">
								{billingData.address}
							</div>

							<div className="font-body-medium-body-medium-400 text-gray-scalegray-900 text-[length:var(--body-medium-body-medium-400-font-size)] font-[number:var(--body-medium-body-medium-400-font-weight)] leading-[var(--body-medium-body-medium-400-line-height)] tracking-[var(--body-medium-body-medium-400-letter-spacing)] [font-style:var(--body-medium-body-medium-400-font-style)]">
								{billingData.email}
							</div>

							<div className="font-body-medium-body-medium-400 text-gray-scalegray-900 text-[length:var(--body-medium-body-medium-400-font-size)] font-[number:var(--body-medium-body-medium-400-font-weight)] leading-[var(--body-medium-body-medium-400-line-height)] tracking-[var(--body-medium-body-medium-400-letter-spacing)] [font-style:var(--body-medium-body-medium-400-font-style)]">
								{billingData.phone}
							</div>
						</div>

						<Button
							variant="link"
							className="font-body-medium-body-medium-500 h-auto w-fit p-0 text-[length:var(--body-medium-body-medium-500-font-size)] font-[number:var(--body-medium-body-medium-500-font-weight)] leading-[var(--body-medium-body-medium-500-line-height)] tracking-[var(--body-medium-body-medium-500-letter-spacing)] text-[#ea518f] [font-style:var(--body-medium-body-medium-500-font-style)]"
						>
							Edit Address
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
