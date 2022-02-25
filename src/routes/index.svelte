<script lang="ts">
	import { onMount } from "svelte";
	import Search32 from "carbon-icons-svelte/lib/Search32/Search32.svelte";
	import Unlocked32 from "carbon-icons-svelte/lib/Unlocked32/Unlocked32.svelte";
	import Close32 from "carbon-icons-svelte/lib/Close32/Close32.svelte";
	import Model24 from "carbon-icons-svelte/lib/Model24/Model24.svelte";
	import ChevronDown32 from "carbon-icons-svelte/lib/ChevronDown32/ChevronDown32.svelte";
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
	import FetchAPI from "../classes/FetchAPI";
	import Search from "../classes/Search";
	import 	"../app.css";
	import Auth from "../classes/Auth";

	//watches is supposed to be of type "Array<Object>" however at compile time, Typescript is unaware of data received on loading the website
	let watches: any;
	let auth: Auth;

	const search = new Search()
	ScrollTrigger.refresh()
	gsap.registerPlugin(ScrollTrigger)


	onMount(async () => {
		watches = await FetchAPI.readWatches()

		auth = new Auth({
			apiKey: "AIzaSyDUSbTgI1wGD1TYzCesfBq7icJ4wgVZzHs",
			authDomain: "watchify-bba94.firebaseapp.com",
			projectId: "watchify-bba94",
			storageBucket: "watchify-bba94.appspot.com",
			messagingSenderId: "982207288610",
			appId: "1:982207288610:web:d8374da5a914be9b0a017b",
		})

		auth.handleRedirect()

		gsap.from(
			".herotextleft",
			{
				opacity: 0,
				duration: 1,
				x: -300,
				delay: 0.1
			}
		)

		gsap.from(
			".herotextright",
			{
				opacity: 0,
				duration: 1,
				x: 300,
				delay: 0.1
			}
		)

		gsap.from(
			".card",
			{
				opacity: 0,
				duration: 1,
				y: -100,
				stagger: 1,
				delay: 1
			}
		)

		
	})
	
	let overlayVisibility = false;
	let fillSearchSVGHover = true;
	let fillUserSVGHover = true;
	let bgSearchHover = true
	let userDropdownVisibility = false;

	const toggleSearch = (e: any) => {
		overlayVisibility = !overlayVisibility
		bgSearchHover = !bgSearchHover
	}


	//Checks if 'window' object exists (it only does in the browser) since the 'gsap' module only executes in the browser as opposed to server-side
	if(typeof window != "undefined") {
		

	}
</script>

