"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../../ui/Card";
import { fetchCategoriesWithProducts } from "@/lib/graphqlClient";
import { useSearchParams } from "next/navigation";

type Product = {
	id: string;
	name: string;
	slug: string;
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

interface CategoryContextType {
	categories: CategoryEdge[];
	loading: boolean;
	selectedCategoryId: string | null;
	setSelectedCategoryId: (id: string | null) => void;
}

const CategoryContext = createContext<CategoryContextType>({
	categories: [],
	loading: true,
	selectedCategoryId: null,
	setSelectedCategoryId: () => {},
});

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
	const [categories, setCategories] = useState<CategoryEdge[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

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
		<CategoryContext.Provider value={{ categories, loading, selectedCategoryId, setSelectedCategoryId }}>
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
	let id = searchParams.get("id");
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
	const { categories, selectedCategoryId, loading } = useCategory();
	const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

	const toggleLike = (id: string) => {
		setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const products = React.useMemo(() => {
		if (loading || !categories.length) return [];

		if (selectedCategoryId) {
			const selectedCategory = categories.find((c) => c.node.id === selectedCategoryId);
			return selectedCategory?.node?.products?.edges.map((e) => e.node) || [];
		}

		return categories.flatMap((cat) => cat.node?.products?.edges.map((e) => e.node) || []);
	}, [categories, selectedCategoryId, loading]);

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
		<div className="ml-6 w-full py-8 pr-20">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<div key={product.id} className="w-full">
						<Card
							key={product.id}
							className="w-full overflow-hidden rounded-[10px] shadow-[0px_4px_4px_#00000040]"
						>
							<div
								className="relative h-60 bg-cover bg-center "
								style={{ backgroundImage: `url(/productbg.png)` }}
							>
								<button onClick={() => toggleLike(product.id)} className="absolute right-5 top-5 z-10">
									<HeartIcon
										size={30}
										className={likedMap[product.id] ? "text-red-500" : "text-gray-500"}
										fill={likedMap[product.id] ? "#ef4444" : "none"}
									/>
								</button>
								<Link href={`/productview?id=${product.id}`}>
									<Image
										src={product.thumbnail?.url || "/placeholder-product.png"}
										alt={product.name}
										width={208}
										height={208}
										style={{ margin: "0 auto" }}
										className="max-h-[210px] object-contain pt-6"
									/>
								</Link>
							</div>
							<CardContent className="p-4">
								<h3 className="mb-1 text-lg font-semibold tracking-tight text-[#36061a]">{product.name}</h3>

								<div className="mb-2 flex items-center gap-2">
									<svg className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
										<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
									</svg>

									<span className="text-xs text-gray-500">5.0</span>
									<span className="text-xs text-gray-400">(1.2k Reviews)</span>

									<span className="ml-auto text-base font-bold text-black">
										{product.pricing?.priceRange?.start?.gross?.amount
											? `${product.pricing.priceRange.start.gross.currency} ${product.pricing.priceRange.start.gross.amount}`
											: "Price not available"}
									</span>
								</div>

								<div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
									<Button
										variant="outline"
										className="flex-1 rounded-xl border border-[#ea518f] bg-white px-4 py-2 text-sm font-semibold text-[#ea518f] transition-all duration-200 hover:bg-[#ffe6f0] hover:text-[#d7407e] active:scale-95"
									>
										Add To Cart
									</Button>
									<Button className="flex-1 rounded-xl bg-[#ea518f] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#d7407e] active:scale-95">
										Buy Now
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
};
