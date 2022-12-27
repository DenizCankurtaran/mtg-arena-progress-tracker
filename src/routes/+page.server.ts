import { matches } from '$lib/server/store';
import type { Match } from '$lib/util/types';
import type { PageServerLoad } from './$types';

export const load = ( async ({ fetch }) => {
	const response = await fetch('/api/getMatches');
	const { body }: { body: Match[] } = await response.json()

	matches.set(body)

	return {
		matches: body
	}
}) satisfies PageServerLoad