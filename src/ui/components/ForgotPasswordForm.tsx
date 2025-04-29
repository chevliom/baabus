import { getServerAuthClient } from "@/app/config";


export async function ForgotPasswordForm() {
    return (
        <div className="mx-auto mt-20 w-full max-w-lg h-screen">
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
                    }
                }}
            >
                <h2 className="text-3xl font-bold text-center mb-8">Forgot Password?</h2>
                <p className="mb-6 text-center text-sm">No worries, we will send you reset instructions</p>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="mb-4 w-full rounded border border-[#E6E6E6] placeholder-[#999] px-4 py-3 font-normal"
                />
                <button
                    type="submit"
                    className="w-full rounded-full bg-[#EB5190] hover:bg-[#d6447c] text-white py-3 font-semibold"
                >
                    Reset Password
                </button>

                <p className="text-center text-sm text-[#000000] mt-6">
                    Black to{" "}
                    <a href="#" className="text-black font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}
