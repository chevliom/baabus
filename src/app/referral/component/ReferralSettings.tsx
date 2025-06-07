"use client";

import NextImage from "next/image";
import referralImage from "@/assets/authImage/referral.png";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SpinnerProvider from "@/component/SpinnerProvider";

export const ReferralSettings = (): JSX.Element => {

	const [user, setUser] = useState({
		externalReference: "",
	});
	const [loading, setLoading] = useState(true);


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
							externalReference
						}
						}
			  `,
				}),
			});

			const json: any = await response.json();
			const me = json?.data?.me;
			if (me) {
				const { externalReference } = me;
				setUser({ externalReference });
			}
			setLoading(false);
		};

		fetchUserProfile();
	}, []);

	if (loading) return <p className="p-4"><SpinnerProvider /></p>;

	return (
		<div className="relative z-10 w-full w-full h-[500px] rounded-[20px] bg-white px-8  py-5 shadow-[0px_0px_56px_0px_rgba(0,0,0,0.08)] flex flex-col items-center justify-between">
			<NextImage src={referralImage} alt="Referral Image" />
			<h2 className="text-center text-2xl font-semibold">Got a Referral Code</h2>
			<div className="flex w-[380px] relative">
				<input
					type="text"
					value={user.externalReference}
					placeholder="Referral Code"
					className="flex-1 w-[230px] rounded-l-[20px] border-none bg-gray-100 px-8 py-4 text-xl font-semibold focus:outline-none focus:ring-0 focus:border-transparent"
				/>
				<button className="bg-[#6CA8DF] rounded-r-[20px] rounded-bl-[20px] px-5 py-2 -ml-4 text-md font-semibold text-white">
					Apply
				</button>
			</div>
		</div>
	);
};
