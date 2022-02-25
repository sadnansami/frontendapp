<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({page, fetch}) => {
		const watch_id = page.params.watch_id
		const watchData = await fetch(`http://localhost:2000/watches/${watch_id}`)
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				return data.data
			})
		
		const watchPrice = await fetch(`http://localhost:2000/watches/price/${watch_id}`)
			.then((res) => {
				return res.json()
			})

		console.log(watchPrice)

		return {
			props: {
				watch: watchData,
				price: watchPrice
			}
		};
	}

</script>
<script lang="ts">
	import { onMount } from "svelte";
	import Favorite32 from "carbon-icons-svelte/lib/Favorite32/Favorite32.svelte";
	import FavoriteFilled32 from "carbon-icons-svelte/lib/FavoriteFilled32/FavoriteFilled32.svelte";
	import Line from "svelte-chartjs/src/Line.svelte";
	import gsap from "gsap";
	import Encoder from "../../classes/Utility/Encoder";
	import PriceProcessor from "../../classes/PriceProcessor";
	import Navbar from "../Navbar.svelte";
	import Subscription from "../../classes/Subscription";


	export let watch: any;
	export let price: any;

	let res: any;
	
	const priceprocessor = new PriceProcessor(price);
	let [priceLabels, priceValue] = priceprocessor.format()

	let chartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		plugins: {
			legend: {
				labels: {
					font: {
						size: 0,
					},
					boxWidth: 0,
				},
			}
		},
		scales: {
			xAxes: {
				grid: {
					lineWidth: 0
				}
			}
		}
	}

	let chartData = {
		labels: priceLabels,
		datasets: [{
			label: "Price",
			backgroundColor: "#2f3640",
			borderColor: "#cc8e35",
			data: priceValue,
			tension: 0.2,
			fill: true,
			cubicInterpolationMode: "monotone",
			pointBackgroundColor: "#cc8e35",
			pointBorderWidth: 3,
		}]
	}

	onMount(async () => {
		gsap.from(".moveup", {opacity: 0, duration: 0.8, y: 200, delay: 0.1})
		gsap.from(".movedown", {opacity: 0, duration: 0.8, y: -200, zIndex: -10, delay: 0.5})

		const subscription = new Subscription("cus_L8QZnX6dIQrp0w")
		let link = await subscription.payment()
		console.log(link)
	});

	let hoverCollectIcon = false;
	let hoverCollectText = false;

	const hoverCollectButton = () => {
		hoverCollectIcon = !hoverCollectIcon;
		hoverCollectText = !hoverCollectText;
	}

	
</script>
<main class="relative min-h-screen w-screen">
	<Navbar></Navbar>
	<div class="flex flex-row gap-16 mt-20 mx-32">
		<div class="moveup">
			<div class="card h-96 aspect-square bg-center bg-cover rounded-xl shadow-lg shadow-black/25 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-black/40 hover:bg-black/60 bg-blend-darken text-white/0 hover:text-white/100 flex flex-col items-center justify-center" style="background-image: url('../watchImages/{watch.image}');">
				<span class="text-3xl text-center">{watch.watch_name}<br><span class="text-lg opacity-75">by {watch.brand_name}</span></span>
			</div>
			<button class="w-full border-2 border-primary mt-6 text-center px-4 py-2 transition-all duration-500 hover:bg-primary hover:shadow-lg hover:shadow-black/25" on:mouseenter={hoverCollectButton} on:mouseleave={hoverCollectButton}>
				<FavoriteFilled32 class="inline {hoverCollectIcon ? "fill-white" : "fill-primary"}"></FavoriteFilled32><span class="text-xl {hoverCollectText ? "text-white" : "text-primary"} inline align-middle">&nbsp;Collect</span>
			</button>
		</div>
		<div class="movedown">
			{#if watch}
				<span class="text-5xl tracking-widest">{watch.watch_name}</span><br>
				<span class="text-2xl tracking-wider text-gray-500">By {watch.brand_name}</span>
				<div class="grid grid-cols-2 mt-16 gap-2">
					<span class="tracking-wider">Model:</span>
					<span class="tracking-wider">{watch.model}</span>
					<span class="tracking-wider text-2xl font-medium col-span-2 mt-6">Case:</span>
					<span class="tracking-wider">Material:</span>
					<span class="tracking-wider">{watch.case_material}</span>
					<span class="tracking-wider">Diameter:</span>
					<span class="tracking-wider">{watch.case_diameter}</span>
					<span class="tracking-wider">Bezel Material:</span>
					<span class="tracking-wider">{watch.case_bezel_material}</span>
					<span class="tracking-wider">Dial Colour:</span>
					<span class="tracking-wider">{watch.case_dial_colour}</span>
					<span class="tracking-wider text-2xl font-medium col-span-2 mt-6">Bracelet:</span>
					<span class="tracking-wider">Material:</span>
					<span class="tracking-wider">{watch.bracelet_material}</span>
					<span class="tracking-wider">Colour:</span>
					<span class="tracking-wider">{watch.bracelet_colour}</span>
					<span class="tracking-wider">Clasp:</span>
					<span class="tracking-wider">{watch.bracelet_clasp_type}</span>
					<span class="tracking-wider">Clasp Material:</span>
					<span class="tracking-wider">{watch.bracelet_clasp_material}</span>
				</div>
			{/if}
		</div>
	</div>
	{#if chartData}
		<div class="h-[30rem] mx-32 my-24">
			<Line data={chartData} options={chartOptions}></Line>
		</div>
	{/if}
</main>

<style>

</style>