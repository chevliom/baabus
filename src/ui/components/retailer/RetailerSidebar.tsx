"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
	{ name: "Personal Details", path: "/default-channel/retailer/personal-details", clickable: true },
	{ name: "Company Details", path: "/default-channel/retailer/company-details", clickable: false },
	{ name: "GST Documents", path: "/default-channel/retailer/gst-documents", clickable: false },
];

export default function RetailerSidebar() {
	const pathname = usePathname();

	return (
		<div className="w-64 border rounded-md bg-white">
			<h2 className="text-lg font-medium px-4 py-3 border-b">Navigation</h2>
			<ul className="flex flex-col">
				{navItems.map((item) => {
					const isActive = pathname.includes(item.path);
					const commonClasses = clsx(
						"block px-4 py-3",
						isActive ? "bg-pink-200 font-medium" : "hover:bg-pink-100",
						!item.clickable && " cursor-not-allowed"
					);

					return (
						<li key={item.path}>
							{item.clickable ? (
								<Link href={item.path} className={commonClasses}>
									{item.name}
								</Link>
							) : (
								<span className={commonClasses}>
									{item.name}
								</span>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
