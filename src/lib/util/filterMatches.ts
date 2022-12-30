import type { Mana, Match } from './types';

export const sortMatchesDesc = (matches: Match[], columnIndex: number) =>
	matches.sort((matchA: any, matchB: any) => matchB[columnIndex] - matchA[columnIndex]);

export const sortMatchesAsc = (matches: Match[], columnIndex: number) =>
	matches.sort((matchA: any, matchB: any) => matchA[columnIndex] - matchB[columnIndex]);

export const filterByMana = (matches: Match[], selectedMana: Mana[]) =>
	matches.filter((row) => selectedMana.every((mana) => row[0].includes(mana)));
