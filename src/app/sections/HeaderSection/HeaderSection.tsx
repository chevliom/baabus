import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/BabusLogo.png";
import { Input } from "../../ui/input";

export const HeaderSection = (): JSX.Element => {
	// Navigation items data
	const navItems = [
		{ title: "Home", path: "/", id: 1 },
		{ title: "Categories", path: "/category", id: 2 },
		{ title: "About", path: "/AboutUs", id: 3 },
		{ title: "Contact Us", path: "/contactus", id: 4 },
	];

	return (
		<header className="fixed left-0 top-0 z-50 flex h-[95px] w-full items-center justify-between bg-white px-8 shadow-[0px_4px_10px_#2873b980]">
			{/* Logo */}
			<Image src={Logo} alt="Logo" width={147} height={57} className="object-cover" />

			{/* Navigation */}
			<nav className="ml-16 flex items-center gap-12">
				{navItems.map((item) => (
					<Link
						key={item.id}
						href={item.path}
						className="text-primaryp-500 font-['Poppins',Helvetica] text-xl font-bold hover:underline"
						style={{ color: "rgba(230, 40, 117, 1)" }}
					>
						{item.title}
					</Link>
				))}
			</nav>

			{/* SearchIcon Bar */}
			<div className="mx-8 flex h-12 max-w-[416px] flex-1 items-center rounded-[50px] border-2 border-dashed border-[#600b2e] bg-[#bfdbf5] px-4">
				<SearchIcon className="mr-2 h-7 w-7 text-[#2a68d4]" />
				<Input
					className="h-full border-none bg-transparent placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
					placeholder=""
				/>
			</div>

			{/* Action Buttons */}
			<div className="flex gap-6">
				{/* Cart Button */}
				<Link href="/cart">
					<button className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-[#600b2e] bg-[#f7bfd5]">
						<ShoppingCartIcon className="h-[27px] w-[27px] text-[#e62875]" />
					</button>
				</Link>

				{/* Heart Button (wishlist) */}
				<Link href="/whishlist">
					<button className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-[#600b2e] bg-[#f7bfd5]">
						<HeartIcon className="h-5 w-5 fill-[#e62875] text-[#e62875]" />
					</button>
				</Link>

				{/* User Button (profile) */}
				<Link href="/location">
					<button className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-[#600b2e] bg-[#fafeaa]">
						<UserIcon className="h-6 w-6 fill-[#e62875] text-[#e62875]" />
					</button>
				</Link>
			</div>
		</header>
	);
};
