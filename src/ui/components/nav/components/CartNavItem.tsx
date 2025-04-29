import clsx from "clsx";
import * as Checkout from "@/lib/checkout";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

const CartIcon = ({ iconName }: { iconName: string }) => {
	if (iconName === 'cart') {
		return (
			<svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.625 8.84402H21.1388C21.4531 8.84404 21.764 8.90992 22.0513 9.03742C22.3386 9.16492 22.596 9.35121 22.807 9.58429C23.0179 9.81737 23.1776 10.0921 23.2759 10.3906C23.3742 10.6892 23.4088 11.0051 23.3775 11.3179L22.7025 18.0679C22.647 18.6231 22.3872 19.1379 21.9735 19.5123C21.5598 19.8867 21.0217 20.094 20.4638 20.094H9.72C9.19966 20.0942 8.69533 19.9141 8.29288 19.5842C7.89043 19.2544 7.61474 18.7953 7.51275 18.285L5.625 8.84402Z" stroke="#E62875" stroke-width="2" stroke-linejoin="round" />
				<path d="M5.625 8.84402L4.71375 5.19565C4.65281 4.95237 4.51232 4.73643 4.31461 4.58214C4.1169 4.42784 3.87329 4.34403 3.6225 4.34402H2.25M9 24.594H11.25H9ZM18 24.594H20.25H18Z" fill="#E62875" />
				<path d="M5.625 8.84402L4.71375 5.19565C4.65281 4.95237 4.51232 4.73643 4.31461 4.58214C4.1169 4.42784 3.87329 4.34403 3.6225 4.34402H2.25M9 24.594H11.25M18 24.594H20.25" stroke="#E62875" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		);
	}

	return null;
};

export const CartNavItem = async ({ channel }: { channel: string }) => {
	const checkoutId = Checkout.getIdFromCookies(channel);
	const checkout = checkoutId ? await Checkout.find(checkoutId) : null;

	const lineCount = checkout ? checkout.lines.reduce((result, line) => result + line.quantity, 0) : 0;

	return (
		<LinkWithChannel href="/cart" className="relative flex items-center" data-testid="CartNavItem">
			<div className="p-2 border-2 border-dashed bg-[#F8BFD6] border-[#600B2E] rounded-full flex items-center justify-center">
				<CartIcon iconName="cart" />
			</div>
			{lineCount > 0 ? (
				<div
					className={clsx(
						"absolute bottom-0 right-0 -mb-2 -mr-2 flex h-4 flex-col items-center justify-center rounded bg-neutral-900 text-xs font-medium text-white",
						lineCount > 9 ? "w-[3ch]" : "w-[2ch]",
					)}
				>
					{lineCount} <span className="sr-only">item{lineCount > 1 ? "s" : ""} in cart, view bag</span>
				</div>
			) : (
				<span className="sr-only">0 items in cart</span>
			)}
		</LinkWithChannel>
	);
};
