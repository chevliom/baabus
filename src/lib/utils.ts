// utils/index.ts (or lib/index.ts)

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for merging Tailwind class names
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Formats a Date or a timestamp into a medium date style.
 * @param date The date to format, either a Date object or a timestamp (number).
 * @returns A string representing the formatted date.
 */
export const formatDate = (date: Date | number): string => {
	return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
};

/**
 * Formats a number as a currency value based on the given currency.
 * @param amount The amount of money to format.
 * @param currency The currency code (e.g., 'USD', 'EUR').
 * @returns A string representing the formatted money.
 */
export const formatMoney = (amount: number, currency: string): string => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount);
};

export interface Money {
	amount: number;
	currency: string;
}

/**
 * Format a money range with start and/or stop values.
 * • If both are present and equal, returns a single value.
 * • If both are present and different, returns “start – stop”.
 * • If only one is present, returns that one.
 * • If neither is present, returns undefined.
 *
 * @example
 * formatMoneyRange({ start: { amount: 5, currency: "USD" }, stop: { amount: 10, currency: "USD" } })
 * // “$5.00 – $10.00”
 */
/**
 * Formats a range of money values, either the same or different, into a string.
 * @param range The range containing a start and stop value, both with amounts and currencies.
 * @returns A string representing the formatted money range.
 */
export const formatMoneyRange = (
	range: {
		start?: { amount: number; currency: string } | null;
		stop?: { amount: number; currency: string } | null;
	} | null,
): string => {
	const { start, stop } = range || {};
	const startMoney = start && formatMoney(start.amount, start.currency);
	const stopMoney = stop && formatMoney(stop.amount, stop.currency);

	if (startMoney === stopMoney) {
		return startMoney;
	}

	return `${startMoney} - ${stopMoney}`;
};

/**
 * Generates a URL for a product variant, including the product slug and optional variant ID.
 * @param productSlug The slug of the product.
 * @param variantId The optional variant ID.
 * @returns The generated URL string.
 */
export function getHrefForVariant({
	productSlug,
	variantId,
}: {
	productSlug: string;
	variantId?: string;
}): string {
	const pathname = `/products/${encodeURIComponent(productSlug)}`;

	if (!variantId) {
		return pathname;
	}

	const query = new URLSearchParams({ variant: variantId });
	return `${pathname}?${query.toString()}`;
}
