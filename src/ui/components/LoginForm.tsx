"use client";

import { loginAccount } from "@/lib/graphqlClient"; // Adjust the path as needed
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function handleSubmit(formData: FormData) {
		setError(null);
		setLoading(true);

		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();

		if (!email || !password) {
			setError("Email and password are required");
			setLoading(false);
			return;
		}

		const result = await loginAccount({ email, password });

		if (result.errors.length > 0) {
			setError(result.errors[0].message || "Login failed");
			setLoading(false);
			return;
		}

		// ✅ Redirect to /categories
		router.push("/category");
	}

	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
			<form className="rounded-lg border border-[#f0f0f0] bg-white px-6 py-6 shadow-xl" action={handleSubmit}>
				<h2 className="mb-8 text-center text-3xl font-bold">Sign In</h2>

				{error && <div className="mb-4 rounded bg-red-100 px-4 py-2 text-sm text-red-700">{error}</div>}

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
				</div>

				<div className="mb-6 flex items-center justify-between text-sm text-[#999]">
					<label className="flex items-center gap-2 text-[#666666]">
						<input type="checkbox" className="rounded-md border-[#CCCCCC] accent-[#EB5190]" />
						<span>Remember me</span>
					</label>
					<Link href="/default-channel/forgotpassword" className="text-[#666666] hover:underline">
						Forget Password
					</Link>
				</div>

				<button
					type="submit"
					className="w-full rounded-full bg-[#EB5190] py-3 font-semibold text-white hover:bg-[#d6447c]"
					disabled={loading}
				>
					{loading ? "Logging in..." : "Login"}
				</button>

				<p className="mt-6 text-center text-sm text-[#999]">
					Don’t have account?{" "}
					<Link href="/usertype" className="font-semibold text-black hover:underline">
						Register
					</Link>
				</p>
			</form>
		</div>
	);
}
