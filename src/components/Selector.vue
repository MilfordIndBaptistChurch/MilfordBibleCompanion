<script setup lang="ts">
  import dataSource from '../common/data.json';
	defineProps<{
	  bookData: Array<String>
	}>()
</script>

<template>
  <div>
    <div style="margin: 22px 0 0 0">
			<div class="field has-addons">
			  <div class="control" style="margin: 0 10px 0 0">
			    <div class="select">
				    <select v-model="bookRef" placeholder="Select" @change="handleBook" v-on:change="setRefData" style="width: 155px;">
				      <option v-for="book in getBooks()" :label="book" :value="book" />
				    </select>
				  </div>
				</div>
			  <div class="control" style="margin: 0 10px 0 0">
			    <div class="select">
				    <select v-model="chapterRef" placeholder="Select" @change="handleChapter" v-on:change="setRefData" style="width: 75px">
				      <option v-for="chapter in getChapters()" :label="chapter" :value="chapter" />
				    </select>
				  </div>
				</div>
			  <div class="control">
			    <div class="select">
				    <select v-model="verseRef" placeholder="Select" v-on:change="setRefData" style="width: 75px">
				      <option v-for="verse in getVerses()" :label="verse" :value="verse" />
				    </select>
				  </div>
				</div>
			</div>
    </div>
		<article class="message is-dark" style="margin: 25px 0 0 0">
		  <div class="message-body" style="font-size: 30px">
		    <div v-html="getVerse()"></div>
		  </div>
		</article>
  </div>
</template>

<script lang="ts">
	import { ref } from 'vue';
	import {
		getRef,
		getDefault,
		getObjKeys
	} from '../common/utils';
	const bookRef = ref();
	const chapterRef = ref();
	const verseRef = ref();
	export default {
		props: ['bookData'],
		methods: {
			assignBookData() {
				let bookModel = this.bookData;
				bookRef.value = getDefault(bookModel).book;
				chapterRef.value = getDefault(bookModel).chapter;
				verseRef.value = getDefault(bookModel).verse;
			},
	    handleBook(book: any) {
	      bookRef.value = book.target.value;
				chapterRef.value = this.getChapters()[0];
				verseRef.value = this.getVerses()[0];
	    },
	    handleChapter(event: any) {
	    	verseRef.value = this.getVerses()[0];
	    },
	    getBooks() {
	    	const books = [];
	    	for (const i in this.bookData) {
	    		books.push(this.bookData[i].book);
	    	}
	    	return books;
	    },
	    getChapters() {
	    	const chapters = [];
	    	for (const i in this.bookData) {
	    		if (bookRef.value === this.bookData[i].book) {
	    			for (const j in this.bookData[i].chapters) {
    					chapters.push(this.bookData[i].chapters[j].chapter);
    				}
	    		}
	    	}
	    	return chapters;
	    },
	    getVerses() {
	    	const verses = [];
	    	for (const i in this.bookData) {
	    		if (bookRef.value === this.bookData[i].book) {
	    			for (const j in this.bookData[i].chapters) {
	    				if (chapterRef.value === this.bookData[i].chapters[j].chapter) {
		    				for (const k in this.bookData[i].chapters[j].verses) {
		    					verses.push(this.bookData[i].chapters[j].verses[k]);
		    				}
	    				}
	    			}
	    		}
	    	}
	    	return verses;
	    },
	    // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type ** resolves this for now **
	    getIndex(obj: any, string: any) {
	    	return obj[string]!; // will never be undefined!
	    },
	    getVerse() {
	    	const regex = /\*(.*?)\*/g;
	    	const spanTags = `<span style="display: inline;padding: 4px 7px;background: #ffd60a;">$1</span>`;
	    	for (const i in dataSource) {
	    		if(getObjKeys(dataSource[i])[0] === `${bookRef.value} ${chapterRef.value}:${verseRef.value}`) {
						const stringRef = getObjKeys(dataSource[i])[0];
						const index = this.getIndex(dataSource[i], stringRef);
	    			const value = index.verse.replace(regex, spanTags);
			    	return `<span>${verseRef.value}</span>. ${value}`;
	    		}
	    	}
	    },
	    setRefData () {
	    	this.$emit('set-ref-data', `${bookRef.value} ${chapterRef.value}:${verseRef.value}`);
	    }
		},
		beforeMount() {
		  this.assignBookData()
		}	
	}
</script>