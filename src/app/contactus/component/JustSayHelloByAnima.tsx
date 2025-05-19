import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

export const JustSayHelloByAnima = (): JSX.Element => {
	return (
		<div className="w-full max-w-[984px]">
			<Card className="w-full rounded-lg shadow-[0px_0px_56px_#00260214]">
				<CardContent className="p-12">
					<div className="space-y-6">
						<div>
							<h2 className="font-body-XXL-body-XXL-600 text-gray-scalegray-900 text-[24px] font-semibold leading-[150%]">
								Just Say Hello!
							</h2>
							<p className="font-body-small-body-small-400 text-gray-scalegray-500 mt-2 max-w-[486px] text-[14px] leading-[150%]">
								Do you fancy saying hi to me or you want to get started with your project and you need my
								help? Feel free to contact me.
							</p>
						</div>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<Input
								className="text-gray-scalegray-600 h-[49px] rounded-md border border-[#e6e6e6] font-['Poppins',Helvetica]"
								defaultValue="Template Cookie"
								placeholder="Name"
							/>
							<Input
								className="text-gray-scalegray-600 h-[49px] rounded-md border border-[#e6e6e6] font-['Poppins',Helvetica]"
								defaultValue="zakirsoft@gmail.com"
								placeholder="Email"
							/>
						</div>

						<Input
							className="text-gray-scalegray-900 h-[49px] rounded-md border border-[#ea518f] font-['Poppins',Helvetica]"
							defaultValue="Hello|"
							placeholder="Subject"
						/>

						<Textarea
							className="text-gray-scalegray-400 min-h-[98px] rounded-md border border-[#e6e6e6] font-['Poppins',Helvetica]"
							defaultValue="Subjects"
							placeholder="Message"
						/>

						<div>
							<Button className="text-white font-body-medium-body-medium-600 rounded-[43px] bg-[#ea518f] px-10 py-4 text-[16px] font-semibold hover:bg-[#ea518f]/90 h-12 ">
								Send Message
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
