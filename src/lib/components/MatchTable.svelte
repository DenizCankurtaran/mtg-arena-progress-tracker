<script lang="ts">
	import { Column, type Mana, type Match } from '$lib/util/types';
	import ManaSelector from './ManaSelector.svelte';

	export let matches: Match[];

	let selectedMana: Mana[] = [];
	let sortAsc: boolean = true;
	let currSort: number = 0;
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

	const filterTableForMana = (selectedMana: Mana[]) => {
		console.log(selectedMana);
		const res = matches
			.slice(1)
			.filter((row) => selectedMana.every((mana) => row[0].includes(mana)));
		console.log(res);

		return res;
	};

	const handleClickHeader = (header: string, index: number) => {
		if (index === 0) {
			return;
		}
		const res = matches;
		let filteredContent;
		if (!sortAsc) {
			filteredContent = res
				.slice(1)
				.sort((matchA: any, matchB: any) => matchA[index] - matchB[index]);
		} else {
			filteredContent = res
				.slice(1)
				.sort((matchA: any, matchB: any) => matchB[index] - matchA[index]);
		}
		sortAsc = !sortAsc;
		currSort = index;
		tableBody = filteredContent;
	};
</script>

<div>
	<div>
		<ManaSelector on:changeMana={changeMana} />
	</div>

	<table class="table-fixed">
		<thead class="border-b">
			{#each matches[0] as header, i}
				<th
					class="font-medium text-gray-100 px-4 py-2"
					on:click={() => handleClickHeader(header, i)}
				>
					{header}
					<svg
						class="inline"
						fill={`${currSort === i && currSort > 0 ? '#ffffff' : '#64748B'}`}
						width="0.75rem"
						height="0.75rem"
						viewBox="0 0 16 16"
						xmlns="http://www.w3.org/2000/svg"
						><g
							><polygon
								points={`${
									sortAsc
										? '11.51 10.49 8 6.99 4.5 10.49 3.5 9.51 8 5.01 12.49 9.51 11.51 10.49'
										: '8 10.99 3.5 6.5 4.5 5.5 8 9.01 11.51 5.5 12.49 6.5 8 10.99'
								}`}
							/></g
						></svg
					>
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
