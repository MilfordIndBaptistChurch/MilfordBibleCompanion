<script setup lang="ts">
	import Selector from '../components/Selector.vue';
	import Study from '../components/Study.vue';
  import Test from '../components/Test.vue';
  import dataSource from '../common/data.json';
</script>

<template>
  <main>
  	<Selector v-bind:bookData="getBookData()" v-on:set-ref-data="updateTopLevelRef" />
    <div v-for="items in dataSource">
        <div v-for="item in items[selectedRef as keyof typeof items]">
          <div v-if="Array.isArray(item)" v-for="(studyRef, i) in item">
            <Study v-bind:index="i" v-bind:highlight="studyRef.highlight" v-bind:methods="studyRef.methods" />
          </div>
          <Test msg="hello world" name="Hello world" />
        </div>
  	</div>
  </main>
</template>

<style lang="scss">
  @import "../assets/main.scss";
</style>

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
              exist = true;
              for (const k in refArray[j].chapters) {
                if (refArray[j].chapters[k].chapter === ref.chapter) { // chapter exist
                  refArray[j].chapters[k].verses.push(ref.verse); // chapter does not exist
                } else {
                  refArray[j].chapters.push({
                    chapter: ref.chapter,
                    verses: [ref.verse]
                  });
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
