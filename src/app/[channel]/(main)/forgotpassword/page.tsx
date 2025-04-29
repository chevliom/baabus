import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { ForgotPasswordForm } from "@/ui/components/ForgotPasswordForm";
import ServicesBanner from "@/ui/components/ServicesBanner";

export default function ForgotPasswordPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto h-[calc(100vh-100px)] max-w-7xl p-8">
				<ForgotPasswordForm />
			</section>
			<ServicesBanner />
		</Suspense>
	);
}
