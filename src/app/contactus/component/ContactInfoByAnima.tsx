import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";


export const ContactInfoByAnima = (): JSX.Element => {
	const contactItems = [
		{
			icon: <MapPinIcon className="h-10 w-10 text-[#ea518f]" />,
			content: "2715 Ash Dr. San Jose, South Dakota 83475",
		},
		{
			icon: <MailIcon className="h-10 w-10 text-[#ea518f]" />,
			content: (
				<>
					Proxy@gmail.com
					<br />
					Help.proxy@gmail.com
				</>
			),
		},
		{
			icon: <PhoneIcon className="h-10 w-10 text-pink-500" />,
			content: (
				<>
					(219) 555-0114
					<br />
					(164) 333-0487
				</>
			),
		},
	];

	return (
		<Card className="bg-gray-scalewhite flex w-[350px] flex-col items-start rounded-lg shadow-[0px_0px_56px_#00260214]">
			{contactItems.map((item, index) => (
				<React.Fragment key={index}>
					{index > 0 && <Separator className="h-[2px] w-full bg-gray-700/20" />}
					<CardContent className="flex w-full flex-col items-center gap-4 py-6">
						<div className="relative flex h-[51px] w-[51px] items-center justify-center">{item.icon}</div>
						<p className="text-gray-scalegray-800 w-full text-center font-['Poppins',Helvetica] text-base font-normal leading-[27.2px]">
							{item.content}
						</p>
					</CardContent>
				</React.Fragment>
			))}
		</Card>
	);
};