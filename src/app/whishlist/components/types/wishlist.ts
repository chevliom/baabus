export interface WishlistResponse {
	items: WishlistGraphQLItem[];
}

export interface WishlistGraphQLItem {
	id: string | number;
	variant: {
		name?: string;
		pricing?: {
			price?: {
				gross?: {
					amount?: number;
				};
			};
		};
	};
}
