"use client";

import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Cookies from "js-cookie";
import SpinnerProvider from "@/component/SpinnerProvider";
import { z } from "zod";


export const AccountSettings = (): JSX.Element => {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		externalReference: "",
	});

	const [billingAddress, setBillingAddress] = useState({
		firstName: "",
		lastName: "",
		companyName: "",
		phone: "",
		streetAddress1: "",
		city: "",
		countryArea: "",
		postalCode: "",
	});

	const [loading, setLoading] = useState(true);

	const [passwords, setPasswords] = useState({
		current: "",
		new: "",
		confirm: "",
	});

	const [error, setError] = useState<string | null>(null);

	const [showPassword, setShowPassword] = useState({
		current: false,
		new: false,
		confirm: false
	});

	const toggleVisibility = (field: keyof typeof showPassword) => {
		setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	useEffect(() => {
		const fetchUserProfile = async () => {
			const token = Cookies.get("token");
			if (!token) return;

			const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					query: `
					query GetUserProfile {
					me {
						firstName
						lastName
						email
						externalReference
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
					}
          `,
				}),
			});

			const json: any = await response.json();
			const me = json?.data?.me;
			if (me) {
				const { firstName, lastName, email, externalReference, addresses } = me;
				const defaultBilling = addresses.find((addr: any) => addr.isDefaultBillingAddress);

				setUser({ firstName, lastName, email, externalReference });

				if (defaultBilling) {
					setBillingAddress({
						firstName: defaultBilling.firstName,
						lastName: defaultBilling.lastName,
						companyName: defaultBilling.companyName,
						phone: defaultBilling.phone,
						streetAddress1: defaultBilling.streetAddress1,
						city: defaultBilling.city,
						countryArea: defaultBilling.countryArea,
						postalCode: defaultBilling.postalCode,
					});
				}
			}
			setLoading(false);
		};

		fetchUserProfile();
	}, []);

	const handlePasswordChange = async () => {
		setLoading(true);
		const token = Cookies.get("token");
		if (!token) return;
		const schema = z
			.object({
				current: z.string().min(1),
				new: z.string().min(6),
				confirm: z.string().min(6),
			})
			.refine((data) => data.new === data.confirm, {
				message: "New password and confirm password must match",
				path: ["confirm"],
			});

		const parseResult = schema.safeParse(passwords);
		if (!parseResult.success) {
			setError(parseResult.error.errors[0].message);
			return;
		}

		const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				query: `
          mutation PasswordChange($newPassword: String!, $oldPassword: String!) {
            passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
              errors {
                field
                message
              }
            }
          }
        `,
				variables: {
					newPassword: passwords.new,
					oldPassword: passwords.current,
				},
			}),
		});

		const json: any = await response.json();
		const errors = json?.data?.passwordChange?.errors;
		if (errors?.length) {
			setError(errors[0].message);
		} else {
			setError(null);
			setPasswords({ current: "", new: "", confirm: "" });
		}
		setLoading(false);
	};


	if (loading) return <p className="p-4"><SpinnerProvider /></p>;

	return (
		<div className="bg-white w-full mt-4">
			<div className="space-y-10">
				{/* Account Settings */}
				<div className="bg-white">
					<div className="w-full">
						{/* Account Settings */}
						<div className="border border-[#E6E6E6] rounded-xl  shadow-sm">
							<h2 className="text-xl font-semibold mb-4 border-b pb-4 p-6">Account Settings</h2>
							<div className="flex flex-col md:flex-row gap-6">
								<div className="w-full md:w-2/3 space-y-4 ml-4 mb-4">
									<div>
										<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">First name</label>
										<input
											type="text"
											value={user.firstName}
											placeholder="First name"
											className="w-full border border-[#E6E6E6] p-2 rounded"
										/>
									</div>
									<div>
										<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">Last Name</label>
										<input
											type="text"
											placeholder="Last name"
											value={user.lastName}
											className="w-full border border-[#E6E6E6] p-2 rounded"
										/>
									</div>
									<div>
										<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">Email</label>
										<input
											type="email"
											placeholder="Email"
											value={user.email}
											className="w-full border border-[#E6E6E6] p-2 rounded"
										/>
									</div>
									<button className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-full font-medium">
										Save Changes
									</button>
								</div>

								<div className="flex justify-end items-start md:items-center">
									<div className="w-60 h-60 bg-blue-300 text-blue-700 rounded-full flex items-center justify-center text-6xl font-semibold ml-8">
										{user.firstName.charAt(0).toUpperCase()}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Billing Address */}
				<div className="border border-[#E6E6E6] rounded-xl shadow-sm">
					<h2 className="text-xl font-semibold mb-4 border-b pb-4 p-6">Billing Address</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
						<div>
							<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">First name</label>
							<input type="text" value={billingAddress.firstName} placeholder="First name" className="w-full border border-[#E6E6E6] p-2 rounded" />
						</div>
						<div>
							<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">Last name</label>
							<input type="text" value={billingAddress.lastName} placeholder="Last name" className="w-full border border-[#E6E6E6] p-2 rounded" />
						</div>
						<div>
							<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">Company Name <span className="text-gray-400">(optional)</span></label>
							<input type="text" value={billingAddress.companyName} placeholder="Company Name" className="w-full border border-[#E6E6E6] p-2 rounded" />
						</div>
						<div className="col-span-3">
							<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">Street Address</label>
							<input type="text" value={billingAddress.streetAddress1} placeholder="Street Address" className="w-full border border-[#E6E6E6] p-2 rounded" />
						</div>
						{/* <div>
							<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">Country / Region</label>
							<select className="w-full border border-[#E6E6E6] p-2 rounded">
								<option>Select Country</option>
								<option>India</option>
							</select>
						</div> */}
						<div>
							<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">State</label>
							<input type="text" value={billingAddress.countryArea} placeholder="State" className="w-full border border-[#E6E6E6] p-2 rounded" />

						</div>
						<div>
							<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">City</label>
							<input type="text" value={billingAddress.city} placeholder="City" className="w-full border border-[#E6E6E6] p-2 rounded" />

						</div>
						<div>
							<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">Zip Code</label>
							<input type="text" value={billingAddress.postalCode} placeholder="Zip Code" className="w-full border border-[#E6E6E6] p-2 rounded" />
						</div>
					</div>
					<div className="w-full flex px-4 gap-6">
						<div className=" w-full">
							<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">Phone</label>
							<input type="text" value={billingAddress.phone} placeholder="Phone" className="w-full border border-[#E6E6E6] p-2 rounded" />
						</div>
					</div>

					<button className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-full font-medium mb-4 ml-4">
						Save Changes
					</button>
				</div>

				{/* Change Password */}
				<div className="border border-[#E6E6E6] rounded-xl shadow-sm">
					<h2 className="text-xl font-semibold mb-4 border-b pb-4 p-6">Change Password</h2>
					{error && <p className="text-red-500 text-sm ml-6">{error}</p>}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
						<div className="col-span-2 relative">
							<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">Current Password</label>
							<input
								type={showPassword.current ? "text" : "password"}
								value={passwords.current}
								placeholder="Password"
								onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
								className="w-full border border-gray-300 p-2 rounded"
							/>
							<button
								type="button"
								onClick={() => toggleVisibility("current")}
								className="absolute right-3 top-[38px] text-gray-500"
							>
								{showPassword.current ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
							</button>
						</div>
						<div className="relative">
							<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">New Password</label>
							<input
								type={showPassword.new ? "text" : "password"}
								placeholder="Password"
								value={passwords.new}
								onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
								className="w-full border border-gray-300 p-2 rounded"
							/>
							<button
								type="button"
								onClick={() => toggleVisibility("new")}
								className="absolute right-3 top-[38px] text-gray-500"
							>
								{showPassword.new ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
							</button>
						</div>
						<div className="relative">
							<label className="text-[#1A1A1A] block text-sm font-[400] mb-1.5">Confirm Password</label>
							<input
								type={showPassword.confirm ? "text" : "password"}
								placeholder="Password"
								value={passwords.confirm}
								onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
								className="w-full border border-gray-300 p-2 rounded"
							/>
							<button
								type="button"
								onClick={() => toggleVisibility("confirm")}
								className="absolute right-3 top-[38px] text-gray-500"
							>
								{showPassword.confirm ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
							</button>
						</div>
					</div>
					<button className="px-6 py-3 bg-pink-500 text-white rounded-full font-medium mb-4 ml-4"
						onClick={handlePasswordChange}
						disabled={loading}
					>
						{loading ? <SpinnerProvider /> : "Change Password"}
					</button>
				</div>
			</div>
		</div>
	);
};
