<script setup lang="ts">
	defineProps<{
		bookRef: Array<String>,
	  showChapterState: {
	  	checked: boolean
	  }
	}>()
</script>

<template>
	<a-list
	item-layout="horizontal"
	:data-source="bookRef.chapter"
	size="small"
	v-if="showChapterState.checked"
	style="margin: 25px 0 0 0"
	>
	<template #renderItem="{ item }">
	  <a-list-item v-if="Number(bookRef.selected.verse) === Number(item.verse)" class="list" style="background: #fafafa">
		  <a-list-item-meta>
		    <template #title>
		    	<h4 class="ant-list-item-meta-title">
		    		<a href="">#{{ item.verse.indexOf('{') === -1 ? item.verse : '' }}</a>
				  	<a-tooltip :open="isOpen(item)">
				  		<template #title>Copied</template>
				  		<div class="tooltip-2">
				  			<font-awesome-icon icon="fa-far fa-copy" @click="handleCopy(item)" />
				  		</div>
				  	</a-tooltip>
		    	</h4>
		    </template>
		  </a-list-item-meta>
    	{{ item.text }} <StarFilled />
	  </a-list-item>
		<a-list-item v-if="Number(bookRef.selected.verse) !== Number(item.verse)" class="list">
		  <a-list-item-meta>
		    <template #title>
		    	<h4 class="ant-list-item-meta-title">
		    		<a href="">#{{ item.verse }}</a>
				  	<a-tooltip :open="isOpen(item)">
				  		<template #title>Copied</template>
				  		<div class="tooltip-2">
				  			<font-awesome-icon icon="fa-far fa-copy" @click="handleCopy(item)" />
				  		</div>
				  	</a-tooltip>
		    	</h4>
		    </template>
		  </a-list-item-meta>
    	{{ item.text }}
	  </a-list-item>
	</template>
	</a-list>
</template>

<script lang="ts">
	import { ref } from 'vue';
	import { useClipboard } from '@vueuse/core'
	import { StarFilled } from '@ant-design/icons-vue';

	const source = ref('');

	const {
		copy,
		copied
	} = useClipboard({ source });

	const selectedVerse = ref('');

	export default {
		props: ['bookRef', 'showChapterState'],
		methods: {
			isOpen(item: any) {
				return copied && item.verse === selectedVerse.value;
			},
			handleCopy(item: any) {
				selectedVerse.value = item.verse;
				source.value = `${this.bookRef.name} ${this.bookRef.selected.chapter}:${item.verse} - ${item.text}`;
				copy(source.value);
			}
		}
	}
</script>
