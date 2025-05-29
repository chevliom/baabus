"use client";

import React from "react";
import { registerAccount } from "@/lib/graphqlClient"; // adjust path if needed

function CompanyDetails() {
	const handleSubmit = async () => {
		const personalDetails = JSON.parse(localStorage.getItem("personalDetails") || "{}");
		const gst = document.querySelector('input[placeholder="Company GST"]')?.value;

		// Get selected labels for each group
		const getCheckedLabels = (groupLabels: string[]) => {
			return groupLabels.filter((label) => {
				const checkbox = document.querySelector(
					`label:has(input[type="checkbox"]):contains("${label}") input`,
				);
				return (checkbox as HTMLInputElement)?.checked;
			});
		};

		// Fallback: manually query from label parents
		const getCheckedFromGroup = (group: string[]) => {
			return group.filter((label) => {
				const inputs = Array.from(document.querySelectorAll('label input[type="checkbox"]'));
				return inputs.some((input) => input.parentElement?.textContent?.trim() === label && input.checked);
			});
		};

		const productCategories = getCheckedFromGroup([
			"Educational Toys",
			"Action figures",
			"Dolls & Plush",
			"Outdoor & Sports",
			"Remote-Controlled(RC)",
			"Puzzles & Board Games",
			"Other(Specify)",
		]);

		const heardAboutUs = getCheckedFromGroup(["Social Media", "Reference", "Online Ads", "Other(Specify)"]);

		const purchaseFrequency = getCheckedFromGroup(["Weekly", "Monthly", "Occasionally"]);

		const communicationChannels = getCheckedFromGroup(["Whatsapp", "Call", "Email"]);

		const companyDetails = {
			gst,
			productCategories,
			heardAboutUs,
			purchaseFrequency,
			communicationChannels,
		};

		localStorage.setItem("companyDetails", JSON.stringify(companyDetails));

		// Extract names
		const [firstName, ...lastNameParts] = (personalDetails.fullName || "").split(" ");
		const lastName = lastNameParts.join(" ");

		const input = {
			email: personalDetails.email,
			password: "123", // Replace with user-provided password if applicable
			firstName,
			lastName,
			channel: "retail",
			metadata: [
				{ key: "channel", value: "retailx" },
				{ key: "businessName", value: personalDetails.businessName },
				{ key: "contact", value: personalDetails.contact },
				{ key: "gst", value: gst },
				{ key: "productCategories", value: JSON.stringify(productCategories) },
				{ key: "heardAboutUs", value: JSON.stringify(heardAboutUs) },
				{ key: "purchaseFrequency", value: JSON.stringify(purchaseFrequency) },
				{ key: "communicationChannels", value: JSON.stringify(communicationChannels) },
			],
		};

		const result = await registerAccount(input);

		if (result.errors.length === 0) {
			alert("Account registered successfully!");
			localStorage.removeItem("personalDetails");
			localStorage.removeItem("companyDetails");
			window.location.href = "//default-channel/retailer/address";
		} else {
			alert("Registration failed: " + result.errors.map((e) => e.message).join(", "));
			console.error(result.errors);
		}
	};

	return (
		<div className="w-full max-w-3xl rounded-md border bg-white p-6">
			<h3 className="mb-6 border-b border-gray-200 pb-4 text-lg font-semibold">Company Details</h3>

			{/* Company GST */}
			<div className="mb-6">
				<label className="mb-1 block text-sm font-medium">
					<span className="font-medium text-black">Company GST</span>
					<span className="font-normal text-red-500">*</span>
				</label>
				<input
					className="w-full rounded-md border border-[1px] border-[#E6E6E6] p-2 text-sm transition-all duration-150 focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Company GST"
				/>
			</div>

			{/* Product Categories */}
			<div className="mb-6">
				<p className="mb-1 text-sm font-medium">
					Product Categories of interest? <span className="text-xs">(Multi-select)</span>
				</p>
				<div className="flex flex-wrap gap-x-4 gap-y-2">
					{[
						"Educational Toys",
						"Action figures",
						"Dolls & Plush",
						"Outdoor & Sports",
						"Remote-Controlled(RC)",
						"Puzzles & Board Games",
						"Other(Specify)",
					].map((item) => (
						<label key={item} className="flex items-center gap-2 text-sm">
							<input type="checkbox" className="accent-pink-500" />
							{item}
						</label>
					))}
				</div>
			</div>

			{/* How Did You Hear */}
			<div className="mb-6">
				<p className="mb-1 text-sm font-medium">How Did You hear about us?</p>
				<div className="flex flex-wrap gap-x-4 gap-y-2">
					{["Social Media", "Reference", "Online Ads", "Other(Specify)"].map((item) => (
						<label key={item} className="flex items-center gap-2 text-sm">
							<input type="checkbox" className="accent-pink-500" />
							{item}
						</label>
					))}
				</div>
			</div>

			{/* Purchase Frequency */}
			<div className="mb-6">
				<p className="mb-1 text-sm font-medium">Preferred purchase frequency</p>
				<div className="flex flex-wrap gap-x-4 gap-y-2">
					{["Weekly", "Monthly", "Occasionally"].map((item) => (
						<label key={item} className="flex items-center gap-2 text-sm">
							<input type="checkbox" className="accent-pink-500" />
							{item}
						</label>
					))}
				</div>
			</div>

			{/* Communication Channels */}
			<div className="mb-6">
				<p className="mb-1 text-sm font-medium">Preferred Communication Channels</p>
				<div className="flex flex-wrap gap-x-4 gap-y-2">
					{["Whatsapp", "Call", "Email"].map((item) => (
						<label key={item} className="flex items-center gap-2 text-sm">
							<input type="checkbox" className="accent-pink-500" />
							{item}
						</label>
					))}
				</div>
			</div>

			<button
				className="mt-4 rounded-md bg-pink-500 px-5 py-2 text-sm font-semibold text-white"
				onClick={handleSubmit}
			>
				Save Changes
			</button>
		</div>
	);
}

export default CompanyDetails;
