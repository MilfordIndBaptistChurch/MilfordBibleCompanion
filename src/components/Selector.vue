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
				    <select v-model="newBookRef.bookName" placeholder="Select" @change="handleBook" v-on:change="setRefData" class="book-select">
				      <option v-if="newBookRef.allBooks" v-for="book in newBookRef.allBooks" :label="handleBookMarker(book)" :value="book" />
				    </select>
				  </div>
				</div>
			  <div class="control">
			    <div class="select">
				    <select v-model="newBookRef.selectedChapter" placeholder="Select" @change="handleChapter" v-on:change="setRefData" class="chapter-select">
				      <option v-if="newBookRef.allChapters" v-for="chapter in newBookRef.allChapters" :label="handleChapterMarker(chapter, newBookRef.bookName)" :value="chapter" />
				    </select>
				  </div>
				</div>
			  <div class="control">
			    <div class="select">
				    <select v-model="newBookRef.selectedVerse" placeholder="Select" @change="handleVerse" v-on:change="setRefData" class="verse-select">
				      <option v-if="newBookRef.allVerses" v-for="verse in newBookRef.allVerses" :label="handleVerseMarker(verse, newBookRef.bookName)" :value="verse" />
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
		  	<a-skeleton v-if="loading" active />
		    <div v-if="!loading" v-html="newBookRef.text"></div>
		  </div>
		</article>
		<ChapterList v-bind:chapter="newBookRef.chapter" v-bind:showChapterState="showChapterState" />
  </div>
</template>

<script lang="ts">
	import { ref, reactive } from 'vue';
	import jsonata from 'jsonata';
	import {
		getChapter,
		handleBookMarker,
		handleChapterMarker,
		handleVerseMarker
	} from '../composables';
	const newBookRef = ref({
		bookName: undefined,
		selectedChapter: undefined,
		selectedVerse: undefined,
		allBooks: undefined,
		allChapters: undefined,
		allVerses: undefined,
		chapter: undefined,
		text: undefined
	});

	const loading = ref(false);

	const showChapterState = reactive({
	  checked: false
	});

	export default {
		props: ['bookData'],
		methods: {
			async getJsonData (string, source) {
		    const expression = jsonata(string);
		    return await expression.evaluate(source);
			},
			/** Assign defaults */
			async assignDefaults () {
		    const chapters = await this.getJsonData('$.Genesis', indexSource);
		    newBookRef.value = {
		    	bookName: 'Genesis',
		    	selectedChapter: 1,
		    	selectedVerse: 1,
		    	allBooks: await this.getJsonData('$keys(*)', indexSource),
		    	allVerses: Array.from({ length: chapters['1'] }, (value, index) => index + 1),
		    	allChapters: Array.from({ length: Object.keys(chapters).length }, (value, index) => index + 1)
		    }
		    this.updateChapterText();
			},
			/** Handle book */
	    async handleBook(book: any) {
		    const books = await this.getJsonData('$keys(*)', indexSource);
		    let {
		    	bookName,
		    	selectedChapter,
		    	selectedVerse,
		    	allChapters,
		    	chapter
		    } = newBookRef.value;
	      for (const i in indexSource) {
	      	if (books[i] === book.target.value) {
				    const chapters = await this.getJsonData('$.`' + books[i] + '`', indexSource);
				    newBookRef.value.allVerses = Array.from({ length: chapters['1'] }, (value, index) => index + 1);
	      		newBookRef.value.allChapters = Array.from({ length: Object.keys(chapters).length }, (value, index) => index + 1)
	      	}
	      }
	      loading.value = true;
	      bookName = book.target.value;
	      newBookRef.value.selectedChapter = 1;
	      newBookRef.value.selectedVerse = 1;
	      chapter = await getChapter(bookName, 1);
	      this.updateChapterText();
	    },
	    /** Handle chapter */
	    async handleChapter(event: any) {
	    	const chapters = await this.getJsonData('$.`' + newBookRef.value.bookName + '`', indexSource);
	      newBookRef.value.selectedChapter = Number(event.target.value);
	      newBookRef.value.selectedVerse = 1;
				newBookRef.value.allVerses = Array.from({ length: chapters[event.target.value] }, (value, index) => index + 1);
	    	this.updateChapterText();
	    },
	    /** Handle verse */
	    handleVerse(event: any) {
		    newBookRef.value = Object.assign(newBookRef.value, {
		    	selectedVerse: Number(event.target.value)
		    });
	    	this.updateChapterText();
	    },
	    /** Get chapters */
	    async getChapter () {
	    	let { bookName, selectedChapter } = newBookRef.value;
	    	if (!bookName) return;
	    	await import(`../data/bible/${bookName.replace(/\s/g, '')}.json`)
        .then(async ({default: json}) => {
        	const verses = await this.getJsonData('$.chapters['+(selectedChapter-1)+'].verses', json);
		    	newBookRef.value.chapter = verses;
        });
	    },
			/** Get text */
	    async getText () {
	    	let { bookName, selectedChapter, selectedVerse } = newBookRef.value;
	    	if (!bookName) return;
	    	await import(`../data/bible/${bookName.replace(/\s/g, '')}.json`)
        .then(async ({default: json}) => {
        	const passage = await this.getJsonData('$.chapters['+(selectedChapter-1)+'].verses['+(selectedVerse-1)+']', json);
        	setTimeout(() => loading.value = false, 500);
      		newBookRef.value.text = `<span>${passage.verse}</span>. ${passage.text}`;
        });
	    },
	    updateChapterText () {
				this.getChapter();
	    	this.getText();
	    },
	    setRefData () {
	    	let { bookName, selectedChapter, selectedVerse } = newBookRef.value;
	    	this.$emit('set-ref-data', `${bookName} ${selectedChapter}:${selectedVerse}`);
	    }
		},
		/** Before mount */
		async beforeMount() {
		  await this.assignDefaults();
		}
	}
</script>