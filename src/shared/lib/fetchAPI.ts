	export async function fetchAPI(url = '', data, method = 'POST') {
		const options = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		}

		if(data) {
			options['body'] = JSON.stringify(data)
		}

		const response = await fetch(url, options);
		return response;
	}