import { SHEET_ID, SHEET_NAME } from '$env/static/private';
import type { Match, Result, Stats } from '$lib/util/types';
import { google } from 'googleapis';
import getUpdateMatchValues from './getUpdateMatchValues';
import getUpdateRanksValues from './getUpdateRanksValues';

export default async (stats: Stats, matchUp: Match, result: Result) => {
	const auth = await google.auth.getClient({
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});
	const sheets = google.sheets({ version: 'v4', auth });

	const matchUpdate = getUpdateMatchValues(stats.matches, matchUp, result);
	const rankUpdate = getUpdateRanksValues(stats, result);

	const response = await sheets.spreadsheets.values.batchUpdate({
		spreadsheetId: SHEET_ID,
		requestBody: {
			valueInputOption: 'RAW',
			data: [
				{
					majorDimension: 'ROWS',
					values: [matchUpdate.update],
					range: `${SHEET_NAME}!${matchUpdate.range}`
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
