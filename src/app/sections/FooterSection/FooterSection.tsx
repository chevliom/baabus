import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";

type Testimonial = {
	id: number;
	backgroundColor: string;
	textColor: string;
	name?: string;
	title?: string;
	showNameAndTitle: boolean;
};

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

export const FooterSection = () => {
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const [isPaused, setIsPaused] = useState(false);

	const duplicatedTestimonials: Testimonial[] = [...testimonials, ...testimonials];

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (!scrollContainer) return;

		let animationId: number;
		let startTime: number | null = null;
		const duration = 50000;
		const totalWidth = scrollContainer.scrollWidth / 2;

		const step = (timestamp: number) => {
			if (startTime === null) startTime = timestamp;

			if (isPaused) {
				animationId = requestAnimationFrame(step);
				return;
			}

			const elapsed = timestamp - startTime;
			const progress = (elapsed % duration) / duration;
			const scrollPosition = progress * totalWidth;

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

	const handleMouseEnter = () => setIsPaused(true);
	const handleMouseLeave = () => setIsPaused(false);
	const handleTouchStart = () => setIsPaused(true);
	const handleTouchEnd = () => setIsPaused(false);

	const hideScrollbarStyle: React.CSSProperties = {
		msOverflowStyle: "none",
		scrollbarWidth: "none",
		WebkitOverflowScrolling: "touch",
	};

	useEffect(() => {
		const styleTag = document.createElement("style");
		styleTag.innerHTML = `
      .hide-webkit-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `;
		document.head.appendChild(styleTag);

		return () => {
			document.head.removeChild(styleTag);
		};
	}, []);

	return (
		<section className="w-full overflow-hidden py-16">
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
					className="hide-webkit-scrollbar flex gap-6 overflow-x-auto pb-6 pt-12"
					ref={scrollRef}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
					style={hideScrollbarStyle}
				>
					<div className="flex w-max gap-6">
						{duplicatedTestimonials.map((testimonial, index) => (
							<Card
								key={`${testimonial.id}-${index}`}
								className="shadow-card-drop-2 inline-block w-[512px] rounded-lg"
								style={{ backgroundColor: testimonial.backgroundColor }}
							>
								<CardContent className="relative flex items-center gap-4 p-6">
									<div className="relative flex-shrink-0">
										<Avatar className="-mt-20 h-[250px] w-40 rounded-none ">
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
												{Array.from({ length: 5 }, (_, i) => (
													<div key={i} className="relative h-3.5 w-3.5">
														<Image
															src="/star.svg"
															alt="Star"
															width={14}
															height={14}
															className="h-full w-full object-contain"
														/>
													</div>
												))}
											</div>
										</div>

										{testimonial.showNameAndTitle && (
											<>
												<p className={`text-lg font-bold text-black`}>{testimonial.name}</p>
												<p className="text-sm text-gray-700">{testimonial.title}</p>
											</>
										)}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
