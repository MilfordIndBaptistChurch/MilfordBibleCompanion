<script setup lang="ts">
	defineProps<{
	  data: array
	}>()
</script>

<template>
  <div>
    <div class="text-18 font-600 mt-4">
	    <el-select v-model="bookRef" placeholder="Select" @change="handleBook($event)" v-on:Change="setRefData" class="mr-2" style="width: 115px">
	      <el-option v-for="book in getBooks()" :label="book" :value="book" />
	    </el-select>
	    <el-select v-model="chapterRef" placeholder="Select" v-on:Change="setRefData" class="mr-2" style="width: 75px">
	      <el-option v-for="chapter in getChapters()" :label="chapter" :value="chapter" />
	    </el-select>
	    <el-select v-model="verseRef" placeholder="Select" v-on:Change="setRefData" style="width: 75px">
	      <el-option v-for="verse in getVerses()" :label="verse" :value="verse" />
	    </el-select>
    </div>
    <div class="text-16 mt-3 verse-wrapper" style="color: var(--el-text-color-regular)">
      <div v-html="getVerse()"></div>
    </div>
  </div>
</template>

<script lang="ts">
	import { ref } from 'vue';
	import {
		getRef,
		getDefault,
		getObjKeys
	} from '../common/utils';
	const bookRef = ref('');
	const chapterRef = ref('');
	const verseRef = ref('');
	export default {
		props: ['data'],
		data: () => {
			return {
					default: {},
					newModel: []
				};
		},
		methods: {
			hydrateData() {
				let newModel = [];
				for (const prop in this.data) {
					const ref = getRef(this.data[prop]);
					const book = ref.book;
					const chapter = ref.chapter;
					const verse = ref.verse;

					if (JSON.stringify(newModel).indexOf(book) === -1) {
						newModel.push({
							book,
							chapters: {
								[chapter]: [verse]
							}
						});
					} else if (JSON.stringify(newModel).indexOf(book) > -1) {
						for(const prop in newModel) {
							const bookIndex = newModel[prop];
							if (bookIndex.book === book) { // book exist
								if (Number(getObjKeys(bookIndex.chapters)[0]) === chapter) { // chapter exist
									for (const verseIndex in bookIndex.chapters[chapter]) {
										if (bookIndex.chapters[chapter][verseIndex] !== verse) {
											bookIndex.chapters[chapter].push(verse);
										}
									}
								} else { // chapter doesn't exist
									newModel[bookIndex].chapters[chapter] = [verse];
								}
							}
						}
					}
				}
				this.newModel = newModel;
				this.default = getDefault(newModel);
				bookRef.value = this.default.book;
				chapterRef.value = this.default.chapter;
				verseRef.value = this.default.verse;
			},
	    handleBook(book) {
	      bookRef.value = book;
				chapterRef.value = this.getChapters()[0];
				verseRef.value = this.getVerses()[0];
	    },
	    getBooks() {
	    	const books = [];
	    	for (const prop in this.newModel) {
	    		books.push(this.newModel[prop].book);
	    	}
	    	return books;
	    },
	    getChapters() {
	    	const chapters = [];
	    	for (const prop in this.newModel) {
	    		const bookIndex = this.newModel[prop];
	    		if (bookRef.value === bookIndex.book) {
	    			for (const index in getObjKeys(bookIndex.chapters)) {
	    				chapters.push(Number(getObjKeys(bookIndex.chapters)[index]));
	    			}
	    		}
	    	}
	    	return chapters;
	    },
	    getVerses() {
	    	const verses = [];
	    	for (const prop in this.newModel) {
	    		const bookIndex = this.newModel[prop];
	    		if (bookRef.value === bookIndex.book) {
	    			for (const index in bookIndex.chapters[getObjKeys(bookIndex.chapters)[0]]) {
	    				verses.push(bookIndex.chapters[getObjKeys(bookIndex.chapters)[0]][index]);
	    			}
	    		}
	    	}
	    	return verses;
	    },
	    getVerse() {
	    	const regex = /\*(.*?)\*/g;
	    	const spanTags = `<span style="display: inline;padding: 4px 7px;background: #89e8ff;">$1</span>`;
	    	for (const prop in this.data) {
	    		if(getObjKeys(this.data[prop])[0] === `${bookRef.value} ${chapterRef.value}:${verseRef.value}`) {
	    			const value = this.data[prop][getObjKeys(this.data[prop])[0]].verse.replace(regex, spanTags);
			    	return `<span>${verseRef.value}</span>. ${value}`;
	    		}
	    	}
	    },
	    setRefData () {
	    	this.$emit('set-ref-data', `${bookRef.value} ${chapterRef.value}:${verseRef.value}`);
	    }
		},
		beforeMount() {
		  this.hydrateData()
		}	
	}
</script>