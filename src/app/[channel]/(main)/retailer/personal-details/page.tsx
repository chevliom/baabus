"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const personalDetailsSchema = z.object({
	businessName: z.string().min(1, "Business name is required"),
	fullName: z.string().min(1, "Full name is required"),
	email: z.string().email("Invalid email address"),
	contact: z.string().min(10, "Contact must be at least 10 digits"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	channel: z.string().refine((val) => ["wholesale", "retail", "dealer"].includes(val), {
		message: "User Type is required",
	}),

});

export default function PersonalDetailsPage() {
	const router = useRouter();
	const [businessName, setBusinessName] = useState("");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [password, setPassword] = useState("");
	const [channel, setChannel] = useState("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleSave = () => {
		const result = personalDetailsSchema.safeParse({
			businessName,
			fullName,
			email,
			contact,
			password,
			channel,
		});

		if (!result.success) {
			const fieldErrors: { [key: string]: string } = {};
			result.error.errors.forEach((err) => {
				if (err.path[0]) {
					fieldErrors[err.path[0]] = err.message;
				}
			});
			setErrors(fieldErrors);
			return;
		}

		setErrors({});
		localStorage.setItem("personalDetails", JSON.stringify(result.data));
		router.push("/default-channel/retailer/company-details");
	};

	const channelOptions = [
		{ label: "Wholesaler", value: "wholesale" },
		{ label: "Retailer", value: "retail" },
		{ label: "Dealer", value: "dealer" },
	];

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
				{errors.businessName && <p className="text-sm text-red-500">{errors.businessName}</p>}
			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Full name</label>
				<input
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Full Name"
				/>
				{errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}

			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Email</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Email"
				/>
				{errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Contact</label>
				<input
					value={contact}
					maxLength={10}
					onChange={(e) => {
						const onlyNums = e.target.value.replace(/\D/g, "");
						setContact(onlyNums);
					}}
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Contact"
				/>
				{errors.contact && <p className="text-sm text-red-500">{errors.contact}</p>}
			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">Password</label>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Password"
				/>
				{errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

			</div>

			<div className="mb-4">
				<label className="mb-1 block text-sm font-medium">User Type</label>
				<div className="flex gap-4">
					{channelOptions.map(({ label, value }) => (
						<label key={value} className="flex items-center gap-1 text-sm">
							<input
								type="radio"
								name="channel"
								value={value}
								checked={channel === value}
								onChange={(e) => setChannel(e.target.value)}
								className="accent-pink-700"
							/>
							{label}
						</label>
					))}
				</div>
				{errors.channel && <p className="text-sm text-red-500">{errors.channel}</p>}

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
