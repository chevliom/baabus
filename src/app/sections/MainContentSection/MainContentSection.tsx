import React, { useState, useEffect, useRef, type WheelEvent, type MouseEvent } from "react";
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
	const [activeIndex, setActiveIndex] = useState<number>(2);
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
	// Removed unused 'direction' variable
	const carouselRef = useRef<HTMLDivElement>(null);
	const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [startX, setStartX] = useState<number>(0);

	const galleryImages: GalleryImage[] = [
		{ image: "/image-56.png", text: "Wooden educational toys" },
		{ image: "/image-54.png", text: "Boy with soccer ball" },
		{ image: "/image-52.png", text: "Girl with teddy bear" },
		{ image: "/image-54.png", text: "Boy with soccer ball" },
		{ image: "/image-56.png", text: "Wooden educational toys" },
	];

	const moveToNext = (): void => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setActiveIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
		setTimeout(() => {
			setIsTransitioning(false);
		}, 550);
	};

	const moveToPrev = (): void => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setActiveIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
		setTimeout(() => {
			setIsTransitioning(false);
		}, 550);
	};

	// Added moveToNext to dependency array
	useEffect(() => {
		const interval = setInterval(() => {
			if (!isTransitioning && !isDragging) {
				moveToNext();
			}
		}, 3000);

		return () => clearInterval(interval);
	}, [isTransitioning, isDragging, moveToNext]);

	const handleMouseWheel = (e: WheelEvent<HTMLDivElement>): void => {
		e.preventDefault();

		// Clear any existing timeout to prevent multiple scroll events from firing too quickly
		if (scrollTimeoutRef.current) {
			clearTimeout(scrollTimeoutRef.current);
		}

		scrollTimeoutRef.current = setTimeout(() => {
			if (e.deltaY > 0) {
				moveToNext();
			} else {
				moveToPrev();
			}
		}, 50);
	};

	// Mouse drag navigation
	const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
		setIsDragging(true);
		setStartX(e.clientX);
	};

	// Fixed unused parameter warning by using underscore prefix
	const handleMouseMove = (_e: MouseEvent<HTMLDivElement>): void => {
		if (!isDragging) return;
		// We don't perform any visual updates during drag - just tracking
	};

	const handleMouseUp = (e: MouseEvent<HTMLDivElement>): void => {
		if (!isDragging) return;

		const endX = e.clientX;
		const diffX = endX - startX;

		// Determine direction based on drag distance
		if (Math.abs(diffX) > 50) {
			// Minimum drag distance to trigger navigation
			if (diffX > 0) {
				moveToPrev(); // Dragged right = previous slide
			} else {
				moveToNext(); // Dragged left = next slide
			}
		}

		setIsDragging(false);
	};

	const handleMouseLeave = (): void => {
		setIsDragging(false);
	};

	const getVisibleItems = (): VisibleItem[] => {
		const items: VisibleItem[] = [];

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

	// Animation controls with smooth horizontal transitions only
	const getAnimationStyle = (position: number, rotation: number): React.CSSProperties => {
		const baseDistance = 320; // base card distance
		const zIndex = position === 0 ? 10 : Math.abs(position) === 1 ? 5 : 1; // Proper z-index

		// Subtle size differences: center slightly smaller than outer images
		const translateX = position * baseDistance;
		const opacity = 1; // Full opacity for all images
		const scale = position === 0 ? 0.95 : Math.abs(position) === 1 ? 0.97 : 1; // Very subtle scaling

		// No vertical movement during transitions
		return {
			transform: `translateX(${translateX}px) perspective(1200px) rotateY(${rotation}deg) scale(${scale})`,
			opacity: opacity,
			transition: "all 0.55s cubic-bezier(0.1, 0.7, 0.1, 1)", // Ultra smooth easing
			zIndex: zIndex,
			transformOrigin: "center",
			willChange: "transform, opacity", // Performance optimization for smoother animations
		};
	};

	return (
		<section className="relative w-full overflow-hidden bg-pink-50 pt-16">
			{/* Title */}
			<div className="mb-12">
				<h2 className="text-center text-6xl font-bold">
					<span className="text-blue-500">Kids</span>
					<span className="text-pink-500"> Gallery</span>
				</h2>
				<div className="mt-1 flex justify-center">
					<div className="w-72 border-b-4 border-dotted border-pink-500"></div>
				</div>
				{/* <p className="mt-4 text-center text-gray-600">Click and drag or use mouse wheel to navigate</p> */}
			</div>

			{/* Gallery */}
			<div
				className="relative h-96 w-full overflow-hidden"
				onWheel={handleMouseWheel}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseLeave}
			>
				{/* Main carousel */}
				<div className="relative flex h-full items-center justify-center">
					<div
						ref={carouselRef}
						className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center"
					>
						{getVisibleItems().map((itemData, idx) => {
							const { position, rotation } = itemData;

							// Colors flow from right to left: light→dark→light
							let bgColor = "bg-pink-600"; // Center is darkest
							if (position === -1) bgColor = "bg-pink-500"; // Left middle (getting lighter)
							if (position === -2) bgColor = "bg-pink-400"; // Far left (lightest)
							if (position === 1) bgColor = "bg-pink-500"; // Right middle (getting lighter)
							if (position === 2) bgColor = "bg-pink-400"; // Far right (lightest)

							// Middle items same height as center
							let heightClass = "h-80"; // Center height
							if (Math.abs(position) === 1) heightClass = "h-80"; // Middle items same height
							if (Math.abs(position) === 2) heightClass = "h-96"; // Outer items tallest

							return (
								<div
									key={idx}
									className={`absolute ${heightClass} w-72 ${bgColor} cursor-grab overflow-hidden rounded-3xl shadow-2xl ${
										isDragging ? "cursor-grabbing" : ""
									}`}
									style={getAnimationStyle(position, rotation)}
								>
									<Image
										src={itemData.item.image}
										alt={itemData.item.text}
										width={288} // w-72 = 18rem = 288px
										height={Math.abs(position) === 2 ? 384 : 320} // h-96 = 24rem = 384px, h-80 = 20rem = 320px
										className="h-full w-full object-cover"
									/>
									{/* Caption with darker background
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-center text-white">
                    {itemData.item.text}
                  </div> */}
								</div>
							);
						})}
					</div>
				</div>

				{/* Navigation buttons */}
				{/* <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10">
          <button
            onClick={moveToPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-gray-800 shadow-lg transition hover:bg-white focus:outline-none"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={moveToNext}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-gray-800 shadow-lg transition hover:bg-white focus:outline-none"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div> */}
			</div>
		</section>
	);
};
