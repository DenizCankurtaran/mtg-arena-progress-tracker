<script>
	import Rank from '$lib/Rank/index.svelte'

	async function saveMatch() {
		const response = await fetch('/api/saveMatch', {
			method: 'POST',
			body: JSON.stringify({}),
			headers: {
				'content-type': 'application/json'
			}
		});
		await response.json();
	}

	async function getMatches() {
		const response = await fetch('/api/getMatches', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		await response.json();
	}
</script>
<div>
    <div class="grid grid-cols-2">
        <Rank rank='d3' step={1}/>

        <div class="text-red-400">
            <button on:click={saveMatch} > Add match</button>
        </div>

        <div class="text-red-400">
            <button on:click={getMatches} > get matches</button>
        </div>

    </div>
</div>