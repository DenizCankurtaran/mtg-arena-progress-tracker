<script lang="ts">
    import type { Rank } from '$lib/util/types';

    export let rank: Rank;

    const isPast = () => {
        const lastRowDate = new Date(rank[0]);
        const oneDay = 1000 * (60 * 60) * 24;
        return new Date().getTime() - lastRowDate.getTime() > oneDay;
    };
</script>

<div class="font-small text-gray-100 my-auto">
    <div title={`Wins: ${rank[3]} \nLoses: ${rank[4]}`}>Games: {rank[5]}</div>
    <div>Winrate: {Math.round(parseInt(rank[6]))}%</div>
    <div>
        last Match: {isPast() ? new Date(rank[0]).toDateString() : 'Today'}
    </div>
</div>
