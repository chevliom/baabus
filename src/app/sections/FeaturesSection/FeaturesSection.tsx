import React from "react";

export const FeaturesSection = (): JSX.Element => {
	// Data for categories to enable mapping
	const categories = ["Swing Car", "Kick Scooter", "Baby Walker", "Xylophone", "Water Bottle", "Rise Tower"];

	return (
		<footer className="relative min-h-[500px] bg-[url('/image-60.png')] bg-cover bg-center bg-no-repeat pb-80">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{/* Company Info Section */}

					<div className="mt-28 flex h-full flex-col justify-between">
						<img className="mb-8 h-[107px] w-[276px] object-cover" alt="Baabus Logo" src="/image-60-2.png" />
						<p className="font-poppins -mt-8 mb-12 max-w-xl text-base text-[#0a1f32]">
							At BAABUS we are a leading innovator in the children&rsquo;s toys and accessories market,
							dedicated to bringing joy, creativity, and quality to families around the world. Since our
							inception, we have been committed to developing products that combine fun, safety, and
							educational value, ensuring that every child can explore, learn, and grow through play.
						</p>
						<p className="font-poppins -pt-20 text-xl text-[#0a1f32] underline">
							Copyright 2024 All Rights Reserved
						</p>
					</div>
					{/* Categories Section */}
					<div className="ml-40 mt-44 flex h-full flex-col justify-between">
						<div>
							<h3 className="font-poppins mb-6 text-2xl font-semibold text-[#36061a]">Our Category</h3>
							<ul className="font-poppins text-base leading-8 text-black">
								{categories.map((category, index) => (
									<li key={index}>{category}</li>
								))}
							</ul>
						</div>
					</div>

					{/* Contact Section */}
					<div className="mt-44 flex h-full flex-col justify-between">
						<div>
							<h3 className="font-poppins mb-6 text-2xl font-semibold text-[#36061a]">Contact Us</h3>
							<address className="font-poppins text-base not-italic leading-8 text-black">
								<p className="mb-4">
									Baabus Baby Care Products, Plot No. 6/7, Survey No.41, Village - Rib, Taluka : Gondal, Dis.
									: Rajkot.
								</p>
								<p className="mb-4">+91 78800 26800</p>
								<p>info@baabusbabycare.com</p>
							</address>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
