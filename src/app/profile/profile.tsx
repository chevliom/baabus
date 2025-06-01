"use client"
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


export const Profile = (): JSX.Element => {
	const [activeNav, setActiveNav] = useState("Profile Details");
	return (
		<main className="flex min-h-screen w-full flex-col bg-white">
			<header className="w-full">
				<HeaderSection />
			</header>
			<div className="mt-36 flex w-full flex-col md:flex-row">
				<aside className="w-full md:w-1/5">
					<DashboardNavigationSection
						items={defaultNavigationItems}
						activeLabel={activeNav}
						onItemClick={(label) => setActiveNav(label)}
					/>
				</aside>
				<div className="flex flex-1 flex-col">
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
			</div>
			<div className="mt-36">
				<FrameByAnima />
			</div>
		</main>
	);
};

