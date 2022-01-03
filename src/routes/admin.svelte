<script>
    import axios from "axios";
	import { onMount } from "svelte";

    let priceList;

    onMount(async () => {
        axios.post("http://localhost:2000/updatewatchprice", {priceList: priceList});
    })

    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
    }
</script>

<main>
    <form on:submit={handleOnSubmit}>
        <textarea name="" id="" cols="30" rows="10" bind:value={priceList}></textarea>
        <button type="submit">Submit</button>
    </form>
    {priceList}
</main>