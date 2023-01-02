<script lang="ts">
    import type { Rank } from '$lib/util/types';
    import getRank from '$lib/util/getRank';
    import RankInformationDisplay from './RankInformationDisplay.svelte';

    export let ranks: Rank[];

    const currentRank = ranks[ranks.length - 1];
    const currentStats = currentRank[2].split('-');

    const rank = currentStats[0];
    const step = Number(currentStats[1]);

    let rankImage = `/images/${rank}.webp`;
</script>

<RankInformationDisplay rank={currentRank} />
<div class="flex justify-center flex-col">
    <div class="font-small text-gray-100 mx-3 mb-3">{getRank(currentRank)}</div>
    <div class="space-y-2 w-20 mx-auto">
        <img class="h-20 mx-auto" src={rankImage} alt="currentRank" />
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
