import React from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import Image from "next/image";
import bgImages from "../../assets/bro.png";

const privacyPolicyContent = [
	"At BaaBus, your child's joy and your privacy are equally important. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website or purchase our toys.",
	"We collect only necessary information (like name, address, and email) during order placement. This helps us ensure timely deliveries, better support, and personalized offers.",
	"Your data is never sold or misused. It is securely stored and only accessed by authorized team members handling your orders or support requests.",
	"Our website uses cookies to enhance your browsing experience and recommend products you'll love. You can control cookie settings anytime in your browser.",
	"By using our services, you agree to this policy. For queries, contact help@baabus.toys. Let’s build joy, trust, and transparency—together."
];

export const PrivacyPolicy = (): JSX.Element => {
	return (
		<div className="min-h-screen  w-full bg-white text-gray-800">


			{/* Hero Section */}
			<div className="w-full flex flex-col-reverse md:flex-row gap-8 px-6 pb-12 items-center">
				<div className="w-full md:w-1/2">
					<h1 className="text-[40px] sm:text-[56px] leading-tight font-bold text-pink-500 font-[Baloo]">
						Website<br />Privacy Policy
					</h1>
					<p className="mt-4 text-lg sm:text-xl text-pink-400 font-medium">
						We respect your trust and protect your data like we protect our kids.
					</p>
				</div>
				<div className="w-full md:w-1/2 flex justify-center">
					<Image
						src={bgImages}
						alt="Kids playing"
						className="w-full max-w-sm object-contain"
					/>
				</div>
			</div>

			{/* Policy Content */}
			<div className="w-full pl-6 pb-20 text-justify text-base sm:text-lg leading-7 font-[Poppins]">
				{privacyPolicyContent.map((para, idx) => (
					<p key={idx} className="mb-6">
						{para}
					</p>
				))}
			</div>
		</div>
	);
};
