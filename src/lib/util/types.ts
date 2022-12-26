export type Match = string[]

export const isMatch = (match: any[]): match is Match => match.every(el => typeof el === "string")

export const isMatches = (matches: any[][]): matches is Match[] => matches.every(el => isMatch(el))

export enum Column {
	COLOR = 0,
	GAMES = 1,
	WINS = 2,
	LOSES = 3,
	WINRATE = 4
}

export type Mana = 'white' | 'black' | 'green' | 'red' | 'blue'