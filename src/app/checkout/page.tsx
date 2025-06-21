"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // For app router
// import { useRouter } from "next/router"; // Use this instead for pages router
import busImage from "../assets/bus.png";
import { HeaderSection } from "../sections/HeaderSection";
import { FrameByAnima } from "../whishlist/components/FrameByAnima";
import Cookies from "js-cookie";
import { any } from "zod";
import toast from "react-hot-toast";

declare global {
	interface Window {
		Razorpay: any;
	}
}

const loadRazorpayScript = (): Promise<boolean> => {
	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		script.onload = () => resolve(true);
		script.onerror = () => resolve(false);
		document.body.appendChild(script);
	});
};

interface MetadataItem {
	key: string;
	value: string;
}

interface Country {
	code: string;
	country: string;
}

interface Address {
	id?: string;
	firstName: string;
	lastName: string;
	companyName: string;
	phone: string;
	streetAddress1: string;
	streetAddress2: string;
	city: string;
	cityArea: string;
	countryArea: string;
	postalCode: string;
	country: Country;
	metadata: MetadataItem[];
	isDefaultBillingAddress?: boolean;
	isDefaultShippingAddress?: boolean;
}

interface RazorpayResponse {
	razorpay_payment_id: string;
	razorpay_order_id?: string;
	razorpay_signature?: string;
}

