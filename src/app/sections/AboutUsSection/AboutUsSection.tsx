"use client";

import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";

export const AboutUsSection = (): JSX.Element => {
	return (
		<>
			<section className="relative w-full overflow-hidden bg-[#d9e9f7]">
				<div className="hidden md:block">
					<div
						className="w-full bg-[url('/banner-mobile.svg')] bg-cover bg-center bg-no-repeat"
						style={{ aspectRatio: '20 / 9' }}
					/>
				</div>

				{/* Mobile banner (<768 px) */}
				<div className="block md:hidden">
					<div
						className="w-full bg-[url('/banner-mobile.svg')] bg-cover bg-center bg-no-repeat"
						style={{ aspectRatio: '17 / 9' }}
					/>
				</div>
			</section>



		</>
	);
};
