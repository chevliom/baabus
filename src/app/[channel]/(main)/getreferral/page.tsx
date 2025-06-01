"use client";
import { Suspense } from "react";
import NextImage from "next/image";
import { Loader } from "@/ui/atoms/Loader";
import ServicesBanner from "@/ui/components/ServicesBanner";
import referralImage from "@/assets/authImage/referral.png";
import egoImage from "@/assets/authImage/ego.png";
import { useRouter } from "next/navigation";

export default function GetReferralPage() {
	const router = useRouter();

	return (
		<Suspense fallback={<Loader />}>
			<section className="relative z-0 h-[calc(100vh-100px)] w-full overflow-hidden mb-10 flex items-center justify-center px-4">
				<div className="absolute inset-0 z-0 pointer-events-none">
					<NextImage
						src={egoImage}
						className="absolute bottom-0 left-0 w-[calc(40vw-0px)] "
						alt="Background Shape Bottom"
					/>
					<NextImage
						src={egoImage}
						className="absolute top-0 right-0 w-[calc(40vw-0px)] "
						alt="Background Shape Top"
					/>
				</div>
				<div className="relative z-10 w-full max-w-[500px] h-[500px] rounded-[20px] bg-white px-8  py-5 shadow-[0px_0px_56px_0px_rgba(0,0,0,0.08)] flex flex-col items-center justify-between">
					<NextImage src={referralImage} alt="Referral Image" />
					<h2 className="text-center text-2xl font-semibold">Got a Referral Code</h2>
					<div className="flex w-[380px] relative">
						<input
							type="text"
							placeholder="Referral Code"
							className="flex-1 w-[230px] rounded-l-[20px] border-none bg-gray-100 px-8 py-4 text-xl font-semibold focus:outline-none focus:ring-0 focus:border-transparent"
						/>
						<button className="bg-[#6CA8DF] rounded-r-[20px] rounded-bl-[20px] px-5 py-2 -ml-4 text-md font-semibold text-white">
							Apply
						</button>
					</div>

					<button className="text-sm text-[#2873B9] underline" onClick={() => router.push("/default-channel")}>Skip</button>
				</div>
			</section>
			<ServicesBanner />
		</Suspense>
	);
}
