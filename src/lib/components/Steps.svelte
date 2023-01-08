<script lang="ts">
    export let step: number;
</script>

<div class="flex justify-between">
    {#each Array(6) as _, index (index)}
        {#if step >= index + 1}
            <div class="bg-orange-500 w-3 h-1" />
        {:else}
            <div class="border-solid border-2 w-3 h-1" />
        {/if}
    {/each}
</div>
