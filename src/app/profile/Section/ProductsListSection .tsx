import React from "react";
import { Separator } from "../../ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";

export const ProductsListSection = (): JSX.Element => {
	// Product data for mapping
	const products = [
		{
			id: 1,
			name: "Bus Bottle",
			price: "₹14.00",
			quantity: "x5",
			subtotal: "₹70.00",
			image: "/image-4.png",
		},
		{
			id: 2,
			name: "Bus Bottle",
			price: "₹14.00",
			quantity: "x2",
			subtotal: "₹28.00",
			image: "/image-4.png",
		},
		{
			id: 3,
			name: "Bus Bottle",
			price: "₹26.70",
			quantity: "x10",
			subtotal: "₹267.00",
			image: "/image-4.png",
		},
	];

	return (
		<section className="mx-auto w-full max-w-[984px]">
			<Table>
				<TableHeader className="bg-gray-scalegray-50">
					<TableRow>
						<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 text-[12px] font-[500] leading-[100%] tracking-[0.36px]">
							PRODUCT
						</TableHead>
						<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 text-[12px] font-[500] leading-[100%] tracking-[0.36px]">
							PRICE
						</TableHead>
						<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 text-[12px] font-[500] leading-[100%] tracking-[0.36px]">
							QUANTITY
						</TableHead>
						<TableHead className="font-CAPS-LOCK-small-caps-lock text-gray-scalegray-700 text-[12px] font-[500] leading-[100%] tracking-[0.36px]">
							SUBTOTAL
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product, index) => (
						<React.Fragment key={product.id}>
							<TableRow className="h-[70px]">
								<TableCell className="py-6">
									<div className="flex items-center gap-3">
										<img className="h-[70px] w-[70px] object-cover" alt="Product image" src={product.image} />
										<span className="font-body-small-body-small-400 text-gray-scalegray-900 text-[14px] font-[400] leading-[150%]">
											{product.name}
										</span>
									</div>
								</TableCell>
								<TableCell className="font-body-small-body-small-400 text-gray-scalegray-900 text-[14px] font-[400] leading-[150%]">
									{product.price}
								</TableCell>
								<TableCell className="font-body-small-body-small-400 text-gray-scalegray-900 text-[14px] font-[400] leading-[150%]">
									{product.quantity}
								</TableCell>
								<TableCell className="font-body-small-body-small-500 text-gray-scalegray-900 text-[14px] font-[500] leading-[150%]">
									{product.subtotal}
								</TableCell>
							</TableRow>
							{index < products.length - 1 && (
								<TableRow>
									<TableCell colSpan={4} className="p-0">
										<Separator className="w-full" />
									</TableCell>
								</TableRow>
							)}
						</React.Fragment>
					))}
				</TableBody>
			</Table>
		</section>
	);
};
