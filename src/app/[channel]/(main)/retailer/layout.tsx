import React from "react";
import RetailerSidebar from "@/ui/components/retailer/RetailerSidebar";

export default function RetailerLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mt-24 min-h-screen w-full border py-6">
			<h1 className="text-center text-2xl font-semibold">Retailer Registration Form</h1>
			<p className="mb-6 mt-4 text-center text-sm text-gray-500">
				Don’t worry, only you can see your personal data. No one else will be able to see it.
			</p>
			<div className="flex gap-6">
				<RetailerSidebar />
				<div className="flex-1">{children}</div>
			</div>
		</div>
	);
}
