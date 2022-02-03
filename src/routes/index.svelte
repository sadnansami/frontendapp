<script lang="ts">
	import axios from "axios";
	import { onMount } from "svelte";
	import Search32 from "carbon-icons-svelte/lib/Search32/Search32.svelte";
	import User32 from "carbon-icons-svelte/lib/User32/User32.svelte";
	import Close32 from "carbon-icons-svelte/lib/Close32/Close32.svelte";
	import 	"../app.css";

	//watches is supposed to be of type "Array<Object>" however at compile time, Typescript is unaware of data received on loading the website
	let watches: any;

	onMount(async () => {
		axios.get("http://localhost:2000/readwatches").then((res) => {
			watches = res.data
			console.log(watches, typeof watches)
		})
	})

	let searchOverlay = "invisible"
	let fillSearchSVGHover: string | null;
	let fillUserSVGHover: string | null;

	const toggleSearch = (e: any) => {
		if(searchOverlay == "invisible") {
			searchOverlay = "visible";
			fillSearchSVGHover = null;
		} else {
			searchOverlay = "invisible";
		}
	}
</script>

<main class="snap-y snap-mandatory scroll-smooth">
	<a class="top-4 right-4 fixed z-30 {searchOverlay}" href="/#" on:click={toggleSearch}><Close32 class="fill-white"></Close32></a>
	<div id="overlay" class="top-0 left-0 bottom-0 right-0 h-screen w-screen fixed z-20 flex justify-center items-center {searchOverlay}">
		<div class="h-full w-full absolute z-3 bg-black/60 backdrop-blur-md transition-all duration-500 overflow-clip"></div>
		<div class="h-16 w-3/5 relative">
			<Search32 class="fill-white backdrop-blur-none absolute translate-y-1/2 right-8 z-10"></Search32>
			<input type="text" name="searchbar" spellcheck="false" id="searchbar" class="h-full w-full selection:bg-white selection:text-black bg-gradient-to-r from-gray-400/25 to-gray-400/5 focus:bg-white/10 bg-transparent backdrop-blur-lg rounded-[0.2rem] shadow-xl shadow-black/10 transition-all duration-500 focus:text-white/75 text-white/60 text-2xl px-20 font-light text-center tracking-wider">
		</div>
	</div>
	<div class="snap-start snap-always h-screen w-auto bg-cover bg-center bg-fixed relative" style="background-image: url('./herobg.jpg')">
		<nav class="h-16 flex flex-row items-center justify-between">
			<a class="p-4 hover:bg-white transition-colors duration-500" href="/#" on:click={toggleSearch} on:mouseleave={() => {fillSearchSVGHover = null}} on:mouseenter={() => {fillSearchSVGHover = "fill-black"}}><Search32 class="{fillSearchSVGHover} fill-white"></Search32></a>
			<h1 class="text-white text-center text-4xl font-thin">Watchify</h1>
			<a class="p-4 hover:bg-white transition-colors duration-500" href="/Auth" on:mouseleave={() => {fillUserSVGHover = null}} on:mouseenter={() => {fillUserSVGHover = "fill-black"}}><User32 class="{fillUserSVGHover} fill-white"></User32></a>
		</nav>
		<div class="px-10">
			<h1 class="herotext hover:transition-transform hover:ease-in-out hover:duration:700 focus:translate-x-5 font-thin tracking-wide text-white">Redefining</h1>
			<h1 class="herotext absolute bottom-0 right-10 font-thin tracking-wide text-white text-right">Watch<br>Collections</h1>	
		</div>
	</div>
	<div class="snap-start snap-always min-h-screen w-auto px-10 py-10" id="browse">
		<div class="min-h-screen grid grid-cols-3 grid-rows-3 gap-6">
			{#if watches}
				{#each watches as watch}
					<div class="aspect-square bg-center bg-cover rounded-xl shadow-lg shadow-black/25 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-black/40 hover:bg-black/50 bg-blend-darken text-white/0 hover:text-white/100 flex flex-col items-center justify-center" style="background-image: url('./watchImages/profesional-watches-gmt-master-ii.webp');">
						<span>{watch.name}</span>
					</div>
				{/each}
			{/if}
			
			<div class="aspect-square bg-center bg-cover rounded-xl shadow-lg shadow-black/25 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-black/40 hover:bg-black/50 bg-blend-darken" style="background-image: url('./watchImages/2190654.jpeg.transform.vacfwhd.webp');"></div>
			<div class="aspect-square bg-center bg-cover rounded-xl shadow-lg shadow-black/25 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-black/40 hover:bg-black/50 bg-blend-darken" style="background-image: url('./watchImages/4997_200G_001_12.jpg');"></div>
			<div class="aspect-square bg-center bg-cover rounded-xl shadow-lg shadow-black/25 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-black/40 hover:bg-black/50 bg-blend-darken" style="background-image: url('./watchImages/4947G_010_11.jpg');"></div>
		</div>
	</div>
</main>

<style lang="postcss">
	.herotext {
		font-family: "Playfair Display";
		font-size: 8rem;
	}
</style>