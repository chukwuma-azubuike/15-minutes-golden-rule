// import * as dotenv from 'dotenv';
// dotenv.config();

// const formID = process.env.FORM_ID;
// const apiKey = process.env.GOOGLE_API_KEY;
// const clientId = process.env.GOOGLE_CLIENT_ID;

export default function start() {
	// 2. Initialize the JavaScript client library.
	gapi.client
		.init({
			apiKey: 'AIzaSyCJFF618P0Q3M5qeY7tb14GgvNMl-szkSY',
			clientId:
				'61218344566-h38gf1kg3ajdnknf00sudovsmhorgu0s.apps.googleusercontent.com',
			scope: 'https://www.googleapis.com/auth/forms.metadata.readonly',
			discoveryDocs: [
				'https://forms.googleapis.com/$discovery/rest?version=v1',
			],
		})
		.then(function () {
			// 3. Initialize and make the API request.
			return gapi.client.request({
				path: `https://forms.googleapis.com/v1/forms/1bLGHTRrd0Yu9mLtiNpjy7himhIMVoyV4EBvBhAW5F1I/responses`,
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
// 1. Load the JavaScript client library.
// gapi.load('client', start);

// /// <reference path="../../node_modules/@types/gapi/index.d.ts" />
// declare var gapi;

// import * as dotenv from 'dotenv';
// dotenv.config();

// const formID = process.env.FORM_ID;
// const apiKey = process.env.GOOGLE_API_KEY;
// const clientId = process.env.GOOGLE_CLIENT_ID;

// export default function start() {
// 	// 2. Initialize the JavaScript client library.
// 	gapi.client
// 		.init({
// 			apiKey: 'AIzaSyCJFF618P0Q3M5qeY7tb14GgvNMl-szkSY',
// 			clientId:
// 				'61218344566-h38gf1kg3ajdnknf00sudovsmhorgu0s.apps.googleusercontent.com',
// 			scope: 'forms',
// 			// discoveryDocs: [
// 			// 	'https://forms.googleapis.com/$discovery/rest?version=v1',
// 			// ],
// 		})
// 		.then(function () {
// 			// 3. Initialize and make the API request.
// 			return gapi.client.request({
// 				path: 'https://forms.googleapis.com/v1/forms/1bLGHTRrd0Yu9mLtiNpjy7himhIMVoyV4EBvBhAW5F1I/responses',
// 				// path: `/v1/forms/1bLGHTRrd0Yu9mLtiNpjy7himhIMVoyV4EBvBhAW5F1I/responses`,
// 				method: 'GET',
// 			});
// 		})
// 		.then(
// 			function (response) {
// 				console.log(response);
// 			},
// 			function (reason) {
// 				console.log('Error: ' + JSON.stringify(reason, null, 4));
// 			}
// 		);
// }
// // 1. Load the JavaScript client library.
// // gapi.load('client', start);
