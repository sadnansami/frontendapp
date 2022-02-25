import FetchAPI from "./FetchAPI";

class Search {
	input!: string;
	matches: any;
	
	async searchWatches(): Promise<any> {
		this.matches = await FetchAPI.matchWatches(this.input)
		console.log("oijoi", this.matches)
	}

	async getMatches(): Promise<any> {
		return await this.matches
	}
};

export default Search;