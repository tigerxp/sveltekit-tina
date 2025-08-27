<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
</svelte:head>

<article>
	<h1>{data.meta.title}</h1>
	<div class="content"><data.content /></div>
</article>
