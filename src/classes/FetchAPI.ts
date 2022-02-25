import type { IUser } from "./Interfaces"

class FetchAPI {
	static readonly BACKEND = "http://localhost:2000"
	
	//TypeScript does not support static classes, but making the constructor private emulates the purpose of a static class
	private constructor() {};

	static async readWatches(): Promise<any> {
		const res = await fetch(`${this.BACKEND}/watches`)

		return res.json()
	}

	static async matchWatches(pattern: string): Promise<any> {
		const res = await fetch(`${this.BACKEND}/watches/match/${pattern}`)
		
		return res.json()
	}

	static async createUser(user: IUser): Promise<any> {
		const res = await fetch(`${this.BACKEND}/users/`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})

		return res.json()
	}

	static async readUser(id: string): Promise<any> {
		const res = await fetch(`${this.BACKEND}/users/${id}`)

		return res.json()
	}

	static async createPaymentSession(body: string, secret_key: string): Promise<any> {
		return await fetch("https://api.stripe.com/v1/checkout/sessions", {
			method: "POST",
			body: body,
			credentials: "include",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": `Bearer ${secret_key}`
			}
		})
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			return data.url
		})
	}
}

export default FetchAPI;