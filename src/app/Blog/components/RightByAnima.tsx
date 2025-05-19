import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from "../../../ui/Pagination";

// Blog post data for mapping
const blogPosts = [
	{
		id: 1,
		image: "/rectangle-59.png",
		date: "March 24, 2024",
		title: "Enhancing motor skills through play",
		description:
			"Motor skills are divided into two categories: fine motor skills and gross motor skills. Toys play a vital role in the development of both.",
		featured: true,
	},
	{
		id: 2,
		image: "/rectangle-59-1.png",
		date: "Feb 12, 2024",
		title: "Fostering problem solving skills",
		description:
			"Problem-solving is a critical skill that children begin to develop from a very young age through interactive and engaging play. Toys that challenge children to think and strategize encourage this development.",
	},
	{
		id: 3,
		image: "/rectangle-60-2.png",
		date: "Feb 12, 2024",
		title: "Fostering problem solving skills",
		description:
			"Problem-solving is a critical skill that children begin to develop from a very young age through interactive and engaging play. Toys that challenge children to think and strategize encourage this development.",
	},
	{
		id: 4,
		image: "/rectangle-60-1.png",
		date: "Feb 12, 2024",
		title: "Fostering problem solving skills",
		description:
			"Problem-solving is a critical skill that children begin to develop from a very young age through interactive and engaging play. Toys that challenge children to think and strategize encourage this development.",
	},
	{
		id: 5,
		image: "/rectangle-60-1.png",
		date: "Feb 12, 2024",
		title: "Fostering problem solving skills",
		description:
			"Problem-solving is a critical skill that children begin to develop from a very young age through interactive and engaging play. Toys that challenge children to think and strategize encourage this development.",
	},
];

export const RightByAnima = (): JSX.Element => {
	return (
		<div className="mx-auto w-full max-w-[928px] py-8">
			{/* Featured Article */}
			{blogPosts
				.filter((post) => post.featured)
				.map((post) => (
					<Card
						key={post.id}
						className="mb-8 overflow-hidden rounded-[15px] border border-solid border-[#d3d3d3]"
					>
						<CardContent className="flex flex-col gap-6 p-[15px]">
							<img
								className="h-auto max-h-[462px] w-full object-cover"
								alt="Featured article"
								src={post.image}
							/>
							<div className="flex w-full flex-col items-start gap-4">
								<div className="flex w-full flex-col items-start justify-center gap-5">
									<Badge
										variant="outline"
										className="flex items-center gap-2.5 rounded-[15px] border border-solid border-[#d3d3d3] bg-transparent px-2.5 py-[15px]"
									>
										<CalendarIcon className="h-5 w-5" />
										<span className="text-header-1 text-base font-normal leading-[22.4px] [font-family:'Poppins',Helvetica]">
											{post.date}
										</span>
									</Badge>
									<h2 className="text-header text-xl font-medium leading-4 [font-family:'Poppins',Helvetica]">
										{post.title}
									</h2>
								</div>
								<p className="text-header-1 text-base font-normal leading-[22.4px] [font-family:'Baloo-Regular',Helvetica]">
									{post.description}
								</p>
							</div>
						</CardContent>
					</Card>
				))}

			{/* Grid of Articles */}
			<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
				{blogPosts
					.filter((post) => !post.featured)
					.map((post) => (
						<Card
							key={post.id}
							className="h-full overflow-hidden rounded-[15px] border border-solid border-[#d3d3d3]"
						>
							<CardContent className="flex h-full flex-col gap-6 p-[15px]">
								<img className="h-[253px] w-full object-cover" alt="Article thumbnail" src={post.image} />
								<div className="flex w-full flex-grow flex-col items-start gap-4">
									<div className="flex w-full flex-col items-start justify-center gap-5">
										<Badge
											variant="outline"
											className="flex items-center gap-2.5 rounded-[15px] border border-solid border-[#d3d3d3] bg-transparent px-2.5 py-[15px]"
										>
											<CalendarIcon className="h-5 w-5" />
											<span className="text-header-1 text-base font-normal leading-[22.4px] [font-family:'Poppins',Helvetica]">
												{post.date}
											</span>
										</Badge>
										<h3 className="text-header text-xl font-medium leading-4 [font-family:'Poppins',Helvetica]">
											{post.title}
										</h3>
									</div>
									<p className="text-header-1 text-base font-normal leading-[22.4px] [font-family:'Baloo-Regular',Helvetica]">
										{post.description}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
			</div>

			{/* Pagination */}
			<Pagination className="justify-start">
				<PaginationContent className="flex items-center gap-4">
					<PaginationItem>
						<div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-solid border-[#d3d3d3] p-0">
							<ChevronLeftIcon className="h-[23px] w-[23px]" />
						</div>
					</PaginationItem>

					<PaginationItem>
						<PaginationLink
							className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-none bg-[#0f83b2] p-0 text-[#f8f6f6]"
							isActive
						>
							<span className="text-[18.2px] font-semibold leading-[25.5px] [font-family:'Poppins',Helvetica]">
								1
							</span>
						</PaginationLink>
					</PaginationItem>

					<PaginationItem>
						<PaginationLink
							className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-solid border-[#d3d3d3] p-0"
							href="#"
						>
							<span className="text-header-1 text-[18.2px] font-semibold leading-[25.5px] [font-family:'Poppins',Helvetica]">
								2
							</span>
						</PaginationLink>
					</PaginationItem>

					<PaginationItem>
						<PaginationLink
							className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-solid border-[#d3d3d3] p-0"
							href="#"
						>
							<span className="text-header-1 text-[18.2px] font-semibold leading-[25.5px] [font-family:'Poppins',Helvetica]">
								3
							</span>
						</PaginationLink>
					</PaginationItem>

					<PaginationItem>
						<div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-solid border-[#d3d3d3] p-0">
							<ChevronRightIcon className="h-[23px] w-[23px]" />
						</div>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};
