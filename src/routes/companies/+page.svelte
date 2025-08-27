<script lang="ts">
	let { data } = $props();
</script>

<h1>Companies</h1>

{#if data.companies}
	{#each data.companies as c}
		<article>
			<header>{c.name}</header>
			<a href={c.url} target="_blank">Visit website</a>
		</article>
	{/each}
{/if}
