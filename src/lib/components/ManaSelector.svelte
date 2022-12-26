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
		<div
			class="relative flex cursor-pointer"
			on:click={() => handleClick(mana)}
			on:keydown={() => handleClick(mana)}
		>
			<div
				class={`absolute rounded-lg ${
					selectedMana.includes(mana)
						? 'bg-yellow-300 w-3 h-3 inset-3.5 z-0 blur'
						: 'bg-black z-20 w-4 h-4 inset-3 opacity-50'
				}`}
			/>
			<span class="p-3 z-10">
				<img class="h-4 w-4" src={`/images/${mana}.svg`} alt={mana} />
			</span>
		</div>
	{/each}
</div>
