"use client";

import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";

export const AboutUsSection = (): JSX.Element => {
	const socialIcons = [
		{
			Icon: TwitterIcon,
			style: {
				backgroundColor: "rgba(248, 191, 214, 1)",
				borderColor: "rgba(55, 6, 26, 1)",
			},
		},
		{
			Icon: InstagramIcon,
			style: {
				backgroundColor: "rgba(248, 191, 214, 1)",
				borderColor: "rgba(55, 6, 26, 1)",
			},
		},
		{
			Icon: FacebookIcon,
			style: {
				backgroundColor: "rgba(248, 191, 214, 1)",
				borderColor: "rgba(55, 6, 26, 1)",
			},
		},
	];

	return (
		<section className="relative z-40 ml-6 h-[518px] w-full">
			{/* Background fill for empty bottom space */}
			<div className="absolute inset-0 z-0 -ml-6 -mt-20 w-full bg-[#d9e9f7]" />
			<div className="absolute -left-20 -top-[106px] h-[693px] w-[1608px] rounded-[500px] bg-[url(/rectangle-12-3.svg)] bg-[100%_100%] ">
				<div className="absolute left-[120px] md:left-[163px] lg:left-[188px] top-72 w-[222px] md:w-[222px] lg:w-[582px] font-baloo text-[20px] md:text-[25px] lg:text-[64px]  font-extrabold leading-[115%]">
					<span className="text-white">Best </span>
					<span className="text-[#f8bfd6]">Toys</span>
					<span className="text-white"> for  Your Kids to Play</span>
				</div>

				<Button className="absolute left-[120px] md:left-[165px] top-[330px] md:top-[390px] lg:left-48 lg:top-[445px] mt-4 rounded-[30px] border-2 border-dashed border-[#e62875] bg-[#fafeaa] hover:bg-[#fafeaa]">
					<span
						className="text-primary-500 font-baloo text-[10px] md:text-xl font-extrabold leading-[23px] "
						style={{ color: "rgba(230, 40, 117, 1)" }}
					>
						Shop now!
					</span>
				</Button>

				<div className="absolute left-[211px] top-[540px] mt-2 h-2.5 w-[61px]">
					<Image width={61} height={10} className="object-cover" alt="Frame" src="/frame-131267.svg" />
				</div>

				<div className="absolute left-[300px] w-[200px] left-[400px] md:left-[400px] lg:left-[877px] top-[165px] h-[458px] w-[643px] md:w-[643px]">
					<div className="absolute left-4 top-80 z-10 h-[31px] w-[33px]">
						<Image width={33} height={31} className="object-cover" alt="cat image" src="/cat.png" />
					</div>

					<div className="absolute left-[590px] top-[313px] h-[81px] w-[88px]">
						<Image width={88} height={81} className="object-cover" alt="Toy decoration" src="/image-18.png" />
					</div>

					{/* Updated image shape to be a blob-oval hybrid */}
					<div
						className="absolute left-0 top-0 h-[100%] w-[67%] md:w-[67%]  lg:h-[458px] lg:w-[621px] overflow-hidden"
						style={{
							clipPath:
								"path('M620,229 C620,361 485,459 350,459 C215,459 0,361 0,229 C0,97 215,0 350,0 C485,0 620,97 620,229 Z')",
							transform: "rotate(0deg) lg:rotate(-8deg)",
						}}
					>
						<Image
							src="/image-2.png"
							alt="Blob girl"
							width={621}
							height={458}
							className="rotate-0 lg:rotate-8 h-full w-full transform object-cover"
						/>
					</div>
				</div>

				<div className="absolute left-[413px] top-[486px] h-[76px] w-[74px]">
					<Image width={74} height={76} className="object-cover" alt="Toy decoration" src="/image-20.png" />
				</div>

				<div className="absolute left-[100px] md:left-[145px] top-[217px] md:top-[217px] lg:left-[175px] lg:top-[217px] h-[69px] w-[228px]">
					<div className="relative h-[69px]">
						<div className="absolute left-[13px] top-[11px] h-[41px] md:h-[51px] w-[150px] md:w-52 rounded-[10px] bg-[#123453]" />

						<div className="absolute left-[43px] top-[25px] font-['Poppins',Helvetica] text-[10px] md:text-[15px] font-bold leading-normal text-[#d9e8f6]">
							Welcome to Babus!
						</div>

						<div className="absolute left-0 top-0 h-[37px] w-[34px]">
							<Image width={34} height={37} className="object-cover" alt="Decoration" src="/image-19.png" />
						</div>

						<div className="absolute left-[145px] md:left-[207px] top-[47px] md:top-[49px] h-5 w-[22px]">
							<Image width={22} height={20} className="object-cover" alt="Decoration" src="/image-21.png" />
						</div>
					</div>
				</div>

				<div className="absolute left-[90px] top-[280px] flex h-[145px] w-[42px] flex-col gap-3">{/* */}</div>
			</div>
		</section>
	);
};
