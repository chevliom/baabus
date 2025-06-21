import { ChevronRightIcon } from "lucide-react";
import React from "react";
// import { BarByAnima } from "./sections/BarByAnima/BarByAnima";
import { ContactInfoByAnima } from "./ContactInfoByAnima";
// import { FrameByAnima } from "./sections/FrameByAnima";
import { JustSayHelloByAnima } from "./JustSayHelloByAnima";
import { HeaderSection } from "@/app/sections/HeaderSection";
import { FrameByAnima } from "@/app/whishlist/components/FrameByAnima";
import { useRouter } from "next/navigation";

export const ContactUs = (): JSX.Element => {
	const router = useRouter();
	return (
		<div className="flex w-full flex-col bg-white">
			{/* Navigation Bar */}
			<HeaderSection />

			{/* Header Section */}
			<div className="mb-16 mt-32 flex flex-col items-center">
				<h1 className="font-baloo text-8xl text-[#ea518f] font-extrabold">Contact Us</h1>

				<div className="mt-8 flex items-center">
					<span onClick={() => { router.push('/default-channel') }} className="text-base font-medium text-black [font-family:'Poppins',Helvetica]">Home</span>
					<ChevronRightIcon className="mx-2 h-5 w-5" />
					<span className="text-base font-light text-black [font-family:'Poppins',Helvetica]">Contact</span>
				</div>
			</div>

			{/* Main Content Section */}
			<div className="flex flex-col items-center px-4">
				<h2 className="mb-6 text-4xl font-semibold text-black [font-family:'Poppins',Helvetica]">
					Get In Touch With Us
				</h2>

				<p className="mb-16 max-w-[644px] text-center text-base font-normal text-[#9f9f9f] [font-family:'Poppins',Helvetica]">
					For More Information About Our Product &amp; Services. Please Feel Free To Drop Us An Email. Our
					Staff Always Be There To Help You Out. Do Not Hesitate!
				</p>
			</div>

			{/* Contact Information and Form Section */}
			<div className="mb-16 flex justify-center gap-8 px-4 w-full">
				<ContactInfoByAnima />
				<JustSayHelloByAnima />
			</div>
			{/* Footer Section */}
			<FrameByAnima />
		</div>
	);
};
