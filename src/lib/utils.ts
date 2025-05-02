// lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge and dedupe Tailwind CSS class names.
 *
 * @example
 * cn("p-4", "bg-white", isActive && "text-primary")
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

/**
 * Format a Date or timestamp to a medium-style date (e.g. “Apr 30, 2025”) in en-US.
 *
 * @example
 * formatDate(new Date())           // “Apr 30, 2025”
 * formatDate(1682832000000)        // “Apr 30, 2025”
 */
export const formatDate = (date: Date | number): string =>
	new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);

/**
 * Format a number as a currency string in en-US locale.
 *
 * @example
 * formatMoney(19.99, "USD")        // “$19.99”
 * formatMoney(1000, "EUR")         // “€1,000.00”
 */
export const formatMoney = (amount: number, currency: string): string =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount);

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
export const formatMoneyRange = (
	range: { start?: Money | null; stop?: Money | null } | null,
): string | undefined => {
	const { start, stop } = range ?? {};
	const startStr = start ? formatMoney(start.amount, start.currency) : undefined;
	const stopStr = stop ? formatMoney(stop.amount, stop.currency) : undefined;

	if (!startStr && !stopStr) return undefined;
	if (startStr === stopStr) return startStr;
	if (startStr && stopStr) return `${startStr} – ${stopStr}`;
	return startStr ?? stopStr;
};

/**
 * Build a product URL, optionally appending a `variant` query parameter.
 *
 * @example
 * getHrefForVariant({ productSlug: "widget", variantId: "blue" })
 * // "/products/widget?variant=blue"
 */
export function getHrefForVariant(args: { productSlug: string; variantId?: string }): string {
	const { productSlug, variantId } = args;
	const base = `/products/${encodeURIComponent(productSlug)}`;
	if (!variantId) return base;
	const params = new URLSearchParams({ variant: variantId });
	return `${base}?${params.toString()}`;
}
