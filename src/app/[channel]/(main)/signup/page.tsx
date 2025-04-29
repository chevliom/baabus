import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { SignupForm } from "@/ui/components/SignupForm";
import ServicesBanner from "@/ui/components/ServicesBanner";

export default function SignupPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto h-[calc(100vh-100px)] max-w-7xl p-8">
				<SignupForm />
			</section>
			<ServicesBanner />
		</Suspense>
	);
}
