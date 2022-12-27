export type Match = string[]

export type Rank = string[]

export type Stats = {
	matches: Match[],
	ranks: Rank[]
}

export const isMatch = (match: any[]): match is Match => match.every(el => typeof el === "string")

export const isMatches = (matches: any[][]): matches is Match[] => matches.every(el => isMatch(el))

export enum Column {
	COLOR = 0,
	GAMES = 1,
	WINS = 2,
	LOSES = 3,
	WINRATE = 4
}

export enum SortLevel {
	OFF = 0,
	DESC = 1,
	ASC = 2,
}

export type Mana = 'white' | 'black' | 'green' | 'red' | 'blue'

export type Result = 'WIN' | 'LOSS'