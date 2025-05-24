import {
	HeartIcon,
	LayoutDashboardIcon,
	LogOutIcon,
	RefreshCwIcon,
	SettingsIcon,
	ShoppingCartIcon,
} from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../ui/card";

// Navigation menu items data
const navigationItems = [
	{
		icon: <LayoutDashboardIcon className="h-6 w-6" />,
		label: "Profile Details",
		active: false,
	},
	{
		icon: <RefreshCwIcon className="h-6 w-6" />,
		label: "Order History",
		active: true,
	},
	{
		icon: <HeartIcon className="h-6 w-6" />,
		label: "Wishlist",
		active: false,
	},
	{
		icon: <ShoppingCartIcon className="h-6 w-6" />,
		label: "Shopping Cart",
		active: false,
	},
	{
		icon: <SettingsIcon className="h-6 w-6" />,
		label: "Settings",
		active: false,
	},
	{
		icon: <LogOutIcon className="h-6 w-6" />,
		label: "Log-out",
		active: false,
	},
];

export const SidebarSection = (): JSX.Element => {
	return (
		<Card className="bg-gray-scalewhite flex flex-col items-start rounded-lg border border-solid border-[#e6e6e6] pb-3">
			<div className="flex w-full items-start pb-4 pl-5 pr-0 pt-6">
				<h2 className="font-body-XL-body-XL-500 text-gray-scalegray-900 text-[length:var(--body-XL-body-XL-500-font-size)] leading-[var(--body-XL-body-XL-500-line-height)] tracking-[var(--body-XL-body-XL-500-letter-spacing)]">
					Navigation
				</h2>
			</div>

			<CardContent className="w-full p-0">
				{navigationItems.map((item, index) => (
					<div
						key={index}
						className={`flex w-full cursor-pointer items-center gap-2.5 px-5 py-4 ${
							item.active ? "bg-[#f7bfd5] shadow-[inset_3px_0px_0px_#ea518f]" : ""
						}`}
					>
						{item.icon}
						<span
							className={`font-body-medium-body-medium-400 text-[length:var(--body-medium-body-medium-400-font-size)] leading-[var(--body-medium-body-medium-400-line-height)] tracking-[var(--body-medium-body-medium-400-letter-spacing)] ${
								item.active || index === 0 ? "text-gray-scalegray-900" : "text-gray-scalegray-600"
							}`}
						>
							{item.label}
						</span>
					</div>
				))}
			</CardContent>
		</Card>
	);
};
