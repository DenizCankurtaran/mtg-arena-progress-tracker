import { GOOGLE_APPLICATION_CREDENTIALS, SHEET_ID } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';
import { google } from 'googleapis';

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request }) => {
	process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS

	const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
	const sheets = google.sheets({ version: 'v4', auth });

	const resource = {
		id: 'test',
		date: JSON.stringify(new Date())
	}

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
	
	return json({ status: 200, body: 'ok' })
}