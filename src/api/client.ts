import * as dotenv from 'dotenv';
dotenv.config();

const formID = process.env.FORM_ID;
const apiKey = process.env.GOOGLE_API_KEY;
const clientId = process.env.GOOGLE_CLIENT_ID;

export default function start() {
	// 2. Initialize the JavaScript client library.
	gapi.client
		.init({
			apiKey,
			clientId,
			scope: 'https://www.googleapis.com/auth/forms.metadata.readonly',
			discoveryDocs: [
				'https://forms.googleapis.com/$discovery/rest?version=v1',
			],
		})
		.then(function () {
			// 3. Initialize and make the API request.
			return gapi.client.request({
				path: `https://forms.googleapis.com/v1/forms/${formID}/responses`,
				method: 'GET',
			});
		})
		.then(
			function (response) {
				console.log(response);
			},
			function (reason) {
				console.log('Error: ', reason);
			}
		);
}
