import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const usedWords: Writable<string[]> = writable([]);

export const mine: Writable<{ region: string; scoreCount: number }> = writable();

export const myCounter: Writable<number> = writable();