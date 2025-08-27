<script lang="ts">
	export let data;
</script>

<ul>
	{#if data.posts}
		{#each data.posts as post}
			<li><a href="posts/{post.slug}">{post.title}</a></li>
		{/each}
	{/if}
</ul>
