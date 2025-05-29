"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
	{ name: "Personal Details", path: "/personal-details" },
	{ name: "Company Details", path: "default-channel/retailer/company-details" },
	{ name: "Address", path: "default-channel/retailer/address" },
	{ name: "GST Documents", path: "default-channel/retailer/gst-documents" },
];

export default function RetailerSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 border rounded-md bg-white">
            <h2 className="text-lg font-medium px-4 py-3 border-b">Navigation</h2>
            <ul className="flex flex-col">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <Link
                            href={item.path}
                            className={clsx(
                                "block px-4 py-3 hover:bg-pink-100",
                                pathname.includes(item.path) && "bg-pink-200 font-medium"
                            )}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
