"use client";

import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon, MenuIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/BabusLogo.png";
import { Input } from "../../ui/input";

export const HeaderSection = (): JSX.Element => {
	const [menuOpen, setMenuOpen] = useState(false);

	const navItems = [
		{ title: "Home", path: "/", id: 1 },
		{ title: "Categories", path: "/category", id: 2 },
		{ title: "About", path: "/AboutUs", id: 3 },
		{ title: "Contact Us", path: "/contactus", id: 4 },
	];

	return (
		<header className="fixed left-0 top-0 z-50 w-full bg-white px-4 shadow-[0px_4px_10px_#2873b980]">
			<div className="flex h-[80px] items-center justify-between md:px-8">
				{/* Logo */}
				<Link href="/default-channel">
					<Image src={Logo} alt="Logo" width={120} height={50} className="cursor-pointer object-cover" />
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden gap-10 md:flex">
					{navItems.map((item) => (
						<Link
							key={item.id}
							href={item.path}
							className="font-['Poppins',Helvetica] text-base font-bold hover:underline"
							style={{ color: "rgba(230, 40, 117, 1)" }}
						>
							{item.title}
						</Link>
					))}
				</nav>

				{/* Search Bar */}
				<div className="hidden flex-1 items-center rounded-full border-2 border-dashed border-[#600b2e] bg-[#bfdbf5] px-4 md:mx-6 md:flex md:max-w-[400px]">
					<SearchIcon className="mr-2 h-5 w-5 text-[#2a68d4]" />
					<Input
						className="h-full border-none bg-transparent placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
						placeholder="Search..."
					/>
				</div>

				{/* Action Buttons */}
				<div className="hidden items-center gap-4 md:flex">
					<Link href="/cart">
						<button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-[#600b2e] bg-[#f7bfd5]">
							<ShoppingCartIcon className="h-5 w-5 text-[#e62875]" />
						</button>
					</Link>
					<Link href="/whishlist">
						<button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-[#600b2e] bg-[#f7bfd5]">
							<HeartIcon className="h-5 w-5 fill-[#e62875] text-[#e62875]" />
						</button>
					</Link>
					<Link href="/usertype">
						<button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-[#600b2e] bg-[#fafeaa]">
							<UserIcon className="h-5 w-5 fill-[#e62875] text-[#e62875]" />
						</button>
					</Link>
				</div>

				{/* Mobile Menu Toggle */}
				<button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
					{menuOpen ? (
						<XIcon className="h-6 w-6 text-[#e62875]" />
					) : (
						<MenuIcon className="h-6 w-6 text-[#e62875]" />
					)}
				</button>
			</div>

			{/* Mobile Navigation */}
			{menuOpen && (
				<div className="flex flex-col items-center gap-4 border-t border-gray-200 py-4 md:hidden">
					<div className="w-full px-4">
						<div className="flex w-full items-center rounded-full border-2 border-dashed border-[#600b2e] bg-[#bfdbf5] px-4 py-2">
							<SearchIcon className="mr-2 h-5 w-5 text-[#2a68d4]" />
							<Input
								className="w-full border-none bg-transparent placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
								placeholder="Search..."
							/>
						</div>
					</div>
					{navItems.map((item) => (
						<Link
							key={item.id}
							href={item.path}
							className="text-md font-semibold text-[#e62875]"
							onClick={() => setMenuOpen(false)}
						>
							{item.title}
						</Link>
					))}
					<div className="flex gap-6 pt-2">
						<Link href="/cart">
							<ShoppingCartIcon className="h-5 w-5 text-[#e62875]" />
						</Link>
						<Link href="/whishlist">
							<HeartIcon className="h-5 w-5 text-[#e62875]" />
						</Link>
						<Link href="/usertype">
							<UserIcon className="h-5 w-5 text-[#e62875]" />
						</Link>
					</div>
				</div>
			)}
		</header>
	);
};
