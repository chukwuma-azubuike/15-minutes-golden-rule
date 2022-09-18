import { useEffect } from 'react';

const useGoogle = () => {
	useEffect(() => {
		const SCOPE = 'https://www.googleapis.com/auth/forms.metadata.readonly';
		const handleClientLoad = () =>
			window.gapi.load('client:auth2', initClient);

		const initClient = () => {
			const discoveryUrl =
				'https://forms.googleapis.com/$discovery/rest?version=v1';
			window.gapi.client.init({
				clientId:
					'61218344566-h38gf1kg3ajdnknf00sudovsmhorgu0s.apps.googleusercontent.com',
				discoveryDocs: [discoveryUrl],
				scope: SCOPE,
			});
			console.log('Google loaded');
		};

		const script = document.createElement('script');

		script.src = 'https://apis.google.com/js/api.js';
		script.async = true;
		script.defer = true;
		script.onload = handleClientLoad;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);
};

export default useGoogle;
