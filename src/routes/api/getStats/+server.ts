import { json, type RequestHandler } from '@sveltejs/kit';
import getStats from '$lib/server/getStats';

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async () => {
    const stats = await getStats();

    if (!stats) {
        return json({ status: 500 });
    }

    return json({ status: 200, body: stats });
};
