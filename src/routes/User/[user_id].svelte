<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({page, fetch}) => {
		const user_id = page.params.user_id

		return {
			props: {
				user: ""
			}
		};
	}

</script>
<script lang="ts">
	import { onMount } from "svelte";
	import gsap from "gsap";
	import Navbar from "../Navbar.svelte";


	onMount(() => {
		gsap.from(".heading", {opacity: 0, duration: 0.75, y: -100})
	})
	export let user: any;	
</script>
<main class="relative min-h-screen w-screen">
	<Navbar></Navbar>
	<div class="mt-16 mx-32">
		<h1 class="heading font-extralight text-4xl tracking-wider leading-[1.20]">
			Welcome,<br>
			S. Adnan Sami!
		</h1> 
	</div>
	   
</main>

<style>

</style>