export type Match = string[]

export const isMatch = (match: any[]): match is Match => match.every(el => typeof el === "string")

export const isMatches = (matches: any[][]): matches is Match[] => matches.every(el => isMatch(el))