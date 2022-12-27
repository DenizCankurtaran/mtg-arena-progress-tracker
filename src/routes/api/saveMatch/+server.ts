import { GOOGLE_APPLICATION_CREDENTIALS, SHEET_ID } from '$env/static/private';
import { matches } from '$lib/server/store';
import { json, type RequestHandler } from '@sveltejs/kit';
import { google } from 'googleapis';
import { get } from 'svelte/store';

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request }) => {
	const {result, matchUp} = await request.json()
	
	console.log(get(matches), result, matchUp);
	const savedMatches = get(matches)
	const colors = savedMatches.filter((row) => row[0].includes(matchUp))
	console.log('colors', colors);
	
	
	/*
	process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS

	const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
	const sheets = google.sheets({ version: 'v4', auth });

	const response = await sheets.spreadsheets.values.append({
		spreadsheetId: SHEET_ID,
		range: 'Sheet1!A:C',
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			majorDimension: 'ROWS',
			values: [['test', 'hello']]
		},
	})
	console.log(response);
	*/
	return json({ status: 200, body: 'ok' })
}