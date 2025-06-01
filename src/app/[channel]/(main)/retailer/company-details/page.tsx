"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

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


const companyDetailsSchema = z.object({
	gst: z.string().min(1, "GST is required"),
	productCategories: z.array(z.string()).min(1, "Select at least one product category"),
	heardAboutUs: z.array(z.string()).min(1, "Please select how you heard about us"),
	purchaseFrequency: z.array(z.string()).min(1, "Please select purchase frequency"),
	communicationChannels: z.array(z.string()).min(1, "Please select at least one communication channel"),
});


const CompanyDetails: React.FC = () => {
	const router = useRouter();

	const [gst, setGst] = useState<string>("");
	const [productCategories, setProductCategories] = useState<string[]>([]);
	const [heardAboutUs, setHeardAboutUs] = useState<string[]>([]);
	const [purchaseFrequency, setPurchaseFrequency] = useState<string[]>([]);
	const [communicationChannels, setCommunicationChannels] = useState<string[]>([]);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const toggleValue = (
		value: string,
		group: string[],
		setGroup: React.Dispatch<React.SetStateAction<string[]>>,
	): void => {
		setGroup((prev: string[]) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
	};

	const handleSubmit = (): void => {
		const formData = { gst, productCategories, heardAboutUs, purchaseFrequency, communicationChannels };
		const result = companyDetailsSchema.safeParse(formData);

		if (!result.success) {
			const fieldErrors: { [key: string]: string } = {};
			result.error.errors.forEach(err => {
				if (err.path[0]) {
					fieldErrors[err.path[0]] = err.message;
				}
			});
			setErrors(fieldErrors);
			return;
		}

		setErrors({});

		localStorage.setItem("companyDetails", JSON.stringify(result.data));
		router.push("/default-channel/retailer/gst-documents");
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
				{errors.gst && <p className="text-sm text-red-500">{errors.gst}</p>}
			</div>

			{/* Reusable Checkbox Group */}
			{[
				{
					label: "Product Categories of interest?",
					options: productOptions,
					state: productCategories,
					setter: setProductCategories,
					errorKey: "productCategories"
				},
				{
					label: "How Did You hear about us?",
					options: heardOptions,
					state: heardAboutUs,
					setter: setHeardAboutUs,
					errorKey: "heardAboutUs"
				},
				{
					label: "Preferred purchase frequency",
					options: frequencyOptions,
					state: purchaseFrequency,
					setter: setPurchaseFrequency,
					errorKey: "purchaseFrequency"
				},
				{
					label: "Preferred Communication Channels",
					options: communicationOptions,
					state: communicationChannels,
					setter: setCommunicationChannels,
					errorKey: "communicationChannels"
				},

			].map(({ label, options, state, setter, errorKey }) => (
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
					{errors[errorKey] && <p className="text-sm text-red-500 mt-1">{errors[errorKey]}</p>}
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
