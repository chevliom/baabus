import React from "react";
import { Card, CardContent } from "../../ui/card";

export const ContactSection = (): JSX.Element => {
	const productHighlights = [
		{
			id: 1,
			title: "Interactive Play Panel",
			description: "Fun buttons, sounds, and toys enhance hand-eye coordination and keep your baby engaged.",
			image: "/image-49.png",
			position: "top-left",
		},
		{
			id: 2,
			title: "Strengthens Leg & Back Muscles",
			description: "Scientifically designed to support balance and muscle development for early walkers",
			image: "/image-49.png",
			position: "top-right",
		},
		{
			id: 3,
			title: "360° Rotatable Comfort",
			description:
				"Soft, breathable linen seat with a 360° rotatable design ensures flexibility and support for your baby's movement.",
			image: "/image-47.png",
			position: "bottom-right",
		},
		{
			id: 4,
			title: "Auxiliary Brake for Safety",
			description:
				"Equipped with an anti-fall braking system to prevent accidents on stairs and uneven surfaces, ensuring your baby's protection.",
			image: "/image-50.png",
			position: "bottom-left",
		},
	];

	return (
		<section className="relative w-full bg-[#d9e8f6] py-12">
			<div className="container mx-auto px-4">
				<h2 className="text-primaryp-500 font-baloo mb-16 text-center text-[64px] font-extrabold">
					Babus&nbsp;&nbsp;Product Highlights
				</h2>

				<div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Left column */}
					<div className="flex flex-col gap-8">
						<Card className="border-0 bg-transparent shadow-none">
							<CardContent className="p-0">
								<div className="relative">
									<div className="font-baloo text-[40px] font-extrabold text-[#2873b9]">
										{productHighlights[0].title}
									</div>
									<div className="relative mt-4">
										<div className="bg-[url(/ellipse-5.svg)] bg-[100%_100%] p-10">
											<div className="font-baloo text-base font-extrabold text-[#d9e8f6]">
												{productHighlights[0].description}
											</div>
										</div>
										<img
											className="-mt-4 ml-auto h-[154px] w-[154px] object-cover"
											alt="Interactive Play Panel"
											src={productHighlights[0].image}
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="mt-auto border-0 bg-transparent shadow-none">
							<CardContent className="p-0">
								<div className="relative">
									<div className="font-baloo text-[40px] font-extrabold text-[#2873b9]">
										{productHighlights[3].title}
									</div>
									<div className="relative mt-4">
										<img
											className="ml-auto h-[282px] w-[282px] object-cover"
											alt="Auxiliary Brake for Safety"
											src={productHighlights[3].image}
										/>
										<div className="relative">
											<img className="h-[206px] w-[347px]" alt="Ellipse" src="/ellipse-6.svg" />
											<div className="font-baloo absolute left-1/2 top-1/2 w-[229px] -translate-x-1/2 -translate-y-1/2 transform text-base font-extrabold text-[#d9e8f6]">
												{productHighlights[3].description}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Center column with main product image */}
					<div className="flex items-center justify-center">
						<div
							className="absolute"
							style={{
								width: "798.22px",
								height: "732.9px",
								top: "75.64px",
								left: "298.32px",
							}}
						>
							<img className="h-full w-full object-contain" alt="Babus Product" src="/main-product.png" />
						</div>
					</div>

					{/* Right column */}
					<div className="flex flex-col gap-8">
						<Card className="border-0 bg-transparent shadow-none">
							<CardContent className="p-0">
								<div className="relative">
									<img
										className="h-[351px] w-[351px] object-cover"
										alt="Strengthens Leg & Back Muscles"
										src={productHighlights[1].image}
									/>
									<div className="mt-4">
										<div className="font-baloo text-[40px] font-extrabold text-[#2873b9]">
											{productHighlights[1].title}
										</div>
										<div className="relative mt-4">
											<img className="h-[173px] w-[311px]" alt="Ellipse" src="/ellipse-6.svg" />
											<div className="font-baloo absolute left-1/2 top-1/2 w-[229px] -translate-x-1/2 -translate-y-1/2 transform text-base font-extrabold text-[#d9e8f6]">
												{productHighlights[1].description}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="mt-auto border-0 bg-transparent shadow-none">
							<CardContent className="p-0">
								<div className="relative">
									<img
										className="mx-auto h-[184px] w-[184px] object-cover"
										alt="360° Rotatable Comfort"
										src={productHighlights[2].image}
									/>
									<div className="mt-4">
										<div className="font-baloo text-[40px] font-extrabold text-[#2873b9]">
											{productHighlights[2].title}
										</div>
										<div className="relative mt-4">
											<img className="h-[200px] w-[348px]" alt="Ellipse" src="/ellipse-4.svg" />
											<div className="font-baloo absolute left-1/2 top-1/2 w-[315px] -translate-x-1/2 -translate-y-1/2 transform text-base font-extrabold text-[#d9e8f6]">
												{productHighlights[2].description}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
};
