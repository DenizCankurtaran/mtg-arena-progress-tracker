<script lang="ts">
	import getRank from '$lib/util/getRank';
	import type { Rank } from '$lib/util/types';

	import moment from 'moment';

	export let rank: Rank;

	const today = moment().startOf('day');
	const lastMatch = moment(new Date(rank[0])).startOf('day');
</script>

<div class="font-small text-gray-100 my-auto">
	<div title={`Wins: ${rank[3]} \nLoses: ${rank[4]}`}>Games: {rank[5]}</div>
	<div>Winrate: {Math.round(parseInt(rank[6]))}%</div>
	<div>
		last Match: {today.isSame(lastMatch) ? 'Today' : lastMatch.format('DD.MM.YYYY')}
	</div>
</div>
