<script setup lang="ts">
	import { RouterLink, RouterView } from 'vue-router';
	import { GithubOutlined } from '@ant-design/icons-vue';
	import SideNav from './components/SideNav.vue';
  import dataSource from './data/highlights.json';
</script>

<template>
	<a-layout style="height: 100%;background: none">
		<a-layout-header>
	    <div class="logo">
	    	<a href="/" style="color: #ffffff">
	    		Milford Bible Companion
	    	</a>
	    </div>
	    <a-menu
	      theme="dark"
	      mode="horizontal"
	      :style="{ lineHeight: '64px' }"
	    >
		    <a-menu-item key="1">
		    	<a href="https://www.mbiblestudygroup.co" target="_blank">
		    		MBSG
		    	</a>
		  	</a-menu-item>
		    <a-menu-item key="2">
		    	<a href="https://www.mbiblestudygroup.co/tools" target="_blank">
		    		About
		    	</a>
		    </a-menu-item>
		    <a-menu-item key="3">
		    	<a href="https://www.mbiblestudygroup.co/contact" target="_blank">
		    		Contact
		    	</a>
		    </a-menu-item>
	    </a-menu>
			<a href="https://github.com/MilfordIndBaptistChurch/MilfordBibleCompanion"
				target="_blank"
				style="position: absolute; font-size: 35px; top: 0; right: 25px; color: #ffffff"
			>
				<GithubOutlined />
			</a>
	  </a-layout-header>
		<a-layout style="height: 100%;background: none">
		  <a-layout-content style="padding: 0 50px;">
	  		<RouterView />
  		</a-layout-content>
			<a-layout-sider style="background: none">
				<SideNav
					:booksCount="bookCount"
					:crossRefCount="crossRefCount"
					:charactersCount="charactersCount"
				/>
			</a-layout-sider>
		</a-layout>
	</a-layout>
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
        	const book = getRef(getObjKeys(dataSource[i])[0]).book;
        	bookArray.push(book);
        	bookArray = getUniqueValues(bookArray as []);
        }
       	bookCount.value = bookArray.length;
	    },
	    setReusableMethodCount (methodCountRef:string, countRef:any) {
	    	let reusableArray = [] as Array<String>;
	    	for (const i in dataSource) {
		    	const stringRef = getObjKeys(dataSource[i])[0];
		    	const index = this.getIndex(dataSource[i], stringRef);
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
