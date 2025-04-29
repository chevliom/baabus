import { getServerAuthClient } from "@/app/config";


export async function ResetPassword() {
	return (
		<div className="mx-auto mt-16 w-full max-w-xl">
			<form
				className="rounded-lg border border-[#f0f0f0] px-6 py-6 shadow-xl bg-white"
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
					}
				}}
			>
				<h2 className="text-3xl font-bold text-center mb-8">Create New Password</h2>
				<p className="mb-6 text-base text-[#000000] text-center">Your password must be different from any other previous passwords</p>
				<div className="relative mb-4">
					<input
						type="password"
						name="password"
						placeholder="Password"
						className="w-full rounded border border-[#E6E6E6] placeholder-[#999] px-4 py-3 font-normal pr-10"
					/>
					<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
						{/* <FiEye size={20} /> */}
					</span>
				</div>

				<div className="relative mb-8">
					<input
						type="confirmpassword"
						name="confirmpassword"
						placeholder="Confirm Password"
						className="w-full rounded border border-[#E6E6E6] placeholder-[#999] px-4 py-3 font-normal pr-10"
					/>
					<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
						{/* <FiEye size={20} /> */}
					</span>
				</div>
				<button
					type="submit"
					className="w-full rounded-full bg-[#EB5190] hover:bg-[#d6447c] text-white py-3 font-semibold"
				>
					Reset Password
				</button>
			</form>
		</div>
	);
}
