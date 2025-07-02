import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

// Define types for testimonials
interface Testimonial {
	id: number;
	backgroundColor: string;
	textColor: string;
	name?: string;
	title?: string;
	showNameAndTitle: boolean;
}

// Testimonial data for mapping
const testimonials: Testimonial[] = [
	{
		id: 1,
		backgroundColor: "#f7bfd5",
		textColor: "primaryp-500",
		name: "Elisa Grant",
		title: "Legacy Solutions Engineer",
		showNameAndTitle: true,
	},
	{
		id: 2,
		backgroundColor: "#6ca7df",
		textColor: "secondarys-500",
		showNameAndTitle: false,
	},
	{
		id: 3,
		backgroundColor: "#f7bfd5",
		textColor: "primaryp-500",
		name: "Elisa Grant",
		title: "Legacy Solutions Engineer",
		showNameAndTitle: true,
	},
	{
		id: 4,
		backgroundColor: "#f7bfd5",
		textColor: "primaryp-500",
		name: "Elisa Grant",
		title: "Legacy Solutions Engineer",
		showNameAndTitle: true,
	},
	{
		id: 5,
		backgroundColor: "#6ca7df",
		textColor: "secondarys-500",
		showNameAndTitle: false,
	},
	{
		id: 6,
		backgroundColor: "#f7bfd5",
		textColor: "primaryp-500",
		name: "Elisa Grant",
		title: "Legacy Solutions Engineer",
		showNameAndTitle: true,
	},
	{
		id: 7,
		backgroundColor: "#f7bfd5",
		textColor: "primaryp-500",
		name: "Elisa Grant",
		title: "Legacy Solutions Engineer",
		showNameAndTitle: true,
	},
	{
		id: 8,
		backgroundColor: "#6ca7df",
		textColor: "secondarys-500",
		showNameAndTitle: false,
	},
	{
		id: 9,
		backgroundColor: "#f7bfd5",
		textColor: "primaryp-500",
		name: "Elisa Grant",
		title: "Legacy Solutions Engineer",
		showNameAndTitle: true,
	},
];

export const FooterSection = (): JSX.Element => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isPaused, setIsPaused] = useState<boolean>(false);

	// Duplicate testimonials to create seamless infinite scroll effect
	const duplicatedTestimonials: Testimonial[] = [...testimonials, ...testimonials];

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (!scrollContainer) return;

		let animationId: number;
		let startTime: number | null = null;
		const duration = 50000; // Time to scroll through all items once (in ms)
		const totalWidth = scrollContainer.scrollWidth / 2;

		const step = (timestamp: number): void => {
			if (!startTime) startTime = timestamp;
			if (isPaused) {
				animationId = requestAnimationFrame(step);
				return;
			}

			const elapsed = timestamp - startTime;
			const progress = (elapsed % duration) / duration;

			// Calculate position based on progress
			const scrollPosition = progress * totalWidth;

			// Reset scroll position when we've scrolled through the first set of testimonials
			if (scrollContainer.scrollLeft >= totalWidth) {
				scrollContainer.scrollLeft = 0;
				startTime = timestamp;
			} else {
				scrollContainer.scrollLeft = scrollPosition;
			}

			animationId = requestAnimationFrame(step);
		};

		animationId = requestAnimationFrame(step);

		return () => {
			cancelAnimationFrame(animationId);
		};
	}, [isPaused]);

	// Event handlers for pausing scroll on interaction
	const handleMouseEnter = (): void => setIsPaused(true);
	const handleMouseLeave = (): void => setIsPaused(false);
	const handleTouchStart = (): void => setIsPaused(true);
	const handleTouchEnd = (): void => setIsPaused(false);

	// Create a fixed-size array for star ratings
	const starRatings = [0, 1, 2, 3, 4]; // 5 stars

	return (
		<section className="hidden md:block lg:block w-full overflow-hidden py-16">
			<div className="container mx-auto px-4">
				<h1 className="mb-12 text-left text-5xl leading-tight md:text-6xl lg:text-[70px]">
					<span className="font-baloo font-extrabold text-black">What </span>
					<span className="font-['Playball',Helvetica] text-[#f188b3]">Lovely</span>
					<span className="font-baloo font-extrabold text-black">
						{" "}
						Moms and <br /> Dads Are{" "}
					</span>
					<span className="font-['Playball',Helvetica] text-[#f188b3]">Saying!</span>
				</h1>

				<div
					className="scrollbar-hide flex gap-6 overflow-x-auto pb-6 pt-12"
					style={{
						scrollbarWidth: "none",
						msOverflowStyle: "none",
					}}
					ref={scrollRef}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
				>
					<div className="flex w-max gap-6">
						{duplicatedTestimonials.map((testimonial, index) => (
							<Card
								key={`${testimonial.id}-${index}`}
								className="inline-block w-[512px] rounded-lg shadow-card-drop-2"
								style={{ backgroundColor: testimonial.backgroundColor }}
							>
								<CardContent className="relative flex items-center gap-4 p-6">
									<div className="relative flex-shrink-0">
										<Avatar className="-mt-20 h-[250px] w-40 rounded-none">
											<AvatarImage
												src="/rectangle-12-2.png"
												alt="Customer"
												className="h-full w-full object-cover"
											/>
										</Avatar>
									</div>

									<div className="ml-2 flex flex-1 flex-col items-start gap-4">
										<div className="flex items-center gap-2">
											<div className="flex">
												{starRatings.map((i) => (
													<div key={i} className="relative h-3.5 w-3.5">
														<Image
															className="absolute left-px top-px"
															width={11}
															height={11}
															alt="Star"
															src="/star-1.svg"
														/>
													</div>
												))}
											</div>
											<span
												className={`font-['Manrope',Helvetica] text-${testimonial.textColor} text-[10px] leading-[10px]`}
											>
												5.0 rating
											</span>
										</div>

										<p className="font-['Manrope',Helvetica] text-sm font-medium leading-[18px] text-primaryp-000">
											Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
											consequat duis enim velit mollit.
										</p>

										{testimonial.showNameAndTitle && testimonial.name && testimonial.title && (
											<div className="flex flex-col items-start gap-1">
												<div className={`text-${testimonial.textColor} text-xs leading-3`}>
													{testimonial.name}
												</div>
												<div
													className={`font-baloo font-extrabold text-${testimonial.textColor} text-[8px] leading-[8px]`}
												>
													{testimonial.title}
												</div>
											</div>
										)}
									</div>

									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<button className="absolute right-4 top-11 flex items-center gap-0.5 rounded-[10px] bg-primaryp-000 px-1 py-2">
												<div
													style={{
														backgroundColor: `var(--${testimonial.textColor})`,
													}}
													className="h-[5px] w-[5px] rounded-[2.5px]"
												/>
												<div
													style={{
														backgroundColor: `var(--${testimonial.textColor})`,
													}}
													className="h-[5px] w-[5px] rounded-[2.5px]"
												/>
												<div
													style={{
														backgroundColor: `var(--${testimonial.textColor})`,
													}}
													className="h-[5px] w-[5px] rounded-[2.5px]"
												/>
											</button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem>View Profile</DropdownMenuItem>
											<DropdownMenuItem>Share Testimonial</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>

			{/* Add this style tag if you're not able to define the class in your global CSS */}
			<style jsx>{`
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
				.scrollbar-hide {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>
		</section>
	);
};
