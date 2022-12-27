<script lang="ts">
	import { page } from '$app/stores';
	import MatchForm from '$lib/components/MatchForm.svelte';
	import MatchTable from '$lib/components/Matchtable.svelte';
	import Rank from '$lib/components/Rank.svelte';
</script>

<div>
	<div class="flex justify-center gap-x-12 my-6">
		<Rank rank="d3" step={1} />
		<MatchForm />
	</div>

	<MatchTable matches={$page.data.matches} />
</div>
