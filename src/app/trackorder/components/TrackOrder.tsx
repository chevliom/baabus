// components/TrackOrder.tsx
import { FaInfoCircle } from "react-icons/fa";

export const TrackOrder = () => {
	return (
		<div className="flex min-h-screen flex-col gap-6 bg-white px-6 py-12 font-sans text-white">
			<h1 className="text-4xl font-bold text-[#1c1c1c] dark:text-white">Track Order</h1>
			<p className="max-w-4xl text-lg text-gray-400">
				To track your order please enter your order ID in the input field below and press the “Track Order”
				button. This was given to you on your receipt and in the confirmation email you should have received.
			</p>

			<form className="flex max-w-4xl flex-wrap gap-6">
				<div className="flex w-full flex-col md:w-[45%]">
					<label htmlFor="orderId" className="mb-2 text-sm">
						Order ID
					</label>
					<input
						type="text"
						id="orderId"
						placeholder="ID..."
						className="rounded border border-gray-300 p-4 text-black focus:outline-none"
					/>
				</div>
				<div className="flex w-full flex-col md:w-[50%]">
					<label htmlFor="billingEmail" className="mb-2 text-sm">
						Billing Email
					</label>
					<input
						type="email"
						id="billingEmail"
						placeholder="Email address"
						className="rounded border border-gray-300 p-4 text-black focus:outline-none"
					/>
				</div>
			</form>

			<div className="mt-2 flex items-center text-sm text-gray-400">
				<FaInfoCircle className="mr-2" />
				Order ID that we sent to you in your email address.
			</div>

			<button className="mt-6 flex w-fit items-center rounded bg-[#f72585] px-8 py-4 text-lg font-semibold text-white hover:bg-[#e21e76]">
				TRACK ORDER <span className="ml-4 text-2xl">→</span>
			</button>
		</div>
	);
};
