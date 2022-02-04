<script lang="ts">
	import { initializeApp } from "firebase/app"
	import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth"
	import { onMount } from "svelte";
	import Navbar from "./Navbar.svelte";
	import "../app.css"

	let user: Object;

	//Empty declaration of the function since the Svelte compiler returns an error because it doesnt't exist before 'onMount()' is called
	let signInGoogle = () => {

	}
	//Firebase Auth had to be called on full page load, otherwise it causes an error
	onMount(() => {
		const firebaseConfig = {
			apiKey: "AIzaSyDUSbTgI1wGD1TYzCesfBq7icJ4wgVZzHs",
			authDomain: "watchify-bba94.firebaseapp.com",
			projectId: "watchify-bba94",
			storageBucket: "watchify-bba94.appspot.com",
			messagingSenderId: "982207288610",
			appId: "1:982207288610:web:d8374da5a914be9b0a017b",
		};

		const app = initializeApp(firebaseConfig)
		const provider = new GoogleAuthProvider()
		const auth = getAuth(app)

		signInGoogle = () => {
			signInWithRedirect(auth, provider)
		};

		getRedirectResult(auth).then((result) => {
			user = result!.user.displayName!
		});
	})
</script>

<main>
	<Navbar></Navbar>
	<h1>Auth Page</h1>
	{#if typeof user != "undefined"}
		Welcome {user}<br>
	{/if}
	<button class="bg-teal-500 p-3 text-white" on:click={signInGoogle}>Sign In with Google</button>
</main>