import React from "react";
import Image from "next/image";

interface GalleryImage {
	image: string;
	text: string;
}

interface VisibleItem {
	item: GalleryImage;
	position: number;
	rotation: number;
}

export const MainContentSection = (): JSX.Element => {
	const galleryImages: GalleryImage[] = [
		{ image: "/image-56.png", text: "Wooden educational toys" },
		{ image: "/image-54.png", text: "Boy with soccer ball" },
		{ image: "/image-52.png", text: "Girl with teddy bear" },
		{ image: "/image-55.png", text: "Boy with soccer ball" },
		{ image: "/image-57.png", text: "Wooden educational toys" },
	];

	const getVisibleItems = (): VisibleItem[] => {
		const centerIndex = 2; // Centered on third image
		const items: VisibleItem[] = [];

		for (let i = -2; i <= 2; i++) {
			const index = (centerIndex + i + galleryImages.length) % galleryImages.length;

			let rotation = 0;
			if (i === -2) rotation = 40;
			else if (i === -1) rotation = 25;
			else if (i === 1) rotation = -25;
			else if (i === 2) rotation = -40;

			items.push({
				item: galleryImages[index],
				position: i,
				rotation: rotation,
			});
		}

		return items;
	};

	const getStyle = (position: number, rotation: number): React.CSSProperties => {
		const baseDistance = 320;
		const zIndex = position === 0 ? 10 : Math.abs(position) === 1 ? 5 : 1;
		const translateX = position * baseDistance;
		const scale = position === 0 ? 0.95 : Math.abs(position) === 1 ? 0.97 : 1;

		return {
			transform: `translateX(${translateX}px) perspective(1200px) rotateY(${rotation}deg) scale(${scale})`,
			zIndex,
			transition: "all 0.55s cubic-bezier(0.1, 0.7, 0.1, 1)",
			transformOrigin: "center",
			willChange: "transform, opacity",
		};
	};

	return (
		<section className="relative w-full overflow-hidden bg-white pt-10 md:pt-16">
			{/* Title */}
			<div className="md:mb-8 lg:mb-12">
				<h2 className="text-center text-[24px] md:text-4xl lg:text-6xl font-bold font-baloo">
					<span className="text-[#2873B9]">Kids</span>
					<span className="text-pink-600"> Gallery</span>
				</h2>
				<div className="flex justify-center">
					<div className="w-40 md:w-[325px] mr-[34px] border-b-4 border-dotted border-pink-500"></div>
				</div>
			</div>

			<div className="hidden md:block">
				<div className="relative h-96 w-full overflow-hidden">
					<div className="relative flex h-full items-center justify-center overflow-hidden">
						<div className="relative  flex h-full w-full  items-center justify-center">
							{getVisibleItems().map((itemData, idx) => {
								const { position, rotation } = itemData;
								return (
									<div
										key={idx}
										className={`absolute h-96 w-72 overflow-hidden `}
										style={getStyle(position, rotation)}
									>
										<Image
											src={itemData.item.image}
											alt={itemData.item.text}
											width={288}
											height={Math.abs(position) === 2 ? 384 : 320}
											className="h-full w-full object-cover"
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<div className="block md:hidden w-full mt-10 p-2">
				<Image
					src="/mobile-res.png"
					alt="Mobile Version"
					width={600}
					height={400}
					className="w-full h-auto object-cover"
				/>
			</div>

		</section>
	);
};
