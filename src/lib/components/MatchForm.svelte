<script lang="ts">
	import type { Mana } from '$lib/util/types';
	import ManaSelector from './ManaSelector.svelte';

	let selectedMana: Mana[] = [];
	let valid = false

	const saveMatch = async (result: 'WIN' | 'LOSS') => {
		if (!valid) {
			return
		}
		const response = await fetch('/api/saveMatch', {
			method: 'POST',
			body: JSON.stringify({
				result,
				matchUp: selectedMana.join(',')
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
		await response.json();
	};

	const changeMana = (event: CustomEvent<Mana[]>) => {
		selectedMana = event.detail;
		if (selectedMana.length > 0) {
			valid = true
		} else {
			valid = false
		}
	};
</script>

<div>
	<ManaSelector on:changeMana={changeMana} size='md' />
	<div class="flex justify-between mt-4">
		<button
			on:click={() => saveMatch('LOSS')}
			class={`text-white font-bold py-2 px-8 rounded-full ${valid ? 'bg-blue-500 hover:bg-blue-700': 'bg-blue-200 hover:bg-blue-300 cursor-not-allowed' }`}
			disabled={!valid}
		>
			Loss
		</button>
		<button
			on:click={() => saveMatch('WIN')}
			class={`text-white font-bold py-2 px-8 rounded-full ${valid ? 'bg-orange-500 hover:bg-orange-700': 'bg-orange-200 hover:bg-orange-300 cursor-not-allowed' }`}
			disabled={!valid}
		>
			Win
		</button>
	</div>
</div>
