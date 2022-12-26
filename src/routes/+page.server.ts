import type { Match } from '$lib/util/types';
import type { Load } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = ( async ({ fetch }) => {
	const response = await fetch('/api/getMatches');
	const { body }: { body: Match[] } = await response.json()

	return {
		matches: body
	}
}) satisfies PageServerLoad