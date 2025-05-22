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
		{ image: "/image-54.png", text: "Boy with soccer ball" },
		{ image: "/image-56.png", text: "Wooden educational toys" },
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
		<section className="relative w-full overflow-hidden bg-white pt-16">
			{/* Title */}
			<div className="mb-12">
				<h2 className="text-center text-6xl font-bold">
					<span className="text-blue-500">Kids</span>
					<span className="text-pink-500"> Gallery</span>
				</h2>
				<div className="mt-1 flex justify-center">
					<div className="w-72 border-b-4 border-dotted border-pink-500"></div>
				</div>
			</div>

			{/* Static Gallery */}
			<div className="relative h-96 w-full overflow-hidden">
				<div className="relative flex h-full items-center justify-center">
					<div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center">
						{getVisibleItems().map((itemData, idx) => {
							const { position, rotation } = itemData;
							let bgColor = "bg-pink-600";
							if (position === -1) bgColor = "bg-pink-500";
							if (position === -2) bgColor = "bg-pink-400";
							if (position === 1) bgColor = "bg-pink-500";
							if (position === 2) bgColor = "bg-pink-400";

							const heightClass = Math.abs(position) === 2 ? "h-96" : "h-80";

							return (
								<div
									key={idx}
									className={`absolute ${heightClass} w-72 ${bgColor} overflow-hidden rounded-3xl shadow-2xl`}
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
		</section>
	);
};
