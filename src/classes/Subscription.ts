import FetchAPI from "./FetchAPI";
import Encoder from "./Utility/Encoder";

class Subscription {
	readonly CANCEL_URL = "https://example.com/cancel"
	readonly SUCCESS_URL = "https://example.com/success"
	readonly SUBSCRIPTION_ID = "price_1KS9hWBu4Bh3fxY7nvQq9CRx"
	readonly STRIPE_SECRET_KEY = "sk_test_51KNxK4Bu4Bh3fxY7fEiONJ2azGVdEKaNsrmZmQgMMT18dLkC03uTQehavVHg31AxlFysr5dIgNiyBD8F2yA4DY9R00s0Q1ycS9"
	requestBodyEncoded: string;
	stripe_id: string;

	constructor(stripe_id: string) {
		this.stripe_id = stripe_id

		let requestBody = {
			"cancel_url": this.CANCEL_URL,
			"success_url": this.SUCCESS_URL,
			"customer": this.stripe_id,
			"line_items[0][price]": this.SUBSCRIPTION_ID,
			"line_items[0][quantity]": "1",
			"mode": "subscription"
		}

		const encoder = new Encoder()
		this.requestBodyEncoded = encoder.encodeToURI(requestBody)
	}

	async payment(): Promise<any> {
		return await FetchAPI.createPaymentSession(this.requestBodyEncoded, this.STRIPE_SECRET_KEY!)
	}

}

export default Subscription;