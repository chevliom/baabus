"use client";

import React from "react";
import Link from "next/link";
import {
	HeartIcon,
	LayoutDashboardIcon,
	LogOutIcon,
	RefreshCwIcon,
	SettingsIcon,
	ShoppingCartIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface NavigationItem {
	icon: JSX.Element;
	label: string;
	path: string;
}

interface DashboardNavigationSectionProps {
	items: NavigationItem[];
	activeLabel: string;
	onItemClick?: (label: string) => void;
}

export const DashboardNavigationSection = ({
	items,
	activeLabel,
	onItemClick,
}: DashboardNavigationSectionProps): JSX.Element => {
	return (
		<Card className="rounded-lg border border-[#e6e6e6] bg-white">
			{/* Header */}
			<CardHeader className="px-5 pt-6 pb-4">
				<CardTitle className="text-xl font-semibold text-gray-900">Navigation</CardTitle>
			</CardHeader>

			{/* Navigation */}
			<CardContent className="p-0">
				<nav>
					<ul className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
						{items.map((item, index) => {
							const isActive = item.label === activeLabel;
							return (
								<li
									key={index}
									onClick={() => onItemClick?.(item.label)}
									className="flex-shrink-0 w-auto md:w-full"
								>
									<Link
										href={item.path}
										className={`flex items-center md:justify-start justify-center gap-2 px-4 md:px-5 py-3 md:py-4 transition-colors duration-200 text-sm md:text-base ${isActive
											? "bg-[#f7bfd5] text-gray-900 shadow-[inset_3px_0px_0px_#ea518f]"
											: "text-gray-600 hover:bg-gray-100"
											}`}
									>
										{item.icon}
										<span className="hidden md:inline font-medium">{item.label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</CardContent>
		</Card>
	);
};

// Default Navigation Items
export const defaultNavigationItems: NavigationItem[] = [
	{
		icon: <LayoutDashboardIcon className="h-6 w-6" />,
		label: "Profile Details",
		path: "/profile",
	},
	{
		icon: <RefreshCwIcon className="h-6 w-6" />,
		label: "Order History",
		path: "/profileorder",
	},
	{
		icon: <HeartIcon className="h-6 w-6" />,
		label: "Whishlist",
		path: "/whishlist",
	},
	{
		icon: <ShoppingCartIcon className="h-6 w-6" />,
		label: "Shopping Cart",
		path: "/cart",
	},
	{
		icon: <SettingsIcon className="h-6 w-6" />,
		label: "Settings",
		path: "/settings",
	},
	{
		icon: <LogOutIcon className="h-6 w-6" />,
		label: "Log-out",
		path: "/logout",
	},
];
