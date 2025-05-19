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
