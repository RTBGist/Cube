export async function fetchAPI(url = '', data = {}, method = 'POST') {
	const response = await fetch(url, {
		method: method,
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Accept-Language': 'en-RU,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,he;q=0.6',
			'Connection': 'keep-alive',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
}