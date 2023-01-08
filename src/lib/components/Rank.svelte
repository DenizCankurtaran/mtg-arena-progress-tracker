<script lang="ts">
    import type { Rank } from '$lib/util/types';
    import getRank, { getStartingRank } from '$lib/util/getRank';
    import RankInformationDisplay from './RankInformationDisplay.svelte';
    import Steps from './Steps.svelte';

    export let ranks: Rank[];

    const currentRank = ranks[ranks.length - 1];

    const currentStats = currentRank[2].split('-');
    const rank = currentStats[0];
    const step = Number(currentStats[1]);

    const rankImage = `/images/${rank}.webp`;

    const startingStats = currentRank[1].split('-');
    const startingStep = Number(startingStats[1]);
    const startingRankImage = `/images/${startingStats[0]}.webp`;
    $: toggleStartingRank = false;
</script>

<RankInformationDisplay rank={currentRank} />
<div
    class="flex cursor-pointer"
    on:click={() => (toggleStartingRank = !toggleStartingRank)}
    on:keydown={() => (toggleStartingRank = !toggleStartingRank)}
>
    {#if toggleStartingRank}
        <div class="flex justify-center flex-col">
            <div class="font-small text-gray-100 mx-3 mb-3">
                {getStartingRank(currentRank)}
            </div>
            <div class="space-y-2 w-20 mx-auto">
                <img
                    class="h-20 mx-auto"
                    src={startingRankImage}
                    alt="currentRank"
                    title="Starting Rank"
                />
                <Steps step={startingStep} />
            </div>
        </div>
        <div class="flex justify-center items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1rem"
                height="1rem"
                fill="#ffffff"
                class="bi bi-chevron-right"
                viewBox="0 0 16 16"
            >
                <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
            </svg>
        </div>
    {/if}

    <div class="flex justify-center flex-col">
        <div class="font-small text-gray-100 mx-3 mb-3">
            {getRank(currentRank)}
        </div>
        <div class="space-y-2 w-20 mx-auto">
            <img
                class="h-20 mx-auto"
                src={rankImage}
                alt="Current Rank"
                title="Current Rank"
            />
            <Steps {step} />
        </div>
    </div>
</div>
