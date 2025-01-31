<script lang="ts">
	interface Props {
		wrapperStyle?: string;
		inside?: import('svelte').Snippet;
		under?: import('svelte').Snippet;
	}

	let { wrapperStyle = '', inside, under }: Props = $props();
</script>

<header class={'bg-white py-4 ' + wrapperStyle}>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4">
		<div class="flex items-center space-x-4">
			<p class="text-lg">APOLO</p>
		</div>
		{@render inside?.()}
		<div class="flex flex-row">
			<p class="mr-3">Perfil</p>
			<button class="h-8 w-8 rounded-full bg-purple-600"></button>
			<!-- Simulating the purple icon -->
		</div>
	</div>
	<div class="mt-2 h-px w-full bg-gray-300"></div>
	<!-- Divider Line -->
	{@render under?.()}
</header>
