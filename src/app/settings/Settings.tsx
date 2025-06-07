"use client";

import { ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import { HeaderSection } from "../sections/HeaderSection";
import { FrameByAnima } from "../whishlist/components/FrameByAnima";
import {
	DashboardNavigationSection,
	defaultNavigationItems,
} from "../profile/Section/DashboardNavigationSection ";
import { useRouter } from "next/navigation";
import { AccountSettings } from "../account-settings/component/AccountSettings";
import { Faqs } from "../faq/component/faqs";
import { PrivacyPolicy } from "../profile/Section/PrivacyPolicy";
import { ReferralSettings } from "../referral/component/ReferralSettings";

// Settings accordion items data
const settingsItems = [
	{ title: "Account Settings", id: "account-settings" },
	{ title: "FAQs", id: "faqs" },
	{ title: "Privacy Policy", id: "privacy-policy" },
	{ title: "Refer A Friend", id: "refer-friend" },
];

export const Settings = (): JSX.Element => {
	const [activeNav, setActiveNav] = useState("Settings");
	const [selectedSetting, setSelectedSetting] = useState<string | null>(null);

	return (
		<div className="relative bg-white">
			{/* Header */}
			<HeaderSection />

			<div className="mt-36 px-12 flex">
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
					<ul className="divide-y border-b border-gray-200">
						{settingsItems.map((item) => (
							<li
								key={item.id}
								className="py-4"
							>
								<div
									onClick={() =>
										setSelectedSetting((prev) => (prev === item.id ? null : item.id))
									}
									className="flex items-center justify-between cursor-pointer hover:bg-gray-50 transition px-2 py-2"
								>
									<span className="font-medium">{item.title}</span>
									<ChevronRightIcon
										className={`w-4 h-4 text-black transform transition-transform ${selectedSetting === item.id ? "rotate-90" : ""
											}`}
									/>
								</div>

								{selectedSetting === item.id && (
									<div className="mt-4">
										{item.id === "account-settings" && <AccountSettings />}
										{item.id === "faqs" && <Faqs />}
										{item.id === "privacy-policy" && <PrivacyPolicy />}
										{item.id === "refer-friend" && <ReferralSettings />}
										{/* Add more components as needed */}
									</div>
								)}


							</li>
						))}
					</ul>
				</main>

			</div>

			{/* Footer */}
			<footer className="mt-32 w-full">
				<FrameByAnima />
			</footer>
		</div>
	);
};
