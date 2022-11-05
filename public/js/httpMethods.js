class HttpMethods {
	async delete(url) {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
			},
		});

		return response;
	}

	async put(url, updateProduct) {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: updateProduct,
		});

		return response;
	}

	async post(url) {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
		});

		return response;
	}

	async get(url) {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			},
		});

		return response;
	}
}

export default HttpMethods;
