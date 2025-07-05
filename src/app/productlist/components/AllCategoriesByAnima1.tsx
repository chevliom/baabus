"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "../../../ui/Card";
import { fetchCategoriesWithProducts } from "@/lib/graphqlClient";
import { HeartIcon } from "lucide-react";
type Product = {
	id: string;
	name: string;
	slug: string;
	averageRating?: number;
	thumbnail?: { url: string };
	pricing?: {
		priceRange?: {
			start?: {
				gross?: {
					amount: number;
					currency: string;
				};
			};
		};
	};
};

type Category = {
	id: string;
	name: string;
	products: {
		edges: { node: Product }[];
	};
};

interface CategoryEdge {
	node: Category;
}

type Filters = {
	minPrice: number;
	maxPrice: number;
	minRating: number;
};


interface CategoryContextType {
	categories: CategoryEdge[];
	loading: boolean;
	selectedCategoryId: string | null;
	setSelectedCategoryId: (id: string | null) => void;
	filters: Filters;
	setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const CategoryContext = createContext<CategoryContextType>({
	categories: [],
	loading: true,
	selectedCategoryId: null,
	setSelectedCategoryId: () => { },
	filters: { minPrice: 0, maxPrice: 2000, minRating: 0 },
	setFilters: () => { },
});

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
	const [categories, setCategories] = useState<CategoryEdge[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
	const [filters, setFilters] = useState<Filters>({
		minPrice: 0,
		maxPrice: 2000,
		minRating: 0,
	});

	useEffect(() => {
		const load = async () => {
			try {
				setLoading(true);
				const data = await fetchCategoriesWithProducts();
				const filteredData = data.filter(
					(cat: any) => typeof cat.node?.id === "string" && cat.node?.id !== null,
				);
				setCategories(filteredData as CategoryEdge[]);
			} catch (err) {
				console.error("Category fetch error:", err);
				setCategories([]);
			} finally {
				setLoading(false);
			}
		};
		void load();
	}, []);

	return (
		<CategoryContext.Provider value={{ categories, loading, selectedCategoryId, setSelectedCategoryId, filters, setFilters }}>
			{children}
		</CategoryContext.Provider>
	);
};

export const useCategory = () => useContext(CategoryContext);

// Radio Styles
const CustomRadioStyles = () => {
	React.useEffect(() => {
		const styleEl = document.createElement("style");
		styleEl.textContent = `
      .custom-radio {
        -webkit-appearance: none;
        -moz-appearance: none;
        outline: none;
        box-shadow: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid #ccc;
        border-radius: 50%;
        background-color: white;
        position: relative;
        cursor: pointer;
        transition: border-color 0.2s ease, background-color 0.2s ease;
      }

      .custom-radio:hover {
        border-color: #999;
      }

      .custom-radio:active {
        border-color: rgba(230, 40, 117, 0.5);
      }

      .custom-radio:checked {
        border-color: rgba(230, 40, 117, 1);
        background-color: white;
      }

      .custom-radio:checked::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background-color: rgba(230, 40, 117, 1);
        border-radius: 50%;
      }

      .custom-radio:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(230, 40, 117, 0.3);
      }

      .custom-radio:focus-visible {
        outline: none;
      }
    `;
		document.head.appendChild(styleEl);
		return () => {
			document.head.removeChild(styleEl);
		};
	}, []);

	return null;
};

export const AllCategoriesByAnima1 = () => {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const { categories, loading, selectedCategoryId, setSelectedCategoryId } = useCategory();
	const [openItem, setOpenItem] = useState("categories");

	useEffect(() => {
		const selectedId = searchParams.get("id");
		if (selectedId !== selectedCategoryId) {
			setSelectedCategoryId(selectedId);
		}
	}, [searchParams, id]);

	const handleCategorySelect = (categoryId: string | null) => {
		setSelectedCategoryId(categoryId === "" ? null : categoryId);
	};

	return (
		<div className="mb-6 w-full">
			<CustomRadioStyles />
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-lg font-semibold">All Categories</h2>
				<button
					onClick={() => setOpenItem(openItem === "categories" ? "" : "categories")}
					className="text-sm text-gray-500"
				>
					{openItem === "categories" ? "Hide" : "Show"}
				</button>
			</div>

			{openItem === "categories" && (
				<div className="ml-2 space-y-2">
					{loading ? (
						<p className="text-sm text-gray-500">Loading categories...</p>
					) : (
						<>
							<div className="flex items-center space-x-2 py-1">
								<input
									type="radio"
									id="all-categories"
									name="category"
									checked={selectedCategoryId === null}
									onChange={() => handleCategorySelect("")}
									className="custom-radio"
								/>
								<label
									htmlFor="all-categories"
									className="cursor-pointer text-sm"
									onClick={() => handleCategorySelect("")}
								>
									All Products
								</label>
							</div>

							{categories.map((categoryEdge) => {
								const category = categoryEdge.node;
								if (!category || !category.name) return null;
								const productCount = category.products?.edges.length || 0;

								return (
									<div key={category.id} className="flex items-center space-x-2 py-1">
										<input
											type="radio"
											id={`category-${category.id}`}
											name="category"
											checked={selectedCategoryId === category.id}
											onChange={() => handleCategorySelect(category.id)}
											className="custom-radio"
										/>
										<label htmlFor={`category-${category.id}`} className="cursor-pointer text-sm">
											{category.name} ({productCount})
										</label>
									</div>
								);
							})}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export const FrameByAnima = () => {
	const { categories, selectedCategoryId, loading, filters } = useCategory();
	const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

	const toggleLike = (product: any) => {
		setLikedMap((prev) => ({ ...prev, [product.id]: !prev[product.id] }));
	};

	const products = React.useMemo(() => {
		if (loading || !categories.length) return [];

		const allProducts = selectedCategoryId
			? categories.find((c) => c.node.id === selectedCategoryId)?.node.products.edges.map((e) => e.node) || []
			: categories.flatMap((cat) => cat.node.products.edges.map((e) => e.node));

		return allProducts.filter((product) => {
			const price = product.pricing?.priceRange?.start?.gross?.amount ?? 0;
			const rating = product.averageRating ?? 0;
			return (
				price >= filters.minPrice &&
				price <= filters.maxPrice &&
				rating >= filters.minRating
			);
		});
	}, [categories, selectedCategoryId, loading, filters]);

	if (loading) {
		return (
			<div className="flex h-64 w-full items-center justify-center">
				<p className="text-lg font-medium text-gray-600">Loading products...</p>
			</div>
		);
	}

	if (products.length === 0) {
		return (
			<div className="flex h-64 w-full items-center justify-center">
				<p className="text-lg font-medium text-gray-600">
					{selectedCategoryId ? "No products found in this category" : "No products available"}
				</p>
			</div>
		);
	}

	return (
		<div className="mt-6 flex-1">
			<div className="grid gap-6 sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
				{products.map((product) => (
					<Link
						href={`/productview?id=${product.id}`}
						key={product.id}
						className="w-full"
					>
						<Card className="relative flex flex-col rounded-[12px] bg-white shadow-md transition-transform hover:scale-[1.02]">
							{/* Image & Heart */}
							<div className="relative h-60 bg-[url('/productbg.png')] bg-cover bg-center flex items-center justify-center">
								<Image
									src={product.thumbnail?.url || "/placeholder-product.png"}
									alt={product.name}
									width={400}
									height={400}
									className="max-h-[180px] object-contain"
								/>
								<HeartIcon
									size={26}
									className="absolute top-3 right-3 text-[#E31C79] fill-[#E31C79]"
								/>
							</div>

							{/* Product Info */}
							<CardContent className="flex flex-col gap-1 px-4 py-3">
								<h3 className="text-[15px] font-bold uppercase text-[#37061A] font-[Poppins] line-clamp-2">
									{product.name}
								</h3>

								<div className="flex items-center justify-between w-full mt-1">
									<div className="flex items-center gap-1 text-xs">
										<Image src="/star-6.svg" alt="Star" width={14} height={14} />
										<span className="text-[13px] text-[#4C4C4C]">
											{product.averageRating ?? 0}
										</span>
										<span className="text-[13px] text-[#B0B0B0]">(1.2k Reviews)</span>
									</div>

									<span className="text-[18px] font-bold text-[#000000] font-[Poppins]">
										Rs {product.pricing?.priceRange?.start?.gross?.amount ?? "N/A"}
									</span>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div >
	);
};
