"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PersonalDetailsPage() {
	const [businessName, setBusinessName] = useState("");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");

	const router = useRouter();

	const handleSubmit = async () => {
		// Optional: send data to backend API here if needed
		// Example:
		// await fetch('/api/save-details', {
		//     method: 'POST',
		//     headers: { 'Content-Type': 'application/json' },
		//     body: JSON.stringify({ businessName, fullName, email, contact })
		// });

		// ✅ Navigate to referral page
		router.push("/default-channel/getreferral");
	};

	return (
		<div className="w-full max-w-3xl rounded-md border bg-white p-6">
			<h3 className="mb-6 border-b pb-4 text-lg font-semibold">Personal Details</h3>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Business name</label>
				<input
					value={businessName}
					onChange={(e) => setBusinessName(e.target.value)}
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm transition-all duration-150 focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Business Name"
				/>
			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Full name</label>
				<input
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm transition-all duration-150 focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Full Name"
				/>
			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Email</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm transition-all duration-150 focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Email"
				/>
			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Contact</label>
				<input
					value={contact}
					onChange={(e) => setContact(e.target.value)}
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm transition-all duration-150 focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Contact"
				/>
			</div>

			<button
				onClick={handleSubmit}
				className="mt-4 rounded-md bg-pink-500 px-5 py-2 text-sm font-semibold text-white"
			>
				Save Changes
			</button>
		</div>
	);
}
