export interface IAuthConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
}

export interface IUser {
	user_id: string,
	user: string,
	email: string,
	stripe_id?: string,
	status?: string,
}

export type Price = [
	{
		date: string,
		price: number,
	}
]