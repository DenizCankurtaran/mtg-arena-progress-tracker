import type { Rank } from './types';

const getRankName = (rankLetter: string) => {
    switch (rankLetter) {
        case 'b':
            return 'Bronze';
        case 's':
            return 'Silver';
        case 'g':
            return 'Gold';
        case 'p':
            return 'Platinum';
        case 'd':
            return 'Diamond';
        case 'm':
            return 'Mythic';
    }
};

export default (rank: Rank) => {
    const currentStats = rank[2].split('-');
    const rankInformation = currentStats[0].split('');

    const rankName = getRankName(rankInformation[0]);

    return `${rankName} Tier ${rankInformation[1]}`;
};

export const getStartingRank = (rank: Rank) => {
    const currentStats = rank[1].split('-');
    const rankInformation = currentStats[0].split('');

    const rankName = getRankName(rankInformation[0]);

    return `${rankName} Tier ${rankInformation[1]}`;
};
