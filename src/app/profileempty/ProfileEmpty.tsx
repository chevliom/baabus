"use client"

import {
	ClipboardListIcon,
	HeartIcon,
	LayoutDashboardIcon,
	LogOutIcon,
	SettingsIcon,
	ShoppingCartIcon,
	
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../ui/Button";
import { Card, CardContent } from "../../ui/Card";
import { HeaderSection } from "../sections/HeaderSection";
import { FrameByAnima } from "../whishlist/components/FrameByAnima";
import {
	DashboardNavigationSection,
	defaultNavigationItems,
} from "../profile/Section/DashboardNavigationSection ";


// Navigation items data
const navigationItems = [
	{
		icon: <LayoutDashboardIcon className="h-6 w-6" />,
		label: "Profile Details",
		active: true,
	},
	{
		icon: <ClipboardListIcon className="h-6 w-6" />,
		label: "Order History",
		active: false,
	},
	{ icon: <HeartIcon className="h-6 w-6" />, label: "Wishlist", active: false },
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
	{ icon: <LogOutIcon className="h-6 w-6" />, label: "Log-out", active: false },
];

// Footer features data
const footerFeatures = [
	{
		icon: <div className="relative left-1 h-[60px] w-[53px] bg-[url(/group.png)] bg-[100%_100%]" />,
		title: "High Quality",
		description: "crafted from top materials",
	},
	{
		icon: <img className="h-[58px] w-[60px]" alt="Group" src="/group-1.png" />,
		title: "Warranty Protection",
		description: "Over 2 years",
	},
	{
		icon: <img className="h-[60px] w-[60px]" alt="Shipping" src="/shipping.svg" />,
		title: "Free Shipping",
		description: "Order over 150 $",
	},
	{
		icon: <img className="h-[60px] w-[60px]" alt="Customer support" src="/customer-support.svg" />,
		title: "24 / 7 Support",
		description: "Dedicated support",
	},
];

export const ProfileEmpty = (): JSX.Element => {
	const [activeNav, setActiveNav] = useState("Profile Details");
	return (
		<div className="relative min-h-screen w-full bg-white">
			{/* Header */}
			<HeaderSection />

			<div className="mt-36 flex ">
				{/* Sidebar Navigation */}
				<DashboardNavigationSection
					items={defaultNavigationItems}
					activeLabel={activeNav}
					onItemClick={(label) => setActiveNav(label)}
				/>

				{/* Profile Card */}
				<Card className="ml-[72px] h-[278px] w-[1046px] rounded-[0px_8px_8px_0px] border border-solid border-[#e6e6e6]">
					<CardContent className="relative h-full p-0">
						<div className="absolute left-[471px] top-[34px] flex h-[100px] w-[100px] items-center justify-center rounded-[50px] bg-[#2873b980]">
							<span className="font-['Poppins'] text-5xl font-semibold leading-[57.6px] text-[#0083ff]">
								D
							</span>
						</div>

						<div className="absolute left-[379px] top-[159px] flex w-[286px] flex-col items-center gap-0.5">
							<h2 className="font-body-XL-body-XL-500 text-gray-scalegray-900 text-center">Dianne Russell</h2>
							<p className="font-body-small-body-small-400 text-gray-scalegray-500 text-center">Customer</p>
						</div>

						<Button
							asChild
							variant="link"
							className="font-body-medium-body-medium-500 absolute left-[439px] top-[221px] text-center text-[#ea518f]"
						>
							<Link href="./profilefilled">Edit Profile</Link>
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Footer */}
			<div className="mt-36">
				<FrameByAnima />
			</div>
		</div>
	);
};
