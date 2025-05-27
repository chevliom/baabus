import Link from "next/link";
import { getServerAuthClient } from "@/app/config";

export async function ForgotPasswordForm() {
	return (
		<div className="mx-auto mt-20 h-screen w-full max-w-lg">
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
					}
				}}
			>
				<h2 className="mb-8 text-center text-3xl font-bold">Forgot Password?</h2>
				<p className="mb-6 text-center text-sm">No worries, we will send you reset instructions</p>
				<input
					type="email"
					name="email"
					placeholder="Enter Your Email"
					className="mb-4 w-full rounded border border-[#E6E6E6] px-4 py-3 font-normal placeholder-[#999]"
				/>
				<button
					type="submit"
					className="w-full rounded-full bg-[#EB5190] py-3 font-semibold text-white hover:bg-[#d6447c]"
				>
					{/* <Link href="/default-channel/resetpassword">Reset Password</Link> */}
					Reset Password
				</button>

				<p className="mt-6 text-center text-sm text-[#000000]">
					Black to{" "}
					<Link href="/default-channel/login" className="font-semibold text-black hover:underline">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}
