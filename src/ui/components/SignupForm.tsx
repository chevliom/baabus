"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerAccount } from "@/lib/graphqlClient";
import { useState } from "react";

export function SignupForm() {
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<boolean>(false);
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setSuccess(false);

		const formData = new FormData(e.currentTarget);
		const fullname = formData.get("fullname")?.toString() || "";
		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();
		// const confirmPassword = formData.get("confirmpassword")?.toString();

		if (!email || !password || !fullname) {
			setError("All fields are required");
			return;
		}

		// if (password !== confirmPassword) {
		// 	setError("Passwords do not match");
		// 	return;
		// }

		const [firstName, ...rest] = fullname.split(" ");
		const lastName = rest.join(" ");

		const input = {
			firstName,
			lastName,
			email,
			password,
			redirectUrl: "http://localhost:3000/confirmAccount",
			channel: "default-channel",
			metadata: [{ key: "channel", value: "default-channel" }],
		};

		try {
			const res = await registerAccount(input);

			if (res.errors.length > 0) {
				setError(res.errors[0].message);
			} else {
				setSuccess(true);
				// Redirect after a short delay or immediately
				setTimeout(() => router.push("/default-channel/login"), 1500);
			}
		} catch (e) {
			setError("Registration failed");
		}
	}

	return (
		<div className="mx-auto mt-8 w-full max-w-lg">
			<form
				onSubmit={handleSubmit}
				className="rounded-lg border border-[#f0f0f0] bg-white px-6 py-6 shadow-xl"
			>
				<h2 className="mb-8 text-center text-3xl font-bold">Create Account</h2>

				{error && <p className="mb-4 text-center text-red-600">{error}</p>}
				{success && (
					<p className="mb-4 text-center text-green-600">Account created! Redirecting to login...</p>
				)}

				<input
					type="text"
					name="fullname"
					placeholder="Fullname"
					className="mb-4 w-full rounded border border-[#E6E6E6] px-4 py-3 font-normal placeholder-[#999]"
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="mb-4 w-full rounded border border-[#E6E6E6] px-4 py-3 font-normal placeholder-[#999]"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className="mb-4 w-full rounded border border-[#E6E6E6] px-4 py-3 font-normal placeholder-[#999]"
				/>
				{/* <input
					type="password"
					name="confirmpassword"
					placeholder="Confirm Password"
					className="mb-4 w-full rounded border border-[#E6E6E6] px-4 py-3 font-normal placeholder-[#999]"
				/> */}

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
