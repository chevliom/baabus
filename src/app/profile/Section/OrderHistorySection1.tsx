import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../../../ui/Pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";

export const OrderHistorySection = (): JSX.Element => {
	// Order data for mapping
	const orders = [
		{
			id: "3933",
			date: "4 April, 2021",
			amount: "135.00",
			products: 5,
			status: "Processing",
			statusColor: "text-[#ffca24]",
		},
		{
			id: "5045",
			date: "27 Mar, 2021",
			amount: "25.00",
			products: 1,
			status: "on the way",
			statusColor: "text-[#148dff]",
		},
		{
			id: "5028",
			date: "20 Mar, 2021",
			amount: "250.00",
			products: 4,
			status: "Completed",
			statusColor: "text-[#319f43]",
		},
		{
			id: "4600",
			date: "19 Mar, 2021",
			amount: "35.00",
			products: 1,
			status: "Completed",
			statusColor: "text-[#319f43]",
		},
		{
			id: "4152",
			date: "18 Mar, 2021",
			amount: "578.00",
			products: 13,
			status: "Completed",
			statusColor: "text-[#319f43]",
		},
		{
			id: "8811",
			date: "10 Mar, 2021",
			amount: "345.00",
			products: 7,
			status: "Completed",
			statusColor: "text-[#319f43]",
		},
		{
			id: "3536",
			date: "5 Mar, 2021",
			amount: "560.00",
			products: 2,
			status: "Completed",
			statusColor: "text-[#319f43]",
		},
		{
			id: "1374",
			date: "27 Feb, 2021",
			amount: "560.00",
			products: 2,
			status: "Completed",
			statusColor: "text-[#319f43]",
		},
		{
			id: "7791",
			date: "25 Feb, 2021",
			amount: "560.00",
			products: 2,
			status: "Cancelled",
			statusColor: "text-[#f24822]",
		},
		{
			id: "4846",
			date: "24 Feb, 2021",
			amount: "23.00",
			products: 1,
			status: "Completed",
			statusColor: "text-[#319f43]",
		},
		{
			id: "5948",
			date: "20 Feb, 2021",
			amount: "23.00",
			products: 1,
			status: "Completed",
			statusColor: "text-[#319f43]",
		},
		{
			id: "1577",
			date: "12 Oct, 2020",
			amount: "23.00",
			products: 1,
			status: "Cancelled",
			statusColor: "text-[#f24822]",
		},
	];

	return (
		<div className="mx-auto w-full max-w-[986px]">
			<Card className="rounded-lg border border-solid border-[#e6e6e6]">
				<CardContent className="p-6">
					<h2 className="font-body-XL-body-XL-500 text-gray-scalegray-900 mb-8 text-[length:var(--body-XL-body-XL-500-font-size)] leading-[var(--body-XL-body-XL-500-line-height)] tracking-[var(--body-XL-body-XL-500-letter-spacing)]">
						Order History
					</h2>

					<div className="w-full">
						<Table>
							<TableHeader className="bg-gray-scalegray-50">
								<TableRow>
									<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 text-[length:var(--CAPS-LOCK-small-caps-lock-font-size)] leading-[var(--CAPS-LOCK-small-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-small-caps-lock-letter-spacing)]">
										ORDER ID
									</TableHead>
									<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 text-[length:var(--CAPS-LOCK-small-caps-lock-font-size)] leading-[var(--CAPS-LOCK-small-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-small-caps-lock-letter-spacing)]">
										DATE
									</TableHead>
									<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 text-[length:var(--CAPS-LOCK-small-caps-lock-font-size)] leading-[var(--CAPS-LOCK-small-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-small-caps-lock-letter-spacing)]">
										TOTAL
									</TableHead>
									<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 text-[length:var(--CAPS-LOCK-small-caps-lock-font-size)] leading-[var(--CAPS-LOCK-small-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-small-caps-lock-letter-spacing)]">
										STATUS
									</TableHead>
									<TableHead className="text-right"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{orders.map((order) => (
									<TableRow key={order.id} className="h-[45px]">
										<TableCell className="py-3">
											<span className="font-body-small-body-small-400 text-gray-scalegray-800 text-[length:var(--body-small-body-small-400-font-size)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]">
												#{order.id}
											</span>
										</TableCell>
										<TableCell className="font-body-small-body-small-400 text-gray-scalegray-800 text-[length:var(--body-small-body-small-400-font-size)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]">
											{order.date}
										</TableCell>
										<TableCell className="text-gray-scalegray-800 text-sm [font-family:'Poppins',Helvetica]">
											<span className="leading-[21px]">₹</span>
											<span className="font-body-small-body-small-500 text-[length:var(--body-small-body-small-500-font-size)] font-[number:var(--body-small-body-small-500-font-weight)] leading-[var(--body-small-body-small-500-line-height)] tracking-[var(--body-small-body-small-500-letter-spacing)]">
												{order.amount}
											</span>
											<span className="leading-[21px]">
												{" "}
												({order.products} {order.products === 1 ? "Product" : "Products"})
											</span>
										</TableCell>
										<TableCell
											className={`font-body-small-body-small-400 ${order.statusColor} text-[length:var(--body-small-body-small-400-font-size)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]`}
										>
											{order.status}
										</TableCell>
										<TableCell className="text-right">
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
					</div>

					<Pagination className="mt-8 flex justify-center">
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious className="bg-gray-scalegray-50 rounded-[500px]" />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink className="text-gray-scalewhite flex h-9 w-9 items-center justify-center rounded-[130px] bg-[#ea518f]">
									1
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink className="bg-gray-scalewhite text-gray-scalegray-600 flex h-9 w-9 items-center justify-center rounded-[130px]">
									2
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink className="bg-gray-scalewhite text-gray-scalegray-600 flex h-9 w-9 items-center justify-center rounded-[130px]">
									3
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationNext className="bg-gray-scalewhite rounded-[500px] border border-solid border-[#e6e6e6]" />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</CardContent>
			</Card>
		</div>
	);
};
