import React from "react";

export const ServicesSection = (): JSX.Element => {
	// Data for the scrolling banner
	const bannerText = "Safe, fun, and engaging toys to spark joy and creativity in every little one!";

	return (
		<section
			style={{ backgroundColor: "rgba(253, 241, 246, 1)" }}
			className="relative h-24 w-full overflow-hidden border-2 border-dashed border-black"
		>
			<div className="flex h-full w-full">
				{/* Create a continuous scrolling effect by duplicating the content */}
				<div className="animate-marquee flex whitespace-nowrap">
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							style={{ backgroundColor: "rgba(253, 241, 246, 1)" }}
							className="inline-flex items-center justify-center border-black p-2.5"
						>
							<p className="font-baloo text-5xl font-extrabold text-[#961147]">{bannerText}</p>
						</div>
					))}
				</div>

				{/* Duplicate for seamless looping */}
				<div className="animate-marquee2 flex whitespace-nowrap">
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							style={{ backgroundColor: "rgba(253, 241, 246, 1)" }}
							className="inline-flex items-center justify-center border border-dashed border-black p-2.5"
						>
							<p className="font-baloo text-5xl font-extrabold text-[#961147]">{bannerText}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
