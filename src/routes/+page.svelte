<script lang="ts">
	import { page } from '$app/stores';
	import MatchTable from '$lib/components/MatchTable.svelte';
	import Rank from '$lib/components/Rank.svelte';

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
</script>

<div>
	<div class="grid grid-cols-2">
		<Rank rank="d3" step={1} />

		<div class="text-red-400">
			<button on:click={saveMatch}> Add match</button>
		</div>

	</div>

	<div class="flex justify-center overflow-y-auto h-[50vh]">

		<MatchTable matches={$page.data.matches} />

	</div>
</div>
