<script lang="ts">
    import axios from "axios";

    let priceList: string;

    const handleOnSubmit = (e: any) => {
        e.preventDefault()
        console.log(e.target)
        axios.post("http://localhost:2000/updatewatchprice", {priceList: JSON.parse(priceList).coordinatesPostPurchase, brand_id: 1});
    }
</script>

<main>
    <form on:submit={handleOnSubmit}>
        <textarea name="" id="" cols="30" rows="10" bind:value={priceList}></textarea>
        <button type="submit">Submit</button>
    </form>
    {priceList}
</main>