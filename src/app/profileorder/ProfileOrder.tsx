"use client";

import React, { useState } from "react";
import { OrderHistorySection } from "../profile/Section/OrderHistorySection1";
import { HeaderSection } from "../sections/HeaderSection";
import { FrameByAnima } from "../whishlist/components/FrameByAnima";
import {
	DashboardNavigationSection,
	defaultNavigationItems,
} from "../profile/Section/DashboardNavigationSection ";

export const ProfileOrder = (): JSX.Element => {
	const [activeNav, setActiveNav] = useState("Order History");

	return (
		<main className="flex min-h-screen w-full flex-col bg-white">
			{/* Header */}
			<HeaderSection />

			{/* Main Layout */}
			<div className="mt-36 px-12 flex flex-1">
				{/* Sidebar Navigation */}
				<aside className="w-full md:w-1/5">
					<DashboardNavigationSection
						items={defaultNavigationItems}
						activeLabel={activeNav}
						onItemClick={(label) => setActiveNav(label)}
					/>
				</aside>

				{/* Content Area */}
				<div className="flex-1">
					<OrderHistorySection />
				</div>
			</div>

			{/* Footer */}
			<footer className="mt-32 w-full">
				<FrameByAnima />
			</footer>
		</main>
	);
};
