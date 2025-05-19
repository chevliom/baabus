"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/Accordion";
import { fetchCategoriesWithProducts } from "@/lib/graphqlClient";

// Types
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

// Provider
export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
	const [categories, setCategories] = useState<CategoryEdge[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

	useEffect(() => {
		const load = async () => {
			try {
				setLoading(true);
				const data: CategoryEdge[] = await fetchCategoriesWithProducts();
				setCategories(data);
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

// Sidebar Category Selector
export const AllCategoriesByAnima1 = (): JSX.Element => {
	const { categories, loading, selectedCategoryId, setSelectedCategoryId } = useCategory();
	const [openItem, setOpenItem] = useState("categories");

	const handleCategorySelect = (categoryId: string) => {
		setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId);
	};

	return (
		<div className="flex w-full flex-col items-start">
			<Accordion
				type="single"
				collapsible
				value={openItem}
				onValueChange={(value) => setOpenItem(value)}
				className="w-full"
			>
				<AccordionItem value="categories" className="border-0">
					<AccordionTrigger className="px-0 py-5 font-[Poppins] text-[20px] font-medium leading-[30px] text-[#1A1A1A]">
						All Categories
					</AccordionTrigger>
					<AccordionContent className="pt-2">
						{loading ? (
							<p className="text-sm text-gray-500">Loading categories...</p>
						) : (
							<div className="space-y-4">
								{categories.map((categoryEdge, idx) => {
									const category = categoryEdge.node;
									if (!category || !category.name) return null;
									const productCount = category.products?.edges.length || 0;

									return (
										<div
											key={idx}
											className="flex items-center justify-between border-b border-gray-200 pb-3"
											onClick={() => handleCategorySelect(category.id)}
										>
											<div className="flex cursor-pointer items-center gap-2">
												<h3 className="font-[Poppins] text-lg font-medium text-[#1A1A1A]">{category.name}</h3>
												<span className="text-sm text-gray-600">({productCount})</span>
											</div>
											<label className="flex cursor-pointer items-center">
												<input
													type="radio"
													name="category"
													value={category.id}
													checked={selectedCategoryId === category.id}
													onChange={() => {}} // onChange handled by the div onClick
													className="h-4 w-4 accent-[rgba(230,40,117,1)]"
												/>
											</label>
										</div>
									);
								})}
							</div>
						)}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

// Product Grid
export const FrameByAnima = (): JSX.Element => {
	const { categories, selectedCategoryId, loading } = useCategory();

	const products = React.useMemo(() => {
		if (loading || !categories.length) return [];

		if (selectedCategoryId) {
			const selectedCategory = categories.find((c) => c.node.id === selectedCategoryId);
			return selectedCategory?.node?.products?.edges.map((e) => e.node) || [];
		}

		// Show all products if no category is selected
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
		<div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{products.map((product) => (
				<div
					key={product.id}
					className="rounded-xl bg-white p-3 shadow-lg transition-transform hover:scale-105"
				>
					<div className="relative h-40 w-full overflow-hidden rounded-lg">
						<img
							src={product.thumbnail?.url || "/placeholder-product.png"}
							alt={product.name}
							className="h-full w-full object-cover"
						/>
					</div>
					<h3 className="mt-3 truncate text-lg font-semibold text-gray-800">{product.name}</h3>
					<p className="mt-1 text-sm font-medium text-gray-600">
						{product.pricing?.priceRange?.start?.gross?.amount
							? `${product.pricing.priceRange.start.gross.amount} ${product.pricing.priceRange.start.gross.currency}`
							: "Price not available"}
					</p>
				</div>
			))}
		</div>
	);
};
