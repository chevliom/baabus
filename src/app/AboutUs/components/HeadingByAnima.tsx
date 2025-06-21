"use client";

import React from "react";

export const HeadingByAnima = (): JSX.Element => {
	return (
		<section className="flex w-full  items-end  gap-5">
			<div className="container mx-auto flex flex-col p-0 items-center gap-8 lg:flex-row lg:gap-16">
				<div className="trusted-content">
					<h2 className="font-['Poppins',Helvetica] text-[24px] md:text-[40px] font-semibold text-black">
						100% Trusted by Parents
					</h2>

					<p className="font-body-medium-body-medium-400 text-gray-scalegray-500 max-w-[570px] text-[length:var(--body-medium-body-medium-400-font-size)] leading-[var(--body-medium-body-medium-400-line-height)] tracking-[var(--body-medium-body-medium-400-letter-spacing)] [font-style:var(--body-medium-body-medium-400-font-style)] hidden md:block">
						Pellentesque a ante vulputate leo porttitor luctus sed eget eros. Nulla et rhoncus neque. Duis non
						diam eget est luctus tincidunt a a mi. Nulla eu eros consequat tortor tincidunt feugiat.
					</p>
				</div>
			</div>
		</section>
	);
};
