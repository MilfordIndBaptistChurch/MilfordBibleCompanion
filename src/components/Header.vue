<script setup lang="ts">
  import Badge from './Badge.vue';
	defineProps<{
	  title: string
	}>()
</script>

<template>
	<div>
    <p class="title is-1">{{ title }}</p>
    <p class="subtitle is-3" style="margin: -20px 0 15px 0">By Milford Ind. Baptist Church</p>
    <Badge type="vuejs" />
    <Badge type="typescript" />
    <Badge type="github" />
    <Badge type="kingjames" />
  </div>
</template>