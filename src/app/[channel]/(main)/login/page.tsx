import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { LoginForm } from "@/ui/components/LoginForm";
import ServicesBanner from "@/ui/components/ServicesBanner";

export default function LoginPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto h-[calc(100vh-100px)] max-w-7xl p-8 md:mt-14">
				<LoginForm />
			</section>
			<ServicesBanner />
		</Suspense>
	);
}
