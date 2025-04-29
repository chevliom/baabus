import { getServerAuthClient } from "@/app/config";


export async function LoginForm() {
	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
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
				<h2 className="text-3xl font-bold text-center mb-8">Sign In</h2>

				<input
					type="email"
					name="email"
					placeholder="Email"
					className="mb-4 w-full rounded border border-[#E6E6E6] placeholder-[#999] px-4 py-3 font-normal"
				/>

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

				<div className="mb-6 flex items-center justify-between text-sm text-[#999]">
					<label className="flex items-center gap-2 text-[#666666]">
						<input type="checkbox" className="border-[#CCCCCC] rounded-md accent-[#EB5190]" />
						<span>Remember me</span>
					</label>
					<a href="#" className="text-[#666666] hover:underline">
						Forget Password
					</a>
				</div>

				<button
					type="submit"
					className="w-full rounded-full bg-[#EB5190] hover:bg-[#d6447c] text-white py-3 font-semibold"
				>
					Login
				</button>

				<p className="text-center text-sm text-[#999] mt-6">
					Don’t have account?{" "}
					<a href="#" className="text-black font-semibold hover:underline">
						Register
					</a>
				</p>
			</form>
		</div>
	);
}
