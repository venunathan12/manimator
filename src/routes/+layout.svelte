<script lang="ts">
	import './layout.css';
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href="/assets/favicon.svg" /></svelte:head>
{@render children()}
