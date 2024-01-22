<script setup lang="ts">
	import ChapterList from './ChapterList.vue';
  import dataSource from '../data/highlights.json';
  import indexSource from '../data/bible/Index.json';

	defineProps<{
	  bookData: Array<String>
	}>()
</script>

<template>
  <div>
    <div class="selector">
			<div class="field has-addons">
			  <div class="control">
			    <div class="select">
				    <select v-model="bookRef" placeholder="Select" @change="handleBook" v-on:change="setRefData" class="book-select">
				      <option v-for="book in getBooks()" :label="handleBookMarker(book)" :value="book" />
				    </select>
				  </div>
				</div>
			  <div class="control">
			    <div class="select">
				    <select v-model="chapterRef" placeholder="Select" @change="handleChapter" v-on:change="setRefData" class="chapter-select">
				      <option v-for="chapter in getChapters()" :label="handleChapterMarker(chapter, bookRef)" :value="chapter" />
				    </select>
				  </div>
				</div>
			  <div class="control">
			    <div class="select">
				    <select v-model="verseRef" placeholder="Select" @change="handleVerse" v-on:change="setRefData" class="verse-select">
				      <option v-for="verse in getVerses()" :label="handleVerseMarker(verse, bookRef)" :value="verse" />
				    </select>
				  </div>
				</div>
				<div class="control columns is-vcentered">
					<span class="show-chapter">Show chapter</span>
					<a-switch v-model:checked="showChapterState.checked" />
				</div>
			</div>
    </div>
		<article v-if="!showChapterState.checked" class="message is-dark">
		  <div class="message-body">
		    <div v-html="verseText"></div>
		  </div>
		</article>
		<ChapterList v-bind:chapterListRef="chapterListRef" v-bind:showChapterState="showChapterState" />
  </div>
</template>

<script lang="ts">
	import { ref, reactive } from 'vue';
	import {
		getAllChapters,
		handleBookMarker,
		handleChapterMarker,
		handleVerseMarker
	} from '../composables';
	import {
		getRef,
		getDefault,
		getObjKeys
	} from '../common/utils';
	const bookRef = ref();
	const limitRef = ref<any>();
	const chapterRef = ref();
	const verseRef = ref();
	const verseText = ref();
	const chapterListRef = ref();

	const showChapterState = reactive({
	  checked: false
	});

	export default {
		props: ['bookData'],
		methods: {
	    // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type ** resolves this for now **
	    getIndex(obj: any, string: any) {
	    	return obj[string]!; // will never be undefined!
	    },
			assignBookData() {
    		bookRef.value = getObjKeys(indexSource[0])[0];
    		chapterRef.value = 1;
    		verseRef.value = 1;
    		limitRef.value = this.getIndex(indexSource[0], getObjKeys(indexSource[0])[0]);
			},
	    async handleBook(book: any) {
	      bookRef.value = book.target.value;

	      for (const i in indexSource) {
	      	if (getObjKeys(indexSource[i])[0] === book.target.value) {
	      		limitRef.value = this.getIndex(indexSource[i], getObjKeys(indexSource[i])[0]);
	      	}
	      }

				chapterRef.value = this.getChapters()[0];
				verseRef.value = this.getVerses()[0];
				this.getVerse();
				chapterListRef.value = await getAllChapters(bookRef, chapterRef);
	    },
	    async handleChapter(event: any) {
	    	chapterRef.value = Number(event.target.value);
	    	verseRef.value = 1;
	    	this.getVerse();
	    	chapterListRef.value = await getAllChapters(bookRef, chapterRef);
	    },
	    handleVerse(event: any) {
	    	verseRef.value = Number(event.target.value);
	    	this.getVerse();
	    },
	    getBooks() {
	    	const books = [];
	    	for (const i in indexSource) {
	    		books.push(getObjKeys(indexSource[i])[0]);
	    	}
	    	return books;
	    },
	    getChapters() {
	    	const chapters = [];
	    	for (const i in limitRef.value) {
	    		chapters.push(Number(i));
	    	}
	    	return chapters;
	    },
	    getVerses() {
	    	const verses = [];
	    	for (let i = 0; i < limitRef.value[chapterRef.value]; i++) {
	    		verses.push(i + 1);
	    	}
	    	return verses;
	    },
	    async getVerse () {
	    	await import(`../data/bible/${bookRef.value.replace(/\s/g, '')}.json`)
        .then(({default: json}) => {
        	let verse;
        	let text;
        	for (const i in json.chapters) {
        		if (Number(json.chapters[i].chapter) === chapterRef.value) {
        			for (const j in json.chapters[i].verses) {
        				if (Number(json.chapters[i].verses[j].verse) === verseRef.value) {
									verse = json.chapters[i].verses[j].verse;
									text = json.chapters[i].verses[j].text;
								}
							}
        		}
          }
          verseText.value = `<span>${verse}</span>. ${text}`;
        });
	    },
	    setRefData () {
	    	this.$emit('set-ref-data', `${bookRef.value} ${chapterRef.value}:${verseRef.value}`);
	    }
		},
		async beforeMount() {
		  this.assignBookData();
		  chapterListRef.value = await getAllChapters(bookRef, chapterRef);
		  this.getVerse();
		}
	}
</script>