"use client";

import { LayoutDashboardIcon, RefreshCwIcon, SettingsIcon } from "lucide-react";
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/Accordion";
import { Card, CardContent } from "../../ui/Card";
import { HeaderSection } from "../sections/HeaderSection";
import { FrameByAnima } from "../whishlist/components/FrameByAnima";
import {
	DashboardNavigationSection,
	defaultNavigationItems,
} from "../profile/Section/DashboardNavigationSection ";

// Settings accordion items data
const settingsItems = [
	{ title: "Account Settings", id: "account-settings" },
	{ title: "FAQs", id: "faqs" },
	{ title: "Privacy Policy", id: "privacy-policy" },
	{ title: "Refer A Friend", id: "refer-friend" },
];

export const Settings = (): JSX.Element => {
	const [activeNav, setActiveNav] = useState("Settings");

	return (
		<div className="relative bg-white">
			{/* Header */}
			<HeaderSection />

			<div className="mt-36 flex">
				{/* Sidebar Navigation */}
				<aside className="w-full md:w-1/5">
					<DashboardNavigationSection
						items={defaultNavigationItems}
						activeLabel={activeNav}
						onItemClick={(label) => setActiveNav(label)}
					/>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-8">
					<div className="max-w-[984px]">
						<Accordion type="single" collapsible className="w-full">
							{settingsItems.map((item) => (
								<AccordionItem key={item.id} value={item.id} className="mb-1 border-0">
									<Card className="shadow-line-shadow rounded-[8px_8px_0px_0px]">
										<AccordionTrigger className="px-6 py-3 hover:no-underline">
											<span className="font-body-XL-body-XL-500 text-gray-scalegray-900">{item.title}</span>
										</AccordionTrigger>
										<AccordionContent>
											<CardContent className="pt-4">{/* Content would go here */}</CardContent>
										</AccordionContent>
									</Card>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</main>
			</div>

			{/* Footer */}
			<footer className="mt-32 w-full">
				<FrameByAnima />
			</footer>
		</div>
	);
};
