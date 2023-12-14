<script setup lang="ts">
	import Selector from '../components/Selector.vue';
	import Study from '../components/Study.vue';
  import Test from '../components/Test.vue';
</script>

<template>
  <main>
  	<Selector v-bind:data="getData()" v-on:set-ref-data="updateTopLevelRef" />
    <div v-for="refObj in getData()">
    	<div v-for="(value, prop) in getDataObjItem(refObj)">
        <div v-if="Array.isArray(value)" v-for="item in value">
          <Study v-bind:highlight="item.highlight" v-bind:methods="item.methods" />
          <Test msg="hello world" name="Hello world" />
        </div>
    	</div>
  	</div>
  </main>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import data from '../common/data.json';
  const selectedRef = ref(Object.keys(data[0])[0]);

  interface Reference {
    book: string,
    chapter: number,
    verse: number
  }

	export default defineComponent({
	  data() {
      return {
        data
      }
	  },
    methods: {
      testHydrateData () {
        let testReference = {} as Reference;
        testReference.book = 'John';
        testReference.chapter = 3;
        testReference.verse = 3;
      },
      getData () {
        return this.data;
      },
      getDataObjItem (refObj: any) {
        const index = selectedRef.value;
        return refObj[index];
      },
      updateTopLevelRef (ref: string) {
        selectedRef.value = ref;
      }
    },
    beforeMount() {
      this.testHydrateData()
    }
	});
</script>
