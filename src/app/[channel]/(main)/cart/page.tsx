"use client";
import React, { useState } from "react";

const CartPage = () => {
	const [cartItems, setCartItems] = useState([
		{ id: 1, name: "Bus Bottle", price: 14.0, quantity: 5, image: "/bus-bottle.png" },
		{ id: 2, name: "Bus Bottle", price: 14.0, quantity: 5, image: "/bus-bottle.png" },
	]);

	const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
	const discount = 21.0;
	const total = subtotal - discount;

	const handleQuantityChange = (id: number, type: "inc" | "dec") => {
		setCartItems((prev) =>
			prev.map((item) =>
				item.id === id
					? {
							...item,
							quantity: type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
						}
					: item,
			),
		);
	};

	const handleRemoveItem = (id: number) => {
		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	return (
		<div>
			{/* Header */}
			<div
				className="h-[190px] bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url('/cart-bg.png')" }}
			>
				<div className="pt-16 text-center">
					<h1 className="font-baloo text-6xl font-extrabold text-[#EB5190]">Cart</h1>
					<div className="mt-2 text-sm text-[#333]">
						<span className="font-semibold">Home</span> <span className="mx-1">›</span> <span>Cart</span>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="mx-auto max-w-[1200px] px-4 py-12">
				<h2 className="mb-8 text-center text-3xl font-semibold">My Shopping Cart</h2>

				<div className="flex flex-col gap-8 lg:flex-row">
					{/* Cart Items */}
					<div className="overflow-hidden rounded-xl border border-[#EAEAEA] bg-white p-6 shadow lg:w-2/3">
						<div className="w-full">
							<div className="grid grid-cols-5 border-b border-[#EAEAEA] pb-4 text-sm text-[#808080]">
								<div className="col-span-2">PRODUCT</div>
								<div className="text-center">PRICE</div>
								<div className="text-center">QUANTITY</div>
								<div className="text-right">SUBTOTAL</div>
							</div>

							{cartItems.length === 0 ? (
								<div className="py-10 text-center text-gray-500">Your cart is empty</div>
							) : (
								cartItems.map((item) => (
									<div key={item.id} className="grid grid-cols-5 items-center border-b border-[#EAEAEA] py-6">
										<div className="col-span-2 flex items-center gap-4">
											<img src={item.image} alt={item.name} className="h-16 w-16 object-contain" />
											<span className="text-[#1A1A1A]">{item.name}</span>
										</div>
										<div className="text-center text-[#1A1A1A]">₹{item.price.toFixed(2)}</div>
										<div className="flex justify-center">
											<div className="flex h-[40px] w-[110px] items-center justify-center rounded-full border border-[#EAEAEA] bg-white px-2">
												<button
													onClick={() => handleQuantityChange(item.id, "dec")}
													className="rounded-full bg-[#F2F2F2] px-3 py-0.5 text-lg text-[#333]"
												>
													−
												</button>
												<span className="mx-2 font-medium text-[#1A1A1A]">{item.quantity}</span>
												<button
													onClick={() => handleQuantityChange(item.id, "inc")}
													className="rounded-full bg-[#F2F2F2] px-3 py-0.5 text-lg text-[#333]"
												>
													+
												</button>
											</div>
										</div>
										<div className="flex items-center justify-end gap-4">
											<span className="font-semibold text-[#1A1A1A]">
												₹{(item.price * item.quantity).toFixed(2)}
											</span>
											<button
												onClick={() => handleRemoveItem(item.id)}
												className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 p-0 text-xl text-gray-500 hover:text-black"
											>
												×
											</button>
										</div>
									</div>
								))
							)}

							<div className="flex justify-end pt-6">
								<button className="rounded-full bg-[#F4F4F4] px-6 py-2 text-sm font-medium text-[#4D4D4D] hover:bg-[#EAEAEA]">
									Return to shop
								</button>
							</div>
						</div>
					</div>

					{/* Cart Summary */}
					<div className="space-y-6 lg:w-1/3">
						<div className="flex items-center gap-2">
							<span className="whitespace-nowrap rounded border border-[#E6E6E6] px-3 py-2 text-sm font-semibold text-[#333]">
								Coupon Code
							</span>
							<div className="relative flex items-center gap-2">
								<input
									type="text"
									placeholder="Enter code"
									className="flex-1 rounded-full border border-[#EAEAEA] px-2 py-2 pr-20 focus:outline-none focus:ring-1 focus:ring-[#FF4BAC]"
								/>
								<button className="absolute right-2 rounded-full bg-black px-4 py-3 text-sm font-medium text-white hover:bg-[#333]">
									Apply Coupon
								</button>
							</div>
						</div>

						<div className="rounded-lg bg-white p-8 text-[#333] shadow">
							<h3 className="mb-4 text-lg font-semibold">Cart Total</h3>
							<div className="mb-6 space-y-3 text-sm">
								<div className="flex justify-between">
									<span>Subtotal:</span>
									<span>₹{subtotal.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span>Shipping:</span>
									<span className="text-black-500 font-medium">Free</span>
								</div>
								<div className="flex justify-between">
									<span>Discount:</span>
									<span className="text-black-500">-₹{discount.toFixed(2)}</span>
								</div>
								<div className="flex justify-between border-t border-[#EAEAEA] pt-3 font-semibold">
									<span>Total:</span>
									<span>₹{total.toFixed(2)}</span>
								</div>
							</div>
							<button className="w-full rounded-full bg-[#FF4BAC] px-4 py-3 font-semibold text-white transition hover:bg-[#e34291]">
								Proceed to checkout
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Full-width Footer Section */}
			<div className="min-h-[220px] w-full bg-[#FDF1F6] py-10">
				<div className="mx-auto max-w-[1400px] px-4 pt-6 md:px-8 xl:px-16">
					<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
						{/* Feature 1 */}
						<div className="flex items-start">
							<div className="mr-4 h-14 w-14">
								<img
									src="/icons/trophy.png"
									alt="High Quality Icon"
									className="h-full w-full scale-125 object-contain"
								/>
							</div>
							<div>
								<p className="text-2xl font-semibold text-[#242424]">High Quality</p>
								<p className="text-base text-[#898989]">crafted from top materials</p>
							</div>
						</div>

						{/* Feature 2 */}
						<div className="flex items-start">
							<div className="mr-4 h-14 w-14">
								<img
									src="/icons/warranty1.png"
									alt="Warranty Icon"
									className="h-full w-full object-contain"
								/>
							</div>
							<div>
								<p className="text-2xl font-semibold text-[#242424]">Warranty Protection</p>
								<p className="text-base text-[#898989]">Over 2 years</p>
							</div>
						</div>

						{/* Feature 3 */}
						<div className="flex items-start">
							<div className="mr-4 h-14 w-14">
								<img
									src="/icons/shipping.png"
									alt="Free Shipping Icon"
									className="h-full w-full object-contain"
								/>
							</div>
							<div>
								<p className="text-2xl font-semibold text-[#242424]">Free Shipping</p>
								<p className="text-base text-[#898989]">Order over 150 $</p>
							</div>
						</div>

						{/* Feature 4 */}
						<div className="flex items-start">
							<div className="mr-4 h-14 w-14">
								<img
									src="/icons/image.png"
									alt="Support Icon"
									className="h-full w-full scale-125 object-contain"
								/>
							</div>
							<div>
								<p className="text-2xl font-semibold text-[#242424]">24 / 7 Support</p>
								<p className="text-base text-[#898989]">Dedicated support</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
