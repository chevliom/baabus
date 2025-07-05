import Cookies from "js-cookie";
import { type SetStateAction } from "react";

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
	id: SetStateAction<string | null>;
	name: string;
	products: {
		edges: { node: Product }[];
	};
};

type CategoriesResponse = {
	data: {
		categories: {
			edges: { node: Category }[];
		};
	};
};

type WishlistProduct = {
	id: string;
	name: string;
	channel: string;
};

type WishlistVariant = {
	id: string;
	name: string;
	pricing?: {
		price?: {
			gross?: {
				amount: number;
			};
			net?: {
				amount: number;
			};
		};
	};
	product: WishlistProduct;
};

type WishlistItem = {
	id: string;
	variant: WishlistVariant;
};

type WishlistUser = {
	id: string;
	email: string;
};

type Wishlist = {
	id: string;
	items: WishlistItem[];
	user: WishlistUser;
};

type WishlistResponse = {
	data: {
		wishlist: Wishlist;
	};
};

type LoginInput = {
	email: string;
	password: string;
};

type LoggedInUser = {
	id: string;
	email: string;
	checkoutIds: string[];
};

type LoginError = {
	code: string;
	field: string | null;
	message: string;
};

type LoginResponse = {
	data: {
		tokenCreate: {
			csrfToken: string | null;
			refreshToken: string | null;
			token: string | null;
			errors: LoginError[];
			user: LoggedInUser | null;
		};
	};
};

export async function fetchWishlist() {
	const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${Cookies.get("token") || ""}`,
		},
		body: JSON.stringify({
			query: `
		  query Wishlist {
			wishlist {
				id
				items {
				id
				variant {
					id
					name
					pricing {
					price {
						gross {
						amount
						}
						net {
						amount
						}
					}
					}
					product {
					channel
					id
					name
					
					}
					images {
					url(format: ORIGINAL)
					}
				}
				}
				user {
				email
				id
				}
			}
			}
		`,
		}),
	});

	const json = (await response.json()) as WishlistResponse;
	return json.data?.wishlist ?? null;
}

export async function fetchCategoriesInHome(channel = "default-channel") {
	const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `
		query getCategories {
			categories(first: 8) {
				edges {
				node {
					id
					backgroundImage(size: 1200) {
					alt
					url
					}
					name
				}
				}
			}
			}
	  `,
			variables: { channel },
		}),
	});

	const json = (await response.json()) as CategoriesResponse;
	return json.data?.categories?.edges ?? [];
}

export async function fetchCategoriesWithProducts(channel = "default-channel") {
	const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `
		query CategoriesWithProducts($channel: String!) {
			categories(first: 10) {
				edges {
				node {
					id
					name
					backgroundImage(format: ORIGINAL, size: 3000) {
					alt
					url
					}
					products(first: 5, channel: $channel) {
					edges {
						node {
						id
						name
						slug
						averageRating   
						 category{
                            id
                            name
                        }
						thumbnail {
							url
						}
						pricing {
							priceRange {
							start {
								gross {
								amount
								currency
								}
							}
							}
						}
						productVariants(first: 10) {
							edges {
							node {
								id
								metadata {
								key
								value
								}
								name
								images {
								url
								alt
								id
								}
							}
							}
						}
						}
					}
					}
				}
				}
			}
			}
	  `,
			variables: { channel },
		}),
	});

	const json = (await response.json()) as CategoriesResponse;
	return json.data?.categories?.edges ?? [];
}

// export async function fetchCategoriesWithCategoryIdChannel(channel = "default-channel") {
// 	const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			query: `
// 		query CategoriesWithProducts($channel: String!) {
// 			categories(first: 10) {
// 				edges {
// 				node {
// 					id
// 					name
// 					backgroundImage(format: ORIGINAL, size: 3000) {
// 					alt
// 					url
// 					}
// 					products(first: 5, channel: $channel) {
// 					edges {
// 						node {
// 						id
// 						name
// 						slug
// 						thumbnail {
// 							url
// 						}
// 						pricing {
// 							priceRange {
// 							start {
// 								gross {
// 								amount
// 								currency
// 								}
// 							}
// 							}
// 						}
// 						productVariants(first: 10) {
// 							edges {
// 							node {
// 								id
// 								metadata {
// 								key
// 								value
// 								}
// 								name
// 								images {
// 								url
// 								alt
// 								id
// 								}
// 							}
// 							}
// 						}
// 						}
// 					}
// 					}
// 				}
// 				}
// 			}
// 			}
// 	  `,
// 			variables: { channel },
// 		}),
// 	});

// 	const json = (await response.json()) as CategoriesResponse;
// 	return json.data?.categories?.edges ?? [];
// }

type ProductDetails = {
	id: string;
	seoTitle: string;
	seoDescription: string;
	name: string;
	description: string;
	slug: string;
	created: string;
	updatedAt: string;
	chargeTaxes: boolean;
	rating: number;
	channel: string;
	descriptionJson: string;
	isAvailable: boolean;
	availableForPurchase: string;
	availableForPurchaseAt: string;
	isAvailableForPurchase: boolean;
	externalReference: string;
	productType: {
		id: string;
		name: string;
		slug: string;
		hasVariants: boolean;
		isShippingRequired: boolean;
		isDigital: boolean;
		kind: string;
	};
};

type ProductResponse = {
	data: {
		product: ProductDetails;
	};
};

export async function fetchProductById(productId: string, channel = "default-channel") {
	const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `
		query Product($productId: ID!, $channel: String!) {
		  product(id: $productId, channel: $channel) {
			id
			seoTitle
			seoDescription
			name
			description
			slug
			created
			updatedAt
			chargeTaxes
			rating
			channel
			descriptionJson
			isAvailable
			availableForPurchase
			availableForPurchaseAt
			isAvailableForPurchase
			externalReference
			productType {
			  id
			  name
			  slug
			  hasVariants
			  isShippingRequired
			  isDigital
			  kind
			}
		  }
		}
	  `,
			variables: { productId, channel },
		}),
	});

	const json = (await response.json()) as ProductResponse;
	return json.data?.product ?? null;
}

