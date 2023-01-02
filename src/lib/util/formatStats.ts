import type { Match, Rank } from './types';

export const formatMatch = (match: Match) => {
    return {
        color: match[0],
        games: match[1],
        wins: match[2],
        loses: match[3],
        winRate: match[4]
    };
};

export const formatRank = (rank: Rank) => {
    return {
        date: rank[0],
        rankStart: rank[1],
        rank: rank[2],
        wins: rank[3],
        loses: rank[4],
        games: rank[5],
        winRate: rank[6]
    };
};
