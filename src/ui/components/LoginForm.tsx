"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginAccount } from "@/lib/graphqlClient";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

interface TokenCreate {
	csrfToken: string | null;
	refreshToken: string | null;
	token: string | null;
	user: {
		id: string;
		email: string;
		metadata?: { key: string; value: string }[];
		checkoutIds?: string[];
	} | null;
	errors: {
		code: string;
		field?: string;
		message: string;
	}[];
}

export function LoginForm() {
	const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function handleSubmit(formData: FormData) {
		setErrors({});
		setLoading(true);

		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();

		if (!email || !password) {
			setErrors({
				email: !email ? "Email is required" : undefined,
				password: !password ? "Password is required" : undefined,
			});
			setLoading(false);
			return;
		}

		try {
			const rawResult = await loginAccount({ email, password });
			const result: TokenCreate = {
				...rawResult,
				errors: rawResult.errors.map((err) => ({
					...err,
					field: err.field === null ? undefined : err.field,
				})),
			};

			if (result.errors?.length > 0) {
				const fieldErrors: { email?: string; password?: string; general?: string } = {};

				for (const err of result.errors) {
					if (err.field === "email") fieldErrors.email = err.message;
					else if (err.field === "password") fieldErrors.password = err.message;
					else fieldErrors.general = err.message;
				}

				setErrors(fieldErrors);
				setLoading(false);
				return;
			}

			if (result.csrfToken) Cookies.set("csrfToken", result.csrfToken, { expires: 365 });
			if (result.refreshToken) Cookies.set("refreshToken", result.refreshToken, { expires: 365 });
			if (result.token) Cookies.set("token", result.token, { expires: 365 });

			if (result.user?.checkoutIds?.[0]) {
				Cookies.set("use_checkout_id", result.user.checkoutIds[0], { expires: 365 });
			}

			const channelMetadata: any = result.user?.metadata?.find((meta) => meta.key === "channel");
			if (channelMetadata?.value) {
				Cookies.set("channel", channelMetadata.value, { expires: 365 });
			}

			router.push("/category");
		} catch (e) {
			setErrors({ general: "Something went wrong. Please try again." });
			setLoading(false);
		}
	}

	const handleGoogleLogin = async () => {
		const GoogleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=336207498941-88eer06tjtvnppqdefc6v5dvoknvn1sl.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=token&scope=email%20profile&prompt=consent`;
		const authWindow = window.open(GoogleAuthUrl, "_blank", "width=600,height=700");

		const interval = setInterval(() => {
			try {
				const redirectedUrl = authWindow?.location.href;
				if (redirectedUrl && redirectedUrl.includes("access_token")) {
					const params = new URLSearchParams(redirectedUrl.split("#")[1]);
					const accessToken = params.get("access_token");

					if (accessToken) {
						clearInterval(interval);
						authWindow?.close();
						loginWithGoogleToken(accessToken);
					}
				}
			} catch (e) {
			}
		}, 1000);
	};

	const loginWithGoogleToken = async (accessToken: string) => {
		const mutation = `
			mutation oauthTokenCreate($accessToken: String!, $backend: String!) {
			oauthTokenCreate(accessToken: $accessToken, backend: $backend) {
				isNewUser
				channel
				status
				token
				refreshToken
				user {
				id
				email
				firstName
				lastName
				metadata {
					key
					value
				}
				}
			}
			}
		`;

		const variables = {
			accessToken,
			backend: "google-oauth2",
		};

		try {
			const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: mutation,
					variables,
				}),
			});

			const result: any = await response.json();
			const oauthData = result?.data?.oauthTokenCreate;
			if (oauthData) {
				Cookies.set("token", oauthData.token);
				Cookies.set("refreshToken", oauthData.refreshToken);
				toast.success("Login successful!");
				router.push("/usertype");
			} else {
				toast.error("Login failed. Please try again.");
			}
		} catch (error) {
			toast.error("Login failed. Please try again.");
		}
	};

	const handleFacebookLogin = async () => {
		const FacebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=1063071115871926&redirect_uri=http://localhost:3000&scope=email,public_profile&response_type=token`;
		const authWindow = window.open(FacebookAuthUrl, "_blank", "width=600,height=700");

		const interval = setInterval(() => {
			try {
				const redirectedUrl = authWindow?.location.href;
				if (redirectedUrl && redirectedUrl.includes("access_token")) {
					const params = new URLSearchParams(redirectedUrl.split("#")[1]);
					const accessToken = params.get("access_token");

					if (accessToken) {
						clearInterval(interval);
						authWindow?.close();
						loginWithFacebookToken(accessToken);
					}
				}
			} catch (e) {
			}
		}, 1000);
	};

	const loginWithFacebookToken = async (accessToken: string) => {
		const mutation = `
			mutation oauthTokenCreate($accessToken: String!, $backend: String!) {
			oauthTokenCreate(accessToken: $accessToken, backend: $backend) {
				isNewUser
				channel
				status
				token
				refreshToken
				user {
				id
				email
				firstName
				lastName
				metadata {
					key
					value
				}
				}
			}
			}
		`;

		const variables = {
			accessToken,
			backend: "facebook",
		};

		try {
			const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: mutation,
					variables,
				}),
			});

			const result: any = await response.json();
			const oauthData = result?.data?.oauthTokenCreate;
			if (oauthData) {
				Cookies.set("token", oauthData.token);
				Cookies.set("refreshToken", oauthData.refreshToken);
				toast.success("Login successful!");
				router.push("/usertype");
			} else {
				toast.error("Login failed. Please try again.");
			}
		} catch (error) {
			toast.error("Login failed. Please try again.");
		}
	};




	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
			<form className="rounded-lg border border-[#f0f0f0] bg-white px-6 py-6 shadow-xl" action={handleSubmit}>
				<h2 className="mb-8 text-center text-3xl font-bold">Sign In</h2>

				{errors.general && (
					<div className="mb-4 rounded bg-red-100 px-4 py-2 text-sm text-red-700">{errors.general}</div>
				)}

				<input
					type="email"
					name="email"
					placeholder="Email"
					className="mb-1 w-full rounded border border-[#E6E6E6] px-4 py-3 font-normal placeholder-[#999]"
				/>
				{errors.email && <div className="mb-2 text-sm text-red-600">{errors.email}</div>}

				<div className="relative mb-1">
					<input
						type="password"
						name="password"
						placeholder="Password"
						className="w-full rounded border border-[#E6E6E6] px-4 py-3 pr-10 font-normal placeholder-[#999]"
					/>
				</div>
				{errors.password && <div className="mb-2 text-sm text-red-600">{errors.password}</div>}

				<div className="mb-6 flex items-center justify-between text-sm text-[#999]">
					<label className="flex items-center gap-2 text-[#666666]">
						<input type="checkbox" className="rounded-md border-[#CCCCCC] accent-[#EB5190]" />
						<span>Remember me</span>
					</label>
					<Link href="/default-channel/forgotpassword" className="text-[#666666] hover:underline">
						Forgot Password
					</Link>
				</div>

				<button
					type="submit"
					className="w-full rounded-full bg-[#EB5190] py-3 font-semibold text-white hover:bg-[#d6447c]"
					disabled={loading}
				>
					{loading ? "Logging in..." : "Login"}
				</button>

				<div className="my-6 text-center w-[85%] mx-auto">
					<div className="flex items-center justify-center mb-6">
						<hr className="flex-grow border-t border-gray-300" />
						<span className="mx-3 text-gray-500 text-sm">Or sign in with</span>
						<hr className="flex-grow border-t border-gray-300" />
					</div>
					<div className="flex justify-center space-x-10">
						<button className="p-3 border rounded-full" onClick={handleGoogleLogin}>
							<FcGoogle size={30} />
						</button>
						<button className="p-3 border rounded-full text-blue-600" onClick={handleFacebookLogin}>
							<FaFacebook size={30} />
						</button>
					</div>
				</div>

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
