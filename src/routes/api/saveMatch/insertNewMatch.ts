import { SHEET_ID, SHEET_NAME } from '$env/static/private';
import type { Match, Result, Stats } from '$lib/util/types';
import { google } from 'googleapis';
import getUpdateRanksValues from './getUpdateRanksValues';

export default async (stats: Stats, matchUp: Match, result: Result) => {
	const auth = await google.auth.getClient({
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});
	const sheets = google.sheets({ version: 'v4', auth });

	const rankUpdate = getUpdateRanksValues(stats, result);

	const response = await sheets.spreadsheets.values.batchUpdate({
		spreadsheetId: SHEET_ID,
		requestBody: {
			valueInputOption: 'USER_ENTERED',
			data: [
				{
					majorDimension: 'ROWS',
					values: [
						[
							matchUp.join(','),
							1,
							result === 'WIN' ? 1 : 0,
							result === 'LOSS' ? 1 : 0,
							result === 'WIN' ? 100.00 : 0.00
						]
					],
					range: `${SHEET_NAME}!A${stats.matches.length + 1}:E${stats.matches.length + 1}`
				},
				{
					majorDimension: 'ROWS',
					values: [rankUpdate.update],
					range: `${SHEET_NAME}!${rankUpdate.range}`
				}
			]
		}
	});
	return response;
};
