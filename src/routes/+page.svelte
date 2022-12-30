<script lang="ts">
	import { page } from '$app/stores';
	import MatchForm from '$lib/components/MatchForm.svelte';
	import MatchTable from '$lib/components/MatchTable.svelte';
	import Rank from '$lib/components/Rank.svelte';
	import type { Mana } from '$lib/util/types';

	$: ranks = $page.data.ranks;
	$: matches = $page.data.matches;

	let selectedMana: Mana[] = [];

	const refresh = async () => {
		const response = await fetch('/api/getStats');

		const result = await response.json();
		ranks = result.body.ranks;
		matches = result.body.matches;
	};

	const manaSelected = (event: CustomEvent<Mana[]>) => {
		selectedMana = event.detail;
	};
</script>

<div>
	{#key ranks}
		<div class="flex justify-center gap-x-12 my-6">
			<Rank {ranks} />
			<MatchForm on:refresh={refresh} on:manaSelected={manaSelected} />
		</div>

		<MatchTable {matches} {selectedMana} />
	{/key}
</div>
