"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HeartIcon, MinusIcon, PlusIcon, StarHalfIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/ui/Button";
import { Card, CardContent } from "@/ui/Card";

const socialIcons = [
	{ id: 1, src: "/akar-icons_facebook-fill.svg", alt: "Facebook" },
	{ id: 2, src: "/akar-icons_linkedin-box-fill.svg", alt: "LinkedIn" },
	{ id: 3, src: "/ant-design_twitter-circle-filled.svg", alt: "Twitter" },
];

export const FrameByAnima = (): JSX.Element => {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const [productData, setProductData] = useState<any>(null);
	const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
	const [quantity, setQuantity] = useState<number>(1);

	useEffect(() => {
		if (!id) return;

		const fetchProduct = async () => {
			const res = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					query: `
            query ProductDetails($id: ID!, $channel: String) {
              product(id: $id, channel: $channel) {
                id
                name
                description
                rating
                isAvailable
                availableForPurchaseAt
                productType { name }
                category { name }
                productVariants(first: 10) {
                  edges {
                    node {
                      id
                      name
                      pricing {
                        price {
                          gross {
                            amount
                          }
                        }
                      }
                      images {
                        id
                        url(format: ORIGINAL, size: 512)
                        alt
                      }
                    }
                  }
                }
              }
            }
          `,
					variables: { id, channel: "default-channel" },
				}),
			});

			const json = await res.json();
			setProductData(json.data.product);
		};

		fetchProduct();
	}, [id]);

	if (!id) return <p className="text-red-500">No product ID in URL.</p>;
	if (!productData) return <p className="text-gray-500">Loading...</p>;

	const selectedVariant = productData?.productVariants?.edges?.[selectedVariantIndex]?.node;

	return (
		<Card className="w-full border-none bg-transparent px-4 shadow-none md:px-0">
			<CardContent className="flex flex-col md:flex-row gap-10 p-0">
				<div className="w-full flex flex-col md:flex-row gap-6">
					<div className="md:w-fit max-w-1/4 w-full flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto">
						{productData.productVariants.edges.map((variantEdge: any, idx: number) => {
							const variant = variantEdge.node;
							const image = variant.images?.[0]?.url;

							return (
								<div
									key={variant.id}
									onClick={() => setSelectedVariantIndex(idx)}
									className={`relative border rounded-lg p-1 cursor-pointer transition hover:shadow-md ${idx === selectedVariantIndex ? "border-pink-500" : "border-gray-200"
										}`}
								>
									{image ? (
										<div className="relative">
											<Image
												src={image}
												alt={variant.images?.[0]?.alt || "variant"}
												width={80}
												height={80}
												className="h-20 w-20 object-contain rounded"
											/>

										</div>
									) : (
										<div className="h-20 w-20 flex items-center justify-center bg-gray-100 text-gray-400 rounded">
											No Image
										</div>
									)}
								</div>
							);

						})}
					</div>

					{/* Selected Variant Main Image */}
					<div className="md:w-3/4 w-full relative">
						{selectedVariant?.images?.[0]?.url && (
							<div className="relative">
								<Image
									src={selectedVariant.images[0].url}
									alt={selectedVariant.images[0].alt || "Selected variant"}
									width={600}
									height={600}
									className="w-full h-auto rounded-xl object-contain border"
								/>
								<HeartIcon onClick={() => {
									console.log(selectedVariant);
								}} className="absolute top-3 right-3 h-5 w-5 text-gray-400 hover:text-pink-500 transition" />
							</div>
						)}
					</div>

				</div>


				{/* Details Section */}
				<div className="w-full md:w-1/2">
					<h1 className="mb-4 text-[32px] md:text-[40px] font-semibold text-black">
						{productData.name}
					</h1>

					<div className="mb-4 text-xl text-[#9f9f9f]">
						Rs. {selectedVariant?.pricing?.price?.gross?.amount ?? 0}
					</div>

					<div className="mb-4 flex items-center">
						<div className="flex">
							{[...Array(4)].map((_, i) => (
								<StarIcon key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
							))}
							<StarHalfIcon className="h-5 w-5 fill-yellow-500 text-yellow-500" />
						</div>
						<span className="ml-4 text-sm text-[#9f9f9f]">
							{productData.rating ?? 5} Customer Reviews
						</span>
					</div>

					<p className="mb-6 text-sm text-black">{productData.description}</p>

					{/* Quantity & Cart */}
					<div className="mt-8 flex flex-wrap items-center gap-6">
						<div className="flex items-center rounded-full border border-[#e6e6e6] bg-[#f8f8f8]">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setQuantity((q) => Math.max(1, q - 1))}
								className="h-[34px] w-[34px] rounded-full"
							>
								<MinusIcon className="h-3.5 w-3.5" />
							</Button>
							<span className="w-10 text-center text-base font-medium text-black">{quantity}</span>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setQuantity((q) => q + 1)}
								className="h-[34px] w-[34px] rounded-full"
							>
								<PlusIcon className="h-3.5 w-3.5" />
							</Button>
						</div>

						<Button className="rounded-full bg-[#ea518f] px-10 py-4 text-base font-medium text-white hover:bg-[#d93d7a]">
							Add to Cart
						</Button>
					</div>
					<div className="mt-8 space-y-4 text-[#9f9f9f] text-base">
						<div className="flex">
							<div className="w-24">Type</div>
							<div>{productData.productType?.name ?? "N/A"}</div>
						</div>
						<div className="flex">
							<div className="w-24">Category</div>
							<div>{productData.category?.name ?? "N/A"}</div>
						</div>
						<div className="flex">
							<div className="w-24">Available</div>
							<div>{productData.isAvailable ? "In Stock" : "Out of Stock"}</div>
						</div>
						<div className="flex">
							<div className="w-24">Share</div>
							<div className="flex gap-4">
								{socialIcons.map((icon) => (
									<button key={icon.id} className="h-5 w-5" aria-label={icon.alt}>
										<Image
											src={icon.src}
											alt={icon.alt}
											width={20}
											height={20}
											className="object-contain"
										/>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</CardContent>

			{/* Additional Info */}

		</Card>
	);
};
