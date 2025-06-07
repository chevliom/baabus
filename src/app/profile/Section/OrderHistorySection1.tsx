'use client';

import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import Cookies from "js-cookie";
import Link from "next/link";

interface Order {
	number: string;
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
					  number
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

			const json: any = await response.json();
			const rawOrders = json?.data?.me?.orders?.edges || [];

			const formattedOrders = rawOrders.map(({ node }: { node: Order }) => ({
				id: node.number,
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
		<div className="w-full max-w-[2054px] ml-4">
			<Card className="rounded-lg border border-[#e6e6e6] shadow-none">
				<CardContent className="">
					<h2 className="text-[20px] font-semibold text-[#1a1a1a] mb-8">
						Order History
					</h2>

					<div className="w-full overflow-x-auto">
						<table className="w-full text-left border-collapse min-w-[800px]">
							<thead className="bg-[#f5f5f5] text-[#4d4d4d] text-sm font-medium">
								<tr>
									<th className="py-3 px-4">ORDER ID</th>
									<th className="py-3 px-4">DATE</th>
									<th className="py-3 px-4">TOTAL</th>
									<th className="py-3 px-4">STATUS</th>
									<th className="py-3 px-4 text-right"></th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order.id} className="border-t text-[#1a1a1a] text-sm">
										<td className="py-4 px-4">#{order.id}</td>
										<td className="py-4 px-4">{order.date}</td>
										<td className="py-4 px-4">
											₹{order.total}.00 ({order.products} {order.products === 1 ? "Product" : "Products"})
										</td>
										<td className={`${order.statusColor}`}>{order.status}</td>
										<td className="py-4 px-4 text-right">
											<Button
												asChild
												variant="link"
												className="text-[#ea518f] text-sm p-0 underline"
											>
												<Link href="/trackorder">View Details</Link>
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Pagination Controls */}
					<div className="flex justify-center items-center gap-2 mt-6">
						<button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-400">
							&lt;
						</button>
						<button className="w-8 h-8 rounded-full bg-[#ea518f] text-white text-sm">1</button>
						<button className="w-8 h-8 rounded-full border border-gray-300 text-sm text-gray-700">2</button>
						<button className="w-8 h-8 rounded-full border border-gray-300 text-sm text-gray-700">3</button>
						<button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-400">
							&gt;
						</button>
					</div>
				</CardContent>
			</Card>
		</div>

	);
};
