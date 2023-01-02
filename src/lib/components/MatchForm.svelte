<script lang="ts">
    import type { Mana, Result } from '$lib/util/types';
    import { createEventDispatcher } from 'svelte';
    import ManaSelector from './ManaSelector.svelte';

    let selectedMana: Mana[] = [];

    const dispatch = createEventDispatcher<{ refresh: undefined; manaSelected: Mana[] }>();

    const saveMatch = async (result: Result) => {
        const matchUp: Mana[] = selectedMana.length === 0 ? ['colorless'] : selectedMana;

        const response = await fetch('/api/saveMatch', {
            method: 'POST',
            body: JSON.stringify({
                result,
                matchUp
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        const responseResult = await response.json();

        if (responseResult.status === 200) {
            dispatch('refresh');
        }
    };

    const changeMana = (event: CustomEvent<Mana[]>) => {
        selectedMana = event.detail;
        dispatch('manaSelected', selectedMana);
    };
</script>

<div class="my-auto">
    <ManaSelector on:changeMana={changeMana} size="md" />
    <div class="flex justify-between mt-4">
        <button
            on:click={() => saveMatch('LOSS')}
            class="text-white font-bold py-2 px-8 rounded-full bg-blue-500 hover:bg-blue-700"
        >
            Loss
        </button>
        <button
            on:click={() => saveMatch('WIN')}
            class="text-white font-bold py-2 px-8 rounded-full bg-orange-500 hover:bg-orange-700"
        >
            Win
        </button>
    </div>
</div>
