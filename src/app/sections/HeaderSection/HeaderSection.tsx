import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/BabusLogo.png";
import { Input } from "../../ui/input";
import Cookies from "js-cookie";

export const HeaderSection = (): JSX.Element => {
	const navItems = [
		{ title: "Home", path: "/", id: 1 },
		{ title: "Categories", path: "/category", id: 2 },
		{ title: "About", path: "/AboutUs", id: 3 },
		{ title: "Contact Us", path: "/contactus", id: 4 },
	];

	const isLoggedIn = Cookies.get("token");

	return (
		<header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
			<div className="mx-auto flex h-[95px] max-w-screen-xl items-center justify-between px-4 ">

				{/* Logo on the left */}
				<Link href="/" className="shrink-0">
					<Image
						src={Logo}
						alt="Babus Babycare Logo"
						width={147}
						height={57}
						className="cursor-pointer object-contain"
					/>
				</Link>

				{/* Everything else on the right */}
				<div className="flex items-center gap-6">

					{/* Nav links */}
					<nav className="hidden md:flex items-center gap-6 lg:gap-8">
						{navItems.map((item) => (
							<Link
								key={item.id}
								href={item.path}
								className="font-poppins text-sm lg:text-base font-medium text-pink-600 hover:underline"
							>
								{item.title}
							</Link>
						))}
					</nav>

					{/* Search bar */}
					<div className="hidden lg:flex items-center h-10 w-[250px] rounded-full border-2 border-dashed border-pink-800 bg-blue-100 px-4">
						<SearchIcon className="mr-2 h-5 w-5 text-blue-600" />
						<Input
							className="h-full flex-1 border-none bg-transparent text-sm placeholder-gray-500 focus:ring-0 focus:ring-offset-0"
							placeholder="Search..."
						/>
					</div>

					{/* Icon buttons */}
					<div className="flex items-center gap-3">
						<Link href="/cart" aria-label="Cart">
							<button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-pink-800 bg-pink-100">
								<ShoppingCartIcon className="h-5 w-5 text-pink-600" />
							</button>
						</Link>

						<Link href="/whishlist" aria-label="Wishlist">
							<button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-pink-800 bg-pink-100">
								<HeartIcon className="h-4 w-4 fill-pink-600 text-pink-600" />
							</button>
						</Link>

						<Link href={isLoggedIn ? "/profile" : "/default-channel/login"} aria-label="User Profile">
							<button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-yellow-600 bg-yellow-100">
								<UserIcon className="h-4 w-4 fill-pink-600 text-pink-600" />
							</button>
						</Link>
					</div>

				</div>
			</div>
		</header>
	);
};
