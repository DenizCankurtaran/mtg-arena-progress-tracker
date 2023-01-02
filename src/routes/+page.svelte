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
        selectedMana = [];
    };

    const manaSelected = (event: CustomEvent<Mana[]>) => {
        selectedMana = event.detail;
    };
</script>

<div>
    {#key ranks}
        <div
            class="flex justify-around gap-y-12 sm:gap-y-0 gap-x-4 my-6 w-full xl:w-1/2 p-3 sm:p-0 mx-auto flex-wrap sm:flex-nowrap "
        >
            <Rank {ranks} />
            <MatchForm on:refresh={refresh} on:manaSelected={manaSelected} />
        </div>

        <MatchTable {matches} {selectedMana} />
    {/key}
</div>
