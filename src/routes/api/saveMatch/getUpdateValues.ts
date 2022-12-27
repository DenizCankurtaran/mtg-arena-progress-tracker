import type { Match } from '$lib/util/types';

export default (matches: Match[], matchUp: Match, result: 'WIN' | 'LOSS') => {
	const matchIndex = matches.findIndex(
		(row) => row[0].split(',').sort().toString() === matchUp.sort().toString()
	);
	let [color, games, wins, loses, winrate] = matches[matchIndex];

	const newGames = Number(games) + 1;

	if (result === 'WIN') {
		const newWins = Number(wins) + 1;
		wins = newWins.toString();
		winrate = ((newWins / newGames) * 100).toFixed(2).toString();
	}

	if (result === 'LOSS') {
		loses = (Number(loses) + 1).toString();
		winrate = ((Number(wins) / newGames) * 100).toFixed(2).toString();
	}

	return {
		range: `A${matchIndex + 1}:E${matchIndex + 1}`,
		update: [color, newGames.toString(), wins, loses, winrate]
	};
};
