<script lang="ts">
    import type { Mana } from '$lib/util/types';
    import { createEventDispatcher } from 'svelte';

    export let size: 'sm' | 'md' | 'lg' = 'sm';
    export let selectedMana: Mana[] = [];
    export let includeColorless = false;

    let manas: Mana[] = includeColorless
        ? ['white', 'black', 'green', 'red', 'blue', 'colorless']
        : ['white', 'black', 'green', 'red', 'blue'];

    const dispatch = createEventDispatcher<{ changeMana: Mana[] }>();

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

    const getStyle = () => {
        if (size === 'md') {
            return {
                height: 'h-6',
                width: 'w-6',
                inset: 'inset-3',
                glowHeight: 'h-5',
                glowWidth: 'w-5',
                glowInset: 'inset-3.5'
            };
        } else if (size === 'lg') {
            return {
                height: 'h-10',
                width: 'w-10',
                inset: 'inset-3',
                glowHeight: 'h-10',
                glowWidth: 'w-10',
                glowInset: 'inset-3'
            };
        }
        return {
            height: 'h-4',
            width: 'w-4',
            inset: 'inset-3',
            glowHeight: 'h-3',
            glowWidth: 'w-3',
            glowInset: 'inset-3.5'
        };
    };

    const style = getStyle();
</script>

<div class="flex">
    {#each manas as mana}
        <div
            class="relative flex cursor-pointer"
            on:click={() => handleClick(mana)}
            on:keydown={() => handleClick(mana)}
        >
            <div
                class={`absolute rounded-full ${
                    selectedMana.includes(mana)
                        ? `bg-yellow-300 ${style.glowHeight} ${style.glowWidth} ${style.glowInset} z-0 blur`
                        : `bg-black z-20 ${style.height} ${style.width} ${style.inset} opacity-50`
                }`}
            />
            <span class="p-3 z-10">
                <img
                    class={`${style.height} ${style.width}`}
                    src={`/images/${mana}.svg`}
                    alt={mana}
                />
            </span>
        </div>
    {/each}
</div>
