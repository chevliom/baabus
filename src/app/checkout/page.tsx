"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // For app router
// import { useRouter } from "next/router"; // Use this instead for pages router
import busImage from "../assets/bus.png";
import { HeaderSection } from "../sections/HeaderSection";
import { FrameByAnima } from "../whishlist/components/FrameByAnima";

export default function CheckoutPage() {
	const router = useRouter();
	const [paymentMethod, setPaymentMethod] = useState("paypal");
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		companyName: "",
		streetAddress: "",
		email: "",
		country: "",
		state: "",
		phone: "",
		shipToDifferentAddress: false,
		orderNotes: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData({
			...formData,
			[name]: checked,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent the default form submission
		console.log("Form submitted:", formData);
		console.log("Payment method:", paymentMethod);

		// Navigate to the order page after form submission
		router.push("/order");
	};

	return (
		<div className="mt-24 flex min-h-screen flex-col bg-white">
			<HeaderSection />
			<main className="flex-grow">
				<div className="mx-auto max-w-6xl px-4 py-8">
					{/* Checkout Header */}
					<div className="mb-8 text-center">
						<h1 className="text-5xl font-bold text-pink-500">Checkout</h1>
						<div className="mt-2 flex items-center justify-center text-sm">
							<a href="/" className="text-gray-600 hover:text-pink-500">
								Home
							</a>
							<span className="mx-2">›</span>
							<span className="text-gray-400">Checkout</span>
						</div>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-8 md:flex-row">
							{/* Billing Information */}
							<div className="w-full md:w-2/3">
								<div className="mb-6">
									<h2 className="mb-4 text-xl font-semibold">Billing Information</h2>
									<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
										<div>
											<label htmlFor="firstName" className="mb-1 block text-sm text-gray-600">
												First name
											</label>
											<input
												type="text"
												id="firstName"
												name="firstName"
												placeholder="Your first name"
												className="w-full rounded border border-gray-300 p-2"
												value={formData.firstName}
												onChange={handleInputChange}
												required
											/>
										</div>
										<div>
											<label htmlFor="lastName" className="mb-1 block text-sm text-gray-600">
												Last name
											</label>
											<input
												type="text"
												id="lastName"
												name="lastName"
												placeholder="Your last name"
												className="w-full rounded border border-gray-300 p-2"
												value={formData.lastName}
												onChange={handleInputChange}
												required
											/>
										</div>
										<div>
											<label htmlFor="companyName" className="mb-1 block text-sm text-gray-600">
												Company name (optional)
											</label>
											<input
												type="text"
												id="companyName"
												name="companyName"
												placeholder="Company name"
												className="w-full rounded border border-gray-300 p-2"
												value={formData.companyName}
												onChange={handleInputChange}
											/>
										</div>
									</div>

									<div className="mb-4">
										<label htmlFor="streetAddress" className="mb-1 block text-sm text-gray-600">
											Street Address
										</label>
										<input
											type="text"
											id="streetAddress"
											name="streetAddress"
											placeholder="Street address"
											className="w-full rounded border border-gray-300 p-2"
											value={formData.streetAddress}
											onChange={handleInputChange}
											required
										/>
									</div>

									<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
										<div>
											<label htmlFor="country" className="mb-1 block text-sm text-gray-600">
												Country / Region
											</label>
											<div className="relative">
												<select
													id="country"
													name="country"
													className="w-full appearance-none rounded border border-gray-300 p-2 pr-8"
													value={formData.country}
													onChange={handleInputChange}
													required
												>
													<option value="">Select</option>
													<option value="us">United States</option>
													<option value="ca">Canada</option>
													<option value="uk">United Kingdom</option>
												</select>
												<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
													<svg className="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
														<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
													</svg>
												</div>
											</div>
										</div>
										<div>
											<label htmlFor="state" className="mb-1 block text-sm text-gray-600">
												States
											</label>
											<div className="relative">
												<select
													id="state"
													name="state"
													className="w-full appearance-none rounded border border-gray-300 p-2 pr-8"
													value={formData.state}
													onChange={handleInputChange}
													required
												>
													<option value="">Select</option>
													<option value="ny">New York</option>
													<option value="ca">California</option>
													<option value="tx">Texas</option>
												</select>
												<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
													<svg className="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
														<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
													</svg>
												</div>
											</div>
										</div>
									</div>

									<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
										<div>
											<label htmlFor="email" className="mb-1 block text-sm text-gray-600">
												Email
											</label>
											<input
												type="email"
												id="email"
												name="email"
												placeholder="Email Address"
												className="w-full rounded border border-gray-300 p-2"
												value={formData.email}
												onChange={handleInputChange}
												required
											/>
										</div>
										<div>
											<label htmlFor="phone" className="mb-1 block text-sm text-gray-600">
												Phone
											</label>
											<input
												type="tel"
												id="phone"
												name="phone"
												placeholder="Phone number"
												className="w-full rounded border border-gray-300 p-2"
												value={formData.phone}
												onChange={handleInputChange}
												required
											/>
										</div>
									</div>

									<div className="mb-4">
										<div className="flex items-center">
											<input
												type="checkbox"
												id="shipToDifferentAddress"
												name="shipToDifferentAddress"
												checked={formData.shipToDifferentAddress}
												onChange={handleCheckboxChange}
												className="mr-2"
											/>
											<label htmlFor="shipToDifferentAddress" className="text-sm text-gray-600">
												Ship to a different address
											</label>
										</div>
									</div>
								</div>

								<div>
									<h2 className="mb-4 text-xl font-semibold">Additional Info</h2>
									<div className="mb-4">
										<label htmlFor="orderNotes" className="mb-1 block text-sm text-gray-600">
											Order Notes (Optional)
										</label>
										<textarea
											id="orderNotes"
											name="orderNotes"
											placeholder="Notes about your order, e.g. special notes for delivery"
											rows={4}
											className="w-full resize-none rounded border border-gray-300 p-2"
											value={formData.orderNotes}
											onChange={handleInputChange}
										></textarea>
									</div>
								</div>
							</div>

							{/* Order Summary */}
							<div className="w-full md:w-5/12">
								<div className="mb-6">
									<h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

									<div className="mb-4 border-b pb-4">
										<div className="mb-2 flex items-center justify-between">
											<div className="flex items-center">
												<div className="relative mr-2 h-12 w-12 overflow-hidden rounded">
													<Image src={busImage} alt="Bus bottle" className="object-cover" fill sizes="48px" />
												</div>
												<span className="text-sm">Bus bottle x5</span>
											</div>
											<span className="font-medium">₹70.00</span>
										</div>

										<div className="flex items-center justify-between">
											<div className="flex items-center">
												<div className="relative mr-2 h-12 w-12 overflow-hidden rounded">
													<Image src={busImage} alt="Bus bottle" className="object-cover" fill sizes="48px" />
												</div>
												<span className="text-sm">Bus bottle xl</span>
											</div>
											<span className="font-medium">₹14.00</span>
										</div>
									</div>

									<div className="mb-4 space-y-2 border-b pb-4">
										<div className="flex justify-between">
											<span className="text-sm">Subtotal:</span>
											<span className="font-medium">₹84.00</span>
										</div>
										<div className="flex justify-between">
											<span className="text-sm">Shipping:</span>
											<span className="text-sm">Free</span>
										</div>
										<div className="flex justify-between font-medium">
											<span>Total:</span>
											<span>₹84.00</span>
										</div>
									</div>

									<div>
										<h3 className="mb-3 font-semibold">Payment Method</h3>
										<div className="mb-6 space-y-2">
											<div className="flex items-center">
												<input
													type="radio"
													id="paypal"
													name="paymentMethod"
													value="paypal"
													checked={paymentMethod === "paypal"}
													onChange={(e) => setPaymentMethod(e.target.value)}
													className="mr-2"
													required
												/>
												<label htmlFor="paypal">Paypal</label>
											</div>
											<div className="flex items-center">
												<input
													type="radio"
													id="googlepay"
													name="paymentMethod"
													value="googlepay"
													checked={paymentMethod === "googlepay"}
													onChange={(e) => setPaymentMethod(e.target.value)}
													className="mr-2"
												/>
												<label htmlFor="googlepay">Google pay</label>
											</div>
											<div className="flex items-center">
												<input
													type="radio"
													id="amazonpay"
													name="paymentMethod"
													value="amazonpay"
													checked={paymentMethod === "amazonpay"}
													onChange={(e) => setPaymentMethod(e.target.value)}
													className="mr-2"
												/>
												<label htmlFor="amazonpay">Amazon Pay</label>
											</div>
										</div>

										<button
											type="submit"
											className="w-full rounded-lg bg-pink-500 py-3 font-medium text-white transition-colors hover:bg-pink-600"
										>
											Place Order
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>

					{/* Benefits Section */}
					<FrameByAnima />
				</div>
			</main>
		</div>
	);
}
