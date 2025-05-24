import { CheckIcon } from "lucide-react";
import React from "react";

export const OrderProgressTrackerSection = (): JSX.Element => {
	// Define the order progress steps data
	const progressSteps = [
		{ id: "01", label: "Order received", status: "completed" },
		{ id: "02", label: "Processing", status: "current" },
		{ id: "03", label: "On the way", status: "pending" },
		{ id: "04", label: "Delivered", status: "pending" },
	];

	return (
		<section className="w-full py-8">
			<div className="relative mx-auto w-full max-w-[946px]">
				{/* Progress line */}
				<div className="absolute left-5 right-5 top-5 z-0 h-2 bg-gray-100">
					{/* Completed progress */}
					<div className="h-full w-[33%] bg-[#ea518f]"></div>
				</div>

				{/* Progress points */}
				<div className="relative z-10 flex items-center justify-between">
					{progressSteps.map((step) => (
						<div key={step.id} className="flex flex-col items-center">
							{/* Step indicator */}
							{step.status === "completed" ? (
								<div className="text-gray-scalewhite flex h-10 w-10 items-center justify-center rounded-full bg-[#ea518f]">
									<CheckIcon className="h-5 w-5" />
								</div>
							) : step.status === "current" ? (
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ea518f]">
									<span className="text-gray-scalewhite text-sm font-medium">{step.id}</span>
								</div>
							) : (
								<div className="bg-gray-scalewhite flex h-[42px] w-[42px] items-center justify-center rounded-full border border-dashed border-[#ea518f]">
									<span className="text-sm font-normal text-[#ea518f]">{step.id}</span>
								</div>
							)}

							{/* Step label */}
							<div
								className={`mt-3 text-center text-sm ${
									step.status === "completed" || step.status === "current"
										? "font-medium text-[#b61556]"
										: "text-gray-scalegray-800 font-normal"
								}`}
							>
								{step.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
