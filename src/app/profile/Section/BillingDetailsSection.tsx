'use client';

import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import Cookies from "js-cookie";

interface MetadataItem {
	key: string;
	value: string;
}

interface Country {
	code: string;
	country: string;
}

interface Address {
	id?: string;
	firstName: string;
	lastName: string;
	companyName: string;
	phone: string;
	streetAddress1: string;
	streetAddress2: string;
	city: string;
	cityArea: string;
	countryArea: string;
	postalCode: string;
	country: Country;
	metadata: MetadataItem[];
	isDefaultBillingAddress?: boolean;
	isDefaultShippingAddress?: boolean;
}

export const BillingDetailsSection = (): JSX.Element => {
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [email, setEmail] = useState<string | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [editAddressIndex, setEditAddressIndex] = useState<number | null>(null);
	const [billingName, setBillingName] = useState<string>("");

	useEffect(() => {
		const fetchUserData = async () => {
			const token = Cookies.get("token");
			if (!token) return;

			const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					query: `{
						me {
							email
							addresses {
								id
								firstName
								lastName
								companyName
								phone
								streetAddress1
								streetAddress2
								city
								cityArea
								countryArea
								postalCode
								country {
									code
									country
								}
								metadata {
									key
									value
								}
								isDefaultBillingAddress
								isDefaultShippingAddress
							}
						}
					}`,
				}),
			});

			const json = await response.json() as { data?: { me?: { email?: string; addresses?: Address[] } } };
			const user = json?.data?.me;
			setEmail(user?.email || null);
			setAddresses(user?.addresses || []);
		};
		fetchUserData();
	}, []);

	const openEditModal = (index: number) => {
		const target = addresses[index];
		setEditAddressIndex(index);
		setBillingName(target.metadata.find((m) => m.key === "billing_name")?.value || "");
		setShowModal(true);
	};

	const handleChange = (field: keyof Address, value: string) => {
		if (editAddressIndex === null) return;
		const updated = [...addresses];
		updated[editAddressIndex] = { ...updated[editAddressIndex], [field]: value };
		setAddresses(updated);
	};

	const saveChanges = async () => {
		if (editAddressIndex === null) return;
		const token = Cookies.get("token");
		if (!token) return;

		const updated = [...addresses];
		const current = updated[editAddressIndex];
		const updatedMetadata = [
			...current.metadata.filter((m) => m.key !== "billing_name"),
			{ key: "billing_name", value: billingName },
		];
		const input = {
			firstName: current.firstName,
			lastName: current.lastName,
			companyName: current.companyName,
			phone: current.phone,
			streetAddress1: current.streetAddress1,
			streetAddress2: current.streetAddress2,
			city: current.city,
			cityArea: current.cityArea,
			countryArea: current.countryArea,
			postalCode: current.postalCode,
			country: current.country.code,
			metadata: updatedMetadata,
		};

		const res = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				query: `
					mutation UpdateAddress($input: AddressInput!, $id: ID!) {
						accountAddressUpdate(input: $input, id: $id) {
							address { id }
							errors { field message code }
						}
					}
				`,
				variables: {
					input,
					id: current.id ?? "",
				},
			}),
		});

		await res.json();
		updated[editAddressIndex] = { ...current, metadata: updatedMetadata };
		setAddresses(updated);
		setShowModal(false);
	};

	if (addresses.length === 0) {
		return (
			<div className="text-center">
				<p className="text-sm text-gray-500 mb-4">No billing address found.</p>
				<Button className="bg-[#ea518f] text-white px-4 py-2 rounded text-sm">
					+ Add Billing Address
				</Button>
			</div>
		);
	}

	const deleteAddress = async (id: string | undefined) => {
		if (!id) return;
		const token = Cookies.get("token");
		if (!token) return;

		await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				query: `
					mutation DeleteAddress($id: ID!) {
						accountAddressDelete(id: $id) {
							accountErrors { field message }
						}
					}
				`,
				variables: { id },
			}),
		});

		setAddresses((prev) => prev.filter((addr) => addr.id !== id));
	};
	return (
		<div className="max-h-[340px] overflow-y-auto space-y-4 pr-2">
			{addresses.map((addr, index) => {
				const billing = addr.metadata.find((m) => m.key === "billing_name")?.value || `${addr.firstName} ${addr.lastName}`;
				const fullAddress = `${addr.streetAddress1}, ${addr.streetAddress2}, ${addr.city}, ${addr.countryArea}, ${addr.postalCode}, ${addr.country?.country}`;
				const phone = addr.phone || "N/A";
				const addressType = addr.metadata.find((m) => m.key === "TYPE")?.value || "N/A";

				return (
					<Card key={index} className="rounded-md border border-gray-200 shadow-sm w-full">
						<CardContent className="p-4">
							<div className="flex flex-col space-y-2">
								<div className="flex items-center justify-between">
									<p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">{billing}</p>
									<div className="flex gap-1 text-[10px] font-medium text-white">
										{addr.isDefaultBillingAddress && (
											<span className="rounded bg-green-500 px-1 py-0.5">Billing</span>
										)}
										{addr.isDefaultShippingAddress && (
											<span className="rounded bg-blue-500 px-1 py-0.5">Shipping</span>
										)}
									</div>
								</div>
								<p className="text-xs text-gray-600 line-clamp-2">{fullAddress}</p>
								<p className="text-xs text-gray-800">{email}</p>
								<p className="text-xs text-gray-800">{phone}</p>
								<p className="text-[10px] text-gray-500">Type: {addressType}</p>
								<div className="flex items-center justify gap-4">
									<Button
										variant="link"
										onClick={() => openEditModal(index)}
										className="h-auto w-fit p-0 text-xs text-[#ea518f]"
									>
										Edit
									</Button>
									<Button
										variant="link"
										onClick={() => deleteAddress(addr.id)}
										className="h-auto w-fit p-0 text-xs text-red-500"
									>
										Delete
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				);
			})}

			{showModal && editAddressIndex !== null && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="bg-white w-[90%] max-w-lg rounded-lg shadow-lg p-6 space-y-4">
						<div className="flex justify-between items-center">
							<h2 className="text-lg font-semibold">Edit Billing Address</h2>
							<button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500 text-lg font-bold">×</button>
						</div>
						<div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
							<input
								type="text"
								value={billingName}
								onChange={(e) => setBillingName(e.target.value)}
								className="col-span-2 border rounded p-2"
								placeholder="Billing Name"
							/>
							{(["phone", "streetAddress1", "streetAddress2", "city", "countryArea", "postalCode"] as (keyof Address)[]).map((field) => (
								<input
									key={field}
									type="text"
									value={
										typeof addresses[editAddressIndex][field] === "string"
											? (addresses[editAddressIndex][field] as string)
											: addresses[editAddressIndex][field] != null
												? String(addresses[editAddressIndex][field])
												: ""
									}
									onChange={(e) => handleChange(field, e.target.value)}
									className="col-span-2 border rounded p-2"
									placeholder={field.replace(/([A-Z])/g, ' $1')}
								/>
							))}
						</div>
						<div className="flex justify-end gap-3 pt-4">
							<Button onClick={() => setShowModal(false)} variant="outline">
								Cancel
							</Button>
							<Button className="bg-[#ea518f] hover:bg-[#d84780] text-white" onClick={saveChanges}>
								Save Changes
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
