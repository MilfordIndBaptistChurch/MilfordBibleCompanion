<script setup lang="ts">
	import Selector from '../components/Selector.vue';
	import Study from '../components/Study.vue';
  import Test from '../components/Test.vue';
  import dataSource from '../common/data.json';
</script>

<template>
  <main>
  	<Selector v-bind:bookData="getBookData()" v-on:set-ref-data="updateTopLevelRef" />
    <div v-for="refObj in dataSource">
        <div v-for="item in refObj[selectedRef as keyof typeof refObj]">
          <Study v-if="Array.isArray(item)" v-bind:highlight="item[0].highlight" v-bind:methods="item[0].methods" />
          <Test msg="hello world" name="Hello world" />
        </div>
  	</div>
  </main>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { getRef } from '../common/utils';

  const selectedRef = ref(Object.keys(dataSource[0])[0]);

  interface IChapter {
    chapter: number,
    verses: [number]
  }

  interface Reference {
    book: string,
    chapters: Array<IChapter>
  }

	export default defineComponent({
    data() {
      return {
        bookData: [] as Reference[]
      }
    },
    methods: {
      hydrateData () {
        let refArray = [] as Reference[];
        for (const i in dataSource) {
          let newRef = {} as Reference;
          const ref = getRef(dataSource[Number(i)]);
          newRef = {
            book: ref.book,
            chapters: [{
              chapter: ref.chapter,
              verses: [ref.verse]
            }]
          }

          let exist = false;
          for (const j in refArray) {
            if (refArray[j].book === ref.book) { // book exist
              for (const k in refArray[j].chapters) {
                if (refArray[j].chapters[k].chapter === ref.chapter) { // chapter exist
                  exist = true;
                  refArray[j].chapters[k].verses.push(ref.verse);
                }
              }
            }
          }

          if (!exist) refArray.push(newRef);
        }
        this.bookData = refArray;
      },
      getBookData () {
        return this.bookData;
      },
      updateTopLevelRef (ref: string) {
        selectedRef.value = ref;
      }
    },
    beforeMount() {
      this.hydrateData()
    }
	});
</script>
