"use client";

import { ChevronRightIcon, MinusIcon, PlusIcon } from "lucide-react";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/Accordion";

import { HeaderSection } from "@/app/sections/HeaderSection";
import { FrameByAnima } from "../../whishlist/components/FrameByAnima";

// FAQ data for mapping
const faqItems = [
	{
		question: "How will my order be delivered to me?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		defaultOpen: true,
	},
	{
		question: "What do I need to know?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		defaultOpen: false,
	},
	{
		question: "How will I know if order is placed successfully?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		defaultOpen: false,
	},
	{
		question: "How do I check the status of my order?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		defaultOpen: false,
	},
	{
		question: "Can I cancel my order?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		defaultOpen: false,
	},
];

// // Benefits data for mapping
// const benefitsData = [
// 	{
// 		icon: "/group.png",
// 		title: "High Quality",
// 		description: "crafted from top materials",
// 	},
// 	{
// 		icon: "/group-1.png",
// 		title: "Warranty Protection",
// 		description: "Over 2 years",
// 	},
// 	{
// 		icon: "/shipping.svg",
// 		title: "Free Shipping",
// 		description: "Order over 150 $",
// 	},
// 	{
// 		icon: "/customer-support.svg",
// 		title: "24 / 7 Support",
// 		description: "Dedicated support",
// 	},
// ];

// Navigation items
// const navItems = ["Home", "Categories", "About", "Contact Us"];

export const Faqs = (): JSX.Element => {
	const [openItem, setOpenItem] = useState<string | null>(null);
	return (
		<div className="relative bg-white">
			<HeaderSection />
			{/* FAQ Title Section */}
			<div className="mb-16 mt-32 flex flex-col items-center">
				<h1 className="text-8xl font-normal text-[#ea518f] [font-family:'Baloo-Regular',Helvetica]">FAQs</h1>

				<div className="mt-8 flex items-center">
					<span className="text-base font-medium text-black [font-family:'Poppins',Helvetica]">Home</span>
					<ChevronRightIcon className="mx-2 h-5 w-5" />
					<span className="text-base font-light text-black [font-family:'Poppins',Helvetica]">FAQs</span>
				</div>
			</div>

			{/* FAQ Content Section */}
			<div className="mx-auto flex w-full max-w-[1368px] flex-col gap-10 px-9 pb-20 pt-5">
				<h2 className="text-header text-[38px] font-bold leading-[45.6px] [font-family:'Poppins',Helvetica]">
					FAQ&apos;S
				</h2>

				<Accordion
					type="single"
					collapsible
					value={openItem || ""}
					onValueChange={(value) => setOpenItem(value || null)}
					className="w-full rounded-[15px] border-2 border-solid border-[#d3d3d3] p-[30px]"
				>
					{faqItems.map((item, index) => {
						const value = `item-${index}`;
						const isOpen = openItem === value;

						return (
							<AccordionItem key={index} value={value} className="border-b-0 last:mb-0">
								<AccordionTrigger className="text-header flex justify-start gap-4 py-4 text-xl font-medium leading-4 [font-family:'Poppins',Helvetica] hover:no-underline [&>svg]:hidden">
									<div className="text-primaryp-500 flex h-6 w-6 items-center justify-center">
										{isOpen ? (
											<MinusIcon className="h-5 w-5 shrink-0" />
										) : (
											<PlusIcon className="h-5 w-5 shrink-0" />
										)}
									</div>
									{item.question}
								</AccordionTrigger>

								<AccordionContent className="text-header-1 pl-10 text-base font-normal leading-[22.4px] [font-family:'Poppins',Helvetica]">
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			</div>

			{/* Benefits Section */}
			<FrameByAnima />
		</div>
	);
};
