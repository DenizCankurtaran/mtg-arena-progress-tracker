import type { Match } from '$lib/util/types';
import { writable, type Writable } from 'svelte/store';

export const matches: Writable<Match[]> = writable([[]]);