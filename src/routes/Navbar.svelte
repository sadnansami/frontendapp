<script lang="ts">
	import Search32 from "carbon-icons-svelte/lib/Search32/Search32.svelte";
	import User32 from "carbon-icons-svelte/lib/User32/User32.svelte";
	import Model24 from "carbon-icons-svelte/lib/Model24/Model24.svelte";
	import Auth from "../classes/Auth";
	import { onMount } from "svelte";
	import 	"../app.css";

	let auth: Auth;
	let user: any;
	let res: any;

	//Empty declaration of the function since the Svelte compiler returns an error because it doesnt't exist before 'onMount()' is called
	//Firebase Auth had to be called on full page load, otherwise it causes an error
	onMount(async () => {
		auth = new Auth({
			apiKey: "AIzaSyDUSbTgI1wGD1TYzCesfBq7icJ4wgVZzHs",
			authDomain: "watchify-bba94.firebaseapp.com",
			projectId: "watchify-bba94",
			storageBucket: "watchify-bba94.appspot.com",
			messagingSenderId: "982207288610",
			appId: "1:982207288610:web:d8374da5a914be9b0a017b",
		})

		auth.handleRedirect()
	});

	let fillSearchSVGHover = true;
	let fillUserSVGHover = true;
	let userDropdownVisibility = false;

</script>

<main>
	<nav class="h-16 flex flex-row items-center justify-between bg-primary shadow-md shadow-black/25 mb-2">
		<a
			class="p-4 hover:bg-secondary transition-colors duration-500"
			href="/Browser"
			on:mouseenter={() => fillSearchSVGHover = !fillSearchSVGHover}
			on:mouseleave={() => fillSearchSVGHover = !fillSearchSVGHover}
		>
			<Search32 class="{fillSearchSVGHover ? "fill-white" : "fill-black"}"></Search32>
		</a>
		<a class="logotext transition-all duration-500 hover:text-secondary text-white text-center text-4xl font-thin" href="/">Watchify</a>
		<button
			class="p-4 hover:bg-white transition-colors duration-500"
			on:click={() => {
				userDropdownVisibility = !userDropdownVisibility
				//auth.signin();
			}}
			on:mouseenter={() => fillUserSVGHover = !fillUserSVGHover}
			on:mouseleave={() => fillUserSVGHover = !fillUserSVGHover}
		>
			<User32 class={fillUserSVGHover ? "fill-white" : "fill-black"}></User32>
		</button>
	</nav>
	<div class="bg-white {userDropdownVisibility ? "opacity-100" : "opacity-0"} transition-all duration-300 ease-in-out text-primary rounded-sm hover:rounded-sm w-48 divide-y divide-gray-200 absolute mt-2 right-2 drop-shadow-xl shadow-black/25">
		<div class="p-4 text-lg text-center"><Model24 class="fill-secondary inline"></Model24><span class="ml-2 inline">S. Adnan Sami</span></div>
		<a href="/User/2" class="block w-full py-3 pl-3 text-left transition-colors duration-200 text-primary/70 hover:bg-secondary hover:text-primary">Profile</a>
		<button class="block w-full py-3 pl-3 text-left transition-colors duration-200 text-rose-600 hover:bg-secondary hover:text-primary">Sign out</button>
	</div>
</main>

<style>
	main {
		height: auto;
		overflow: hidden;
	}
</style>