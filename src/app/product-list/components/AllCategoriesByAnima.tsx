// "use client";

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/Accordion";
// import { fetchCategoriesWithProducts } from "@/lib/graphqlClient";

// // Define types
// type Product = {
//     id: string;
//     name: string;
//     slug: string;
//     thumbnail?: { url: string };
//     pricing?: {
//         priceRange?: {
//             start?: {
//                 gross?: {
//                     amount: number;
//                     currency: string;
//                 };
//             };
//         };
//     };
// };

// type Category = {
//     id: string;
//     name: string;
//     products: {
//         edges: { node: Product }[];
//     };
// };

// type CategoryEdge = { node: Category };

// // Create context for sharing category state
// interface CategoryContextType {
//     selectedCategoryId: string | null;
//     setSelectedCategoryId: (id: string | null) => void;
//     categories: CategoryEdge[];
//     loading: boolean;
// }

// const CategoryContext = createContext<CategoryContextType>({
//     selectedCategoryId: null,
//     setSelectedCategoryId: () => {},
//     categories: [],
//     loading: true
// });

// // Context provider component
// export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
//     const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
//     const [categories, setCategories] = useState<CategoryEdge[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadCategories = async () => {
//             try {
//                 setLoading(true);
//                 const data = await fetchCategoriesWithProducts();
//                 setCategories(data);
//                 // Set the first category as default if available
//                 if (data.length > 0 && !selectedCategoryId) {
//                     setSelectedCategoryId(data[0].node.id);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch categories:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadCategories();
//     }, []);

//     return (
//         <CategoryContext.Provider value={{ selectedCategoryId, setSelectedCategoryId, categories, loading }}>
//             {children}
//         </CategoryContext.Provider>
//     );
// };

// export const useCategory = () => useContext(CategoryContext);

// // AllCategoriesByAnima component
// export const AllCategoriesByAnima = (): JSX.Element => {
//     const { categories, selectedCategoryId, setSelectedCategoryId, loading } = useCategory();
//     const [openItem, setOpenItem] = useState("categories");

//     return (
//         <div className="flex w-full flex-col items-start">
//             <Accordion
//                 type="single"
//                 collapsible
//                 value={openItem}
//                 onValueChange={(value) => setOpenItem(value)}
//                 className="w-full"
//             >
//                 <AccordionItem value="categories" className="border-0">
//                     <AccordionTrigger
//                         className="px-0 py-5 font-[Poppins] text-[20px] font-medium leading-[30px] tracking-[0px] text-[#1A1A1A]"
//                     >
//                         All Categories
//                     </AccordionTrigger>

//                     <AccordionContent className="space-y-4 pt-4">
//                         {loading ? (
//                             <p>Loading categories...</p>
//                         ) : (
//                             categories.map((categoryEdge, index) => {
//                                 const category = categoryEdge.node;
//                                 const productCount = category.products.edges.length;

//                                 return (
//                                     <div key={category.id} className="flex items-center gap-3">
//                                         <div className="relative h-[12px] w-[12px]">
//                                             <input
//                                                 type="radio"
//                                                 id={`category-${category.id}`}
//                                                 name="category"
//                                                 value={category.id}
//                                                 checked={selectedCategoryId === category.id}
//                                                 onChange={() => setSelectedCategoryId(category.id)}
//                                                 className="peer absolute h-full w-full cursor-pointer opacity-0"
//                                             />
//                                             <div
//                                                 className={`h-full w-full rounded-full border-2 transition-colors
//                                                 ${selectedCategoryId === category.id ? "border-[#EA518F]" : "border-[#CCCCCC]"}`}
//                                             />
//                                             {selectedCategoryId === category.id && (
//                                                 <div className="absolute left-[2px] top-[2px] h-[8px] w-[8px] rounded-full bg-[#EA518F]" />
//                                             )}
//                                         </div>

//                                         <label
//                                             htmlFor={`category-${category.id}`}
//                                             className="flex cursor-pointer items-center gap-1 font-[Poppins] text-[16px] font-normal leading-[24px] text-[#1A1A1A]"
//                                         >
//                                             {category.name}
//                                             <span className="text-[#666666]">({productCount})</span>
//                                         </label>
//                                     </div>
//                                 );
//                             })
//                         )}
//                     </AccordionContent>
//                 </AccordionItem>
//             </Accordion>
//         </div>
//     );
// };
