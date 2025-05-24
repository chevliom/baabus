"use client";

import React, { useState } from "react";
import { BillingDetailsSection } from "../profile/Section/BillingDetailsSection";
import {
	DashboardNavigationSection,
	defaultNavigationItems,
} from "../profile/Section/DashboardNavigationSection ";
import { OrderHistorySection } from "../profile/Section/OrderHistorySection";
import { UserProfileSection } from "../profile/Section/UserProfileSection";
import { HeaderSection } from "../sections/HeaderSection";
import { FrameByAnima } from "../whishlist/components/FrameByAnima";

export const ProfileFilled = (): JSX.Element => {
	const [activeNav, setActiveNav] = useState("Order History");

	return (
		<main className="flex min-h-screen w-full flex-col bg-white">
			{/* Navigation at the top */}
			<header className="w-full">
				<HeaderSection />
			</header>

			{/* Main content area */}
			<div className="mt-36 flex w-full flex-col md:flex-row">
				{/* Left sidebar */}
				<aside className="w-full md:w-1/5">
					<DashboardNavigationSection
						items={defaultNavigationItems}
						activeLabel={activeNav}
						onItemClick={(label) => setActiveNav(label)}
					/>
				</aside>

				{/* Main content */}
				<div className="flex flex-1 flex-col">
					{/* User profile and billing details row */}
					<div className="flex w-full flex-col md:flex-row">
						<div className="flex-1 md:mr-4">
							<UserProfileSection />
						</div>
						<div className="flex-1 md:ml-4">
							<BillingDetailsSection />
						</div>
					</div>

					{/* Order history section */}
					<div className="ml-6 mt-4 w-11/12">
						<OrderHistorySection />
					</div>
				</div>
			</div>

			{/* Support section at the bottom */}
			<footer className="mt-32 w-full">
				<FrameByAnima />
			</footer>
		</main>
	);
};
