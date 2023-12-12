<script setup lang="ts">
  import Badge from './Badge.vue';
	defineProps<{
	  title: string
	}>()
</script>

<template>
	<div>
    <span class="text-xl font-600 mr-3">{{ title }}</span>
    <span class="text-15 mr-2" style="color: var(--el-text-color-regular)">
      By Milford Ind. Baptist Church
    </span>
    <Badge type="vuejs" />
    <Badge type="typescript" />
  </div>
</template>