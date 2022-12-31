<script lang="ts">
	import type { Rank } from '$lib/util/types';
	import RankInformationDisplay from './RankInformationDisplay.svelte';

	export let ranks: Rank[];

	const currentRank = ranks[ranks.length - 1];
	const currentStats = currentRank[2].split('-');

	const rank = currentStats[0];
	const step = Number(currentStats[1]);

	let rankImage = `/images/${rank}.webp`;
</script>

<div class="flex justify-around w-full sm:w-1/3">
	<RankInformationDisplay rank={currentRank} />

	<div class="flex justify-center align-middle">
		<div class="space-y-2 w-20">
			<img class="h-20 " src={rankImage} alt="currentRank" />
			<div class="flex justify-between">
				{#each Array(6) as _, index (index)}
					{#if step >= index + 1}
						<div class="bg-orange-500 w-3 h-1" />
					{:else}
						<div class="border-solid border-2 w-3 h-1" />
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
