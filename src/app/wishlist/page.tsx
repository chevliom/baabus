// pages/wishlist.tsx
import React from "react";

const WishlistPage = () => {
	const wishlistItems = [
		{
			id: 1,
			name: "Bus Bottle",
			price: "₹14.99",
			oldPrice: "₹20.00",
			stock: "In Stock",
			urgency: "1 item left. Hurry!",
		},
		{ id: 2, name: "Bus Bottle", price: "₹45.00", stock: "In Stock" },
		{ id: 3, name: "Bus Bottle", price: "₹69.00", stock: "Out of Stock" },
	];

	return (
		<main className="min-h-screen bg-blue-50 px-4 py-10">
			<div className="mx-auto max-w-5xl rounded-lg bg-white p-6 shadow-lg">
				<h1 className="mb-8 text-center text-4xl font-bold text-pink-500">Wishlist</h1>
				<table className="w-full border-collapse text-left">
					<thead>
						<tr className="border-b text-gray-600">
							<th className="pb-4">Product</th>
							<th className="pb-4">Price</th>
							<th className="pb-4">Stock Status</th>
							<th className="pb-4">Action</th>
						</tr>
					</thead>
					<tbody>
						{wishlistItems.map((item) => (
							<tr key={item.id} className="border-b py-4">
								<td className="py-4">
									<div className="flex items-center gap-4">
										<img src="/icon.png" alt={item.name} className="h-16 w-16 rounded-lg border" />
										<div>
											<div className="font-medium">{item.name}</div>
											{item.urgency && <div className="text-sm text-green-600">{item.urgency}</div>}
										</div>
									</div>
								</td>
								<td className="py-4">
									<span className="font-semibold text-gray-800">{item.price}</span>
									{item.oldPrice && <span className="ml-2 text-gray-400 line-through">{item.oldPrice}</span>}
								</td>
								<td className="py-4">
									<span
										className={`rounded-full px-2 py-1 text-sm font-medium ${
											item.stock === "In Stock" ? "bg-pink-100 text-pink-600" : "bg-gray-200 text-gray-600"
										}`}
									>
										{item.stock}
									</span>
								</td>
								<td className="py-4">
									<button
										className={`rounded-md px-4 py-2 text-sm font-semibold ${
											item.stock === "In Stock"
												? "bg-pink-500 text-white hover:bg-pink-600"
												: "cursor-not-allowed bg-gray-300 text-gray-500"
										}`}
										disabled={item.stock !== "In Stock"}
									>
										Add to Cart
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="mt-6 text-center text-sm font-semibold text-red-500">
					Love it? Someone else does too! Buy before it’s too late.
				</div>

				<div className="mt-6 text-center">
					<button className="rounded-md bg-gray-100 px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
						Explore More
					</button>
				</div>
			</div>
		</main>
	);
};

export default WishlistPage;
