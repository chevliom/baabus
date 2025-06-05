"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "../../ui/Button";
import { Card, CardContent } from "../../ui/Card";
import { HeaderSection } from "../sections/HeaderSection";
import { FrameByAnima } from "../whishlist/components/FrameByAnima";
import {
	DashboardNavigationSection,
	defaultNavigationItems,
} from "../profile/Section/DashboardNavigationSection ";
import Cookies from "js-cookie";

interface MetadataItem {
	key: string;
	value: string;
}

interface User {
	firstName: string;
	lastName: string;
	email: string;
	metadata: MetadataItem[];
}

async function fetchMe(): Promise<User | null> {
	const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${Cookies.get("token") || ""}`,
		},
		body: JSON.stringify({
			query: `
				{
				me {
					id
					email
					firstName
					lastName
					isActive
					metadata {
					key
					value
					}
					defaultBillingAddress {
					isDefaultBillingAddress
					isDefaultShippingAddress
					}
					addresses {
					city
					cityArea
					country {
						code
						country
					}
					countryArea
					postalCode
					streetAddress1
					streetAddress2
					phone
					firstName
					lastName
					companyName
					metadata {
						key
						value
					}
					}
				}
				}
			`,
		}),
	});

	const json = (await response.json()) as { data?: { me?: User } };
	return json?.data?.me || null;
}

export const Profile = (): JSX.Element => {
	const [activeNav, setActiveNav] = useState("Profile Details");
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const loadUser = async () => {
			const me = await fetchMe();
			setUser(me);
		};
		loadUser();
	}, []);

	const fullName = user ? `${user.firstName} ${user.lastName}` : "Loading...";
	const initial = user?.firstName?.[0]?.toUpperCase() || "U";
	const channel = user?.metadata?.find((meta) => meta.key === "channel")?.value ?? "N/A";

	return (
		<main className="flex min-h-screen w-full flex-col bg-white">
			<header className="w-full">
				<HeaderSection />
			</header>

			<div className="mt-36 flex w-full flex-col px-12 md:flex-row">
				<aside className="w-full md:w-1/5">
					<DashboardNavigationSection
						items={defaultNavigationItems}
						activeLabel={activeNav}
						onItemClick={(label) => setActiveNav(label)}
					/>
				</aside>

				<div className="flex flex-1 flex-col">
					<Card className="ml-[72px] h-[320px] w-[1046px] rounded-[0px_8px_8px_0px] border border-solid border-[#e6e6e6]">
						<CardContent className="relative h-full p-0">
							<div className="absolute left-[471px] top-[34px] flex h-[100px] w-[100px] items-center justify-center rounded-[50px] bg-[#2873b980]">
								<span className="font-['Poppins'] text-5xl font-semibold leading-[57.6px] text-[#0083ff]">
									{initial}
								</span>
							</div>

							<div className="absolute left-[379px] top-[159px] flex w-[286px] flex-col items-center gap-1">
								<h2 className="font-body-XL-body-XL-500 text-gray-scalegray-900 text-center">
									{fullName}
								</h2>
								<p className="font-body-small-body-small-400 text-gray-scalegray-500 text-center">
									{channel == 'default-channel' ? 'Customer' : channel}
								</p>
								<Button
									asChild
									variant="link"
									className="font-body-medium-body-medium-500 text-center text-[#ea518f]"
								>
									<Link href="./profilefilled">Edit Profile</Link>
								</Button>
							</div>
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
