import { CalendarIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../ui/card";

export const PostsWrapperByAnima = (): JSX.Element => {
	return (
		<Card className="flex w-full max-w-[400px] flex-col gap-6 rounded-[15px] border border-solid border-[#d3d3d3] p-4">
			<img
				className="h-auto w-full rounded-md object-cover"
				alt="Problem solving skills"
				src="/rectangle-60-1.png"
			/>

			<CardContent className="flex flex-col gap-4 p-0">
				<div className="flex flex-col gap-5">
					<div className="inline-flex items-center gap-2.5 rounded-[15px] border border-solid border-[#d3d3d3] px-2.5 py-[15px]">
						<CalendarIcon className="h-5 w-5" />
						<div className="text-header-1 font-['Poppins',Helvetica] text-base font-normal leading-[22.4px]">
							Feb 12, 2024
						</div>
					</div>

					<h3 className="text-header font-['Poppins',Helvetica] text-xl font-medium leading-4">
						Fostering problem solving skills
					</h3>
				</div>

				<p className="text-header-1 font-['Baloo-Regular',Helvetica] text-base font-normal leading-[22.4px]">
					Problem-solving is a critical skill that children begin to develop from a very young age through
					interactive and engaging play. Toys that challenge children to think and strategize encourage this
					development.
				</p>
			</CardContent>
		</Card>
	);
};
