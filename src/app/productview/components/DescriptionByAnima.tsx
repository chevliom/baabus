"use client";

import { CheckIcon } from "lucide-react";
import React from "react";

export const DescriptionByAnima = (): JSX.Element => {
	// Product feature list data
	const features: string[] = [
		"Built with a strong frame and anti-slip wheels for stability.",
		"Grows with your baby for long-term use.",
		"Comes with fun toys, music, and lights to keep little ones entertained.",
		"Padded and supportive for extended use.",
	];

	return (
		<section className="flex w-full max-w-[648px] flex-col gap-5">
			{/* Main description paragraph */}
			<p className="text-gray-scalegray-500 font-body-small-body-small-400 text-[14px] leading-[150%]">
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

			{/* Feature list */}
			<div className="flex flex-col gap-3.5">
				{features.map((feature, index) => (
					<div key={index} className="flex items-start gap-2">
						<div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ea518f]">
							<CheckIcon className="h-3 w-3 text-white" />
						</div>
						<p className="text-gray-scalegray-500 w-[620px] font-['Poppins',Helvetica] text-sm font-normal leading-[19.6px]">
							{feature}
						</p>
					</div>
				))}
			</div>

			{/* Conclusion paragraph */}
			<p className="text-gray-scalegray-500 font-body-small-body-small-400 text-[14px] leading-[150%]">
				Helps strengthen leg muscles and improve coordination. Built with a strong frame and anti-slip wheels
				for stability.
			</p>
		</section>
	);
};