type AccountRegisterInput = {
	firstName?: string;
	lastName?: string;
	email: string;
	password: string;
	redirectUrl?: string;
	channel?: string;
	metadata?: {
		key: string;
		value: string;
	}[];
};

type RegisteredUser = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	metadata: {
		key: string;
		value: string;
	}[];
};

type AccountRegisterError = {
	field: string | null;
	message: string;
};

type AccountRegisterResponse = {
	data: {
		accountRegister: {
			user: RegisteredUser | null;
			errors: AccountRegisterError[];
			requiresConfirmation: boolean;
		};
	};
};

export interface ProductNode {
	id: string;
	name: string;
	slug: string;
	description: string;
	media: {
		id: string;
		url: string;
		type: string;
		productId: string;
	}[];
	pricing: {
		priceRange: {
			start: { gross: { amount: number; currency: string } };
			stop: { gross: { amount: number; currency: string } };
		};
	};
	category: { id: string; name: string };
	attributes: {
		attribute: { name: string };
		values: { name: string }[];
	}[];
}

const GRAPHQL_ENDPOINT = "https://baabusbabycare.visiobyte.in/graphql/";

export async function registerAccount(input: AccountRegisterInput): Promise<{
	user: RegisteredUser | null;
	errors: AccountRegisterError[];
	requiresConfirmation: boolean;
}> {
	const response = await fetch(GRAPHQL_ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
			  mutation RegisterAccount($input: AccountRegisterInput!) {
				accountRegister(input: $input) {
				  user {
					id
					email
					firstName
					lastName
					metadata {
					  key
					  value
					}
				  }
				  errors {
					field
					message
				  }
				  requiresConfirmation
				}
			  }
			`,
			variables: { input },
		}),
	});

	const json = (await response.json()) as AccountRegisterResponse;

	return (
		json.data?.accountRegister ?? {
			user: null,
			errors: [{ field: null, message: "Unknown error" }],
			requiresConfirmation: false,
		}
	);
}

export async function loginAccount(input: LoginInput): Promise<{
	token: string | null;
	csrfToken: string | null;
	refreshToken: string | null;
	user: LoggedInUser | null;
	errors: LoginError[];
}> {
	const response = await fetch(GRAPHQL_ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
			mutation TokenCreate($email: String!, $password: String!) {
			  tokenCreate(email: $email, password: $password) {
				csrfToken
				refreshToken
				token
				errors {
				  code
				  field
				  message
				}
				user {
				  id
				  email
				   metadata {
					key
					value
				}
				  checkoutIds
				}
			  }
			}
		  `,
			variables: input,
		}),
	});

	const json = (await response.json()) as LoginResponse;

	return (
		json.data?.tokenCreate ?? {
			token: null,
			csrfToken: null,
			refreshToken: null,
			user: null,
			errors: [{ code: "UNKNOWN", field: null, message: "Unexpected error" }],
		}
	);
}

