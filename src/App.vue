<script setup lang="ts">
	import { RouterLink, RouterView } from 'vue-router';
	import { GithubOutlined, DownOutlined } from '@ant-design/icons-vue';
	import SideNav from './components/SideNav.vue';
  import dataSource from './data/highlights.json';

	const columns = [
	  {
	    title: 'Reference',
	    dataIndex: 'reference',
	    key: 'reference',
	  },
	  {
	    title: 'Description',
	    dataIndex: 'description',
	    key: 'description',
	  },
	  {
	    title: 'Tags',
	    key: 'tags',
	    dataIndex: 'tags',
	  }
	];

	const data = [
	  {
	    key: '1',
	    reference: 'Gen 1:1',
	    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
	    tags: ['Context', 'Dispensation'],
	  },
	  {
	    key: '2',
	    reference: 'Gen 1:2',
	    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
	    tags: ['Audience'],
	  },
	  {
	    key: '3',
	    reference: 'Gen 1:3',
	    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
	    tags: ['Context', 'Audience'],
	  },
	];
</script>

<template>
	<a-layout style="height: 100%; background: none;">
		<a-layout-header>
	    <a-menu
	      theme="dark"
	      mode="horizontal"
	      :style="{ lineHeight: '64px' }"
	    >
		    <a-menu-item class="logo" key="1" style="padding: 0">
		    	<router-link to="/" style="color: #ffffff">Milford Bible Companion</router-link>
		    </a-menu-item>
		    <a-menu-item key="2">
		    	<a href="https://www.mbiblestudygroup.co" target="_blank">
		    		MBSG
		    	</a>
		  	</a-menu-item>
		    <a-menu-item key="3">
		    	<a href="https://www.mbiblestudygroup.co/tools" target="_blank">
		    		About
		    	</a>
		    </a-menu-item>
		    <a-menu-item key="4">
		    	<a href="https://www.mbiblestudygroup.co/add-widget" target="_blank">
		    		Add Widget
		    	</a>
		    </a-menu-item>
		    <a-menu-item key="5">
		    	<router-link to="/fav">Favourites</router-link>
		    </a-menu-item>
		    <a-menu-item key="6">
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
		<a-layout style="background: none">
		  <a-layout-content style="padding: 0 50px;">
	  		<RouterView />
  		</a-layout-content>
			<a-layout-sider class="a-layout-sider" style="height: 100%; background: none">
				<SideNav
					:booksCount="bookCount"
					:crossRefCount="crossRefCount"
					:charactersCount="charactersCount"
				/>
			</a-layout-sider>
		</a-layout>
  	<a-drawer :width="500" title="Sermons" :placement="placement" :open="open" @close="onClose">
			<a-breadcrumb>
		    <a-breadcrumb-item href="">
		      <HomeOutlined />
		    </a-breadcrumb-item>
		    <a-breadcrumb-item href="">
		      <span>Genesis 1:1-5</span>
		    </a-breadcrumb-item>
		  </a-breadcrumb>
		  <div style="font-size:16px; margin: 0 0 25px 0">
			  <p>&nbsp;</p>
		    <p style="margin: 0 0 10px 0">
		    	<a href="">God spoke</a>
		    	&nbsp;
		    	<a-tag color="cyan">Bro. James</a-tag></p>
		    <p style="margin: 0 0 10px 0">
		    	<a href="">The Creator</a>
		    	&nbsp;
		    	<a-tag color="cyan">Bro. James</a-tag>
		    </p>
		    <p style="margin: 0 0 10px 0">
		    	<a href="">Let there be Light!</a>
		    	&nbsp;<a-tag color="cyan">Bro. James</a-tag>
		    </p>
	  	</div>
		  <a-table :columns="columns" :data-source="data">
		    <template #bodyCell="{ column, record }">
		      <template v-if="column.key === 'reference'">
		        <a>
		          {{ record.reference }}
		        </a>
		      </template>
		      <template v-else-if="column.key === 'tags'">
		        <span>
		          <a-tag
		            v-for="tag in record.tags"
		            :key="tag"
		            :color="tag === 'Dispensation' ? 'green' : 'blue'"
		            style="margin: 0 0 7px 0"
		          >
		            {{ tag }}
		          </a-tag>
		        </span>
		      </template>
		    </template>
		  </a-table>
	  </a-drawer>
	</a-layout>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
	import type { DrawerProps } from 'ant-design-vue';
	import { useDrawerStore } from './stores/drawer'
	import { HomeOutlined } from '@ant-design/icons-vue';
  import { getRef, getObjKeys, getUniqueValues } from './common/utils';

  const bookCount = ref(0);
  const crossRefCount = ref(0);
  const charactersCount = ref(0);

	const placement = ref<DrawerProps['placement']>('right');
	const open = ref<boolean>(false);

	const onClose = () => {
		const drawer = useDrawerStore();
		drawer.setOpenState(false);
	};

	export default defineComponent({
		data() {
    	return {
    		drawer: useDrawerStore()
    	}
  	},
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

			const drawer = useDrawerStore();
		  drawer.$subscribe((mutation, state) => {
		  	open.value = state.open;
		  })
    }
	});
</script>
