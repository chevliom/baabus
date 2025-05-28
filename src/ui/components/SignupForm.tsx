import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerAuthClient } from "@/app/config";

export async function SignupForm() {
	return (
		<div className="mx-auto mt-8 w-full max-w-lg">
			<form
				className="rounded-lg border border-[#f0f0f0] bg-white px-6 py-6 shadow-xl"
				action={async (formData) => {
					"use server";

					const email = formData.get("email")?.toString();
					const password = formData.get("password")?.toString();

					if (!email || !password) {
						throw new Error("Email and password are required");
					}

					const { data } = await getServerAuthClient().signIn({ email, password }, { cache: "no-store" });

					if (data.tokenCreate.errors.length > 0) {
						// handle error
						return;
					}

					// ✅ Redirect to referral page on success
					redirect("/default-channel/getreferral");
				}}
			>
				<h2 className="mb-8 text-center text-3xl font-bold">Create Account</h2>

				<input
					type="email"
					name="email"
					placeholder="Email"
					className="mb-4 w-full rounded border border-[#E6E6E6] px-4 py-3 font-normal placeholder-[#999]"
				/>

				<div className="relative mb-4">
					<input
						type="password"
						name="password"
						placeholder="Password"
						className="w-full rounded border border-[#E6E6E6] px-4 py-3 pr-10 font-normal placeholder-[#999]"
					/>
					<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
						{/* <FiEye size={20} /> */}
					</span>
				</div>

				<div className="relative mb-4">
					<input
						type="confirmpassword"
						name="confirmpassword"
						placeholder="Confirm Password"
						className="w-full rounded border border-[#E6E6E6] px-4 py-3 pr-10 font-normal placeholder-[#999]"
					/>
					<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
						{/* <FiEye size={20} /> */}
					</span>
				</div>

				<div className="mb-6 flex items-center justify-between text-sm text-[#999]">
					<label className="flex items-center gap-2 text-[#666666]">
						<input type="checkbox" className="rounded-md border-[#CCCCCC] accent-[#EB5190]" />
						<span>Accept all terms & Conditions</span>
					</label>
				</div>

				<button
					type="submit"
					className="w-full rounded-full bg-[#EB5190] py-3 font-semibold text-white hover:bg-[#d6447c]"
				>
					Create Account
				</button>

				<p className="mt-6 text-center text-sm text-[#999]">
					Already have account{" "}
					<Link href="/default-channel/login" className="font-semibold text-black hover:underline">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}
