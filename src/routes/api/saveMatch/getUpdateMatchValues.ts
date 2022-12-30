import type { Match, Result } from '$lib/util/types';

export default (matches: Match[], matchUp: Match, result: Result) => {
    const matchIndex = matches.findIndex(
        (row) => row[0].split(',').sort().toString() === matchUp.sort().toString()
    );
    let [color, games, wins, loses, winRate] = matches[matchIndex];

    const newGames = Number(games) + 1;

    if (result === 'WIN') {
        const newWins = Number(wins) + 1;
        wins = newWins.toString();
        winRate = ((newWins / newGames) * 100).toFixed(2).toString();
    }

    if (result === 'LOSS') {
        loses = (Number(loses) + 1).toString();
        winRate = ((Number(wins) / newGames) * 100).toFixed(2).toString();
    }

    return {
        range: `A${matchIndex + 1}:E${matchIndex + 1}`,
        update: [color, newGames.toString(), wins, loses, winRate]
    };
};
