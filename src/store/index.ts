import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/env';

export const usedWords: Writable<string[]> = writable([]);

export const mine: Writable<{ region: string; scoreCount: number }> = writable();

export const myCounter: Writable<number> = writable(browser ? localStorage.myCounter ? localStorage.myCounter : 0 : 0);