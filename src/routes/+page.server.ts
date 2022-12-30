import type { Match, Rank } from '$lib/util/types';
import type { PageServerLoad } from './$types';

type GetStatsResponse = {
	body: {
		matches: Match[];
		ranks: Rank[];
	};
};

export const load = (async ({ fetch }) => {
	const response = await fetch('/api/getStats');
	const { body }: GetStatsResponse = await response.json();

	return { ...body };
}) satisfies PageServerLoad;
