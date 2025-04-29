export default function PersonalDetailsPage() {
    return (
        <div className="border rounded-md bg-white p-6 w-full max-w-3xl">
            <h3 className="text-lg font-semibold border-b pb-4 mb-6">Personal Details</h3>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Business name</label>
                <input
                    className="w-full border border-[1px] border-[#E6E6E6] rounded-md p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700 transition-all duration-150"
                    placeholder="Business Name"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Full name</label>
                <input
                    className="w-full border border-[1px] border-[#E6E6E6] rounded-md p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700 transition-all duration-150"
                    placeholder="Full Name"
                />
            </div>            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    className="w-full border border-[1px] border-[#E6E6E6] rounded-md p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700 transition-all duration-150"
                    placeholder="Email"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Contact</label>
                <input
                    className="w-full border border-[1px] border-[#E6E6E6] rounded-md p-2 text-sm focus:border-pink-700 focus:ring-1 focus:ring-pink-700 transition-all duration-150"
                    placeholder="Contact"
                />
            </div>
            <button className="bg-pink-500 text-white rounded-md px-5 py-2 text-sm font-semibold mt-4">
                Save Changes
            </button>
        </div>
    );
}
