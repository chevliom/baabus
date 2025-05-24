import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";

// Order data for mapping
const orders = [
	{
		id: "738",
		date: "8 Sep, 2020",
		total: "₹135.00",
		products: "5 Products",
		status: "Processing",
	},
	{
		id: "703",
		date: "24 May, 2020",
		total: "₹25.00",
		products: "1 Product",
		status: "on the way",
	},
	{
		id: "130",
		date: "22 Oct, 2020",
		total: "₹250.00",
		products: "4 Products",
		status: "Completed",
	},
	{
		id: "561",
		date: "1 Feb, 2020",
		total: "₹35.00",
		products: "1 Products",
		status: "Completed",
	},
	{
		id: "536",
		date: "21 Sep, 2020",
		total: "₹578.00",
		products: "13 Products",
		status: "Completed",
	},
	{
		id: "492",
		date: "22 Oct, 2020",
		total: "₹345.00",
		products: "7 Products",
		status: "Completed",
	},
];

export const OrderHistorySection = (): JSX.Element => {
	return (
		<section className="w-full">
			<Card className="rounded-lg border border-solid border-[#e6e6e6]">
				<CardHeader className="flex flex-row items-center justify-between px-6 pb-0 pt-4">
					<CardTitle className="font-body-XL-body-XL-500 text-gray-scalegray-900 text-[length:var(--body-XL-body-XL-500-font-size)] leading-[var(--body-XL-body-XL-500-line-height)] tracking-[var(--body-XL-body-XL-500-letter-spacing)]">
						Recent Order History
					</CardTitle>
					<Button
						variant="link"
						className="font-body-medium-body-medium-500 p-0 text-[length:var(--body-medium-body-medium-500-font-size)] leading-[var(--body-medium-body-medium-500-line-height)] tracking-[var(--body-medium-body-medium-500-letter-spacing)] text-[#ea518f]"
					>
						View All
					</Button>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow className="bg-gray-scalegray-50">
								<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 pl-6 text-[length:var(--CAPS-LOCK-small-caps-lock-font-size)] font-[number:var(--CAPS-LOCK-small-caps-lock-font-weight)] leading-[var(--CAPS-LOCK-small-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-small-caps-lock-letter-spacing)]">
									ORDER ID
								</TableHead>
								<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 text-[length:var(--CAPS-LOCK-small-caps-lock-font-size)] font-[number:var(--CAPS-LOCK-small-caps-lock-font-weight)] leading-[var(--CAPS-LOCK-small-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-small-caps-lock-letter-spacing)]">
									DATE
								</TableHead>
								<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 text-[length:var(--CAPS-LOCK-small-caps-lock-font-size)] font-[number:var(--CAPS-LOCK-small-caps-lock-font-weight)] leading-[var(--CAPS-LOCK-small-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-small-caps-lock-letter-spacing)]">
									TOTAL
								</TableHead>
								<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 text-[length:var(--CAPS-LOCK-small-caps-lock-font-size)] font-[number:var(--CAPS-LOCK-small-caps-lock-font-weight)] leading-[var(--CAPS-LOCK-small-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-small-caps-lock-letter-spacing)]">
									STATUS
								</TableHead>
								<TableHead></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map((order) => (
								<TableRow key={order.id} className="h-[45px]">
									<TableCell className="py-3 pl-6">
										<div className="inline-flex items-start">
											<span className="font-body-small-body-small-400 text-gray-scalegray-800 text-[length:var(--body-small-body-small-400-font-size)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]">
												#{order.id}
											</span>
										</div>
									</TableCell>
									<TableCell className="font-body-small-body-small-400 text-gray-scalegray-800 text-[length:var(--body-small-body-small-400-font-size)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]">
										{order.date}
									</TableCell>
									<TableCell className="text-gray-scalegray-800 text-sm font-normal">
										<span className="font-body-small-body-small-500 text-[length:var(--body-small-body-small-500-font-size)] font-[number:var(--body-small-body-small-500-font-weight)] leading-[var(--body-small-body-small-500-line-height)] tracking-[var(--body-small-body-small-500-letter-spacing)]">
											{order.total}
										</span>
										<span className="leading-[21px]"> ({order.products})</span>
									</TableCell>
									<TableCell className="font-body-small-body-small-400 text-gray-scalegray-800 text-[length:var(--body-small-body-small-400-font-size)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]">
										{order.status}
									</TableCell>
									<TableCell>
										<Button
											variant="link"
											className="font-body-small-body-small-500 p-0 text-[length:var(--body-small-body-small-500-font-size)] leading-[var(--body-small-body-small-500-line-height)] tracking-[var(--body-small-body-small-500-letter-spacing)] text-[#ea518f]"
										>
											View Details
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</section>
	);
};
