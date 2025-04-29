import React from "react";
import RetailerSidebar from "@/ui/components/retailer/RetailerSidebar";

export default function RetailerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen py-6 border w-full">
            <h1 className="text-2xl font-semibold text-center">Retailer Registration Form</h1>
            <p className="text-center text-sm text-gray-500 mb-6 mt-4">
                Don’t worry, only you can see your personal data. No one else will be able to see it.
            </p>
            <div className="flex gap-6">
                <RetailerSidebar />
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}
