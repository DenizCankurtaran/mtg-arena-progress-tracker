import { json, type RequestHandler } from '@sveltejs/kit';
import { google } from 'googleapis';
import { GOOGLE_APPLICATION_CREDENTIALS, SHEET_ID, SHEET_NAME } from '$env/static/private';
import getMatches from '$lib/server/getMatches';
 
/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request }) => {

	const matches = await getMatches()

	if (!matches) {
		return json({status: 500})
	}

	return json({ status: 200, body: matches })
}