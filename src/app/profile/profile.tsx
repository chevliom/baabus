"use client";

import React from "react";

const Profile = () => {
	return (
		<main className="space-y-20 bg-white px-6 py-10 text-gray-800">
			{/* Hero Section */}
			<section className="text-center">
				<h1 className="text-4xl font-bold">BaaBus - Baby Care Products</h1>
				<p className="mt-2 text-lg text-gray-600">Gentle products for delicate beginnings.</p>
			</section>

			{/* Product Listing */}
			<section>
				<h2 className="mb-4 text-2xl font-semibold">Our Products</h2>
				<div className="grid gap-6 md:grid-cols-3">
					{[1, 2, 3].map((id) => (
						<div key={id} className="rounded-xl border p-4 shadow transition hover:shadow-md">
							<div className="mb-3 h-40 rounded-lg bg-pink-100" />
							<h3 className="text-lg font-semibold">Product {id}</h3>
							<p className="font-bold text-pink-600">$12.99</p>
						</div>
					))}
				</div>
			</section>

			{/* Cart Summary */}
			<section>
				<h2 className="mb-4 text-2xl font-semibold">Your Cart</h2>
				<div className="space-y-4">
					<div className="flex items-center justify-between border-b pb-2">
						<span>Product 1</span>
						<span className="font-semibold">$12.99</span>
					</div>
					<div className="text-right text-lg font-bold">Total: $12.99</div>
				</div>
			</section>

			{/* Checkout Form */}
			<section>
				<h2 className="mb-4 text-2xl font-semibold">Checkout</h2>
				<form className="max-w-md space-y-4">
					<input type="text" placeholder="Full Name" className="input input-bordered w-full" />
					<input type="email" placeholder="Email" className="input input-bordered w-full" />
					<input type="text" placeholder="Shipping Address" className="input input-bordered w-full" />
					<button type="submit" className="btn w-full bg-pink-500 text-white">
						Place Order
					</button>
				</form>
			</section>

			{/* Order Confirmation */}
			<section className="rounded-xl bg-green-50 p-6 text-center">
				<h2 className="text-2xl font-bold text-green-700">Order Placed!</h2>
				<p className="mt-2 text-gray-600">Thank you for shopping with BaaBus.</p>
			</section>

			{/* Profile Info */}
			<section>
				<h2 className="mb-4 text-2xl font-semibold">Your Profile</h2>
				<div className="space-y-2">
					<p>
						<strong>Name:</strong> Jane Doe
					</p>
					<p>
						<strong>Email:</strong> jane@example.com
					</p>
					<p>
						<strong>Address:</strong> 123 Baby St, Caretown
					</p>
				</div>
			</section>
		</main>
	);
};

export default Profile;
