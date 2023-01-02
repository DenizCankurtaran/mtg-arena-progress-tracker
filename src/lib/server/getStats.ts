import { GOOGLE_APPLICATION_CREDENTIALS, SHEET_ID, SHEET_NAME } from '$env/static/private';
import { google } from 'googleapis';

export default async () => {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS;

    const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: SHEET_ID,
        ranges: [`${SHEET_NAME}!A:E`, `${SHEET_NAME}!H:N`],
        majorDimension: 'ROWS'
    });

    if (
        !response.data.valueRanges ||
        !response.data.valueRanges[0].values ||
        !response.data.valueRanges[1].values
    ) {
        return undefined;
    }

    return {
        matches: response.data.valueRanges[0].values,
        ranks: response.data.valueRanges[1].values
    };
};