<main class="snap-y snap-mandatory scroll-smooth">
	<a
		class="top-4 left-4 fixed z-30 {overlayVisibility ? "visible" : "invisible"} text-white"
		href="/#"
		on:click={toggleSearch}
	>
		<Close32 class="fill-white inline"></Close32><span class="inline text-white align-middle text-lg">Close</span>
	</a>
	<div id="isOverlayHidden" class="
		top-0 left-0 bottom-0 right-0 h-screen w-screen fixed z-20 flex justify-center items-center {overlayVisibility ? "visible" : "invisible"}
	">
		<div class="h-full w-full absolute z-3 bg-black/60 backdrop-blur-md transition-all duration-500"></div>
		<div class="h-16 w-3/5 relative">
			<Search32 class="fill-white backdrop-blur-none absolute translate-y-1/2 right-8 z-10"></Search32>
			<input
				type="text"
				name="searchbar"
				spellcheck="false"
				id="searchbar"
				bind:value={search.input}
				on:input={(e) => {
					//JS in-built function to prevent calling this block of code upon page load
					e.preventDefault()
					search.searchWatches()
				}}
				class="
					h-full w-full selection:bg-white selection:text-black bg-gradient-to-r from-gray-400/25
					to-gray-400/5 focus:bg-white/10 bg-transparent backdrop-blur-lg rounded-[0.2rem] shadow-xl
					shadow-black/10 transition-all duration-500 focus:text-white/75 text-white/60 text-2xl px-20
					font-light text-center tracking-wider">
			{#await search.getMatches() then matches}
				{console.log(matches)}
				{#if matches}
					{#each matches as match}
						<span class="text-white">{match.name}</span>
					{/each}
				{/if}
			{/await}
		</div>
	</div>
	<div 
		class="snap-start snap-always h-screen w-auto bg-cover bg-center bg-fixed relative parallax"
		style="background-image: url('./herobg.jpg')">
		<nav class="h-16 flex flex-row items-center justify-between">
			<button
				class="p-4 hover:{bgSearchHover ? "bg-white" : ""} transition-all duration-500"
				href="/#"
				on:click={toggleSearch}
				on:mouseenter={() => fillSearchSVGHover = !fillSearchSVGHover}
				on:mouseleave={() => fillSearchSVGHover = !fillSearchSVGHover}
			>
				<Search32 class={fillSearchSVGHover ? "fill-white" : "fill-black"}></Search32>
			</button>
			<h1 class="text-white text-center text-4xl font-thin">Watchify</h1>
			<button
				class="p-4 hover:bg-white transition-colors duration-500"
				on:click={() => {
					userDropdownVisibility = !userDropdownVisibility
					//auth.signin();
				}}
				on:mouseenter={() => fillUserSVGHover = !fillUserSVGHover}
				on:mouseleave={() => fillUserSVGHover = !fillUserSVGHover}
			>
				<Unlocked32 class={fillUserSVGHover ? "fill-white" : "fill-black"}></Unlocked32>
			</button>
		</nav>
		<div class="bg-white {userDropdownVisibility ? "opacity-100" : "opacity-0"} transition-all duration-300 ease-in-out text-primary rounded-sm hover:rounded-sm w-48 divide-y divide-gray-200 absolute mt-2 right-2 drop-shadow-xl shadow-black/25">
			<div class="p-4 text-lg text-center"><Model24 class="fill-secondary inline"></Model24><span class="ml-2 inline">S. Adnan Sami</span></div>
			<a href="/User/2" class="block w-full py-3 pl-3 text-left transition-colors duration-200 text-primary/70 hover:bg-secondary hover:text-primary">Profile</a>
			<button class="block w-full py-3 pl-3 text-left transition-colors duration-200 text-rose-600 hover:bg-secondary hover:text-primary">Sign out</button>
		</div>
		<div class="pt-24 md:pt-0 md:px-10 flex flex-col items-center md:items-start text-center md:text-left md:flex-none">
			<h1 class="
				herotext text-5xl md:text-[7.5rem] lg:text-[8rem] herotextleft font-thin tracking-wide text-white
				leading-[4rem] md:leading-[1.25]">
				Redefining
			</h1>
			<h1 class="
				herotext text-5xl md:text-[7.5rem] lg:text-[8rem] herotextright md:absolute md:bottom-0 md:right-10
				leading-[4rem] md:leading-[1.25] font-thin tracking-wide text-white md:text-right">
				Watch<br>
				Collections
			</h1>	
		</div>
		<button class="border-2 border-white md:hidden">
			<ChevronDown32 class="fill-white"></ChevronDown32>			
		</button>
	</div>
	<div class="snap-start snap-always h-full max-h-full py-20 overflow-x-clip relative" id="browse">
		<h1 class="font-extralight tracking-wider text-4xl text-primary text-center">Newly Added!</h1>
		<div class="h-full w-64 absolute z-10 top-0 bg-gradient-to-r from-white"></div>
		<div class="h-full w-64 absolute z-10 top-0 right-0 bg-gradient-to-l from-white"></div>
		<div class="h-[0.125rem] w-12 bg-secondary mx-auto mt-2"></div>
		<div class="flex flex-row place-items-center h-full w-full px-36 gap-8 overflow-x-auto snap-x snap-mandatory">
			{#if watches}
				{#each watches as watch}
					<a 
						href="/Watch/{watch.data.watch_id}"
						class="
							snap-center snap-always card h-96 aspect-square bg-center bg-cover rounded-xl shadow-lg
							shadow-black/25 transition-all duration-500 hover:scale-105 hover:shadow-xl
							hover:shadow-black/40 hover:bg-black/60 bg-blend-darken text-white/0
							hover:text-white/100 flex flex-col items-center justify-center" 
						style="background-image: url('./watchImages/{watch.data.image}');">
						<span class="text-3xl text-center">{watch.data.watch_name}<br>
							<span class="text-lg opacity-75">by {watch.data.brand_name}</span>
						</span>
					</a>
				{/each}
			{/if}
			{#if watches}
				{#each watches as watch}
					<a 
						href="/Watch/{watch.data.watch_id}" 
						class="
							snap-center snap-always card h-96 aspect-square bg-center bg-cover rounded-xl shadow-lg
							shadow-black/25 transition-all duration-500 hover:scale-105 hover:shadow-xl
							hover:shadow-black/40 hover:bg-black/60 bg-blend-darken text-white/0
							hover:text-white/100 flex flex-col items-center justify-center" 
						style="background-image: url('./watchImages/{watch.data.image}');">
						<span class="text-3xl text-center">{watch.data.watch_name}<br>
							<span class="text-lg opacity-75">by {watch.data.brand_name}</span>
						</span>
					</a>
				{/each}
			{/if}
			{#if watches}
				{#each watches as watch}
					<a 
						href="/Watch/{watch.data.watch_id}" 
						class="
							snap-center snap-always card h-96 aspect-square bg-center bg-cover rounded-xl shadow-lg
							shadow-black/25 transition-all duration-500 hover:scale-105 hover:shadow-xl
							hover:shadow-black/40 hover:bg-black/60 bg-blend-darken text-white/0
							hover:text-white/100 flex flex-col items-center justify-center" 
						style="background-image: url('./watchImages/{watch.data.image}');">
						<span class="text-3xl text-center">{watch.data.watch_name}<br>
							<span class="text-lg opacity-75">by {watch.data.brand_name}</span>
						</span>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</main>

<style lang="postcss">
	.herotext {
		font-family: "Playfair Display";
	}

	@media (max-width:767px) {
	.parallax {
		background-attachment: scroll;
	}
}
</style>