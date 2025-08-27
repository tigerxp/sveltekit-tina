<script lang="ts">
	export let nav;
</script>

<nav>
	<ul>
		<li><a href="/"><strong>SvelteKit-Tina Demo</strong></a></li>
	</ul>
	{#if nav}
		<ul>
			{#each nav as n}
				<li><a href={n?.href}>{n?.label}</a></li>
			{/each}
		</ul>
	{/if}
</nav>
