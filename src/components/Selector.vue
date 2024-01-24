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
				      <option v-if="newBookRef.allChapters" v-for="chapter in newBookRef.allChapters" :label="handleChapterMarker(chapter, bookRef)" :value="chapter" />
				    </select>
				  </div>
				</div>
			  <div class="control">
			    <div class="select">
				    <select v-model="verseRef" placeholder="Select" @change="handleVerse" v-on:change="setRefData" class="verse-select">
				      <option v-if="newBookRef.allVerses" v-for="verse in newBookRef.allVerses" :label="handleVerseMarker(verse, bookRef)" :value="verse" />
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
	import jsonata from 'jsonata';
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
	const newBookRef = ref({
		bookName: undefined,
		selectedChapter: undefined,
		selectedVerse: undefined,
		allChapters: undefined,
		allVerses: undefined,
		text: undefined
	});
	const bookRef = ref();
	const chapterRef = ref();
	const verseRef = ref();
	const verseText = ref();
	const chapterListRef = ref();

	const showChapterState = reactive({
	  checked: false
	});

	/**
		Get rid of limit next
	*/

	export default {
		props: ['bookData'],
		methods: {
			/** Assign defaults */
			async assignDefaults () {
		    const expression = jsonata('$.Genesis');
		    const chapters = await expression.evaluate(indexSource);

		    newBookRef.value = {
		    	bookName: 'Genesis',
		    	selectedChapter: 1,
		    	selectedVerse: 1,
		    	allVerses: Array.from({ length: chapters['1'] }, (value, index) => index + 1),
		    	allChapters: Array.from({ length: Object.keys(chapters).length }, (value, index) => index + 1)
		    }

    		bookRef.value = 'Genesis';
    		chapterRef.value = 1;
    		verseRef.value = 1;
			},
			/** Handle book */
	    async handleBook(book: any) {
		    const expression = jsonata('$keys(*)');
		    const books = await expression.evaluate(indexSource);

		    let {
		    	bookName,
		    	selectedChapter,
		    	selectedVerse,
		    	allChapters	
		    } = newBookRef.value;

	      for (const i in indexSource) {
	      	if (books[i] === book.target.value) {

				    const expression = jsonata('$.`' + books[i] + '`');
				    const chapters = await expression.evaluate(indexSource);

	      		newBookRef.value.allChapters = Array.from({ length: Object.keys(chapters).length }, (value, index) => index + 1)
	      	}
	      }

	      bookRef.value = book.target.value;
	      bookName = book.target.value;
	      selectedChapter = 1;
	      selectedVerse = 1;
	      // allChapters = await getAllChapters(name, chapter);

				chapterRef.value = 1;
				verseRef.value = 1;
				this.getText();
				chapterListRef.value = await getAllChapters(bookRef, chapterRef);
	    },
	    /** Handle chapter */
	    async handleChapter(event: any) {
		    let {
		    	bookName,
		    	selectedChapter,
		    	selectedVerse,
		    	allChapters	
		    } = newBookRef.value;

	      selectedChapter = Number(event.target.value);
	      selectedVerse = 1;

	    	chapterRef.value = Number(event.target.value);
	    	verseRef.value = 1;
	    	this.getText();
	    	// allChapters = await getAllChapters(name, chapter);
	    	chapterListRef.value = await getAllChapters(bookRef, chapterRef);
	    },
	    /** Handle verse */
	    handleVerse(event: any) {
	    	verseRef.value = Number(event.target.value);
	    	this.getText();
	    },
	    /** Get books */
	    getBooks() {
	    	const books = [];
	    	for (const i in indexSource) {
	    		books.push(getObjKeys(indexSource[i])[0]);
	    	}
	    	return books;
	    },
			/** Get text */
	    async getText () {
	    	await import(`../data/bible/${bookRef.value.replace(/\s/g, '')}.json`)
        .then(async ({default: json}) => {
        	let verse;
        	let text;

		    	const expression = jsonata('$.*');
			    const chaptersVerse = await expression.evaluate(json);

        	for (const i in chaptersVerse) {
        		if (Number(chaptersVerse[i].chapter) === chapterRef.value) {
        			for (const j in chaptersVerse[i].verses) {
        				if (Number(chaptersVerse[i].verses[j].verse) === verseRef.value) {
									verse = chaptersVerse[i].verses[j].verse;
									text = chaptersVerse[i].verses[j].text;
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
		/** Before mount */
		async beforeMount() {
		  await this.assignDefaults();
		  this.getText();
		}
	}
</script>