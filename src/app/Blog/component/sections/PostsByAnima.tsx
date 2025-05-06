import { CalendarIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../ui/card";

export const PostsByAnima = (): JSX.Element => {
	return (
		<Card className="flex w-full max-w-[400px] flex-col gap-6 rounded-[15px] border border-solid border-[#d3d3d3] p-[15px] pb-[30px]">
			<img
				className="h-[253px] w-full rounded-md object-cover"
				alt="Problem solving skills"
				src="/rectangle-60-1.png"
			/>

			<CardContent className="flex flex-col items-start gap-4 p-0">
				<div className="flex w-full flex-col items-start justify-center gap-5">
					<div className="inline-flex flex-col items-start justify-center gap-3 rounded-[15px] border border-solid border-[#d3d3d3] px-2.5 py-[15px]">
						<div className="inline-flex items-end gap-2.5">
							<CalendarIcon className="h-5 w-5" />
							<div className="text-header-1 whitespace-nowrap font-['Poppins',Helvetica] text-base font-normal leading-[22.4px]">
								Feb 12, 2024
							</div>
						</div>
					</div>

					<h3 className="text-header whitespace-nowrap font-['Poppins',Helvetica] text-xl font-medium leading-4">
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
