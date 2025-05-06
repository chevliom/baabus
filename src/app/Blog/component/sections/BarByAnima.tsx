import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import React from "react";
import { Input } from "../../../ui/input";

export const BarByAnima = (): JSX.Element => {
	// Navigation links data
	const navLinks = [
		{ title: "Home", href: "#" },
		{ title: "Categories", href: "#" },
		{ title: "About", href: "#" },
		{ title: "Contact Us", href: "#" },
	];

	return (
		<header className="flex h-[95px] w-full items-center justify-between bg-white px-8 shadow-[0px_4px_10px_#2873b980]">
			{/* Logo */}
			<img className="h-[57px] w-[147px] object-cover" alt="Logo" src="/image-60.png" />

			{/* Navigation Links */}
			<nav className="ml-16 flex items-center gap-12">
				{navLinks.map((link, index) => (
					<a
						key={index}
						href={link.href}
						className="text-primaryp-500 text-xl font-bold [font-family:'Poppins',Helvetica]"
					>
						{link.title}
					</a>
				))}
			</nav>

			{/* SearchIcon Bar */}
			<div className="mx-4 flex max-w-[416px] flex-1">
				<div className="flex h-12 w-full items-center gap-2.5 rounded-[50px] border border-dashed border-[#600b2e] bg-[#d9e8f6] p-2.5">
					<SearchIcon className="h-[27px] w-7 text-gray-600" />
					<Input
						className="h-full border-0 bg-transparent placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
						type="search"
						placeholder="SearchIcon..."
					/>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex items-center gap-6">
				{/* Cart Button */}
				<button className="flex h-12 w-[49px] items-center justify-center rounded-[50px] border border-dashed border-[#600b2e] bg-[#f7bfd5] p-2.5">
					<ShoppingCartIcon className="h-[27px] w-[27px]" />
				</button>

				{/* Favorites Button */}
				<button className="flex h-12 w-[49px] items-center justify-center rounded-[50px] border border-dashed border-[#600b2e] bg-[#f7bfd5] p-2.5">
					<HeartIcon className="h-5 w-5" />
				</button>

				{/* UserIcon Profile Button */}
				<button className="flex h-12 w-[49px] items-center justify-center rounded-[50px] border border-dashed border-[#600b2e] bg-[#fafeaa] p-2.5">
					<UserIcon className="h-6 w-6" />
				</button>
			</div>
		</header>
	);
};
