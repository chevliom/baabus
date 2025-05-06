import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";

export const BlogDetailByAnima = (): JSX.Element => {
	// Blog metadata
	const blogMetadata = [
		{
			icon: "/group.png",
			text: "Toys",
			alt: "Category icon",
		},
		{
			icon: "/group-1.png",
			text: (
				<>
					<span className="text-gray-scalegray-700">By</span>
					<span className="text-gray-scalegray-700"> Admin</span>
				</>
			),
			alt: "Author icon",
		},
		{
			icon: "/group-2.png",
			text: "65 Comments",
			alt: "Comments icon",
		},
	];

	// Social media links
	const socialMediaLinks = [
		{ src: "/social-media-4.svg", alt: "Social media" },
		{ src: "/social-media-1.svg", alt: "Social media" },
		{ src: "/social-media-3.svg", alt: "Social media" },
		{ src: "/social-media-2.svg", alt: "Social media" },
		{ src: "/social-media.svg", alt: "Social media" },
	];

	return (
		<div className="mx-auto w-full max-w-[872px]">
			{/* Featured Image */}
			<div className="mb-8 h-[600px] w-full">
				<img className="h-full w-full object-cover" alt="Featured blog image" src="/image.png" />
			</div>

			{/* Blog Metadata */}
			<div className="flex flex-col items-start">
				<div className="flex items-start gap-4 pb-2">
					{blogMetadata.map((item, index) => (
						<div key={index} className="flex items-center gap-1">
							<div className="relative h-5 w-5">
								<img
									className="absolute left-1/2 top-1/2 h-auto max-h-full w-auto max-w-full -translate-x-1/2 -translate-y-1/2 transform"
									alt={item.alt}
									src={item.icon}
								/>
							</div>
							<div className="font-body-small-body-small-400 text-gray-scalegray-700 text-[length:var(--body-small-body-small-400-font-size)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]">
								{item.text}
							</div>
						</div>
					))}
				</div>

				{/* Blog Title */}
				<h1 className="text-gray-scalegray-900 mb-8 w-full font-['Poppins',Helvetica] text-[32px] font-medium leading-[44.8px] tracking-[0]">
					Maecenas tempor urna sed quam mollis, a placerat dui fringill Suspendisse.
				</h1>

				{/* Author Info and Social Media */}
				<Card className="shadow-line-shadow mb-8 w-full border-0">
					<CardContent className="flex items-center justify-between px-0 py-6">
						<div className="flex items-start gap-3">
							<Avatar className="h-[50px] w-[50px]">
								<AvatarImage src="/images.png" alt="Author" />
								<AvatarFallback>CW</AvatarFallback>
							</Avatar>

							<div className="flex flex-col gap-[5px]">
								<div className="text-gray-scalegray-900 font-body-medium-body-medium-500 text-[length:var(--body-medium-body-medium-500-font-size)] font-[number:var(--body-medium-body-medium-500-font-weight)] leading-[var(--body-medium-body-medium-500-line-height)] tracking-[var(--body-medium-body-medium-500-letter-spacing)]">
									Cameron Williamson
								</div>

								<div className="flex items-center gap-1.5">
									<span className="font-body-small-body-small-400 text-gray-scalegray-500 text-[length:var(--body-small-body-small-400-font-size)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]">
										4 April, 2021
									</span>
									<span className="font-body-small-body-small-400 text-gray-scalegray-500 text-[length:var(--body-small-body-small-400-font-size)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]">
										•
									</span>
									<span className="font-body-small-body-small-400 text-gray-scalegray-500 text-[length:var(--body-small-body-small-400-font-size)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)]">
										6 min read
									</span>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-1">
							{socialMediaLinks.map((social, index) => (
								<button key={index} className="flex h-10 w-10 items-center justify-center">
									<img className="h-10 w-10" alt={social.alt} src={social.src} />
								</button>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Blog Content */}
			<article className="space-y-6">
				<p className="font-body-XL-body-XL-500 text-gray-scalegray-900 text-[length:var(--body-XL-body-XL-500-font-size)] font-[number:var(--body-XL-body-XL-500-font-weight)] leading-[var(--body-XL-body-XL-500-line-height)] tracking-[var(--body-XL-body-XL-500-letter-spacing)]">
					Maecenas lacinia felis nec placerat sollicitudin. Quisque placerat dolor at scelerisque imperdiet.
					Phasellus tristique felis dolor.
				</p>

				<p className="font-body-large-body-large-400 text-gray-scalegray-500 text-[length:var(--body-large-body-large-400-font-size)] font-[number:var(--body-large-body-large-400-font-weight)] leading-[var(--body-large-body-large-400-line-height)] tracking-[var(--body-large-body-large-400-letter-spacing)]">
					Maecenas elementum in risus sed condimentum. Duis convallis ante ac tempus maximus. Fusce malesuada
					sed velit ut dictum. Morbi faucibus vitae orci at euismod. Integer auctor augue in erat vehicula,
					quis fermentum ex finibus.
				</p>

				<p className="font-body-large-body-large-400 text-gray-scalegray-500 text-[length:var(--body-large-body-large-400-font-size)] font-[number:var(--body-large-body-large-400-font-weight)] leading-[var(--body-large-body-large-400-line-height)] tracking-[var(--body-large-body-large-400-letter-spacing)]">
					Mauris pretium elit a dui pulvinar, in ornare sapien euismod. Nullam interdum nisl ante, id feugiat
					quam euismod commodo. Sed ultrices lectus ut iaculis rhoncus. Aenean non dignissim justo, at
					fermentum turpis. Sed molestie, ligula ut molestie ultrices, tellus ligula viverra neque, malesuada
					consectetur diam sapien volutpat risus. Quisque eget tortor lobortis, facilisis metus eu, elementum
					est. Nunc sit amet erat quis ex convallis suscipit. ur ridiculus mus.
				</p>

				{/* Image Gallery */}
				<div className="my-8 flex gap-6">
					<img className="h-[356px] w-1/2 object-cover" alt="Blog content image" src="/image-2.png" />
					<img className="h-[356px] w-1/2 object-cover" alt="Blog content image" src="/image-2.png" />
				</div>

				<p className="font-body-large-body-large-400 text-gray-scalegray-500 text-[length:var(--body-large-body-large-400-font-size)] font-[number:var(--body-large-body-large-400-font-weight)] leading-[var(--body-large-body-large-400-line-height)] tracking-[var(--body-large-body-large-400-letter-spacing)]">
					Sed dictum non nulla eu imperdiet. Duis elit libero, vulputate quis vehicula ut, vestibulum ut
					mauris. Nullam non felis varius dui rutrum rutrum in a nisi. Suspendisse elementum rutrum lorem sed
					luctus. Proin iaculis euismod metus non sollicitudin. Duis vel luctus lacus. Nullam faucibus iaculis
					convallis. In ullamcorper nibh ipsum, eget lacinia eros pulvinar a. Integer accumsan arcu nec
					faucibus ultricies.
				</p>
			</article>

			{/* Promotional Banner */}
			<div className="relative mt-8 h-[250px] w-full bg-[url(/image-3.png)] bg-cover bg-center">
				<div className="bg-gray-scalegray-900 absolute left-[296px] top-20 h-[91px] w-[91px] rounded-[45.5px]">
					<div className="absolute left-5 top-[17px] flex flex-col items-center justify-center gap-0.5">
						<div className="text-gray-scalegray-300 text-center text-[11px] font-medium leading-[12.1px] tracking-[0.33px] [font-family:'Poppins',Helvetica]">
							UP TO
						</div>
						<div className="text-center text-2xl font-semibold leading-[26.4px] tracking-[0] text-[#b61556] [font-family:'Poppins',Helvetica]">
							56%
						</div>
						<div className="text-gray-scalegray-300 text-center text-sm font-normal leading-[15.4px] tracking-[0] [font-family:'Poppins',Helvetica]">
							Off
						</div>
					</div>
				</div>

				<div className="absolute left-14 top-16 flex flex-col items-start gap-4">
					<div className="flex flex-col items-start gap-1">
						<Badge className="text-gray-scalegray-400 font-CAPS-LOCK-medium-caps-lock bg-transparent text-[length:var(--CAPS-LOCK-medium-caps-lock-font-size)] font-[number:var(--CAPS-LOCK-medium-caps-lock-font-weight)] leading-[var(--CAPS-LOCK-medium-caps-lock-line-height)] tracking-[var(--CAPS-LOCK-medium-caps-lock-letter-spacing)]">
							SUMMER SALES
						</Badge>
						<h2 className="font-heading-04-heading-04-400 text-gray-scalewhite text-[length:var(--heading-04-heading-04-400-font-size)] font-[number:var(--heading-04-heading-04-400-font-weight)] leading-[var(--heading-04-heading-04-400-line-height)] tracking-[var(--heading-04-heading-04-400-letter-spacing)]">
							Baby Walker
						</h2>
					</div>

					<Button className="h-auto rounded-[43px] bg-[#b61556] px-8 py-3.5 hover:bg-[#a01349]">
						<span className="font-body-small-body-small-600 text-gray-scalewhite text-[length:var(--body-small-body-small-600-font-size)] font-[number:var(--body-small-body-small-600-font-weight)] leading-[var(--body-small-body-small-600-line-height)] tracking-[var(--body-small-body-small-600-letter-spacing)]">
							Shop Now
						</span>
						<img className="ml-3 h-[13.55px] w-[16.5px]" alt="Arrow icon" src="/group-3.png" />
					</Button>
				</div>
			</div>
		</div>
	);
};
