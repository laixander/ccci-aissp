<template>
	<div class="flex flex-col items-center justify-center h-screen">
		<div class="w-full flex justify-center">
			<SealLogo style="height: 100px; width: 100px" />
		</div>
		<p class="text-xl text-white mt-2 font-thin tracking-wide font-light">AISSP</p>
		<UIcon class="mt-5 text-5xl text-white animate-spin" name="i-mingcute-loading-fill" />
	</div>
</template>

<script setup>
const props = defineProps(["label", "loading"]);
</script>
