<script setup lang="ts">
	defineProps<{
    highlight: string,
    methods: Array<String>
	}>()
</script>

<template>
	<div class="text-18 font-600 mt-4">+ {{highlight}}</div>
  <div>
    <ul class="text-16 mt-3">
      <li v-for="(value, prop) in methods"><b style="text-transform: capitalize;">[{{prop}}]</b> {{value}}</li>
    </ul>
  </div>
</template>