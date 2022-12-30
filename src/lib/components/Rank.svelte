<script lang="ts">
	import type { Rank } from '$lib/util/types';

	export let ranks: Rank[];

	const currentStats = ranks[ranks.length - 1][2].split('-');

	const rank = currentStats[0];
	const step = Number(currentStats[1]);

	let rankImage = `/images/${rank}.webp`;
</script>

<div class="flex justify-center align-middle">
	<div class="space-y-2">
		<img class="h-20 w-20" src={rankImage} alt="currentRank" />
		<div class="w-20 h-10 flex justify-between">
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
