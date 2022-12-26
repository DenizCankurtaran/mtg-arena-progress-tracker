<script lang="ts">
	import type { Mana } from '$lib/util/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ changeMana: Mana[] }>();

	let manas: Mana[] = ['white', 'black', 'green', 'red', 'blue'];
	const selectedMana: Mana[] = [];

	const handleClick = (mana: Mana) => {
		if (selectedMana.includes(mana)) {
			const index = selectedMana.indexOf(mana);
			selectedMana.splice(index, 1);
		} else {
			selectedMana.push(mana);
		}
		manas = manas;
		dispatch('changeMana', selectedMana);
	};
</script>

<div class="flex">
	{#each manas as mana}
		<div class="relative flex">
			<div
				class={`absolute ${
					selectedMana.includes(mana) ? 'rounded-lg w-3 h-3 inset-3.5 z-0 bg-yellow-300 blur' : ''
				}`}
			/>
			<span
				class="cursor-pointer p-3 z-10"
				on:click={() => handleClick(mana)}
				on:keydown={() => handleClick(mana)}
			>
				<img class="h-4 w-4" src={`/images/${mana}.svg`} alt={mana} />
			</span>
		</div>
	{/each}
</div>
