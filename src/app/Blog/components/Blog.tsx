import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "../../../ui/Breadcrumb";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

import { RightByAnima } from "./RightByAnima";
import { HeaderSection } from "@/app/sections/HeaderSection";
import { FrameByAnima } from "@/app/whishlist/components/FrameByAnima";

export const Blog = (): JSX.Element => {
	return (
		<div className="relative flex w-full flex-col bg-white">
			<HeaderSection/>

			<header className="mb-8 mt-[108px] flex w-full justify-center">
				<div className="flex flex-col items-center">
					<h1 className="text-8xl font-baloo leading-normal tracking-[0] text-[#ea518f]   ">
						Blog
					</h1>

					<Breadcrumb className="mt-6">
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink className="text-base font-medium text-black [font-family:'Poppins',Helvetica]">
									Home
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbItem>
								<ChevronRightIcon className="h-5 w-5" />
							</BreadcrumbItem>
							<BreadcrumbItem>
								<BreadcrumbLink className="text-base font-light text-black [font-family:'Poppins',Helvetica]">
									Blog
								</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>

			<main className="flex w-full flex-col md:flex-row">
				<aside className="mx-auto w-full md:ml-[66px] md:w-[295px]">
					<Card className="h-[628px] border-0 bg-[url(/rectangle-61.png)] bg-cover bg-[50%_50%]">
						<CardContent className="flex flex-col items-center gap-10 pt-[74px]">
							<div className="flex flex-col items-center gap-5">
								<h2 className="w-[236px] text-center text-[26px] font-normal leading-[36.4px] tracking-[0] text-[#21609b] [font-family:'Baloo-Regular',Helvetica]">
									Dream Toys at Delightful Prices!
								</h2>
								<p className="w-[225px] text-center text-base font-normal leading-[22.4px] tracking-[0] text-[#0b8498] [font-family:'Baloo-Regular',Helvetica]">
									15% Off on Kids&#39; Toys and Gifts!
								</p>
							</div>

							<Button className="h-[51px] w-[151px] rounded-[74px] bg-[#ffe925] text-neutral-900 hover:bg-[#ffe925]/90">
								<span className="text-lg font-normal tracking-[0] [font-family:'Baloo-Regular',Helvetica]">
									Shop now
								</span>
							</Button>
						</CardContent>
					</Card>
				</aside>

				<RightByAnima />
			</main>

			<FrameByAnima/>
		</div>
	);
};
