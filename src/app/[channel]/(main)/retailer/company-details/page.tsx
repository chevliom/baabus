import React from "react";

function CompanyDetails() {
    return (
        <div className="border rounded-md bg-white p-6 w-full max-w-3xl">
            <h3 className="text-lg font-semibold border-b border-gray-200 pb-4 mb-6">
                Company Details
            </h3>

            {/* Company GST */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                    <span className="font-medium text-black">Company GST</span>
                    <span className="text-red-500 font-normal">*</span>
                </label>
                <input
                    className="w-full border border-[1px] border-[#E6E6E6] rounded-md p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700 transition-all duration-150"
                    placeholder="Company GST"
                />
            </div>

            {/* Product Categories */}
            <div className="mb-6">
                <p className="text-sm font-medium mb-1">
                    Product Categories of interest? <span className="text-xs">(Multi-select)</span>
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {[
                        "Educational Toys",
                        "Action figures",
                        "Dolls & Plush",
                        "Outdoor & Sports",
                        "Remote-Controlled(RC)",
                        "Puzzles & Board Games",
                        "Other(Specify)",
                    ].map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="accent-pink-500" />
                            {item}
                        </label>
                    ))}
                </div>
            </div>

            {/* How Did You Hear */}
            <div className="mb-6">
                <p className="text-sm font-medium mb-1">How Did You hear about us?</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {["Social Media", "Reference", "Online Ads", "Other(Specify)"].map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="accent-pink-500" />
                            {item}
                        </label>
                    ))}
                </div>
            </div>

            {/* Purchase Frequency */}
            <div className="mb-6">
                <p className="text-sm font-medium mb-1">Preferred purchase frequency</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {["Weekly", "Monthly", "Occasionally"].map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="accent-pink-500" />
                            {item}
                        </label>
                    ))}
                </div>
            </div>

            {/* Communication Channels */}
            <div className="mb-6">
                <p className="text-sm font-medium mb-1">Preferred Communication Channels</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {["Whatsapp", "Call", "Email"].map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="accent-pink-500" />
                            {item}
                        </label>
                    ))}
                </div>
            </div>

            <button className="bg-pink-500 text-white rounded-md px-5 py-2 text-sm font-semibold mt-4">
                Save Changes
            </button>
        </div>
    );
}

export default CompanyDetails;
