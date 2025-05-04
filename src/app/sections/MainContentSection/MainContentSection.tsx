import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface GalleryImage {
	image: string;
	text: string;
}

export const MainContentSection = () => {
	const [activeIndex, setActiveIndex] = useState<number>(2);
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
	const [direction, setDirection] = useState<"left" | "right">("left");

	const galleryImages: GalleryImage[] = [
		{ image: "/image-56.png", text: "Wooden educational toys" },
		{ image: "/image-54.png", text: "Boy with soccer ball" },
		{ image: "/image-52.png", text: "Girl with teddy bear" },
		{ image: "/image-54.png", text: "Boy with soccer ball" },
		{ image: "/image-56.png", text: "Wooden educational toys" },
	];

	const moveToNext = useCallback(() => {
		if (isTransitioning) return;
		setDirection("left");
		setIsTransitioning(true);
		setActiveIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
		setTimeout(() => {
			setIsTransitioning(false);
		}, 550);
	}, [isTransitioning]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!isTransitioning) {
				moveToNext();
			}
		}, 3000);

		return () => clearInterval(interval);
	}, [isTransitioning, moveToNext]);

	const moveToPrev = () => {
		if (isTransitioning) return;
		setDirection("right");
		setIsTransitioning(true);
		setActiveIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
		setTimeout(() => {
			setIsTransitioning(false);
		}, 550);
	};

	const getVisibleItems = () => {
		const items = [];

		for (let i = -2; i <= 2; i++) {
			const index = (activeIndex + i + galleryImages.length) % galleryImages.length;

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

	const getAnimationStyle = (position: number, rotation: number) => {
		const baseDistance = 320;
		const zIndex = position === 0 ? 30 : Math.abs(position) === 1 ? 20 : 10;

		const translateX = position * baseDistance;
		let opacity = position === 0 ? 1 : Math.abs(position) === 1 ? 0.9 : 0.8;
		let scale = position === 0 ? 1 : Math.abs(position) === 1 ? 0.9 : 0.85;
		let translateY = 0;

		if (isTransitioning) {
			const progress = 1;

			if (direction === "left") {
				if (position === 2 || position === 1) translateY = -5 * progress;
				else if (position === 0 || position === -1) translateY = 5 * progress;
			} else {
				if (position === -2 || position === -1) translateY = -5 * progress;
				else if (position === 0 || position === 1) translateY = 5 * progress;
			}

			if ((direction === "left" && position === 2) || (direction === "right" && position === -2)) {
				opacity = 0.5 + progress * 0.3;
			} else if ((direction === "left" && position === -2) || (direction === "right" && position === 2)) {
				opacity = 0.8 - progress * 0.3;
			}

			if (position === 0) {
				scale = 1 - progress * 0.05;
			} else if (Math.abs(position) === 1) {
				scale =
					0.9 + progress * 0.05 * (direction === "left" ? (position < 0 ? -1 : 1) : position > 0 ? -1 : 1);
			}
		}

		return {
			transform: `translateX(${translateX}px) translateY(${translateY}px) perspective(1200px) rotateY(${rotation}deg) scale(${scale})`,
			opacity: opacity,
			transition: "all 0.55s cubic-bezier(0.1, 0.7, 0.1, 1)",
			zIndex: zIndex,
			transformOrigin: "center",
			filter: `blur(${Math.abs(position) === 2 && isTransitioning ? "0.5px" : "0px"})`,
			willChange: "transform, opacity",
		};
	};

	return (
		<section className="relative w-full overflow-hidden bg-pink-50 pt-16">
			<div className="mb-12 text-center">
				<h2 className="text-6xl font-bold">
					<span className="text-blue-500">Kids</span>
					<span className="text-pink-500"> Gallery</span>
				</h2>
				<div className="mt-1 flex justify-center">
					<div className="w-72 border-b-4 border-dotted border-pink-500"></div>
				</div>
			</div>

			<div className="relative h-[500px] w-full overflow-hidden">
				<button
					className="absolute left-2 top-1/2 z-50 -translate-y-1/2 transform rounded-full bg-white px-4 py-2 shadow-md hover:bg-pink-100"
					onClick={moveToPrev}
				>
					{"<"}
				</button>
				<button
					className="absolute right-2 top-1/2 z-50 -translate-y-1/2 transform rounded-full bg-white px-4 py-2 shadow-md hover:bg-pink-100"
					onClick={moveToNext}
				>
					{">"}
				</button>

				<div className="flex h-full w-full items-center justify-center">
					{getVisibleItems().map(({ item, position, rotation }, index) => (
						<div
							key={index}
							className="absolute left-1/2 top-1/2"
							style={{
								...getAnimationStyle(position, rotation),
								transform: `${getAnimationStyle(position, rotation).transform}`,
							}}
						>
							<div className="relative h-72 w-60 overflow-hidden rounded-lg shadow-lg">
								<Image
									src={item.image}
									alt={item.text}
									layout="fill"
									objectFit="cover"
									className="rounded-lg"
									priority
								/>
							</div>
							<p className="mt-2 text-center font-medium text-gray-700">{item.text}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
