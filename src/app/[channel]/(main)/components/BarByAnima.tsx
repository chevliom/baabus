"use client";

import {
  HeartIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
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
    <header className="w-full h-[95px] bg-white shadow-[0px_4px_10px_#2873b980] flex items-center justify-between px-8">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/image-60.png"
          alt="Logo"
          width={147}
          height={57}
          className="object-cover"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-12 ml-16">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="font-['Poppins',Helvetica] font-bold text-primaryp-500 text-xl"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Search Bar */}
      <div className="flex-1 max-w-[416px] mx-8">
        <div className="flex items-center bg-[#d9e8f6] rounded-[50px] border border-dashed border-[#600b2e] p-2.5 h-12">
          <SearchIcon className="w-7 h-[27px] text-gray-600" />
          <Input
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6">
        {/* Cart */}
        <Button
          className="w-[49px] h-12 bg-[#f7bfd5] rounded-[50px] border border-dashed border-[#600b2e] p-2.5 flex items-center justify-center hover:bg-[#f7bfd5]"
          variant="ghost"
        >
          <ShoppingCartIcon className="w-[27px] h-[27px] text-gray-800" />
        </Button>

        {/* Wishlist */}
        <Button
          className="w-[49px] h-12 bg-[#f7bfd5] rounded-[50px] border border-dashed border-[#600b2e] p-2.5 flex items-center justify-center hover:bg-[#f7bfd5]"
          variant="ghost"
        >
          <HeartIcon className="w-5 h-5 text-gray-800" />
        </Button>

        {/* Profile */}
        <Button
          className="w-[49px] h-12 bg-[#fafeaa] rounded-[50px] border border-dashed border-[#600b2e] p-2.5 flex items-center justify-center hover:bg-[#fafeaa]"
          variant="ghost"
        >
          <UserIcon className="w-6 h-6 text-gray-800" />
        </Button>
      </div>
    </header>
  );
};
