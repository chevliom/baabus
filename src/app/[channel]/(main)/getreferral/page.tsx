"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { Loader } from "@/ui/atoms/Loader";
import ServicesBanner from "@/ui/components/ServicesBanner";
import referralImage from "@/assets/authImage/referral.png";
import egoImage from "@/assets/authImage/ego.png";

export default function GetReferralPage() {
	const [referralCode, setReferralCode] = useState("");
	const router = useRouter();

	const handleApply = async () => {
		try {
			await fetch("/api/update-profile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ referralCode }),
			});
			router.push("/default-channel");
		} catch (error) {
			console.error("Failed to apply referral code", error);
			// Optional: show error message to user
		}
	};

	const handleSkip = () => {
		router.push("/default-channel");
	};

	return (
		<Suspense fallback={<Loader />}>
			<section className="relative z-0 mb-10 flex h-[calc(100vh-100px)] w-full items-center justify-center overflow-hidden px-4">
				<div className="pointer-events-none absolute inset-0 z-0">
					<NextImage
						src={egoImage}
						className="absolute bottom-0 left-0 w-[calc(40vw-0px)]"
						alt="Background Shape Bottom"
					/>
					<NextImage
						src={egoImage}
						className="absolute right-0 top-0 w-[calc(40vw-0px)]"
						alt="Background Shape Top"
					/>
				</div>

				<div className="relative z-10 flex h-[500px] w-full max-w-[500px] flex-col items-center justify-between rounded-[20px] bg-white px-8 py-5 shadow-[0px_0px_56px_0px_rgba(0,0,0,0.08)]">
					<NextImage src={referralImage} alt="Referral Image" />

					<h2 className="text-center text-2xl font-semibold">Got a Referral Code</h2>

					<div className="relative flex w-[380px]">
						<input
							type="text"
							value={referralCode}
							onChange={(e) => setReferralCode(e.target.value)}
							placeholder="Referral Code"
							className="w-[230px] flex-1 rounded-l-[20px] border-none bg-gray-100 px-8 py-4 text-xl font-semibold focus:border-transparent focus:outline-none focus:ring-0"
						/>
						<button
							onClick={handleApply}
							className="text-md -ml-4 rounded-r-[20px] rounded-bl-[20px] bg-[#6CA8DF] px-5 py-2 font-semibold text-white"
						>
							Apply
						</button>
					</div>

					<button onClick={handleSkip} className="text-sm text-[#2873B9] underline">
						Skip
					</button>
				</div>
			</section>

			<ServicesBanner />
		</Suspense>
	);
}
