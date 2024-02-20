<template>
  <main>
  	<div style="margin: 25px 0 0 0;">
		  <h3 style="margin: 16px 0; font-size: 24px">Favourites</h3>
		  <a-list size="large" bordered :data-source="localStorageFav">
		    <template #renderItem="{ item, index }">
		      <a-list-item style="font-size: 22px; line-height: 37px">
						<template #actions>
		          <a key="list-delete" :data-index="index" @click="handleDelete">delete</a>
		        </template>
		      	{{ item }}
		     	</a-list-item>
		    </template>
		  </a-list>	
  	</div>
  </main>
</template>

<style lang="scss">
  @import "../assets/main.scss";
</style>

<script lang="ts">
	import { ref, onMounted } from 'vue';

	const localStorageFav = ref([]);

	export default {
		setup () {
			onMounted(() => {
				localStorageFav.value = JSON.parse(localStorage.getItem('fav')) || [];
			})
			return { localStorageFav };
		},
		methods: {
			handleDelete (event) {
				const index = event.target.dataset.index;
				delete localStorageFav.value[index];
				const newArray = [];
				for (const i in localStorageFav.value) {
					if (i !== index) {
						newArray.push(localStorageFav.value[i])
					}
				}
				localStorageFav.value = newArray;
				if (newArray.length > 0) {
					localStorage.setItem('fav', JSON.stringify(newArray));
				} else {
					localStorage.removeItem('fav');
				}
			}
		}
	}
</script>
