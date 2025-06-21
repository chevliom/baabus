import Image from "next/image";
import { HeaderSection } from "../sections/HeaderSection";
import Link from "next/link";
import cloud from "@/assets/landingImage/image 86.png"
const SuccessPage = () => {
    return (
        <div className="mt-24 flex min-h-screen flex-col bg-white">
            <HeaderSection />

            <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
                {/* Image with pink circle behind */}
                <div className="relative w-[300px] h-[300px] mb-6">
                    {/* Pink circle */}
                    <div className="absolute inset-0 rounded-full bg-pink-50 z-0" />

                    {/* Cloud image */}
                    <Image
                        src={cloud}
                        alt="Success Illustration"
                        layout="fill"
                        objectFit="contain"
                        className="z-10 relative"
                        priority
                    />
                </div>

                {/* Success message */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Your order is successfully placed
                </h1>
                <p className="text-gray-500 mb-6 max-w-md">
                    Pellentesque sed lectus nec tortor tristique accumsan quis dictum risus. Donec volutpat mollis nulla non facilisis.
                </p>

                {/* Buttons */}
                <div className="flex gap-4 flex-col sm:flex-row">
                    <Link
                        href="/"
                        className="px-6 py-2 rounded border border-pink-500 text-pink-500 font-medium hover:bg-pink-50 transition-colors"
                    >
                        Go to Dashboard
                    </Link>
                    <Link
                        href="/order-tracking"
                        className="px-6 py-2 rounded bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
                    >
                        View Order
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;