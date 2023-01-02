<script lang="ts">
    import { filterByMana, sortMatchesAsc, sortMatchesDesc } from '$lib/util/filterMatches';
    import { Column, SortLevel, type Mana, type Match } from '$lib/util/types';
    import FilterChevron from './FilterChevron.svelte';
    import ManaSelector from './ManaSelector.svelte';

    export let matches: Match[];

    export let selectedMana: Mana[] = [];
    let sortLevel = SortLevel.OFF;
    let currentColumnIndex: Column;
    $: tableBody = filterTableForMana(selectedMana);

    const renderColumn = (column: string, columnIndex: number) => {
        if (columnIndex === Column.COLOR) {
            const colors = column.split(',');

            const manaIcons = colors.map((color) => `/images/${color}.svg`);

            const images = manaIcons
                .map((manaIcon) => `<img class="h-3 w-3" src="${manaIcon}" alt="${manaIcon}" />`)
                .join('');

            return `<span class="flex gap-x-1" >${images}</span>`;
        }

        if (columnIndex === Column.WINRATE) {
            const percentageNumber = Number(column);
            if (percentageNumber > 50) {
                return `<span class="text-green-200">${column}%</span>`;
            }

            if (percentageNumber === 50) {
                return `<span class="text-yellow-100">${column}%</span>`;
            }

            if (percentageNumber < 50) {
                return `<span class="text-red-300">${column}%</span>`;
            }
        }
        return `<span class="text-white">${column}</span>`;
    };

    const changeMana = (event: CustomEvent<Mana[]>) => {
        selectedMana = event.detail;
    };

    const filterTableForMana = (selectedMana: Mana[]) => {
        const filteredContent = filterByMana(matches.slice(1), selectedMana);
        if (sortLevel === SortLevel.DESC) {
            return sortMatchesDesc(filteredContent, currentColumnIndex);
        } else if (sortLevel === SortLevel.ASC) {
            return sortMatchesAsc(filteredContent, currentColumnIndex);
        } else {
            return filteredContent;
        }
    };

    const filterByColumn = (columnIndex: number) => {
        if (columnIndex === Column.COLOR) {
            return;
        }

        if (currentColumnIndex !== columnIndex) {
            sortLevel = SortLevel.OFF;
        }

        let filteredContent =
            selectedMana.length > 0
                ? filterByMana(matches.slice(1), selectedMana)
                : matches.slice(1);

        if (sortLevel === SortLevel.OFF) {
            filteredContent = sortMatchesDesc(filteredContent, columnIndex);
            sortLevel = SortLevel.DESC;
        } else if (sortLevel === SortLevel.DESC) {
            filteredContent = sortMatchesAsc(filteredContent, columnIndex);
            sortLevel = SortLevel.ASC;
        } else {
            sortLevel = SortLevel.OFF;
        }
        tableBody = filteredContent;
        currentColumnIndex = columnIndex;
    };
</script>

<div class="flex flex-col justify-center w-full md:w-3/4 p-3 xl:w-1/2 sm:p-0 mx-auto">
    <ManaSelector on:changeMana={changeMana} {selectedMana} includeColorless />
    <div class="overflow-y-auto h-[50vh] scrollbar scrollbarStyle">
        <table class="w-full">
            <thead class="border-b">
                {#each matches[0] as header, i}
                    <th
                        class={`font-medium text-gray-100 px-0 sm:px-4 py-2 ${
                            i === Column.COLOR ? '' : 'cursor-pointer'
                        }`}
                        on:click={() => filterByColumn(i)}
                    >
                        {header}
                        <FilterChevron columnIndex={i} {currentColumnIndex} {sortLevel} />
                    </th>
                {/each}
            </thead>
            <tbody>
                {#each tableBody as row}
                    <tr class="border-b">
                        {#each row as col, i}
                            <td class="font-medium px-0 sm:px-4 py-2 whitespace-nowrap text-center">
                                {@html renderColumn(col, i)}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
