import { writable, type Writable } from "svelte/store";
import type { Match } from "./types";

export const matches: Writable<Match[]> = writable([[]])