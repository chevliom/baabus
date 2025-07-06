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
		<section className="ml-0 md:ml-[63px] mt-6 md:mt-[50px] flex w-full max-w-[648px] flex-col gap-6">
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
						{/* Icon */}
						<div className="mt-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#EA518F] sm:h-[20px] sm:w-[20px]">
							<CheckIcon className="h-[10px] w-[10px] text-white sm:h-[12px] sm:w-[12px]" />
						</div>

						{/* Text */}
						<p className="font-['Poppins'] text-sm leading-[22px] tracking-[0.2px] text-[#555]">
							{feature}
						</p>
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
