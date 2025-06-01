"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAccount } from "@/lib/graphqlClient";

// Constants
const productOptions: string[] = [
	"Educational Toys",
	"Action figures",
	"Dolls & Plush",
	"Outdoor & Sports",
	"Remote-Controlled(RC)",
	"Puzzles & Board Games",
	"Other(Specify)",
];

const heardOptions: string[] = ["Social Media", "Reference", "Online Ads", "Other(Specify)"];
const frequencyOptions: string[] = ["Weekly", "Monthly", "Occasionally"];
const communicationOptions: string[] = ["Whatsapp", "Call", "Email"];

// Types
interface PersonalDetails {
	fullName: string;
	email: string;
	businessName: string;
	contact: string;
}

interface Metadata {
	key: string;
	value: string;
}

interface RegisterInput {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	channel: string;
	metadata: Metadata[];
}

interface GraphQLError {
	message: string;
	path?: string[];
	code?: string;
	field?: string | null;
}

interface RegisterResponse {
	errors: GraphQLError[];
}

const CompanyDetails: React.FC = () => {
	const router = useRouter();

	const [gst, setGst] = useState<string>("");
	const [productCategories, setProductCategories] = useState<string[]>([]);
	const [heardAboutUs, setHeardAboutUs] = useState<string[]>([]);
	const [purchaseFrequency, setPurchaseFrequency] = useState<string[]>([]);
	const [communicationChannels, setCommunicationChannels] = useState<string[]>([]);

	const toggleValue = (
		value: string,
		group: string[],
		setGroup: React.Dispatch<React.SetStateAction<string[]>>,
	): void => {
		setGroup((prev: string[]) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
	};

	const handleSubmit = async (): Promise<void> => {
		const personalDetailsRaw: string | null = localStorage.getItem("personalDetails");
		const personalDetails: PersonalDetails = personalDetailsRaw
			? (JSON.parse(personalDetailsRaw) as PersonalDetails)
			: { fullName: "", email: "", businessName: "", contact: "" };

		const companyDetails = {
			gst,
			productCategories,
			heardAboutUs,
			purchaseFrequency,
			communicationChannels,
		};

		localStorage.setItem("companyDetails", JSON.stringify(companyDetails));

		const [firstName, ...lastNameParts] = (personalDetails.fullName || "").split(" ");
		const lastName = lastNameParts.join(" ");

		const input: RegisterInput = {
			email: personalDetails.email,
			password: "123", // Replace with actual input later
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

		const result: RegisterResponse = await registerAccount(input);

		if (result.errors.length === 0) {
			alert("Account registered successfully!");
			localStorage.removeItem("personalDetails");
			localStorage.removeItem("companyDetails");
			router.push("/default-channel/retailer/address");
		} else {
			alert("Registration failed: " + result.errors.map((e) => e.message).join(", "));
			console.error(result.errors);
		}
	};

	return (
		<div className="w-full rounded-md border bg-white p-6">
			<h3 className="mb-6 border-b border-gray-200 pb-4 text-lg font-semibold">Company Details</h3>

			{/* GST */}
			<div className="mb-6">
				<label className="mb-1 block text-sm font-medium">
					<span className="font-medium text-black">Company GST</span>
					<span className="font-normal text-red-500">*</span>
				</label>
				<input
					value={gst}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGst(e.target.value)}
					className="w-full rounded-md border border-[#E6E6E6] p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
					placeholder="Company GST"
				/>
			</div>

			{/* Reusable Checkbox Group */}
			{[
				{
					label: "Product Categories of interest?",
					options: productOptions,
					state: productCategories,
					setter: setProductCategories,
				},
				{
					label: "How Did You hear about us?",
					options: heardOptions,
					state: heardAboutUs,
					setter: setHeardAboutUs,
				},
				{
					label: "Preferred purchase frequency",
					options: frequencyOptions,
					state: purchaseFrequency,
					setter: setPurchaseFrequency,
				},
				{
					label: "Preferred Communication Channels",
					options: communicationOptions,
					state: communicationChannels,
					setter: setCommunicationChannels,
				},
			].map(({ label, options, state, setter }) => (
				<div className="mb-6" key={label}>
					<p className="mb-1 text-sm font-medium">{label}</p>
					<div className="flex flex-wrap gap-x-4 gap-y-2">
						{options.map((item) => (
							<label key={item} className="flex items-center gap-2 text-sm">
								<input
									type="checkbox"
									className="accent-pink-500"
									checked={state.includes(item)}
									onChange={() => toggleValue(item, state, setter)}
								/>
								{item}
							</label>
						))}
					</div>
				</div>
			))}

			<button
				className="mt-4 rounded-md bg-pink-500 px-5 py-2 text-sm font-semibold text-white"
				onClick={handleSubmit}
			>
				Save Changes
			</button>
		</div>
	);
};

export default CompanyDetails;
