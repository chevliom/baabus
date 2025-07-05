"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchCategoriesWithProducts } from "@/lib/graphqlClient";
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
	backgroundImage?: { url: string };
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
	setSelectedCategoryId: () => { },
});

// Provider
export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
	const [categories, setCategories] = useState<CategoryEdge[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

	useEffect(() => {
		const load = async () => {
			try {
				const data = await fetchCategoriesWithProducts();
				setCategories(data as CategoryEdge[]);
				if (data.length > 0 && data[0].node) {
					setSelectedCategoryId(data[0].node.id);
				}
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

// Category Filter UI
export const AllCategoriesByAnima1 = () => {
	const { categories, loading, selectedCategoryId, setSelectedCategoryId } = useCategory();
	const [openItem, setOpenItem] = useState("categories");

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
				<p className="text-lg font-medium text-gray-600">Loading ...</p>
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
		<div className=" w-full px-0 py-8">
			<div className="flex flex-wrap items-center justify-center gap-10">
				{categories.map((categoryEdge) => {
					const category = categoryEdge.node;
					return (
						<Link
							key={category.id}
							href={`/productlist?id=${category.id}`}
							className="group block w-full max-w-[310px] transform transition-transform duration-300 hover:scale-[1.02]"
						>
							<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
								<div className="relative h-48 w-full bg-gray-100">
									<Image
										src={category?.backgroundImage?.url || "/placeholder-product.png"}
										alt={category.name}
										fill
										className="object-contain p-4"
									/>
								</div>
								<div className="p-4 text-center">
									<h3 className="text-md font-semibold text-gray-800">{category.name}</h3>
									<p className="text-sm text-gray-500">{category.products.edges.length} Products</p>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};
