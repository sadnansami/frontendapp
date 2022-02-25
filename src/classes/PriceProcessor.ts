import type { Price } from "./Interfaces";

class PriceProcessor {
    price: Price

    constructor(price: Price) {
        this.price = price;
    }

    format(): any[] {
        let priceLabels: string[] = []
		let priceValue: number[] = []

		//Get the duration of the data in years
		const priceTimeFrame = parseInt(this.price.at(-1)!.date.slice(-4)) - parseInt(this.price[0].date.slice(-4))
		this.price.forEach((data: any) => {
			
			//The interval between the months in the data
			let interval: number
			if(priceTimeFrame < 1) {
				interval = 1
			} else {
				interval = 4
			}

			if(this.price.indexOf(data) % interval == 0) {
				priceLabels.push(data.date)
				priceValue.push(data.price)
			}
		});


		/*let testPrices: number[] = [];
		testPrices.push(Math.random() * 1000 * 3)

		console.log(priceLabels.length)

		for (let i = 1; i < priceLabels.length; i++) {
			testPrices.push(testPrices[i-1] + Math.random() * i)
		}

		priceValue = testPrices

		for (let i = 1; i < priceValue.length; i++) {
				priceValue[i] = Math.abs(priceValue[i] - priceValue[i-1])
		}
        */

        return [priceLabels, priceValue]
    }
}

export default PriceProcessor;