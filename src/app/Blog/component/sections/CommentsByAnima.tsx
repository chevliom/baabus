import React from "react";
import { Avatar } from "../../../ui/avatar";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import { Input } from "../../../ui/input";
import { Separator } from "../../../ui/separator";
import { Textarea } from "../../../ui/textarea";

// Comment data for mapping
const comments = [
	{
		id: 1,
		name: "Annette Black",
		date: "26 Apr, 2021",
		text: "In a nisi commodo, porttitor ligula consequat, tincidunt dui. Nulla volutpat, metus eu aliquam malesuada, elit libero venenatis urna, consequat maximus arcu diam non diam.",
		avatar: "/ellipse-8.png",
	},
	{
		id: 2,
		name: "Devon Lane",
		date: "24 Apr, 2021",
		text: "Quisque eget tortor lobortis, facilisis metus eu, elementum est. Nunc sit amet erat quis ex convallis suscipit. Nam hendrerit, velit ut aliquam euismod, nibh tortor rutrum nisi, ac sodales nunc eros porta nisi. Sed scelerisque, est eget aliquam venenatis, est sem tempor eros.",
		avatar: "/ellipse-8-1.png",
	},
	{
		id: 3,
		name: "Jacob Jones",
		date: "20 Apr, 2021",
		text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
		avatar: "/ellipse-8-2.png",
	},
	{
		id: 4,
		name: "Jane Cooper",
		date: "18 Apr, 2021",
		text: "Pellentesque feugiat, nibh vel vehicula pretium, nibh nibh bibendum elit, a volutpat arcu dui nec orci. Aenean dui odio, ullamcorper quis turpis ac, volutpat imperdiet ex.",
		avatar: "/ellipse-8-3.png",
	},
	{
		id: 5,
		name: "Darrell Steward",
		date: "7 Apr, 2021",
		text: "Nulla molestie interdum ultricies.",
		avatar: "/ellipse-8-4.png",
	},
];

