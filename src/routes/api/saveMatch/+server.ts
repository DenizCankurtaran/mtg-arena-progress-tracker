import { GOOGLE_APPLICATION_CREDENTIALS, SHEET_ID, SHEET_NAME } from '$env/static/private';
import getMatches from '$lib/server/getMatches';
import { json, type RequestHandler } from '@sveltejs/kit';
import { google } from 'googleapis';
import getUpdateValues from './getUpdateValues';

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request }) => {
	process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS;
	const { result, matchUp } = await request.json();

	const auth = await google.auth.getClient({
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});
	const sheets = google.sheets({ version: 'v4', auth });

	const savedMatches = await getMatches()
	if (!savedMatches) {
		return json({ status: 500, body: 'Something went wrong' });
	}
	const colors = savedMatches.filter((row) => {
		if (matchUp.length === 1) {
			return row[0] === matchUp[0];
		}
		return row[0].split(',').sort().toString() === matchUp.sort().toString();
	});
	
	if (colors.length === 0) {
		
		const response = await sheets.spreadsheets.values.append({
			spreadsheetId: SHEET_ID,
			range: `${SHEET_NAME}!A:E`,
			valueInputOption: 'USER_ENTERED',
			requestBody: {
				majorDimension: 'ROWS',
				values: [
					[
						matchUp.join(','),
						1,
						result === 'WIN' ? 1 : 0,
						result === 'LOSS' ? 1 : 0,
						result === 'WIN' ? 100 : 0
					]
				]
			}
		});

		return json({ status: 200, body: 'Match added' });
	}
	if (colors.length === 1) {
		const updateValues = getUpdateValues(savedMatches, matchUp, result)

		const response = await sheets.spreadsheets.values.update({
			spreadsheetId: SHEET_ID,
			range: `${SHEET_NAME}!${updateValues.range}`,
			valueInputOption: 'USER_ENTERED',
			requestBody: {
				majorDimension: 'ROWS',
				values: [updateValues.update]
			}
		});
		return json({ status: 200, body: 'Match updated' });
	}

	return json({ status: 200, body: 'ok' });
};
