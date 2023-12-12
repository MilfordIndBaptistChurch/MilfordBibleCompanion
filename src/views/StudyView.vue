<script setup lang="ts">
	import Selector from '../components/Selector.vue';
	import Study from '../components/Study.vue';
</script>

<template>
  <main>
  	<Selector v-bind:data="data" v-on:set-ref-data="updateTopLevelRef" />
    <div v-for="data in data">
    	<div v-for="(value, prop) in data[selectedRef]">
        <div v-if="Array.isArray(value)" v-for="item in value">
          <Study v-bind:highlight="item.highlight" v-bind:methods="item.methods" />
        </div>
    	</div>
  	</div>
  </main>
</template>

<script lang="ts">
  import { ref } from 'vue';
	import data from '../common/data.json';
  const selectedRef = ref(Object.keys(data[0])[0]);
	export default {
	  data() {
      return {
        data
      }
	  },
    methods: {
      updateTopLevelRef (ref) {
        selectedRef.value = ref;
      }
    }
	}
</script>
