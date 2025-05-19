"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/Accordion";
import { fetchCategoriesWithProducts } from "@/lib/graphqlClient";
import { HeartIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../../ui/Card";


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
				// Set the first category as selected by default if available
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

// Adding custom styles for radio buttons
const CustomRadioStyles = () => (
	<style jsx global>{`
		.custom-radio {
			appearance: none;
			width: 16px;
			height: 16px;
			border: 2px solid #e6e6e6;
			border-radius: 50%;
			outline: none;
			cursor: pointer;
			position: relative;
			background-color: white;
            
		}

		.custom-radio:checked {
			border-color: rgba(230, 40, 117, 1);
			background-color: white;
			color: rgba(230, 40, 117, 1);
		}

		.custom-radio:checked::after {
			content: "";
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 8px;
			height: 8px;
			background-color: rgba(230, 40, 117, 1); /* Only pink */
			border-radius: 50%;
            
		}

		.custom-radio:focus {
			box-shadow: none; /* Remove default blue glow */
            
		}

		.custom-radio:focus {
			outline: none; /* Remove blue ring */
			box-shadow: none; /* Remove default focus glow */
		}

		.custom-radio:focus-visible {
			outline: none;
		}
	`}</style>
);

// Sidebar Category Selector
export const AllCategoriesByAnima1 = () => {
	const { categories, loading, selectedCategoryId, setSelectedCategoryId } = useCategory();
	const [openItem, setOpenItem] = useState("categories");

	// Handle category selection with fixed null handling
	const handleCategorySelect = (categoryId) => {
		// Convert empty string to null for consistency
		setSelectedCategoryId(categoryId === "" ? null : categoryId);
	};

	return (
		<div className="mb-6 w-full">
			{/* Add custom styles for radio buttons */}
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
							{/* Option to show all products */}
							<div className="flex items-center space-x-2 py-1">
								<input
									type="radio"
									id="all-categories"
									name="category"
									checked={selectedCategoryId === null}
									onChange={() => handleCategorySelect("")}
									className="custom-radio" // Use custom class instead of accent-color
								/>
								<label
									htmlFor="all-categories"
									className="cursor-pointer text-sm"
									onClick={() => handleCategorySelect("")}
								>
									All Products
								</label>
							</div>

							{/* Individual categories */}
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
											className="custom-radio" // Use custom class instead of accent-color
										/>
										<label
											htmlFor={`category-${category.id}`}
											className="cursor-pointer text-sm"
											onClick={() => handleCategorySelect(category.id)}
										>
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


// Product Grid with background image style matching Figma design
export const FrameByAnima = () => {
	const { categories, selectedCategoryId, loading, setSelectedCategoryId } = useCategory();

	const products = React.useMemo(() => {
		if (loading || !categories.length) return [];

		// Show products from the selected category
		if (selectedCategoryId) {
			const selectedCategory = categories.find((c) => c.node.id === selectedCategoryId);
			return selectedCategory?.node?.products?.edges.map((e) => e.node) || [];
		}

		// If no category is selected, show all products
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
					<Card
						key={product.id}
						className="w-full overflow-hidden rounded-[10px] shadow-[0px_4px_4px_#00000040]"
					>
						<div
							className="relative h-60 bg-cover bg-center"
							style={{ backgroundImage: `url(/productbg.png)` }}
						>
							<button className="absolute right-5 top-5 z-10">
								<svg
									width="30"
									height="30"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-gray-500"
								>
									<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
								</svg>
							</button>
							<div className="flex h-full items-center justify-center">
								<img
									src={product.thumbnail?.url || "/placeholder-product.png"}
									alt={product.name}
									className="max-h-52 max-w-52 object-contain"
								/>
							</div>
						</div>
						<CardContent className="p-4">
							<h3 className="mb-2 font-['Poppins',Helvetica] text-xl font-semibold text-[#36061a]">
								{product.name}
							</h3>
							<div className="mb-2 flex items-center">
								<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="gold" stroke="gold" strokeWidth="1">
									<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
								</svg>
								<span className="mr-2 font-['Poppins',Helvetica] text-xs font-light text-[#00000066]">
									5.0
								</span>
								<span className="font-['Poppins',Helvetica] text-xs font-light text-[#00000066]">
									(1.2k Reviews)
								</span>
								<span className="ml-auto font-['Poppins',Helvetica] text-xl font-bold text-black">
									{product.pricing?.priceRange?.start?.gross?.amount
										? `${product.pricing.priceRange.start.gross.currency} ${product.pricing.priceRange.start.gross.amount}`
										: "Price not available"}
								</span>
							</div>
							<div className="mt-4 flex gap-2">
								<Button
									variant="outline"
									className="flex-1 rounded-[10px] border-[#ea518f] font-['Baloo-Regular',Helvetica] text-[13px] font-normal text-[#ea518f]"
								>
									Add To Cart
								</Button>
								<Button className="flex-1 rounded-[10px] bg-[#ea518f] font-['Baloo-Regular',Helvetica] text-[13px] font-normal text-white shadow-[0px_4px_4px_#00000040]">
									Buy Now
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};