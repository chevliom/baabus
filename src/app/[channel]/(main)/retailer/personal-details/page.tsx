"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function PersonalDetailsPage() {
	const router = useRouter();

	const [businessName, setBusinessName] = useState("");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");

	const handleSave = () => {
		const personalDetails = {
			businessName,
			fullName,
			email,
			contact,
		};
		localStorage.setItem("personalDetails", JSON.stringify(personalDetails));
		router.push("/default-channel/retailer/company-details");
	};

	return (
		<div className="w-full rounded-md border bg-white p-6">
			<h3 className="mb-6 border-b pb-4 text-lg font-semibold">Personal Details</h3>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Business name</label>
				<input
					value={businessName}
					onChange={(e) => setBusinessName(e.target.value)}
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Business Name"
				/>
			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Full name</label>
				<input
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Full Name"
				/>
			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Email</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Email"
				/>
			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Contact</label>
				<input
					value={contact}
					onChange={(e) => setContact(e.target.value)}
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
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
