<script lang="ts">
	import { Column, SortLevel } from "$lib/util/types";


	export let sortLevel: SortLevel;
	export let columnIndex: Column;
	export let currentIndex: Column;

	$: chevronPath = getChevronPath(sortLevel)

	const getChevronPath = (sortLevel: SortLevel) => {
		if (sortLevel === SortLevel.DESC) {
			return '8 10.99 3.5 6.5 4.5 5.5 8 9.01 11.51 5.5 12.49 6.5 8 10.99'
		}
		
		if (sortLevel === SortLevel.ASC) {
			return '11.51 10.49 8 6.99 4.5 10.49 3.5 9.51 8 5.01 12.49 9.51 11.51 10.49'
		}
		return ''
	}

</script>

<svg
	class="inline"
	fill={`${currentIndex === columnIndex && columnIndex !== Column.COLOR ? '#ffffff' : '#64748B'}`}
	width="0.75rem"
	height="0.75rem"
	viewBox="0 0 16 16"
	xmlns="http://www.w3.org/2000/svg"
	><g
		><polygon
			points={chevronPath}
		/></g
	></svg
>
