import React from "react";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

export const UserProfileSection = (): JSX.Element => {
	// User data that can be mapped or expanded
	const userData = {
		name: "Dianne Russell",
		role: "Customer",
		initial: "D",
	};

	return (
		<div className="mx-auto w-full max-w-[538px]">
			<Card className="w-full rounded-[0px_8px_8px_0px] border border-solid border-[#e6e6e6] h-[345px]">
				<CardContent className="flex flex-col items-center justify-center px-4 py-8">
					<Avatar className="h-[100px] w-[100px] bg-[#2873b980]">
						<AvatarFallback className="font-['Poppins',Helvetica] text-5xl font-semibold text-[#0083ff]">
							{userData.initial}
						</AvatarFallback>
					</Avatar>

					<div className="mt-6 flex flex-col items-center gap-0.5">
						<h2 className="font-body-XL-body-XL-500 text-gray-scalegray-900 text-center text-[length:var(--body-XL-body-XL-500-font-size)] font-[number:var(--body-XL-body-XL-500-font-weight)] leading-[var(--body-XL-body-XL-500-line-height)] tracking-[var(--body-XL-body-XL-500-letter-spacing)] [font-style:var(--body-XL-body-XL-500-font-style)]">
							{userData.name}
						</h2>

						<p className="font-body-small-body-small-400 text-gray-scalegray-500 text-center text-[length:var(--body-small-body-small-400-font-size)] font-[number:var(--body-small-body-small-400-font-weight)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)] [font-style:var(--body-small-body-small-400-font-style)]">
							{userData.role}
						</p>
					</div>

					<Button
						variant="link"
						className="font-body-medium-body-medium-500 mt-6 p-0 text-[length:var(--body-medium-body-medium-500-font-size)] font-[number:var(--body-medium-body-medium-500-font-weight)] leading-[var(--body-medium-body-medium-500-line-height)] tracking-[var(--body-medium-body-medium-500-letter-spacing)] text-[#ea518f] [font-style:var(--body-medium-body-medium-500-font-style)]"
					>
						Edit Profile
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};
