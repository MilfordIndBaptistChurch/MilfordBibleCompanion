<script setup lang="ts">
	import ChapterList from './ChapterList.vue';
  import indexSource from '../data/bible/Index.json';
</script>

<template>
  <div>
    <div class="selector">
			<div class="field has-addons">
			  <div class="control">
			    <div class="select">
				    <select v-model="bookRef.name" placeholder="Select" @change="handleBook" v-on:change="setRefData" class="book-select">
				      <option v-if="bookRef.books" v-for="book in bookRef.books" :label="handleBookMarker(book)" :value="book" />
				    </select>
				  </div>
				</div>
			  <div class="control">
			    <div class="select">
				    <select v-model="bookRef.selected.chapter" placeholder="Select" @change="handleChapter" v-on:change="setRefData" class="chapter-select">
				      <option v-if="bookRef.chapters" v-for="chapter in bookRef.chapters" :label="handleChapterMarker(chapter, bookRef.name)" :value="chapter" />
				    </select>
				  </div>
				</div>
			  <div class="control">
			    <div class="select">
				    <select v-model="bookRef.selected.verse" placeholder="Select" @change="handleVerse" v-on:change="setRefData" class="verse-select">
				      <option v-if="bookRef.verses" v-for="verse in bookRef.verses" :label="handleVerseMarker(verse, bookRef.name)" :value="verse" />
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
		    <div v-if="!loading" v-html="bookRef.text"></div>
		  </div>
		</article>
		<ChapterList v-bind:chapter="bookRef.chapter" v-bind:showChapterState="showChapterState" />
  </div>
</template>

<script lang="ts">
	import { ref, reactive } from 'vue';
	import { getJsonData } from '../common/utils';
	import {
		getBooks,
		getChapters,
		getChapter,
		getVerses,
		getVerse,
		getChapterVerses,
		handleBookMarker,
		handleChapterMarker,
		handleVerseMarker
	} from '../composables';
	const bookRef = ref<any>({
		name: 'Genesis',
		selected: {
			verse: 1,
			chapter: 1
		},
		books: {},
		chapters: [],
		chapter: [],
		verses: [],
		text: ''
	});

	const loading = ref(false);

	const selectedChapter = ref(undefined);
	const selectedVerse = ref(undefined);

	const showChapterState = reactive({
	  checked: false
	});

	const constants = {
		GENESIS: 'Genesis'
	}

	export default {
		methods: {
			async assignDefaults () {
		    bookRef.value.books = await getJsonData('$keys(*)', indexSource);
		    const newBook = { target: { value: constants.GENESIS } };
				this.handleBook(newBook);
			},
			/** Handle book */
			async handleBook (bookValue: any) {
				if (bookValue) {
					const newBook = bookValue && bookValue.target.value;
					const newModel = Object.assign({}, bookRef.value);
					const books = await getBooks();

					loading.value = true;

		      newModel.name = newBook;
		      newModel.selected = {
						verse: 1,
						chapter: 1
		      };
		      newModel.chapters = await getChapters(newBook);
		      newModel.chapter = await getChapter(newBook, 1);
	 				newModel.verses = await getVerses(newBook);

		      bookRef.value = newModel;
	    	}

				const methods = {
					async chapter () {
						const { name } = bookRef.value;
			      bookRef.value.selected = {
			      	chapter: selectedChapter,
			      	verse: 1
			      }
						bookRef.value.verses = await getVerses(name);
						return this;
					},
					async verse () {
				    bookRef.value = Object.assign(bookRef.value, {
				    	selected: {
				    		chapter: bookRef.value.selected.chapter,
				    		verse: selectedVerse
				    	}
				    });
						return this;
					}
				}

				await getChapterVerses(bookRef);
    		await getVerse(bookRef);

    		setTimeout(() => loading.value = false, 500);

				return methods;
			},
	    /** Handle chapter */
	    async handleChapter(event: any) {
	    	selectedChapter.value =  event.target.value;
	    	this.handleBook(undefined).then(resp => resp.chapter());
	    },
	    /** Handle verse */
	    handleVerse(event: any) {
	    	selectedVerse.value =  event.target.value;
	    	this.handleBook(undefined).then(resp => resp.verse());
	    },
	    /** Parent callback */
	    setRefData () {
	    	let { name, selected: { chapter, verse } } = bookRef.value;
	    	this.$emit('set-ref-data', `${name} ${chapter}:${verse}`);
	    }
		},
		/** Before mount */
		async beforeMount() {
		  await this.assignDefaults();
		}
	}
</script>