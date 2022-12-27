<script lang="ts">
	import { page } from '$app/stores';
	import MatchForm from '$lib/components/MatchForm.svelte';
	import MatchTable from '$lib/components/Matchtable.svelte';
	import Rank from '$lib/components/Rank.svelte';
</script>

<div>
	<div class="flex justify-center gap-x-12 my-6">
		<Rank ranks={$page.data.ranks} />
		<MatchForm />
	</div>

	<MatchTable matches={$page.data.matches} />
</div>
