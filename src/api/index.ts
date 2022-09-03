'use strict';

const path = require('path');
const google = require('@googleapis/forms');
const { authenticate } = require('@google-cloud/local-auth');
require('dotenv').config();

const formID = process.env.FORM_ID;

async function getResponseList() {
	const auth = await authenticate({
		keyfilePath: path.join(__dirname, 'credentials.json'),
		scopes: 'https://www.googleapis.com/auth/forms.responses.readonly',
	});

	const forms = google.forms({
		version: 'v1',
		auth: auth,
	});

	const res = await forms.forms.responses.list({
		formId: formID,
	});

	console.log(res.data);

	return res.data;
}

if (module === require.main) {
	getResponseList().catch(console.error);
}

export default getResponseList;
