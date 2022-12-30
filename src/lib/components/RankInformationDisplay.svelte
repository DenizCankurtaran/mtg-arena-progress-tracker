<script lang="ts">
	import getRank from '$lib/util/getRank';
	import type { Rank } from '$lib/util/types';

	export let rank: Rank;
</script>

<div class="font-small text-gray-100 ">
	<div>{new Date(rank[0]).toDateString()}</div>
	<div>{getRank(rank)}</div>
	<div>Games {rank[5]}</div>
	<div>Winrate {rank[6]}%</div>
</div>
