'use client';

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import Cookies from "js-cookie";

interface MetadataItem {
	key: string;
	value: string;
}

interface User {
	firstName: string;
	lastName: string;
	metadata: MetadataItem[];
}

export const UserProfileSection = (): JSX.Element => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchUser = async () => {
		try {
			const token = Cookies.get("token");
			if (!token) return;

			const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					query: `
					{
						me {
							firstName
							lastName
							metadata {
								key
								value
							}
						}
					}`,
				}),
			});

			const json = await response.json() as { data?: { me?: User } };
			setUser(json?.data?.me || null);
		} catch (error) {
			console.error("Error fetching user:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const fullName = user ? `${user.firstName} ${user.lastName}` : "Loading...";
	const initial = user?.firstName?.[0]?.toUpperCase() || "U";
	const channel = user?.metadata?.find((m) => m.key === "channel")?.value || "N/A";

	return (
		<div className="mx-auto w-full max-w-[522px] space-y-6">
			<Card className="w-full h-[345px] rounded-[0px_8px_8px_0px] border border-solid border-[#e6e6e6]">
				<CardContent className="flex flex-col items-center justify-center px-4 py-8">
					<Avatar className="h-[100px] w-[100px] bg-[#2873b980]">
						<AvatarFallback className="font-['Poppins',Helvetica] text-5xl font-semibold text-[#0083ff]">
							{initial}
						</AvatarFallback>
					</Avatar>

					<div className="mt-6 flex flex-col items-center gap-1">
						<h2 className="text-xl font-semibold text-gray-900">{fullName}</h2>
						<p className="text-sm text-gray-500">{channel == 'default-channel' ? 'Customer' : channel}</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
