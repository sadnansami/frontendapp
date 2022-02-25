class Encoder {
    encodeToURI(string: Object) {
        let uriArray: string[] = [];
        Object
			.entries(string)
			.forEach(([key, value]) => {
				uriArray.push(encodeURIComponent(key) + "=" + encodeURIComponent(value))
			})

		let uriString = uriArray.join("&")

        return uriString
    }
}

export default Encoder;