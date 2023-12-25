<script setup lang="ts">
	import { RouterLink, RouterView } from 'vue-router'
	import Header from './components/Header.vue'
	import SideNav from './components/SideNav.vue'
  import dataSource from './common/data.json';
</script>

<template>
	<div class="grid">
		<div>&nbsp;</div>
		<div class="middle">
	    <Header title="Milford Bible Companion" />
			<RouterView />
		</div>
		<SideNav
			:booksCount="bookCount"
			:crossRefCount="crossRefCount"
			:charactersCount="charactersCount"
		/>
	</div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { getRef, getObjKeys, getUniqueValues } from './common/utils';

  const bookCount = ref(0);
  const crossRefCount = ref(0);
  const charactersCount = ref(0)

	export default defineComponent({
    methods: {
	    // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type ** resolves this for now **
	    getIndex(obj: any, string: any) {
	    	return obj[string]!; // will never be undefined!
	    },
	    setBookCount () {
				let bookArray = [] as Array<String>;           
        for (const i in dataSource) {
        	const book = getRef(dataSource[Number(i)]).book;
        	bookArray.push(book);
        	bookArray = getUniqueValues(bookArray as []);
        }
       	bookCount.value = bookArray.length;
	    },
	    setReusableMethodCount (methodCountRef:string, countRef:any) {
	    	let reusableArray = [] as Array<String>;
	    	for (const i in dataSource) {
		    	const stringRef = getObjKeys(dataSource[Number(i)])[0];
		    	const index = this.getIndex(dataSource[Number(i)], stringRef);
		    	const study = index.study;

	      	for (const j in study) {
	      		if (study[j].methods.hasOwnProperty(methodCountRef)) {
	      			const makeArray = study[j].methods[methodCountRef].split(',');
	      			const mergeArrays = reusableArray.concat(makeArray);
	      			reusableArray = getUniqueValues(mergeArrays as []);
	      		}
	      	}
      	}
      	countRef.value = reusableArray.length;
	    },
      setCounts () {
        this.setBookCount();
        this.setReusableMethodCount('cross references', crossRefCount);
        this.setReusableMethodCount('characters', charactersCount);
      },
    },
    beforeMount() {
      this.setCounts()
    }
	});
</script>
