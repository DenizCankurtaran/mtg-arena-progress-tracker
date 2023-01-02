import { GOOGLE_APPLICATION_CREDENTIALS } from '$env/static/private';
import getStats from '$lib/server/getStats';
import { json, type RequestHandler } from '@sveltejs/kit';
import getColorEntry from './getColorEntry';
import insertNewMatch from './insertNewMatch';
import updateExistingMatch from './updateExistingMatch';

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request }) => {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS;
    const { result, matchUp } = await request.json();

    const stats = await getStats();
    if (!stats) {
        return json({ status: 500, body: 'Something went wrong' });
    }

    const colors = getColorEntry(stats.matches, matchUp);
    if (colors.length === 0) {
        await insertNewMatch(stats, matchUp, result);

        return json({ status: 200, body: 'Match added' });
    }
    if (colors.length === 1) {
        await updateExistingMatch(stats, matchUp, result);

        return json({ status: 200, body: 'Match updated' });
    }

    return json({ status: 200, body: 'ok' });
};
