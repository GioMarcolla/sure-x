import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that merges multiple class names into a single string.
 * - Uses `clsx` to handle conditional class merging.
 * - Uses `twMerge` to dedupe/merge Tailwind utility classes safely.
 *
 * Note: ensure imports use the default `clsx` export and that inputs are spread into `clsx`.
 * Passing an array directly would make `clsx` receive a single array argument which can
 * lead to unexpected results or runtime errors depending on how it's invoked.
 *
 * @param {ClassValue[]} inputs - A variable number of class names.
 * @returns {string} - A single string containing all the input class names.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(...inputs));
}
