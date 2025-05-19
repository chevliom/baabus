import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Categories: React.FC = () => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [categories, setCategories] = useState<
		Array<{
			id: string;
			name: string;
			image: string;
			alt: string;
		}>
	>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("http://65.1.0.82:8000/graphql/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						query: `
							query {
								categories {
									edges {
										node {
											id
											name
										}
									}
								}
							}
						`,
					}),
				});

				const result = await response.json();
				if (
					typeof result === "object" &&
					result !== null &&
					"data" in result &&
					Array.isArray((result as any).data?.categories?.edges)
				) {
					// Map API response to our category format with placeholder images
					const mappedCategories = (result as any).data.categories.edges.map((edge: any, index: number) => ({
						id: edge.node.id,
						name: edge.node.name,
						image: `/image-16-${(index % 5) + 1}.png`,
						alt: edge.node.name.toLowerCase().replace(/\s+/g, "-"),
					}));
					setCategories(mappedCategories);
				}
			} catch (error) {
				console.error("Error fetching categories:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const { scrollWidth, clientWidth } = scrollRef.current;
			const scrollAmount = clientWidth / 2;

			const newPosition =
				direction === "left"
					? Math.max(0, scrollPosition - scrollAmount)
					: Math.min(scrollWidth - clientWidth, scrollPosition + scrollAmount);

			scrollRef.current.scrollTo({
				left: newPosition,
				behavior: "smooth",
			});

			setScrollPosition(newPosition);
		}
	};

	const handleScroll = () => {
		if (scrollRef.current) {
			setScrollPosition(scrollRef.current.scrollLeft);
		}
	};

	const CategoryItem: React.FC<{
		image: string;
		name: string;
		alt: string;
	}> = ({ image, name, alt }) => (
		<div className="mx-2 flex flex-col items-center transition-transform duration-300 hover:scale-105">
			<div className="mb-3 rounded-full border-2 border-dashed border-pink-400 p-1">
				<div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-white sm:h-40 sm:w-40">
					<img src={image} alt={alt} className="h-28 w-28 object-contain sm:h-36 sm:w-36" />
				</div>
			</div>
			<h3 className="font-baloo text-xl font-extrabold text-blue-400">{name}</h3>
		</div>
	);

	if (loading) {
		return (
			<div className="relative -mt-8 overflow-hidden bg-[#d9e9f7] pb-40 pt-20">
				<div className="container mx-auto px-4 py-8">
					<h2 className="mb-12 text-center font-baloo text-5xl font-extrabold text-pink-600">Categories</h2>
					<div className="flex justify-center">
						<p>Loading categories...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="relative -mt-8 overflow-hidden bg-[#d9e9f7] pb-40 pt-20">
			{/* Decorative elements */}
			<div className="absolute bottom-10 left-10 z-40 mb-3 hidden opacity-70 sm:block">
				<img src="./image-16-1.png" alt="Baby shoes" className="h-24 w-24 object-contain" />
			</div>

			<div className="absolute right-10 top-10 hidden opacity-70 sm:block">
				<img src="./image-16.png" alt="Pacifier" className="h-16 w-16 object-contain" />
			</div>

			<div className="container mx-auto px-4 py-8">
				<h2 className="mb-12 text-center font-baloo text-5xl font-extrabold text-pink-600">Categories</h2>

				<div className="relative flex items-center">
					{/* Image on left of left arrow */}
					<img
						src="/image-7-1.png"
						alt="Decoration Left"
						className="z-10 hidden h-32 w-32 object-contain sm:block"
					/>

					{/* Left arrow */}
					<button
						onClick={() => scroll("left")}
						style={{ backgroundColor: "rgba(83, 153, 218, 1)" }}
						className="absolute z-20 mb-4 ml-11 rounded-full p-2 text-blue-100 shadow-md transition-all duration-300 hover:bg-blue-200"
						aria-label="Scroll left"
						disabled={scrollPosition <= 0}
					>
						<ChevronLeft size={24} />
					</button>

					<div
						ref={scrollRef}
						className="mx-4 flex overflow-x-auto px-10 py-8"
						onScroll={handleScroll}
						style={{
							scrollbarWidth: "none" /* Firefox */,
							msOverflowStyle: "none" /* IE and Edge */,
						}}
					>
						{categories.map((category) => (
							<CategoryItem
								key={category.id}
								image={category.image}
								name={category.name}
								alt={category.alt}
							/>
						))}
						<style jsx>{`
							div::-webkit-scrollbar {
								display: none; /* Chrome, Safari and Opera */
							}
						`}</style>
					</div>

					{/* Right arrow */}
					<button
						onClick={() => scroll("right")}
						style={{ backgroundColor: "rgba(83, 153, 218, 1)" }}
						className="z-20 -mr-24 mb-3.5 rounded-full p-2 text-blue-100 shadow-md transition-all duration-300 hover:bg-blue-200"
						aria-label="Scroll right"
						disabled={
							scrollPosition >= (scrollRef.current?.scrollWidth || 0) - (scrollRef.current?.clientWidth || 0)
						}
					>
						<ChevronRight size={24} />
					</button>

					{/* Image on right of right arrow */}
					<img
						src="/image-7-1.png"
						alt="Decoration Right"
						className="z-10 ml-2 hidden h-32 w-32 object-contain sm:block"
					/>
				</div>
			</div>

			{/* Bottom Wavy SVG */}
			<div className="absolute bottom-0 left-0 -mb-4 w-full">
				<svg viewBox="0 0 1440 150" className="h-auto w-full rotate-180" preserveAspectRatio="none">
					<path
						fill="#ffffff"
						d="M0,64L48,85.3C96,107,192,149,288,149.3C384,149,480,107,576,106.7C672,107,768,149,864,160C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
					></path>
				</svg>
			</div>
		</div>
	);
};
