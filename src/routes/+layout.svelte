<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import MainNav from '$lib/components/MainNav.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="container">
	<MainNav nav={data.nav} />

	{@render children?.()}
</div>
