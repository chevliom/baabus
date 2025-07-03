/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCategoriesInHome } from "@/lib/graphqlClient";
import { useRouter } from "next/navigation";

/* ---------- types ---------- */
type Category = {
	id: string;
	name: string;
	backgroundImage: { url?: string; alt?: string };
};
type CategoryEdge = { node: Category };

/* ---------- small, memo-ised card ---------- */
const CategoryItem = memo(
	({
		image,
		name,
		alt,
		id,
		onClick,
	}: {
		image?: string;
		name: string;
		alt?: string;
		id: string;
		onClick: (id: string) => void;
	}) => (
		<div
			onClick={() => onClick(id)}
			className="mx-2 flex cursor-pointer flex-col items-center transition-transform duration-300 hover:scale-105"
		>
			<div className="mb-3 rounded-full border-2 border-dashed border-pink-400 p-1">
				<div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white sm:h-28 sm:w-28 md:h-40 md:w-40">
					<img
						src={image}
						alt={alt}
						loading="lazy"
						className="h-16 w-16 object-contain sm:h-24 sm:w-24 md:h-36 md:w-36"
					/>
				</div>
			</div>
			<h3 className="font-baloo lg:text-base font-extrabold text-blue-400 text-[12px] sm:text-lg md:text-xl">
				{name}
			</h3>
		</div>
	)
);

/* ---------- main component ---------- */
export const Categories: React.FC = () => {
	const router = useRouter();
	const scrollRef = useRef<HTMLDivElement>(null);
	const [pos, setPos] = useState(0);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);

	/* fetch once */
	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const data: CategoryEdge[] = await fetchCategoriesInHome();
				setCategories(
					data
						.filter(
							(e): e is CategoryEdge => e?.node && typeof e.node.id === "string"
						)
						.map((e) => e.node)
				);
			} catch (e) {
				console.error("Category fetch error:", e);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	/* scrolling helpers */
	const scroll = (dir: "left" | "right") => {
		if (!scrollRef.current) return;
		const { scrollWidth, clientWidth } = scrollRef.current;
		const amt = clientWidth / 2;
		const next =
			dir === "left"
				? Math.max(0, pos - amt)
				: Math.min(scrollWidth - clientWidth, pos + amt);
		scrollRef.current.scrollTo({ left: next, behavior: "smooth" });
		setPos(next);
	};
	const onScroll = () => scrollRef.current && setPos(scrollRef.current.scrollLeft);

	/* ---------- render ---------- */
	return (
		<div className="relative -mt-8 overflow-hidden bg-[#d9e9f7] pt-10 md:pt-20 md:pb-30 lg:pb-40">
			{/* mobile-only corner decorations */}
			<div className="absolute bottom-0 md:bottom-10 left-4 z-40 mb-3 block opacity-70 ">
				<img
					src="/image-16-1.png"
					alt="Baby shoes"
					className="h-16 w-16 object-contain sm:h-20 sm:w-20"
				/>
			</div>
			<div className="absolute right-4 top-6 block opacity-70 ">
				<img
					src="/image-16.png"
					alt="Pacifier"
					className="h-12 w-12 object-contain sm:h-16 sm:w-16"
				/>
			</div>

			<div className="container mx-auto p-0 pb-[60px] lg:px-4 lg:py-8">
				<h2 className="text-center mb-4 font-baloo text-3xl font-extrabold text-pink-600 md:text-4xl md:mb-4 md:mt-6 md:text-[30px] lg:mb-12">
					Categories
				</h2>

				{/* ---------- list + arrows ---------- */}
				{!loading ? (
					<div className="relative flex items-center">
						{/* swirl decorations — show only on mobile, keep md/lg untouched */}
						<img
							src="/image-7-1.png"
							alt="Decoration Left"
							className="z-10 block h-12 w-12 object-contain md:h-28 md:w-28 "
						/>

						{/* left arrow */}
						<button
							onClick={() => scroll("left")}
							style={{ backgroundColor: "rgba(83, 153, 218, 1)" }}
							className="absolute ml-[6px] left-2 z-20 rounded-full p-2 text-blue-100 shadow-md transition-all duration-300 hover:bg-blue-200 md:mb-4 md:ml-[1.95rem] lg:ml-[30px]"
							aria-label="scroll left"
							disabled={pos <= 0}
						>
							<ChevronLeft size={20} className="sm:size-5 size-3	" />
						</button>

						{/* scrollable list */}
						<div
							ref={scrollRef}
							onScroll={onScroll}
							className="flex overflow-x-auto ml-0 px-3 py-2 md:-ml-10 md:px-5 md:py-4 lg:ml-0 lg:px-10 lg:py-8"
							style={{
								scrollbarWidth: "none",
								msOverflowStyle: "none",
							}}
						>
							{categories.map((c) => (
								<CategoryItem
									key={c.id}
									id={c.id}
									image={c.backgroundImage?.url}
									alt={c.backgroundImage?.alt}
									name={c.name}
									onClick={(id) => router.push(`/productlist?id=${id}`)}
								/>
							))}

							{/* hide scrollbar (webkit) without touching md/lg styles */}
							<style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
						</div>

						{/* right arrow */}
						<button
							onClick={() => scroll("right")}
							style={{ backgroundColor: "rgba(83, 153, 218, 1)" }}
							className="absolute mr-[6px] right-2 z-20 rounded-full p-2 text-blue-100 shadow-md transition-all duration-300 hover:bg-blue-200  md:mr-[30px] md:mb-3.5"
							aria-label="scroll right"
							disabled={
								scrollRef.current
									? scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
									scrollRef.current.scrollWidth - 5
									: false
							}
						>
							<ChevronRight size={20} className="sm:size-5 size-3" />
						</button>

						<img
							src="/image-7-1.png"
							alt="Decoration Right"
							className="z-10 ml-2  block h-12 w-12 object-contain md:h-28 md:w-28"
						/>
					</div>
				) : (
					<div className="flex w-full items-center justify-center py-12">
						<div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
					</div>
				)}
			</div>

			{/* bottom wave (unchanged) */}
			<div className="absolute bottom-0 left-0 -mb-4 w-full">
				<svg
					viewBox="0 0 1440 150"
					className="h-auto w-full rotate-180"
					preserveAspectRatio="none"
				>
					<path
						fill="#ffffff"
						d="M0,64L48,85.3C96,107,192,149,288,149.3C384,149,480,107,576,106.7C672,107,768,149,864,160C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
					/>
				</svg>
			</div>
		</div>
	);
};
