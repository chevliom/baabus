import React, { useEffect, useState } from "react";
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
import Cookies from "js-cookie";

interface Order {
	id: string;
	date: string;
	total: string;
	products: string;
	status: string;
}

export const OrderHistorySection = (): JSX.Element => {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		const fetchOrders = async () => {
			const token = Cookies.get("token");
			if (!token) return;

			const res = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					query: `{
            me {
              orders(first: 10) {
                edges {
                  node {
                    id
                    created
                    total {
                      gross {
                        amount
                        currency
                      }
                    }
                    status
                    lines {
                      quantity
                    }
                  }
                }
              }
            }
          }`,
				}),
			});

			const json = await res.json();
			const rawOrders = json?.data?.me?.orders?.edges || [];

			const formattedOrders = rawOrders.map(({ node }: any) => ({
				id: node.id,
				date: new Date(node.created).toLocaleDateString("en-IN", {
					day: "numeric",
					month: "short",
					year: "numeric",
				}),
				total: `₹${node.total.gross.amount.toFixed(2)}`,
				products: `${node.lines.reduce((sum: number, l: any) => sum + l.quantity, 0)} Products`,
				status: node.status,
			}));

			setOrders(formattedOrders);
		};

		fetchOrders();
	}, []);

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
								<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 pl-6">
									ORDER ID
								</TableHead>
								<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700">
									DATE
								</TableHead>
								<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700">
									TOTAL
								</TableHead>
								<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700">
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
											<span className="font-body-small-body-small-400 text-gray-scalegray-800">
												#{order.id}
											</span>
										</div>
									</TableCell>
									<TableCell className="font-body-small-body-small-400 text-gray-scalegray-800">
										{order.date}
									</TableCell>
									<TableCell className="text-gray-scalegray-800 text-sm font-normal">
										<span className="font-body-small-body-small-500">
											{order.total}
										</span>
										<span className="leading-[21px]"> ({order.products})</span>
									</TableCell>
									<TableCell className="font-body-small-body-small-400 text-gray-scalegray-800">
										{order.status}
									</TableCell>
									<TableCell>
										<Button
											variant="link"
											className="font-body-small-body-small-500 p-0 text-[#ea518f]"
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
