import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

export const TestimonialsSection = (): JSX.Element => {
	return (
		<div className="flex w-full justify-center py-8">
			<div className="flex max-w-full gap-6">
				{/* Blog-style Promo (Right Side) */}
				<Card className="relative h-[369px] w-[850px] overflow-hidden rounded-[20px] bg-[#61ab59]">
					<CardContent className="flex h-full items-center p-0 px-6">
						<div className="flex w-full flex-row">
							{/* Left Text Block */}
							<div className="flex max-w-[910px] flex-col justify-center">
								<h2 className="mb-6 font-fredoka text-[56px] leading-[64px] text-white">
									Make Every Day a<br /> Toys Adventure for
									<br /> Your Little Explorers!
								</h2>

								<Link href="/Blog" passHref>
									<Button className="mt-2 flex w-fit items-center gap-[9px] rounded-[30px] bg-[#ffca24] px-4 py-2.5 text-black hover:bg-[#ffca24]/90">
										<span className="cursor-pointer font-fredoka text-xl leading-[32px]">READ BLOG</span>
										<div className="flex h-[29px] w-[35px] items-center justify-center rounded-[17.5px/14.5px] bg-[#5c0047]">
											<svg
												width="18"
												height="18"
												viewBox="0 0 18 18"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												style={{ transform: "rotate(25.25deg)" }}
											>
												<line
													x1="2"
													y1="16"
													x2="16"
													y2="2"
													stroke="white"
													strokeWidth="2"
													strokeLinecap="round"
												/>
												<polyline
													points="11,2 16,2 16,7"
													fill="none"
													stroke="white"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
									</Button>
								</Link>
							</div>

							{/* Right Image */}
							<div className="ml-auto">
								<Image
									className="h-[319px] object-cover"
									alt="Toy image"
									src="/image-59.png"
									width={319}
									height={319}
								/>
							</div>
						</div>

						<Image
							className="absolute right-0 top-0 h-full w-auto"
							alt="Line background"
							src="/line-4.svg"
							width={300}
							height={369}
						/>
					</CardContent>
				</Card>

				{/* Testimonial-style Promo (Left Side) */}
				<Card className="relative h-[369px] w-[553px] overflow-hidden rounded-[20px] border-none bg-[#498aca]">
					<CardContent className="p-0">
						<Image
							className="absolute left-[59px] top-[38px] h-[331px] w-[395px]"
							alt="Decorative line"
							src="/line-5.svg"
							width={395}
							height={331}
						/>

						<div className="absolute left-[25px] top-[26px] w-[359px] font-fredoka text-[64px] leading-[70px] tracking-[0] text-white">
							Get <span className="text-[#ffca24]">20%</span> off with code{" "}
							<span className="text-[#ffca24]">STYLE20</span>
						</div>

						<div className="absolute left-[39px] top-[253px] whitespace-nowrap font-fredoka text-2xl leading-[70px] tracking-[0] text-black">
							SHOP NOW
						</div>

						<Image
							className="absolute left-72 top-[104px] h-[231px] w-[200px] object-cover"
							alt="Product image"
							src="/image-58.png"
							width={200}
							height={231}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
