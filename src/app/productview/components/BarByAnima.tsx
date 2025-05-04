"use client";

import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import React from "react";
import Image from "next/image";

export const BarByAnima = (): JSX.Element => {
	// Navigation links data
	const navLinks = [
		{ title: "Home", href: "/" },
		{ title: "Categories", href: "/categories" },
		{ title: "About", href: "/about" },
		{ title: "Contact Us", href: "/contact" },
	];

	return (
		<header className="flex h-[95px] w-full items-center justify-between bg-white px-8 shadow-[0px_4px_10px_#2873b980]">
			{/* Logo */}
			<div className="flex-shrink-0">
				<Image src="/image-60.png" alt="Logo" width={147} height={57} className="object-cover" />
			</div>

			{/* Navigation Links */}
			<nav className="ml-16 flex items-center gap-12">
				{navLinks.map((link, index) => (
					<a
						key={index}
						href={link.href}
						className="text-primaryp-500 font-['Poppins',Helvetica] text-xl font-bold font-bold text-[#ea518f]"
					>
						{link.title}
					</a>
				))}
			</nav>

			<div className="flex h-[48px] w-[416px] items-center rounded-full border border-dashed border-[#600b2e] bg-[#d9e8f6] px-[20px]">
				<SearchIcon className="h-5 w-5 text-[#0e3973]" />
				<input
					type="text"
					className="ml-3 flex-1 border-none bg-transparent text-base font-normal text-[#0e3973] placeholder-[#0e3973] outline-none"
				/>
			</div>

			{/* Action Buttons */}
			<div className="flex gap-4">
				{/* Cart Button */}
				<button className="flex h-12 w-[49px] items-center justify-center rounded-[50px] border-[1px] border-dashed border-[#600B2E] bg-[#F8BFD6] ">
					<ShoppingCartIcon className="h-[27px] w-[27px] text-[#E62875]" />
				</button>

				{/* Wishlist Button */}
				<button className="flex h-12 w-[49px] items-center justify-center rounded-[50px] border-[1px] border-dashed border-[#600B2E] bg-[#F8BFD6]">
					<HeartIcon className="h-5 w-5 text-[#E62875]" />
				</button>

				{/* User Profile Button */}
				<button className="flex h-12 w-[49px] items-center justify-center rounded-[50px] border-[1px] border-dashed border-[#600B2E] bg-[#FAFEAB]">
					<UserIcon className="h-6 w-6 text-[#E62875]" />
				</button>
			</div>
		</header>
	);
};
