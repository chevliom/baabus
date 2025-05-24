import React from "react";
import {
	HeartIcon,
	LayoutDashboardIcon,
	LogOutIcon,
	RefreshCwIcon,
	SettingsIcon,
	ShoppingCartIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

// Define a type for navigation items
interface NavigationItem {
	icon: JSX.Element;
	label: string;
}

interface DashboardNavigationSectionProps {
	items: NavigationItem[];
	activeLabel: string;
	onItemClick?: (label: string) => void;
}

// Component
export const DashboardNavigationSection = ({
	items,
	activeLabel,
	onItemClick,
}: DashboardNavigationSectionProps): JSX.Element => {
	return (
		<Card className="flex flex-col rounded-lg border border-solid border-[#e6e6e6] bg-white">
			<CardHeader className="px-5 pb-4 pt-6">
				<CardTitle className="text-xl font-semibold text-gray-900">Navigation</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<nav>
					<ul className="flex flex-col">
						{items.map((item, index) => {
							const isActive = item.label === activeLabel;
							return (
								<li
									key={index}
									onClick={() => onItemClick?.(item.label)}
									className={`flex cursor-pointer items-center gap-2.5 px-5 py-4 ${
										isActive
											? "bg-[#f7bfd5] text-gray-900 shadow-[inset_3px_0px_0px_#ea518f]"
											: "text-gray-600"
									}`}
								>
									{item.icon}
									<span className="text-base font-medium">{item.label}</span>
								</li>
							);
						})}
					</ul>
				</nav>
			</CardContent>
		</Card>
	);
};

// Export static nav items (optional)
export const defaultNavigationItems: NavigationItem[] = [
	{
		icon: <LayoutDashboardIcon className="h-6 w-6" />,
		label: "Profile Details",
	},
	{
		icon: <RefreshCwIcon className="h-6 w-6" />,
		label: "Order History",
	},
	{
		icon: <HeartIcon className="h-6 w-6" />,
		label: "Wishlist",
	},
	{
		icon: <ShoppingCartIcon className="h-6 w-6" />,
		label: "Shopping Cart",
	},
	{
		icon: <SettingsIcon className="h-6 w-6" />,
		label: "Settings",
	},
	{
		icon: <LogOutIcon className="h-6 w-6" />,
		label: "Log-out",
	},
];
