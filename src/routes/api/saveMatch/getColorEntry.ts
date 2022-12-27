import type { Match } from '$lib/util/types';

export default (matches: Match[], matchUp: Match) =>
	matches.filter((row) => {
		if (matchUp.length === 1) {
			return row[0] === matchUp[0];
		}
		return row[0].split(',').sort().toString() === matchUp.sort().toString();
	});
