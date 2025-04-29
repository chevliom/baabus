import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import ServicesBanner from "@/ui/components/ServicesBanner";
import { ResetPassword } from "@/ui/components/ResetPassword";

export default function SignupPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto h-[calc(100vh-100px)]  p-8">
				<ResetPassword />
			</section>
			<ServicesBanner />
		</Suspense>
	);
}
