<script setup lang="ts">
	defineProps<{
		chapter: array,
	  showChapterState: {
	  	checked: boolean
	  }
	}>()
</script>

<template>
	<a-list
	item-layout="horizontal"
	:data-source="chapter"
	size="small"
	v-if="showChapterState.checked"
	>
	<template #renderItem="{ item }">
	  <a-list-item class="list">
	  <a-list-item-meta
	    description=""
	  >
	    <template #title>
	    	<h4 class="ant-list-item-meta-title">
	    		<a href="">#{{ item.verse }}</a>
	    	</h4>
	    </template>
	  </a-list-item-meta>
	      {{ item.text }}
	  </a-list-item>
	</template>
	</a-list>
</template>