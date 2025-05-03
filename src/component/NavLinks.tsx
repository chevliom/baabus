"use client";
import Link from "next/link";

const NavLinks = () => {
  return (
    <nav className="flex space-x-6 text-pink-500 font-semibold">
      <Link href="/">Home</Link>
      <Link href="/categories">Categories</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact Us</Link>
    </nav>
  );
};

export default NavLinks;
