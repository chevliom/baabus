import { Trash2Icon, XIcon } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { Sheet, SheetClose, SheetContent } from "../../ui/sheet";

// Cart item data
const cartItems = [
	{
		id: 1,
		name: "Bus Bottle",
		quantity: 1,
		price: 12.0,
		image: "/image-4.png",
	},
	{
		id: 2,
		name: "Bus Bottle",
		quantity: 1,
		price: 14.0,
		image: "/image-4.png",
	},
];

export const ShoppingCartPopupSection = (): JSX.Element => {
	// Calculate total price
	const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

	return (
		<Sheet>
			<SheetContent>
				<div className="bg-gray-scalewhite flex h-full w-[396px] flex-col justify-between border border-solid border-[#e6e6e6] shadow-[0px_12px_48px_#0000001f]">
					<div className="flex flex-col gap-3 p-10">
						<div className="flex w-full items-center justify-between">
							<h2 className="font-body-XL-body-XL-500 text-gray-scalegray-900 text-xl leading-5">
								Shopping Cart (2)
							</h2>

							<SheetClose className="flex h-[45px] w-[45px] items-center justify-center">
								<XIcon className="h-6 w-6" />
							</SheetClose>
						</div>

						<div className="flex flex-col gap-3">
							{cartItems.map((item, index) => (
								<React.Fragment key={item.id}>
									<div className="bg-gray-scalewhite flex items-center gap-2">
										<img className="h-[70px] w-[70px] object-cover" alt={item.name} src={item.image} />

										<div className="flex flex-col items-start gap-0.5">
											<div className="font-body-small-body-small-400 text-gray-scalegray-900 w-[216px]">
												{item.name}
											</div>

											<div className="flex items-center gap-1">
												<span className="font-body-small-body-small-400 text-gray-scalegray-500 whitespace-nowrap">
													{item.quantity} unit
												</span>
												<span className="font-body-small-body-small-400 text-gray-scalegray-500 whitespace-nowrap">
													x
												</span>
												<span className="font-body-small-body-small-600 text-gray-scalegray-900 whitespace-nowrap">
													{item.price.toFixed(2)}
												</span>
											</div>
										</div>

										<Button variant="ghost" size="icon" className="ml-auto">
											<Trash2Icon className="text-gray-scalegray-500 h-6 w-6" />
										</Button>
									</div>

									{index < cartItems.length - 1 && <Separator className="w-full" />}
								</React.Fragment>
							))}
						</div>
					</div>

					<div className="p-10 pt-0">
						<div className="flex w-full items-center justify-between py-6">
							<div className="font-body-medium-body-medium-400 text-gray-scalegray-900 whitespace-nowrap">
								{cartItems.length} Product
							</div>
							<div className="font-body-medium-body-medium-600 text-gray-scalegray-900 whitespace-nowrap">
								₹{totalPrice.toFixed(2)}
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<Button className="text-gray-scalewhite w-full rounded-[43px] bg-[#ea518f] py-4 hover:bg-[#d6407d]">
								Proceed to Checkout
							</Button>

							<Button
								variant="outline"
								className="w-full rounded-[43px] border-none bg-[#56ac591a] py-4 text-[#ea518f] hover:bg-[#56ac5930]"
							>
								Go To Cart
							</Button>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};
