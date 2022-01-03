<script>
	import axios from "axios";
	import { onMount } from "svelte";
	import Search32 from "carbon-icons-svelte/lib/Search32/Search32.svelte";
	import 	"../app.css";

	let brands;
	let sum = [{e:"1"}, {e:"2"}, {e:"3"}]

	onMount(async () => {
		axios.get("http://localhost:2000/readbrands").then((res) => {
			brands = res.data
			console.log(brands, typeof brands)
		})
	})

	let name = "Adnan";
</script>

<main class="snap-y snap-mandatory scroll-smooth">
	<div class="snap-start snap-always h-screen w-auto bg-cover bg-center bg-fixed px-10" style="background-image: url('./herobg.jpg')">
		<nav class="h-16 flex flex-row items-center">
			<a class="basis-1/12" href="#search"><Search32 class="fill-white"></Search32></a>
			<h1 class="basis-10/12 text-white text-center text-4xl font-thin font-['Raleway']">Watchify</h1>
			<a class="basis-1/12" href="#account">b</a>
		</nav>
		<h1 class="herotext hover:transition-transform hover:ease-in-out hover:duration:700 font-thin tracking-wide text-white">Redefining</h1>
		<h1 class="herotext heroRight absolute bottom-0 right-10 font-thin tracking-wide text-white text-right">Watch<br>Collections</h1>
	</div>
	<div class="snap-start snap-always h-screen w-auto">
	</div>	
</main>

<style lang="postcss">
	.herotext {
		font-family: "Playfair Display";
		font-size: 8rem;
	}
</style>