<script setup lang="ts">
	defineProps<{
	  value: string,
    highlight: string,
    methods: object
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