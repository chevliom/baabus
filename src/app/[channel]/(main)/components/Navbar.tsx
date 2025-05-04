// src/components/Navbar.tsx
import React from "react";
import Image from "next/image";
import { ShoppingCart, Heart, Settings } from "lucide-react";

// Only using named export to satisfy the ESLint rule
export const Navbar = () => {
	return (
		<header className="flex items-center justify-between bg-white px-8 py-4 shadow">
			<div className="flex items-center space-x-2">
				{/* Replaced img with Next.js Image component */}
				<div className="relative h-8 w-20">
					<Image
						src="/logo.png"
						alt="Baabus Logo"
						fill
						className="object-contain"
						priority // Marks this as an important image for LCP
					/>
				</div>
				<span className="text-xl font-bold text-blue-700">Baabus</span>
				<span className="ml-2 text-xs text-gray-400">BABY CARE PRODUCTS</span>
			</div>

			<nav className="flex items-center space-x-6 font-medium text-pink-500">
				<a href="#" className="hover:underline">
					Home
				</a>
				<a href="#" className="hover:underline">
					Categories
				</a>
				<a href="#" className="hover:underline">
					About
				</a>
				<a href="#" className="hover:underline">
					Contact Us
				</a>
			</nav>

			<div className="flex items-center space-x-4">
				<button className="relative" aria-label="Shopping Cart">
					<ShoppingCart className="h-6 w-6 text-pink-400" />
				</button>
				<button aria-label="Favorites">
					<Heart className="h-6 w-6 text-pink-400" />
				</button>
				<button aria-label="Settings">
					<Settings className="h-6 w-6 text-pink-400" />
				</button>
			</div>
		</header>
	);
};
