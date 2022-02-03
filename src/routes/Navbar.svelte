<script lang="ts">
	import Search32 from "carbon-icons-svelte/lib/Search32/Search32.svelte";
	import User32 from "carbon-icons-svelte/lib/User32/User32.svelte";
	import 	"../app.css";

	let fillSearchSVGHover = ""
	let fillUserSVGHover = ""

</script>

<main>
	<nav class="h-16 flex flex-row items-center justify-between bg-black shadow-md shadow-black/25 mb-2">
		<a class="p-4 hover:bg-white transition-colors duration-500" href="/Browser" on:mouseleave={() => {fillSearchSVGHover = ""}} on:mouseenter={() => {fillSearchSVGHover = "fill-black"}}><Search32 class="{fillSearchSVGHover} fill-white"></Search32></a>
		<a class="text-white text-center text-4xl font-thin" href="/">Watchify</a>
		<a class="p-4 hover:bg-white transition-colors duration-500" href="/Auth" on:mouseleave={() => {fillUserSVGHover = ""}} on:mouseenter={() => {fillUserSVGHover = "fill-black"}}><User32 class="{fillUserSVGHover} fill-white"></User32></a>
	</nav>


</main>

<style>
	main {
		height: auto;
		overflow: hidden;
	}
</style>