import React from 'react'
export const Icon = ({ IconName }: { IconName: string }) => {
    if (IconName == "downArrow") {
        return (
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.709563 1.71L3.29956 4.3C3.68956 4.69 4.31956 4.69 4.70956 4.3L7.29956 1.71C7.92956 1.08 7.47956 0 6.58956 0H1.40956C0.519563 0 0.0795632 1.08 0.709563 1.71Z" fill="#17030B" />
            </svg>
        )
    }
}

function addressPage() {
    return (
        <div className="border rounded-md bg-white p-6 w-full max-w-3xl">
            <h3 className="text-lg font-semibold border-b pb-4 mb-6">Billing Details</h3>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Address line 1</label>
                <input
                    className="w-full border border-[1px] border-[#E6E6E6] rounded-md p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700 transition-all duration-150"
                    placeholder="Address line 1"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Address line 2</label>
                <input
                    className="w-full border border-[1px] border-[#E6E6E6] rounded-md p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700 transition-all duration-150"
                    placeholder="Address line 2"
                />
            </div>

            <div className="flex gap-4 mb-4">
                {/* State Dropdown */}
                <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">State</label>
                    <div className="relative">
                        <select className="w-full appearance-none border border-[1px] border-[#E6E6E6] rounded-md p-2 text-sm pr-10 focus:border-pink-700 focus:ring-1 focus:ring-pink-700 transition-all duration-150">
                            <option>Select State</option>
                            <option>Gujarat</option>
                            <option>Maharashtra</option>
                            <option>Rajasthan</option>
                        </select>
                        {/* SVG Icon */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <Icon IconName="downArrow" />
                        </div>
                    </div>
                </div>

                {/* City Dropdown */}
                <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">City</label>
                    <div className="relative">
                        <select className="w-full appearance-none border border-[1px] border-[#E6E6E6] rounded-md p-2 text-sm pr-10 focus:border-pink-700 focus:ring-1 focus:ring-pink-700 transition-all duration-150">
                            <option>Select City</option>
                            <option>Ahmedabad</option>
                            <option>Surat</option>
                            <option>Vadodara</option>
                        </select>
                        {/* SVG Icon */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <Icon IconName="downArrow" />
                        </div>
                    </div>
                </div>
            </div>



            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Pincode</label>
                <input
                    className="w-full border border-[1px] border-[#E6E6E6] rounded-md p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700 transition-all duration-150"
                    placeholder="6-Digit pin"
                />
            </div>
            <button className="bg-pink-500 text-white rounded-md px-5 py-2 text-sm font-semibold mt-4">
                Save Changes
            </button>
        </div>
    );
}

export default addressPage