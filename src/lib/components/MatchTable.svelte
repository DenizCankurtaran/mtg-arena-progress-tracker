<script lang="ts">
	import { Column, type Mana, type Match } from '$lib/util/types';
	import ManaSelector from './ManaSelector.svelte';

	export let matches: Match[];

	let selectedMana: Mana[] = [];
	$: tableBody = filterTable(selectedMana);

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
				return `<span class="text-green-300">${column}%</span>`;
			}

			if (percentageNumber === 50) {
				return `<span class="text-yellow-300">${column}%</span>`;
			}

			if (percentageNumber < 50) {
				return `<span class="text-red-500">${column}%</span>`;
			}
		}
		return column;
	};

	const changeMana = (event: CustomEvent<Mana[]>) => {
		selectedMana = event.detail;
	};

	const filterTable = (selectedMana: Mana[]) => {
		console.log(selectedMana);
		const res = matches
			.slice(1)
			.filter((row) => selectedMana.every((mana) => row[0].includes(mana)));
		console.log(res);

		return res;
	};
</script>

<div>
	<div>
		<ManaSelector on:changeMana={changeMana} />
	</div>

	<table class="table-fixed">
		<thead class="border-b">
			{#each matches[0] as row}
				<th class="font-medium text-gray-100 px-4 py-2 text-left"> {row} </th>
			{/each}
		</thead>
		<tbody>
			{#each tableBody as row}
				<tr class="border-b">
					{#each row as col, i}
						<td class="font-medium px-4 py-2 whitespace-nowrap">
							{@html renderColumn(col, i)}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
