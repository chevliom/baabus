"use client";

import { ChevronRightIcon } from "lucide-react";
import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";

export const OverlapWrapperByAnima = (): JSX.Element => {
	return (
		<section className="relative h-[225px] w-full bg-[url(/rectangle-971.svg)] bg-cover bg-center">
			<div className="flex h-full flex-col items-center justify-center">
				<div className="text-center">
					<h1 className="font-['Baloo-Regular',Helvetica] text-8xl font-normal text-[#ea518f]">Cart</h1>

					<Breadcrumb className="mt-8">
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink
									href="/"
									className="font-['Poppins',Helvetica] text-base font-medium text-black"
								>
									Home
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<ChevronRightIcon className="h-3.5 w-2" />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbLink className="font-['Poppins',Helvetica] text-base font-light text-black">
									Cart
								</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</div>
		</section>
	);
};
