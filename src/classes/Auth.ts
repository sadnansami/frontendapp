import { initializeApp } from "firebase/app"
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth"
import FetchAPI from "./FetchAPI";
import type { IAuthConfig, IUser } from "./Interfaces";

class Auth {
	private config: IAuthConfig
	private app: any;
	private provider: any; 
	private auth: any;
	credentials: any;
	user!: IUser;

	constructor(config: IAuthConfig) {
		this.config = config
		this.app = initializeApp(this.config);
		this.provider = new GoogleAuthProvider();
		this.auth = getAuth(this.app);

	}

	signin() {
		signInWithRedirect(this.auth, this.provider)
	}

	async handleRedirect() {
		let result = await getRedirectResult(this.auth)

		if(result) {
			this.credentials = {
				user_id: result?.user.uid,
				user: result?.user.displayName,
				email: result?.user.email,
			}


			try{
				const isExistingUser = await FetchAPI.readUser(this.credentials.user_id)

				if(isExistingUser.length == 0) {
					const registerUser = await FetchAPI.createUser(this.credentials)
					this.user = registerUser
				} else {
					this.user = isExistingUser
				}

				console.log(this.user)

				return this.user

			} catch(err) {
				"Error: Unable to fetch user data!"
			}
			
			
		}

	}
}

export default Auth;