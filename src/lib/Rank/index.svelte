<script lang="ts">
    export let step: number;
	export let rank: string;

    let rankImage = `/images/${rank}.webp`
</script>

<div class="flex justify-center align-middle">
	<div class="space-y-2">
		<img class="h-20 w-20" src={rankImage} alt='currentRank' />
		<div class="w-20 h-10 flex justify-between">
			{#each Array(6) as _, index (index)}
				{#if step >= index}
					<div class="bg-orange-500 w-3 h-1"/>
				{:else}
					<div class="border-solid border-2 w-3 h-1"/>
				{/if}
			{/each}
		</div>
	</div>
</div>