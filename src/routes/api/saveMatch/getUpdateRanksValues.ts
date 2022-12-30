import type { Result, Stats } from '$lib/util/types';

const calculateTier = (oldTier: Number, result: Result) => {
	if (result === 'LOSS') {
		switch (oldTier) {
			case 1:
				return '2';
			case 2:
				return '3';
			case 3:
				return '4';
			case 4:
				return '4';
			default:
				return '';
		}
	} else {
		switch (oldTier) {
			case 4:
				return '3';
			case 3:
				return '2';
			case 2:
				return '1';
			case 1:
				return '4';
			default:
				return '';
		}
	}
};

const calculateRank = (rank: string) => {
	switch (rank) {
		case 'b':
			return 's';
		case 's':
			return 'g';
		case 'g':
			return 'p';
		case 'p':
			return 'd';
		case 'd':
			return 'm';
		default:
			return '';
	}
};

const getNewRank = (currentRank: string, result: Result) => {
	const currentStats = currentRank.split('-');
	const rankAndTier = currentStats[0];

	const rank = rankAndTier.split('')[0];
	const tier = Number(rankAndTier.split('')[1]);

	const steps = Number(currentStats[1]);

	if (result === 'LOSS') {
		if (steps > 0) {
			const newSteps = steps - 1;
			return `${rankAndTier}-${newSteps}`;
		} else {
			const newSteps = tier < 4 ? 6 : 0;
			const newTier = calculateTier(tier, result);
			return `${rank}${newTier}-${newSteps}`;
		}
	}

	let increaseRate = 1;
	if (rank.startsWith('b') || rank.startsWith('s') || rank.startsWith('g')) {
		increaseRate = 2;
	}

	const newSteps = steps + increaseRate;
	if (newSteps >= 6) {
		const newTier = calculateTier(tier, result);
		let newRank = rank;
		if (newTier === '4') {
			newRank = calculateRank(rank);
		}
		return `${newRank}${newTier}-${newSteps % 6}`;
	}
	return `${rank}${tier}-${newSteps}`;
};

export default (stats: Stats, result: Result) => {
	const lastRow = stats.ranks[stats.ranks.length - 1];
	const lastRowDate = new Date(lastRow[0]);
	const oneDay = 1000 * (60 * 60) * 24;

	if (new Date().getTime() - lastRowDate.getTime() > oneDay) {
		const newDate = new Date().toISOString().split('T')[0];
		return {
			range: `H${stats.ranks.length + 1}:N${stats.ranks.length + 1}`,
			update: [
				newDate,
				lastRow[2],
				getNewRank(lastRow[2], result),
				result === 'WIN' ? 1 : 0,
				result === 'LOSS' ? 1 : 0,
				1,
				result === 'WIN' ? 100 : 0
			]
		};
	} else {
		let [date, rankStart, rank, wins, loses, games, winRate] = lastRow;

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
			range: `H${stats.ranks.length}:N${stats.ranks.length}`,
			update: [date, rankStart, getNewRank(rank, result), wins, loses, newGames.toString(), winRate]
		};
	}
};
