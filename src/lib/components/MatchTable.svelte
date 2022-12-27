<script lang="ts">
	import { Column, SortLevel, type Mana, type Match } from '$lib/util/types';
	import FilterChevron from './FilterChevron.svelte';
	import ManaSelector from './ManaSelector.svelte';

	export let matches: Match[];

	let selectedMana: Mana[] = [];
	let sortLevel = SortLevel.OFF;
	let currentIndex: Column;
	$: tableBody = filterTableForMana(selectedMana);

	const renderColumn = (column: string, index: number) => {
		if (index === Column.COLOR) {
			const colors = column.split(',');

			const manaIcons = colors.map((color) => `/images/${color}.svg`);

			const images = manaIcons
				.map((manaIcon) => `<img class="h-3 w-3" src="${manaIcon}" alt="${manaIcon}" />`)
				.join('');

			return `<span class="flex gap-x-1" >${images}</span>`;
		}

		if (index === Column.WINRATE) {
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

	const filterTableForMana = (selectedMana: Mana[]) =>
		matches.slice(1).filter((row) => selectedMana.every((mana) => row[0].includes(mana)));

	const filterByColumn = (index: number) => {
		if (index === Column.COLOR) {
			return;
		}

		if (currentIndex !== index) {
			sortLevel = SortLevel.OFF
		}

		let filteredContent;
		if (sortLevel === SortLevel.OFF) {
			filteredContent = matches
				.slice(1)
				.sort((matchA: any, matchB: any) => matchB[index] - matchA[index]);
			sortLevel = SortLevel.DESC
		} else if(sortLevel === SortLevel.DESC) {
			filteredContent = matches
				.slice(1)
				.sort((matchA: any, matchB: any) => matchA[index] - matchB[index]);
			sortLevel = SortLevel.ASC
		} else {
			filteredContent = matches.slice(1)
			sortLevel = SortLevel.OFF
		}
		tableBody = filteredContent;
		currentIndex = index
	};
</script>


<div class="flex flex-col justify-center w-1/2 lg:w-1/4 mx-auto">
	<ManaSelector on:changeMana={changeMana} />
	<div class="overflow-y-auto h-[50vh]">

		<table class="w-full">
			<thead class="border-b">
				{#each matches[0] as header, i}
					<th
						class={`font-medium text-gray-100 px-4 py-2 ${
							i === Column.COLOR ? '' : 'cursor-pointer'
						}`}
						on:click={() => filterByColumn(i)}
					>
						{header}
						<FilterChevron columnIndex={i} {currentIndex} {sortLevel} />
					</th>
				{/each}
			</thead>
			<tbody>
				{#each tableBody as row}
					<tr class="border-b">
						{#each row as col, i}
							<td class="font-medium px-4 py-2 whitespace-nowrap text-center">
								{@html renderColumn(col, i)}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>