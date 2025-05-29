"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function PersonalDetailsPage() {
    const router = useRouter();
	const handleSave = () => {
		const businessName = (document.querySelector('input[placeholder="Business Name"]') as HTMLInputElement)
			?.value;
		const fullName = (document.querySelector('input[placeholder="Full Name"]') as HTMLInputElement)?.value;
		const email = (document.querySelector('input[placeholder="Email"]') as HTMLInputElement)?.value;
		const contact = (document.querySelector('input[placeholder="Contact"]') as HTMLInputElement)?.value;

		const personalDetails = {
			businessName,
			fullName,
			email,
			contact,
		};

		localStorage.setItem("personalDetails", JSON.stringify(personalDetails));
		alert("Personal details saved successfully.");
        router.push("./company-details");
	};

	return (
		<div className="w-full max-w-3xl rounded-md border bg-white p-6">
			<h3 className="mb-6 border-b pb-4 text-lg font-semibold">Personal Details</h3>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Business name</label>
				<input
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm transition-all duration-150 focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Business Name"
				/>
			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Full name</label>
				<input
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm transition-all duration-150 focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Full Name"
				/>
			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Email</label>
				<input
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm transition-all duration-150 focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Email"
				/>
			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Contact</label>
				<input
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm transition-all duration-150 focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Contact"
				/>
			</div>

			<button
				className="mt-4 rounded-md bg-pink-500 px-5 py-2 text-sm font-semibold text-white"
				onClick={handleSave}
			>
				Save Changes
			</button>
		</div>
	);
}
