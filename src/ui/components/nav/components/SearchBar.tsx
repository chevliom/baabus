import { redirect } from "next/navigation";
import { SearchIcon } from "lucide-react";

export const SearchBar = ({ channel }: { channel: string }) => {
	async function onSubmit(formData: FormData) {
		"use server";
		const search = formData.get("search") as string;
		if (search && search.trim().length > 0) {
			redirect(`/${encodeURIComponent(channel)}/search?query=${encodeURIComponent(search)}`);
		}
	}

	return (
		<form
			action={onSubmit}
			className="group relative my-2 flex w-full items-center justify-items-center text-sm lg:w-fit"
		>
			<label className="w-fit">
				<span className="sr-only">search for products</span>
				<input
					type="text"
					name="search"
					placeholder=""
					autoComplete="on"
					required
					className="h-12 pl-10 w-full rounded-full border-2 border-dashed border-[#600B2E] bg-[#D9E9F7] p-4 text-sm text-[#22609B] w-fit font-[500] placeholder:text-neutral-500 focus:border-2 focus:border-dashed focus:border-[#600B2E] focus:ring-[0px]"
				/>
			</label>
			<div className="absolute inset-y-0 left-0">
				<button
					type="submit"
					className="inline-flex aspect-square w-10 items-center justify-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 group-invalid:pointer-events-none group-invalid:opacity-80"
				>
					<span className="sr-only">search</span>
					{<>
						<svg width="20" className="ml-2 mt-2" height="18" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M15.0835 13.25H14.1619L13.8352 12.9463C14.5643 12.1295 15.0972 11.1674 15.3957 10.1288C15.6942 9.09026 15.7509 8.00092 15.5619 6.93875C15.0135 3.81125 12.3069 1.31375 9.04021 0.931252C7.89177 0.791151 6.7253 0.906245 5.63008 1.26773C4.53485 1.62921 3.5399 2.2275 2.72135 3.01681C1.9028 3.80613 1.28236 4.76555 0.907485 5.82165C0.532615 6.87776 0.413258 8.00257 0.558548 9.11C0.955215 12.26 3.54521 14.87 6.78855 15.3988C7.89006 15.5811 9.01974 15.5263 10.0968 15.2385C11.1738 14.9507 12.1715 14.4368 13.0185 13.7338L13.3335 14.0488V14.9375L18.2919 19.7188C18.7702 20.18 19.5519 20.18 20.0302 19.7188C20.5085 19.2575 20.5085 18.5038 20.0302 18.0425L15.0835 13.25ZM8.08355 13.25C5.17855 13.25 2.83355 10.9888 2.83355 8.1875C2.83355 5.38625 5.17855 3.125 8.08355 3.125C10.9885 3.125 13.3335 5.38625 13.3335 8.1875C13.3335 10.9888 10.9885 13.25 8.08355 13.25Z" fill="#22609B" />
						</svg>

					</>}
				</button>
			</div>
		</form>
	);
};
