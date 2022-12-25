import { json, type RequestHandler } from '@sveltejs/kit';
import { google } from 'googleapis';
import { GOOGLE_APPLICATION_CREDENTIALS, SHEET_ID } from '$env/static/private';
 
/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request }) => {


	process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS
	//console.log(process.env);
	//console.log(GOOGLE_APPLICATION_CREDENTIALS);
	
  	// return json({ status: 200, body: 'ok' })
	const auth = await google.auth.getClient({scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']});

	const sheets = google.sheets({version: 'v4', auth});

	const range = `Sheet1!A1:B1`;

	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: SHEET_ID,
		range,

	})
	console.log(response);
	

	//console.log(secret.private_key);
  return json({ status: 200, body: 'ok' })
}