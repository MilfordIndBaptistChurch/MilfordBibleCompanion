<script setup lang="ts">
	import { RouterLink, RouterView } from 'vue-router'
	import Header from './components/Header.vue'
  import dataSource from './common/data.json';
</script>

<template>
	<div class="grid">
		<div>&nbsp;</div>
		<div class="middle">
	    <Header title="Milford Bible Companion" />
			<RouterView />
		</div>
		<div class="side-nav">
			<aside class="menu">
			  <p class="menu-label">
			    General
			  </p>
			  <ul class="menu-list">
			    <li><a>Books ({{bookCount}})</a></li>
			    <li><a>Cross ref ({{crossRefCount}})</a></li>
			    <li><a>Accordance (0)</a></li>
			  </ul>
			  <p class="menu-label">
			    Application
			  </p>
			  <ul class="menu-list">
			    <li><a>Sermons (0)</a></li>
			    <li><a>Illustrations (0)</a></li>
			    <li><a>Characters ({{charactersCount}})</a></li>
			    <li><a>History (0)</a></li>
			  </ul>
			  <p class="menu-label">
			    Extra
			  </p>
			  <ul class="menu-list">
			    <li><a>Bible Studies (0)</a></li>
			    <li><a>Discussions (0)</a></li>
			    <li><a>Notes (0)</a></li>
			  </ul>
			</aside>
		</div>
	</div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { getRef } from './common/utils';

  const bookCount = ref(0);
  const crossRefCount = ref(0);
  const charactersCount = ref(0)

	const getUniqueValues = (array: []) => (
	  array.filter((currentValue, index, arr) => (
			arr.indexOf(currentValue) === index
		))
	)

	export default defineComponent({
    methods: {
	    // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type ** resolves this for now **
	    getIndex(obj: any, string: any) {
	    	return obj[string]!; // will never be undefined!
	    },
      setCounts () {
        let bookArray = [] as Array<String>;
        let crossRefArray = [] as Array<String>;
        let charactersArray = [] as Array<String>;
        for (const i in dataSource) {
        	const book = getRef(dataSource[Number(i)]).book;
        	bookArray.push(book);
        	bookArray = getUniqueValues(bookArray as []);

        	// cross ref count
        	const stringRef = Object.keys(dataSource[Number(i)])[0];
        	const index = this.getIndex(dataSource[Number(i)], stringRef);
        	const study = index.study;

        	for (const j in study) {
        		if (study[j].methods.hasOwnProperty('cross references')) {
        			const makeArray = study[j].methods['cross references'].split(',');
        			const mergeArrays = crossRefArray.concat(makeArray);
        			crossRefArray = getUniqueValues(mergeArrays as []);
        		} else if (study[j].methods.hasOwnProperty('characters')) {
        			const makeArray = study[j].methods['characters'].split(',');
        			const mergeArrays = charactersArray.concat(makeArray);
        			charactersArray = getUniqueValues(mergeArrays as []);
        		}
        	}
        }

       	bookCount.value = bookArray.length;
        crossRefCount.value = crossRefArray.length;
        charactersCount.value = charactersArray.length;
      },
    },
    beforeMount() {
      this.setCounts()
    }
	});
</script>