export const CommentsByAnima = (): JSX.Element => {
	return (
		<section className="mx-auto w-full max-w-[872px] py-8">
			{/* Comment Form */}
			<div className="mb-10 w-full">
				<h2 className="font-body-XXL-body-XXL-500 text-gray-scalegray-900 mb-6 text-[length:var(--body-XXL-body-XXL-500-font-size)] font-[number:var(--body-XXL-body-XXL-500-font-weight)] leading-[var(--body-XXL-body-XXL-500-line-height)] tracking-[var(--body-XXL-body-XXL-500-letter-spacing)] [font-style:var(--body-XXL-body-XXL-500-font-style)]">
					Leave a Comment
				</h2>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="fullName"
							className="font-body-small-body-small-400 text-gray-scalegray-900 text-[length:var(--body-small-body-small-400-font-size)] font-[number:var(--body-small-body-small-400-font-weight)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)] [font-style:var(--body-small-body-small-400-font-style)]"
						>
							Full Name
						</label>
						<Input
							id="fullName"
							className="bg-gray-scalewhite h-[49px] rounded-md border-[#e6e6e6]"
							defaultValue="Zakir Hossen"
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="email"
							className="font-body-small-body-small-400 text-gray-scalegray-900 text-[length:var(--body-small-body-small-400-font-size)] font-[number:var(--body-small-body-small-400-font-weight)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)] [font-style:var(--body-small-body-small-400-font-style)]"
						>
							Email
						</label>
						<Input
							id="email"
							className="bg-gray-scalewhite h-[49px] rounded-md border-[#ea518f]"
							defaultValue="zakirsoft.20@g|"
						/>
					</div>
				</div>

				<div className="mt-6 flex flex-col gap-1.5">
					<label
						htmlFor="message"
						className="font-body-small-body-small-400 text-gray-scalegray-900 text-[length:var(--body-small-body-small-400-font-size)] font-[number:var(--body-small-body-small-400-font-weight)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)] [font-style:var(--body-small-body-small-400-font-style)]"
					>
						Message
					</label>
					<Textarea
						id="message"
						className="bg-gray-scalewhite min-h-[98px] resize-none rounded-md border-[#e6e6e6]"
						placeholder="Write your comment here…"
					/>
				</div>

				<div className="mt-6 flex items-center gap-1.5">
					<Checkbox id="save-info" className="h-5 w-5 rounded-[3px] border-[#cccccc]" />
					<label
						htmlFor="save-info"
						className="font-body-small-body-small-400 text-gray-scalegray-600 text-[length:var(--body-small-body-small-400-font-size)] font-[number:var(--body-small-body-small-400-font-weight)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)] [font-style:var(--body-small-body-small-400-font-style)]"
					>
						Save my name and email in this browser for the next time I comment.
					</label>
				</div>

				<Button className="text-gray-scalewhite mt-6 h-auto rounded-[43px] bg-[#ea518f] px-10 py-4 hover:bg-[#d03e7a]">
					<span className="font-body-medium-body-medium-600 text-[length:var(--body-medium-body-medium-600-font-size)] font-[number:var(--body-medium-body-medium-600-font-weight)] leading-[var(--body-medium-body-medium-600-line-height)] tracking-[var(--body-medium-body-medium-600-letter-spacing)] [font-style:var(--body-medium-body-medium-600-font-style)]">
						Post Comments
					</span>
				</Button>
			</div>

			{/* Comments Section */}
			<div className="mt-10 w-full">
				<h2 className="font-body-XXL-body-XXL-500 text-gray-scalegray-900 mb-6 text-[length:var(--body-XXL-body-XXL-500-font-size)] font-[number:var(--body-XXL-body-XXL-500-font-weight)] leading-[var(--body-XXL-body-XXL-500-line-height)] tracking-[var(--body-XXL-body-XXL-500-letter-spacing)] [font-style:var(--body-XXL-body-XXL-500-font-style)]">
					Comments
				</h2>

				<div className="flex flex-col gap-6">
					{comments.map((comment, index) => (
						<React.Fragment key={comment.id}>
							<div className="flex gap-3">
								<Avatar className="h-10 w-10">
									<img
										src={comment.avatar}
										alt={`${comment.name} avatar`}
										className="h-full w-full object-cover"
									/>
								</Avatar>
								<div className="flex-1">
									<div className="flex items-center gap-1.5">
										<span className="font-body-small-body-small-500 text-gray-scalegray-900 text-[length:var(--body-small-body-small-500-font-size)] font-[number:var(--body-small-body-small-500-font-weight)] leading-[var(--body-small-body-small-500-line-height)] tracking-[var(--body-small-body-small-500-letter-spacing)] [font-style:var(--body-small-body-small-500-font-style)]">
											{comment.name}
										</span>
										<span className="font-body-small-body-small-400 text-gray-scalegray-900 text-[length:var(--body-small-body-small-400-font-size)] font-[number:var(--body-small-body-small-400-font-weight)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)] [font-style:var(--body-small-body-small-400-font-style)]">
											•
										</span>
										<span className="font-body-small-body-small-400 text-gray-scalegray-400 text-[length:var(--body-small-body-small-400-font-size)] font-[number:var(--body-small-body-small-400-font-weight)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)] [font-style:var(--body-small-body-small-400-font-style)]">
											{comment.date}
										</span>
									</div>
									<p className="font-body-small-body-small-400 text-gray-scalegray-600 mt-2 text-[length:var(--body-small-body-small-400-font-size)] font-[number:var(--body-small-body-small-400-font-weight)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)] [font-style:var(--body-small-body-small-400-font-style)]">
										{comment.text}
									</p>
								</div>
							</div>
							{index < comments.length - 1 && <Separator className="bg-gray-scalegray-100 h-px w-full" />}
						</React.Fragment>
					))}
				</div>

				<Separator className="bg-gray-scalegray-100 mt-6 h-px w-full" />

				<div className="mt-6 flex justify-center">
					<Button
						variant="outline"
						className="h-auto rounded-[43px] border-2 border-[#ea518f] px-8 py-3.5 text-[#ea518f] hover:bg-[#ea518f]/5"
					>
						<span className="font-body-small-body-small-600 text-[length:var(--body-small-body-small-600-font-size)] font-[number:var(--body-small-body-small-600-font-weight)] leading-[var(--body-small-body-small-600-line-height)] tracking-[var(--body-small-body-small-600-letter-spacing)] [font-style:var(--body-small-body-small-600-font-style)]">
							Load More
						</span>
					</Button>
				</div>
			</div>
		</section>
	);
};
