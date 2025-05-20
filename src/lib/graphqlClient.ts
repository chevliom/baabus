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
                products(first: 5, channel: $channel) {
                  edges {
                    node {
                      id
                      name
                      slug
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
