<script lang="ts">
	import type { Match } from "$lib/store/types";


	export let matches: Match[];

</script>

<div>
    <table class="table-auto">
		<thead>
			{#each matches[0] as row}
				<th> {row} </th>
			{/each}
		</thead>
		<tbody>
			{#each matches.slice(1) as row}
				<tr> 
					{#each row as col}
						<td> {col} </td>

					{/each}
				</tr>
			{/each}

		</tbody>

	</table>
</div>