export async function uploadDocuments({
	gstFile,
	panFile,
	email,
}: {
	gstFile: File;
	panFile: File;
	email: string;
}): Promise<Response> {
	const formData = new FormData();
	const operations = {
		query: `
      mutation uploadFiles($input: UploadFilesInput!) {
        uploadFiles(input: $input) {
          downloadUrls
        }
      }
    `,
		variables: {
			input: {
				email,
				file1: null,
				file2: null,
			},
		},
	};

	const map = {
		"0": ["variables.input.file1"],
		"1": ["variables.input.file2"],
	};

	formData.append("operations", JSON.stringify(operations));
	formData.append("map", JSON.stringify(map));
	formData.append("0", gstFile);
	formData.append("1", panFile);

	// 4. Send request
	return fetch(GRAPHQL_ENDPOINT, {
		method: "POST",
		body: formData,
	});
}

export async function fetchMe() {
	const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: Cookies.get("Token") || "",
		},
		body: JSON.stringify({
			query: `
		{
			me {
				id
				email
				firstName
				lastName
				isActive
				metadata {
				key
				value
				}
				defaultBillingAddress {
				isDefaultBillingAddress
				isDefaultShippingAddress
				}
				addresses {
				city
				cityArea
				country {
					code
					country
				}
				countryArea
				postalCode
				streetAddress1
				streetAddress2
				phone
				firstName
				lastName
				companyName
				metadata {
					key
					value
				}
				}
			}
		}
	  `,
		}),
	});

	const json = (await response.json()) as ProductResponse;
	return json.data ?? null;
}

export async function fetchTrendingProducts(): Promise<ProductNode[]> {
	const response = await fetch("https://baabusbabycare.visiobyte.in/graphql/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: Cookies.get("Token") || "",
		},
		body: JSON.stringify({
			query: `
        {
          trendingProducts(first: 10, channel: "default-channel") {
            edges {
              node {
                id
                name
                slug
                description
                media {
                  id
                  url(format: ORIGINAL, size: 512)
                  type
                  productId
                }
                pricing {
                  priceRange {
                    start {
                      gross {
                        amount
                        currency
                      }
                    }
                    stop {
                      gross {
                        amount
                        currency
                      }
                    }
                  }
                }
                category {
				id
                  name
                }
                attributes {
                  attribute {
                    name
                  }
                  values {
                    name
                  }
                }
              }
            }
          }
        }
      `,
		}),
	});

	const json: any = await response.json();
	const edges = json.data?.trendingProducts?.edges ?? [];

	return edges.map((edge: { node: ProductNode }) => edge.node);
}
