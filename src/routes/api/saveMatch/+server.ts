//import { GOOGLE_APPLICATION_CREDENTIAL } from '$lib/server/secrets';
//import secret from '$lib/server/secrets.json'
import { json, type RequestHandler } from '@sveltejs/kit';
import { google } from 'googleapis';
 
/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request }) => {
	const auth = await google.auth.getClient();
	//console.log(secret.private_key);
  return json({ status: 200, body: 'ok' })
}