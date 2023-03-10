export type Match = string[];

export type Rank = string[];

export type Stats = {
    matches: Match[];
    ranks: Rank[];
};

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
    ASC = 2
}

export type Mana = 'white' | 'black' | 'green' | 'red' | 'blue' | 'colorless';

export type Result = 'WIN' | 'LOSS';
