"use client";
import NextImage, { type ImageProps } from "next/image";
import { usePathname } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import CompanyLogo from  "@/assets/logo.png";
const companyName = "ACME";

export const Logo = () => {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
			<h1 className="flex items-center font-bold" aria-label="homepage">
				{companyName}
			</h1>
		);
	}
	return (
		<div className="flex items-center font-bold">
			<LinkWithChannel aria-label="homepage" href="/">
			<NextImage
				className="w-[150px]"
				src={CompanyLogo}
				alt={companyName}
			/>
			</LinkWithChannel>
		</div>
	);
};
