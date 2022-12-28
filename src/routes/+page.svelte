<script lang="ts">
	import { page } from '$app/stores';
	import MatchForm from '$lib/components/MatchForm.svelte';
	import MatchTable from '$lib/components/MatchTable.svelte';
	import Rank from '$lib/components/Rank.svelte';

	$: ranks = $page.data.ranks;
	$: matches = $page.data.matches;

	const refresh = async () => {
		const response = await fetch('/api/getStats');

		const result = await response.json()
		ranks = result.body.ranks;
		matches = result.body.matches;
	};
</script>

<div>
	{#key ranks}
		<div class="flex justify-center gap-x-12 my-6">
			<Rank {ranks} />
			<MatchForm on:refresh={refresh} />
		</div>

		<MatchTable {matches} />
	{/key}
</div>
