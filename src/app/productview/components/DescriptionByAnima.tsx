"use client";

import { CheckIcon } from "lucide-react";
import React from "react";

export const DescriptionByAnima = (): JSX.Element => {
	const features: string[] = [
		"Built with a strong frame and anti-slip wheels for stability.",
		"Grows with your baby for long-term use.",
		"Comes with fun toys, music, and lights to keep little ones entertained.",
		"Padded and supportive for extended use.",
	];

	return (
		<section className="ml-[63px] mt-[100px] flex w-full max-w-[648px] flex-col gap-6">
			{/* Main Description */}
			<p className="font-['Poppins'] text-base leading-[24px] tracking-[0.2px] text-[#808080]">
				Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at mauris.
				Maecenas tincidunt ligula a sem vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet nisi
				porttitor vel. Etiam tincidunt metus vel dui interdum sollicitudin. Mauris sem ante, vestibulum nec
				orci vitae, aliquam mollis lacus. Sed et condimentum arcu, id molestie tellus. Nulla facilisi. Nam
				scelerisque vitae justo a convallis. Morbi urna ipsum, placerat quis commodo quis, egestas elementum
				leo. Donec convallis mollis enim. Aliquam id mi quam. Phasellus nec fringilla elit.
				<br />
				<br />
				Nulla mauris tellus, feugiat quis pharetra sed, gravida ac dui. Sed iaculis, metus faucibus elementum
				tincidunt, turpis mi viverra velit, pellentesque tristique neque mi eget nulla. Proin luctus elementum
				neque et pharetra.
			</p>

			{/* Features List */}
			<div className="flex flex-col gap-4">
				{features.map((feature, index) => (
					<div key={index} className="flex items-start gap-3">
						<div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#EA518F]">
							<CheckIcon className="h-[12px] w-[12px] text-white" />
						</div>
						<p className="font-['Poppins'] text-sm leading-[22px] tracking-[0.2px] text-[#555]">{feature}</p>
					</div>
				))}
			</div>

			{/* Conclusion */}
			<p className="font-['Poppins'] text-base leading-[24px] tracking-[0.2px] text-[#555]">
				Helps strengthen leg muscles and improve coordination. Built with a strong frame and anti-slip wheels
				for stability.
			</p>
		</section>
	);
};
