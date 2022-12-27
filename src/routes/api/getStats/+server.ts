import { json, type RequestHandler } from '@sveltejs/kit';
import { google } from 'googleapis';
import { GOOGLE_APPLICATION_CREDENTIALS, SHEET_ID, SHEET_NAME } from '$env/static/private';
import getStats from '$lib/server/getStats';
 
/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request }) => {

	const stats = await getStats()

	if (!stats) {
		return json({status: 500})
	}

	return json({ status: 200, body: stats })
}