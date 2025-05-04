"use client";

import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const BarByAnima = (): JSX.Element => {
	const navItems = [
		{ label: "Home", href: "/" },
		{ label: "Categories", href: "/categories" },
		{ label: "About", href: "/about" },
		{ label: "Contact Us", href: "/contact" },
	];

	return (
		<header className="flex h-[95px] w-full items-center justify-between bg-white px-8 shadow-[0px_4px_10px_#2873b980]">
			{/* Logo */}
			<div className="flex items-center">
				<Image src="/image-60.png" alt="Logo" width={147} height={57} className="object-cover" />
			</div>

			{/* Navigation Links */}
			<nav className="ml-16 flex items-center gap-12">
				{navItems.map((item, index) => (
					<Link
						key={index}
						href={item.href}
						className="text-primaryp-500 font-['Poppins',Helvetica] text-xl font-bold"
					>
						{item.label}
					</Link>
				))}
			</nav>

			{/* Search Bar */}
			<div className="mx-8 max-w-[416px] flex-1">
				<div className="flex h-12 items-center rounded-[50px] border border-dashed border-[#600b2e] bg-[#d9e8f6] p-2.5">
					<SearchIcon className="h-[27px] w-7 text-gray-600" />
					<Input
						className="h-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
						placeholder="Search"
					/>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex items-center gap-6">
				{/* Cart */}
				<Button
					className="flex h-12 w-[49px] items-center justify-center rounded-[50px] border border-dashed border-[#600b2e] bg-[#f7bfd5] p-2.5 hover:bg-[#f7bfd5]"
					variant="ghost"
				>
					<ShoppingCartIcon className="h-[27px] w-[27px] text-gray-800" />
				</Button>

				{/* Wishlist */}
				<Button
					className="flex h-12 w-[49px] items-center justify-center rounded-[50px] border border-dashed border-[#600b2e] bg-[#f7bfd5] p-2.5 hover:bg-[#f7bfd5]"
					variant="ghost"
				>
					<HeartIcon className="h-5 w-5 text-gray-800" />
				</Button>

				{/* Profile */}
				<Button
					className="flex h-12 w-[49px] items-center justify-center rounded-[50px] border border-dashed border-[#600b2e] bg-[#fafeaa] p-2.5 hover:bg-[#fafeaa]"
					variant="ghost"
				>
					<UserIcon className="h-6 w-6 text-gray-800" />
				</Button>
			</div>
		</header>
	);
};
