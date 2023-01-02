import { formatMatch } from '$lib/util/formatStats';
import type { Match, Result } from '$lib/util/types';

export default (matches: Match[], matchUp: Match, result: Result) => {
    const matchIndex = matches.findIndex(
        (row) => row[0].split(',').sort().toString() === matchUp.sort().toString()
    );
    const match = formatMatch(matches[matchIndex]);

    const newGames = Number(match.games) + 1;

    if (result === 'WIN') {
        const newWins = Number(match.wins) + 1;
        match.wins = newWins.toString();
        match.winRate = ((newWins / newGames) * 100).toFixed(2).toString();
    }

    if (result === 'LOSS') {
        match.loses = (Number(match.loses) + 1).toString();
        match.winRate = ((Number(match.wins) / newGames) * 100).toFixed(2).toString();
    }

    return {
        range: `A${matchIndex + 1}:E${matchIndex + 1}`,
        update: [match.color, newGames.toString(), match.wins, match.loses, match.winRate]
    };
};
