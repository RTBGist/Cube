export interface IData {
	login: string,
	password: string
}

export async function fetchAPI(url = '', data: IData | null, method = 'POST') {
		const options: RequestInit  = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		}

		if(data) {
			options.body = JSON.stringify(data)
		}

		const response = await fetch(url, options);
		return response;
	}