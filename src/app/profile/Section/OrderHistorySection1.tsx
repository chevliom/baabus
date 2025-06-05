'use client';

import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import Cookies from "js-cookie";
import Link from "next/link";

interface Order {
	id: string;
	created: string;
	status: string;
	total: {
		gross: {
			amount: number;
			currency: string;
		};
	};
	lines: {
		quantity: number;
	}[];
}

export const OrderHistorySection = (): JSX.Element => {
	const [orders, setOrders] = useState<any[]>([]);

	useEffect(() => {
		const fetchOrders = async () => {
			const token = Cookies.get("token");
			if (!token) return;

			const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					query: `
            query CurrentUserOrderList {
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
            }
          `,
				}),
			});

			const json = await response.json();
			const rawOrders = json?.data?.me?.orders?.edges || [];

			const formattedOrders = rawOrders.map(({ node }: { node: Order }) => ({
				id: node.id,
				date: new Date(node.created).toLocaleDateString("en-IN", {
					day: "numeric",
					month: "short",
					year: "numeric",
				}),
				total: `${node.total.gross.currency} ${node.total.gross.amount.toFixed(2)}`,
				products: node.lines.reduce((sum, line) => sum + line.quantity, 0),
				status: node.status,
				statusColor:
					node.status.toLowerCase() === "completed"
						? "text-[#319f43]"
						: node.status.toLowerCase() === "cancelled"
							? "text-[#f24822]"
							: node.status.toLowerCase().includes("way")
								? "text-[#148dff]"
								: "text-[#ffca24]",
			}));

			setOrders(formattedOrders);
		};

		fetchOrders();
	}, []);

	return (
		<div className="mx-auto w-full max-w-[986px]">
			<Card className="rounded-lg border border-solid border-[#e6e6e6]">
				<CardContent className="p-6">
					<h2 className="font-body-XL-body-XL-500 text-gray-scalegray-900 mb-8">
						Order History
					</h2>

					<div className="w-full overflow-y-auto max-h-[500px]">
						<table className="w-full">
							<thead className="bg-gray-scalegray-50">
								<tr>
									<th className="text-left text-gray-scalegray-700">ORDER ID</th>
									<th className="text-left text-gray-scalegray-700">DATE</th>
									<th className="text-left text-gray-scalegray-700">TOTAL</th>
									<th className="text-left text-gray-scalegray-700">STATUS</th>
									<th className="text-right"></th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order.id} className="border-t text-sm text-gray-700">
										<td className="py-3">#{order.id}</td>
										<td>{order.date}</td>
										<td>
											{order.total} ({order.products} {order.products === 1 ? "Product" : "Products"})
										</td>
										<td className={`${order.statusColor}`}>{order.status}</td>
										<td className="text-right">
											<Button
												asChild
												variant="link"
												className="text-[#ea518f] text-sm p-0"
											>
												<Link href="/trackorder">View Details</Link>
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
