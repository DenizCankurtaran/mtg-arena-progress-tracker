import { GOOGLE_APPLICATION_CREDENTIALS, SHEET_ID, SHEET_NAME } from "$env/static/private";
import { json } from "@sveltejs/kit";
import { google } from "googleapis";

export default async () => {
	process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS

	const auth = await google.auth.getClient({scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']});
	const sheets = google.sheets({version: 'v4', auth});

	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: SHEET_ID,
		range: `${SHEET_NAME}!A:E`,
		majorDimension: 'ROWS'
	})

	return response.data.values
}