"use client";
import Link from "next/link";

// Only using named export to fix ESLint error
export const NavLinks = () => {
	return (
		<nav className="flex space-x-6 font-semibold text-pink-500">
			<Link href="/">Home</Link>
			<Link href="/categories">Categories</Link>
			<Link href="/about">About</Link>
			<Link href="/contact">Contact Us</Link>
		</nav>
	);
};
