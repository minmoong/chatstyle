import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const usedWords: Writable<string[]> = writable([]);