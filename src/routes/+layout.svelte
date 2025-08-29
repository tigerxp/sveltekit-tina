<script lang="ts">
	import MainNav from '$lib/components/MainNav.svelte';

	let { children, data } = $props();
</script>

<div class="container">
	<MainNav nav={data.nav} />

	{@render children?.()}
</div>
