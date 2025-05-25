"use client";

import { CheckIcon } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../../ui/Card";
import { FrameByAnima } from "../whishlist/components/FrameByAnima";
import { HeaderSection } from "../sections/HeaderSection";

export const Location = (): JSX.Element => {
	const [selectedType, setSelectedType] = useState("Customer");
	const router = useRouter();

	const userTypes = [
		{
			icon: "/customer.png",
			title: "Customer",
			description: "Shop for products at the best prices",
		},
		{
			icon: "/retailer.png",
			title: "Retailer/Wholesaler",
			description: "Buy in bulk and manage your orders",
		},
	];

	return (
		<div className="relative mx-auto min-h-screen w-full max-w-[1440px] bg-white">
			{/* Header */}
			<HeaderSection />

			{/* Main Content */}
			<main className="mb-24 mt-32 flex flex-col items-center">
				<h1 className="font-poppins mb-12 text-4xl font-extrabold text-[#123453]">Select User Type</h1>
				<div className="w-[398px] space-y-8">
					{userTypes.map((userType, index) => {
						const isSelected = userType.title === selectedType;
						return (
							<div
								key={index}
								className={`relative cursor-pointer transition-all duration-300 ${
									isSelected ? "shadow-lg" : "hover:shadow-md"
								}`}
								onClick={() => {
									setSelectedType(userType.title);
									if (userType.title === "Customer") {
										router.push("/default-channel/login");
									}
								}}
							>
								<Card
									className={`w-full overflow-hidden rounded-[20px] transition-all duration-300 ${
										isSelected
											? "border-2 border-[#6ca7df] bg-[#d9e8f6] shadow-[0px_0px_0px_4px_#ffffff]"
											: "border border-gray-200 bg-[#f5f9fd]"
									}`}
								>
									<CardContent className="flex items-center p-8">
										<img
											className="h-[67px] w-[67px] object-cover"
											alt={userType.title}
											src={userType.icon}
										/>
										<div className="ml-6">
											<h2 className="font-poppins text-2xl font-bold text-[#194875]">{userType.title}</h2>
											<p className="font-poppins mt-1 text-sm text-[#333]">{userType.description}</p>
										</div>
									</CardContent>
								</Card>

								{/* Checkmark at the bottom center */}
								{isSelected && (
									<div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
										<div className="rounded-full bg-[rgba(253,241,246,1)] p-1.5">
											<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(241,136,179,1)]">
												<CheckIcon className="h-6 w-6 text-white" />
											</div>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</main>

			{/* Footer */}
			<FrameByAnima />
		</div>
	);
};
