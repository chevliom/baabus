"use client";

import React from "react";
import Image from "next/image";
import { AboutUsSection } from "../../sections/AboutUsSection/AboutUsSection";
import { CallToActionSection } from "../../sections/CallToActionSection/CallToActionSection";

import { FeaturesSection } from "../../sections/FeaturesSection/FeaturesSection";
import { FooterSection } from "../../sections/FooterSection/FooterSection";

import { HeaderSection } from "../../sections/HeaderSection";
import { MainContentSection } from "../../sections/MainContentSection";
import { NewsletterSection } from "../../sections/NewsletterSection";

import { ServicesSection } from "../../sections/ServicesSection";
import { TestimonialsSection } from "../../sections/TestimonialsSection/TestimonialsSection";
import { Categories } from "../../sections/CategoriesSection/Categories";

export default function HomePage() {
	// Footer links data
	const footerLinks = [
		{
			id: 1,
			title: "Find a Store",
			subtitle: "Give locater",
			icon: "/frame-27-mingcute-store-line.svg",
		},
		{
			id: 2,
			title: "Give FeedBack",
			subtitle: "Tell us what you think",
			icon: "/frame-27-codicon-feedback.svg",
		},
		{
			id: 3,
			title: "Babus App",
			subtitle: "Download the App",
			icon: "/frame-27-fluent-app-span-28-regular.svg",
		},
		{
			id: 4,
			title: "Babus Card",
			subtitle: "To Get Exclusive offers",
			icon: "/vector.svg",
		},
	];

	return (
		<div className="relative w-full overflow-x-hidden bg-white">
			<HeaderSection />

			{/* About Us Section */}
			<div id="home">
				<AboutUsSection />
			</div>

			<div id="categories">
				<Categories />
			</div>

			<NewsletterSection />
			<ServicesSection />

			{/* Call To Action Section */}
			<div className="relative w-full" id="about">
				<CallToActionSection />
			</div>

			{/* <ContactSection /> */}
			<div className="h-full w-full overflow-hidden">
				<Image
					src="/Highlights.png"
					alt="Highlights"
					width={1920}
					height={1080}
					className="h-auto w-full"
					priority
				/>
			</div>

			<MainContentSection />
			<FooterSection />

			<TestimonialsSection />

			<div className="w-full py-8 px-4">
				<div className="mx-auto max-w-[1362px]">
					<div className="flex flex-wrap justify-between">
						{footerLinks.map((link) => (
							<div key={link.id} className="mb-4 flex items-start gap-3">
								<div className="relative h-[34px] w-[34px]">
									<Image className="object-contain" alt={link.title} src={link.icon} width={34} height={34} />
									{link.id === 4 && (
										<Image
											className="absolute bottom-2 left-0"
											alt="Nested Vector"
											src="/vector-1.svg"
											width={40}
											height={20}
										/>
									)}
								</div>
								<div>
									<h3 className="font-baloo text-2xl font-extrabold text-black">{link.title}</h3>
									<p className="text-base">{link.subtitle}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div id="contact">
				<FeaturesSection />
			</div>
		</div>
	);
}