interface RazorpayOptions {
	key: string;
	amount: number;
	currency: string;
	name: string;
	description: string;
	image?: string;
	order_id?: string;
	handler: (response: RazorpayResponse) => void;
	prefill?: {
		name?: string;
		email?: string;
		contact?: string;
	};
	theme?: {
		color?: string;
	};
}


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
		postalCode: "",
		shipToDifferentAddress: false,
		orderNotes: "",
		isGift: false,
	});

	const [giftFormData, setGiftFormData] = useState({
		firstName: "",
		lastName: "",
		companyName: "",
		streetAddress: "",
		state: "",
		email: "",
		phone: "",
		postalCode: "",
	});

	const handlePlaceOrder = async () => {
		const res = await loadRazorpayScript();
		if (!res) {
			alert("Razorpay SDK failed to load. Please check your internet.");
			return;
		}

		const options: RazorpayOptions = {
			key: "rzp_test_1ogW6Wcoazu0cr", // Replace with your Razorpay Test Key
			amount: total * 100, // amount in paise
			currency: "INR",
			name: "Babus",
			description: "Order Payment",
			// image: "",
			handler: async function (response) {
				alert("Payment successful!");
				console.log("Payment ID:", response.razorpay_payment_id);
				console.log("Order ID:", response.razorpay_order_id);
				console.log("Signature:", response.razorpay_signature);
				router.push('/success');
			},
			prefill: {
				name: formData.firstName + " " + formData.lastName,
				email: formData.email,
				contact: formData.phone,
			},
			theme: {
				color: "#ec4899",
			},
		};

		const rzp = new (window as any).Razorpay(options);
		rzp.open();
	};


	const handleGiftInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setGiftFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const checkoutId = Cookies.get("use_checkout_id");
		const token = Cookies.get("token");
		const graphqlEndpoint = "https://baabusbabycare.visiobyte.in/graphql/";

		if (!checkoutId || !token) {
			toast.error("Missing checkout ID or token.");
			return;
		}

		const billingAddress = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			companyName: formData.companyName || "",
			streetAddress1: formData.streetAddress,
			streetAddress2: "",
			city: formData.state,
			postalCode: formData.postalCode,
			country: "IN",
			countryArea: formData.state,
			phone: formData.phone,
		};

		const shippingAddress = formData.isGift
			? {
				firstName: giftFormData.firstName,
				lastName: giftFormData.lastName,
				companyName: giftFormData.companyName || "",
				streetAddress1: giftFormData.streetAddress,
				streetAddress2: "",
				city: giftFormData.state,
				postalCode: giftFormData.postalCode,
				country: "IN",
				countryArea: giftFormData.state,
				phone: giftFormData.phone,
			}
			: billingAddress;

		const sendGraphQL = async (query: string, variables: any) => {
			const res = await fetch(graphqlEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ query, variables }),
			});
			return res.json();
		};

		const billingMutation = `mutation UpdateCheckoutBillingAddress($checkoutId: ID!, $billingAddress: AddressInput!) {
		checkoutBillingAddressUpdate(id: $checkoutId, billingAddress: $billingAddress) {
			errors: checkoutErrors {
			...CheckoutError
			
			}
			checkout {
			...Checkout
			
			}
			
		}
		}

		fragment Price on TaxedMoney {
		gross {
			amount
			currency
			
		}
		net {
			amount
			currency
			
		}
		
		}

		fragment ProductVariant on ProductVariant {
		id
		name
		sku
		quantityAvailable
		pricing {
			onSale
			priceUndiscounted {
			...Price
			
			}
			price {
			...Price
			
			}
			
		}
		attributes {
			attribute {
			id
			name
			
			}
			values {
			id
			name
			value: name
			
			}
			
		}
		product {
			id
			name
			slug
			thumbnail {
			url
			alt
			
			}
			thumbnail2x: thumbnail(size: 510) {
			url
			
			}
			productType {
			id
			isShippingRequired
			
			}
			
		}
		
		}

		fragment CheckoutLine on CheckoutLine {
		id
		quantity
		totalPrice {
			...Price
			
		}
		variant {
			...ProductVariant
			
		}
		
		}

		fragment Address on Address {
		id
		firstName
		lastName
		companyName
		streetAddress1
		streetAddress2
		city
		postalCode
		country {
			code
			country
			
		}
		countryArea
		phone
		isDefaultBillingAddress
		isDefaultShippingAddress
		
		}

		fragment ShippingMethod on ShippingMethod {
		id
		name
		price {
			currency
			amount
			
		}
		
		}

		fragment PaymentGateway on PaymentGateway {
		id
		name
		config {
			field
			value
			
		}
		currencies
		
		}

		fragment Checkout on Checkout {
		token
		id
		totalPrice {
			...Price
			
		}
		subtotalPrice {
			...Price
			
		}
		billingAddress {
			...Address
			
		}
		shippingAddress {
			...Address
			
		}
		email
		availableShippingMethods {
			...ShippingMethod
			
		}
		shippingMethod {
			...ShippingMethod
			
		}
		shippingPrice {
			...Price
			
		}
		lines {
			...CheckoutLine
			
		}
		isShippingRequired
		discount {
			currency
			amount
			
		}
		discountName
		translatedDiscountName
		voucherCode
		availablePaymentGateways {
			...PaymentGateway
			
		}
		
		}

		fragment CheckoutError on CheckoutError {
		code
		field
		message
		
		}

		`;
		const shippingMutation = `mutation UpdateCheckoutShippingAddress($checkoutId: ID!, $shippingAddress: AddressInput!) {
		checkoutShippingAddressUpdate(id: $checkoutId, shippingAddress: $shippingAddress) {
			errors: checkoutErrors {
			...CheckoutError
			
			}
			checkout {
			...Checkout
			
			}
			
		}
		}

		fragment Price on TaxedMoney {
		gross {
			amount
			currency
			
		}
		net {
			amount
			currency
			
		}
		tax{
			amount
		}
		
		}

		fragment ProductVariant on ProductVariant {
		id
		name
		sku
		quantityAvailable
		pricing {
			onSale
			priceUndiscounted {
			...Price
			
			}
			price {
			...Price
			
			}
			
		}
		attributes {
			attribute {
			id
			name
			
			}
			values {
			id
			name
			value: name
			
			}
			
		}
		product {
			id
			name
			slug
			thumbnail {
			url
			alt
			
			}
			thumbnail2x: thumbnail(size: 510) {
			url
			
			}
			productType {
			id
			isShippingRequired
			
			}
			
		}
		
		}

		fragment CheckoutLine on CheckoutLine {
		id
		quantity
		totalPrice {
			...Price
			
		}
		variant {
			...ProductVariant
			
		}
		
		}

		fragment Address on Address {
		id
		firstName
		lastName
		companyName
		streetAddress1
		streetAddress2
		city
		postalCode
		country {
			code
			country
			
		}
		countryArea
		phone
		isDefaultBillingAddress
		isDefaultShippingAddress
		
		}

		fragment ShippingMethod on ShippingMethod {
		id
		name
		price {
			currency
			amount
			
		}
		
		}




		fragment Checkout on Checkout {
		token
		id
		totalPrice {
			...Price
			
		}
		subtotalPrice {
			...Price
			
		}
		billingAddress {
			...Address
			
		}
		shippingAddress {
			...Address
			
		}
		email
		availableShippingMethods {
			...ShippingMethod
			
		}
		shippingMethod {
			...ShippingMethod
			
		}
		shippingPrice {
			...Price
			
		}
		lines {
			...CheckoutLine
			
		}
		isShippingRequired
		discount {
			currency
			amount
			
		}
		discountName
		translatedDiscountName
		voucherCode

		
		}

		fragment CheckoutError on CheckoutError {
		code
		field
		message
		
		}

		`;
		const availableShippingQuery = `query AvailableShippingMethods($checkoutId: ID!){
		checkout(id: $checkoutId) {
			shippingMethods {
			id
			name
			active
			price {
				currency
				amount
			}
			}
			availableCollectionPoints {
			id
			name
			clickAndCollectOption
			}
		}
		}`;
		const setShippingMethodMutation = `mutation UpdateCheckoutShippingMethod($checkoutId: ID!, $shippingMethodId: ID!) {
			checkoutShippingMethodUpdate(
				id: $checkoutId, 
				shippingMethodId: $shippingMethodId) 
				{
				checkout {
				...Checkout
				
				}
				errors: checkoutErrors {
				...CheckoutError
				
				}
				
			}
			}

			fragment Price on TaxedMoney {
			gross {
				amount
				currency
				
			}
			net {
				amount
				currency
				
			}
			
			}

			fragment ProductVariant on ProductVariant {
			id
			name
			sku
			quantityAvailable
			pricing {
				onSale
				priceUndiscounted {
				...Price
				
				}
				price {
				...Price
				
				}
				
			}
			attributes {
				attribute {
				id
				name
				
				}
				values {
				id
				name
				value: name
				
				}
				
			}
			product {
				id
				name
				slug
				thumbnail {
				url
				alt
				
				}
				thumbnail2x: thumbnail(size: 510) {
				url
				
				}
				productType {
				id
				isShippingRequired
				
				}
				
			}
			
			}

			fragment CheckoutLine on CheckoutLine {
			id
			quantity
			totalPrice {
				...Price
				
			}
			variant {
				...ProductVariant
				
			}
			
			}

			fragment Address on Address {
			id
			firstName
			lastName
			companyName
			streetAddress1
			streetAddress2
			city
			postalCode
			country {
				code
				country
				
			}
			countryArea
			phone
			isDefaultBillingAddress
			isDefaultShippingAddress
			
			}

			fragment ShippingMethod on ShippingMethod {
			id
			name
			price {
				currency
				amount
				
			}
			
			}

			fragment PaymentGateway on PaymentGateway {
			id
			name
			config {
				field
				value
				
			}
			currencies
			
			}

			fragment Checkout on Checkout {
			token
			id
			totalPrice {
				...Price
				
			}
			subtotalPrice {
				...Price
				
			}
			billingAddress {
				...Address
				
			}
			shippingAddress {
				...Address
				
			}
			email
			availableShippingMethods {
				...ShippingMethod
				
			}
			shippingMethod {
				...ShippingMethod
				
			}
			shippingPrice {
				...Price
				
			}
			lines {
				...CheckoutLine
				
			}
			isShippingRequired
			discount {
				currency
				amount
				
			}
			discountName
			translatedDiscountName
			voucherCode
			availablePaymentGateways {
				...PaymentGateway
				
			}
			
			}

			fragment CheckoutError on CheckoutError {
			code
			field
			message
			
			}
			`;

		try {
			const billingRes: any = await sendGraphQL(billingMutation, {
				checkoutId,
				billingAddress,
			});
			if (billingRes.data?.checkoutBillingAddressUpdate?.errors?.length) {
				billingRes.data.checkoutBillingAddressUpdate.errors.forEach((err: any) =>
					toast.error(`${err.field || ""}: ${err.message}`)
				);
				return;
			}

			const shippingRes: any = await sendGraphQL(shippingMutation, {
				checkoutId,
				shippingAddress,
			});
			if (shippingRes.data?.checkoutShippingAddressUpdate?.errors?.length) {
				shippingRes.data.checkoutShippingAddressUpdate.errors.forEach((err: any) =>
					toast.error(`${err.field || ""}: ${err.message}`)
				);
				return;
			}

			const shippingMethodsRes: any = await sendGraphQL(availableShippingQuery, {
				checkoutId,
			});
			const shippingMethods = shippingMethodsRes.data?.checkout?.shippingMethods;
			if (!shippingMethods || shippingMethods.length === 0) {
				toast.error("No shipping methods available.");
				return;
			}

			const shippingMethodId = shippingMethods[0].id;

			const updateShippingMethodRes: any = await sendGraphQL(setShippingMethodMutation, {
				checkoutId,
				shippingMethodId,
			});
			if (updateShippingMethodRes.data?.checkoutShippingMethodUpdate?.errors?.length) {
				updateShippingMethodRes.data.checkoutShippingMethodUpdate.errors.forEach((err: any) =>
					toast.error(`${err.field || ""}: ${err.message}`)
				);
				return;
			}

			router.push("/order");
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong during submission.");
		}
	};



	const [cartItems, setCartItems] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [email, setEmail] = useState<string | null>(null);

	const CHECKOUT_QUERY = `
			query Checkout($id: ID!) {
				checkout(id: $id) {
					id
					token
					isShippingRequired
					totalPrice {
						gross {
							amount
						}
					}
					giftCards { id isActive }
					shippingMethods {
						id
						name
						price { amount }
						active
						message
					}
					lines {
						id
						variant {
							id
							name
							images {
								url(format: ORIGINAL)
								id
								alt
							}
							product { name }
						}
						quantity
						totalPrice {
							net { amount currency }
							gross { amount currency }
							currency
						}
						unitPrice {
							currency
							gross { amount currency }
						}
					}
					shippingAddress {
						id
						isDefaultShippingAddress
						isDefaultBillingAddress
						streetAddress1
					}
					deliveryMethod {
						... on Warehouse {
							id
							email
						}
						... on ShippingMethod {
							id
							name
							active
						}
					}
				}
			}
		`;

	useEffect(() => {
		const fetchCheckout = async () => {
			const checkoutId = Cookies.get("use_checkout_id");
			if (!checkoutId) return;

			try {
				const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token") || ""}`,
					},
					body: JSON.stringify({
						query: CHECKOUT_QUERY,
						variables: { id: checkoutId },
					}),
				});

				const result: any = await response.json();
				const lines = result.data.checkout?.lines || [];

				const mappedItems = lines.map((line: any) => ({
					id: line.id,
					variantId: line.variant.id,
					name: line.variant.product.name,
					price: line.unitPrice.gross.amount,
					quantity: line.quantity,
					image: line.variant.images?.[0]?.url || "/placeholder.png",
				}));

				setCartItems(mappedItems);
			} catch (error) {
				console.error("Error fetching checkout:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCheckout();
	}, []);

	const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
	const discount = 0;
	const total = subtotal - discount;

	useEffect(() => {
		const fetchUserData = async () => {
			const token = Cookies.get("token");
			if (!token) return;

			const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					query: `{
							me {
								email
								addresses {
									id
									firstName
									lastName
									companyName
									phone
									streetAddress1
									streetAddress2
									city
									cityArea
									countryArea
									postalCode
									country {
										code
										country
									}
									metadata {
										key
										value
									}
									isDefaultBillingAddress
									isDefaultShippingAddress
								}
							}
						}`,
				}),
			});

			const json = await response.json() as {
				data?: {
					me?: {
						email?: string;
						addresses?: Address[];
					};
				};
			};
			const addresses = json?.data?.me?.addresses || [];
			const user = json?.data?.me;

			let selected = addresses.find((addr: Address) => addr.isDefaultShippingAddress) || addresses[0];

			if (selected) {
				setFormData(prev => ({
					...prev,
					firstName: selected.firstName || "",
					lastName: selected.lastName || "",
					companyName: selected.companyName || "",
					streetAddress: selected.streetAddress1 || "",
					phone: selected.phone || "",
					state: selected.countryArea || "",
					postalCode: selected.postalCode || "",
					country: selected.country?.code?.toLowerCase() || "",
					email: user?.email || "",
				}));
			}
			setEmail(user?.email || null);
		};
		fetchUserData();
	}, []);

	return (
		<div className="mt-24 flex min-h-screen flex-col bg-white">
			<HeaderSection />
			<main className="flex-grow">
				<div className="mx-auto max-w-6xl px-4 py-8">
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
													<option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
													<option value="Andhra Pradesh">Andhra Pradesh</option>
													<option value="Arunachal Pradesh">Arunachal Pradesh</option>
													<option value="Assam">Assam</option>
													<option value="Bihar">Bihar</option>
													<option value="Chandigarh">Chandigarh</option>
													<option value="Chhattisgarh">Chhattisgarh</option>
													<option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
													<option value="Delhi">Delhi</option>
													<option value="Goa">Goa</option>
													<option value="Gujarat">Gujarat</option>
													<option value="Haryana">Haryana</option>
													<option value="Himachal Pradesh">Himachal Pradesh</option>
													<option value="Jammu and Kashmir">Jammu and Kashmir</option>
													<option value="Jharkhand">Jharkhand</option>
													<option value="Karnataka">Karnataka</option>
													<option value="Kerala">Kerala</option>
													<option value="Ladakh">Ladakh</option>
													<option value="Lakshadweep">Lakshadweep</option>
													<option value="Madhya Pradesh">Madhya Pradesh</option>
													<option value="Maharashtra">Maharashtra</option>
													<option value="Manipur">Manipur</option>
													<option value="Meghalaya">Meghalaya</option>
													<option value="Mizoram">Mizoram</option>
													<option value="Nagaland">Nagaland</option>
													<option value="Odisha">Odisha</option>
													<option value="Puducherry">Puducherry</option>
													<option value="Punjab">Punjab</option>
													<option value="Rajasthan">Rajasthan</option>
													<option value="Sikkim">Sikkim</option>
													<option value="Tamil Nadu">Tamil Nadu</option>
													<option value="Telangana">Telangana</option>
													<option value="Tripura">Tripura</option>
													<option value="Uttar Pradesh">Uttar Pradesh</option>
													<option value="Uttarakhand">Uttarakhand</option>
													<option value="West Bengal">West Bengal</option>

												</select>
												<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
													<svg className="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
														<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
													</svg>
												</div>
											</div>
										</div>
										<div>
											<label htmlFor="postalCode" className="mb-1 block text-sm text-gray-600">
												Postal Code
											</label>
											<input
												type="tel"
												id="postalCode"
												name="postalCode"
												placeholder="Postal Code"
												className="w-full rounded border border-gray-300 p-2"
												value={formData.postalCode}
												onChange={handleInputChange}
												required
											/>
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

									{/* <div className="mb-4">
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
									</div> */}

									<div className="mb-4">
										<div className="flex items-center">
											<input
												type="checkbox"
												id="isGift"
												name="isGift"
												checked={formData.isGift}
												onChange={handleCheckboxChange}
												className="mr-2"
											/>
											<label htmlFor="isGift" className="text-sm text-gray-600">
												Is gift?
											</label>
										</div>
									</div>
								</div>

								{formData.isGift && (
									<div className="mb-6">
										<h2 className="mb-4 text-xl font-semibold">Gift Recipient Information</h2>
										<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
											<div>
												<label htmlFor="giftFirstName" className="mb-1 block text-sm text-gray-600">First name</label>
												<input
													type="text"
													id="giftFirstName"
													name="firstName"
													placeholder="Recipient's first name"
													className="w-full rounded border border-gray-300 p-2"
													value={giftFormData.firstName}
													onChange={handleGiftInputChange}
													required
												/>
											</div>
											<div>
												<label htmlFor="giftLastName" className="mb-1 block text-sm text-gray-600">Last name</label>
												<input
													type="text"
													id="giftLastName"
													name="lastName"
													placeholder="Recipient's last name"
													className="w-full rounded border border-gray-300 p-2"
													value={giftFormData.lastName}
													onChange={handleGiftInputChange}
													required
												/>
											</div>
											<div>
												<label htmlFor="giftCompanyName" className="mb-1 block text-sm text-gray-600">Company name (optional)</label>
												<input
													type="text"
													id="giftCompanyName"
													name="companyName"
													placeholder="Company name"
													className="w-full rounded border border-gray-300 p-2"
													value={giftFormData.companyName}
													onChange={handleGiftInputChange}
												/>
											</div>
										</div>

										<div className="mb-4">
											<label htmlFor="giftStreetAddress" className="mb-1 block text-sm text-gray-600">Street Address</label>
											<input
												type="text"
												id="giftStreetAddress"
												name="streetAddress"
												placeholder="Recipient's address"
												className="w-full rounded border border-gray-300 p-2"
												value={giftFormData.streetAddress}
												onChange={handleGiftInputChange}
												required
											/>
										</div>

										{/* <div className="mb-4">
											<label htmlFor="giftState" className="mb-1 block text-sm text-gray-600">State</label>
											<select
												id="giftState"
												name="state"
												className="w-full appearance-none rounded border border-gray-300 p-2 pr-8"
												value={giftFormData.state}
												onChange={handleGiftInputChange}
												required
											>
												<option value="">Select</option>
												<option value="MH">Maharashtra</option>
												<option value="GJ">Gujarat</option>
											</select>
										</div> */}

										<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
											<div>
												<label htmlFor="giftState" className="mb-1 block text-sm text-gray-600">
													States
												</label>
												<div className="relative">
													<select
														id="giftState"
														name="state"
														className="w-full appearance-none rounded border border-gray-300 p-2 pr-8"
														value={giftFormData.state}
														onChange={handleGiftInputChange}
														required
													>
														<option value="">Select</option>
														<option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
														<option value="Andhra Pradesh">Andhra Pradesh</option>
														<option value="Arunachal Pradesh">Arunachal Pradesh</option>
														<option value="Assam">Assam</option>
														<option value="Bihar">Bihar</option>
														<option value="Chandigarh">Chandigarh</option>
														<option value="Chhattisgarh">Chhattisgarh</option>
														<option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
														<option value="Delhi">Delhi</option>
														<option value="Goa">Goa</option>
														<option value="Gujarat">Gujarat</option>
														<option value="Haryana">Haryana</option>
														<option value="Himachal Pradesh">Himachal Pradesh</option>
														<option value="Jammu and Kashmir">Jammu and Kashmir</option>
														<option value="Jharkhand">Jharkhand</option>
														<option value="Karnataka">Karnataka</option>
														<option value="Kerala">Kerala</option>
														<option value="Ladakh">Ladakh</option>
														<option value="Lakshadweep">Lakshadweep</option>
														<option value="Madhya Pradesh">Madhya Pradesh</option>
														<option value="Maharashtra">Maharashtra</option>
														<option value="Manipur">Manipur</option>
														<option value="Meghalaya">Meghalaya</option>
														<option value="Mizoram">Mizoram</option>
														<option value="Nagaland">Nagaland</option>
														<option value="Odisha">Odisha</option>
														<option value="Puducherry">Puducherry</option>
														<option value="Punjab">Punjab</option>
														<option value="Rajasthan">Rajasthan</option>
														<option value="Sikkim">Sikkim</option>
														<option value="Tamil Nadu">Tamil Nadu</option>
														<option value="Telangana">Telangana</option>
														<option value="Tripura">Tripura</option>
														<option value="Uttar Pradesh">Uttar Pradesh</option>
														<option value="Uttarakhand">Uttarakhand</option>
														<option value="West Bengal">West Bengal</option>

													</select>
													<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
														<svg className="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
															<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
														</svg>
													</div>
												</div>
											</div>
											<div>
												<label htmlFor="giftPostalCode" className="mb-1 block text-sm text-gray-600">
													Postal Code
												</label>
												<input
													id="giftPostalCode"
													name="postalCode"
													placeholder="Postal Code"
													className="w-full rounded border border-gray-300 p-2"
													value={giftFormData.postalCode}
													onChange={handleGiftInputChange}
													required
												/>
											</div>
										</div>

										<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
											<div>
												<label htmlFor="giftEmail" className="mb-1 block text-sm text-gray-600">Email</label>
												<input
													type="email"
													id="giftEmail"
													name="email"
													placeholder="Recipient's Email"
													className="w-full rounded border border-gray-300 p-2"
													value={giftFormData.email}
													onChange={handleGiftInputChange}
													required
												/>
											</div>
											<div>
												<label htmlFor="giftPhone" className="mb-1 block text-sm text-gray-600">Phone</label>
												<input
													type="tel"
													id="giftPhone"
													name="phone"
													placeholder="Recipient's Phone"
													className="w-full rounded border border-gray-300 p-2"
													value={giftFormData.phone}
													onChange={handleGiftInputChange}
													required
												/>
											</div>
										</div>
									</div>
								)}
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
							<div className="w-full md:w-5/12">
								<div className="mb-6">
									<h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

									<div className="mb-4 border-b pb-4 space-y-3">
										{loading ? (
											<p className="text-sm text-gray-400">Loading order summary...</p>
										) : cartItems.length === 0 ? (
											<p className="text-sm text-gray-500">Your cart is empty.</p>
										) : (
											cartItems.map((item, index) => (
												<div key={item.id || index} className="flex items-center justify-between">
													<div className="flex items-center">
														<div className="relative mr-2 h-12 w-12 overflow-hidden rounded">
															<Image
																src={item.image || "/placeholder.png"}
																alt={item.name}
																fill
																sizes="48px"
																className="object-cover"
															/>
														</div>
														<span className="text-sm">{item.name} x{item.quantity}</span>
													</div>
													<span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
												</div>
											))
										)}
									</div>

									<div className="mb-4 space-y-2 border-b pb-4">
										<div className="flex justify-between">
											<span className="text-sm">Subtotal:</span>
											<span className="font-medium">₹{subtotal.toFixed(2)}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-sm">Shipping:</span>
											<span className="text-sm">Free</span>
										</div>
										<div className="flex justify-between font-medium">
											<span>Total:</span>
											<span>₹{total.toFixed(2)}</span>
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
				</div>
				<FrameByAnima />
			</main>
		</div>
	);
}
