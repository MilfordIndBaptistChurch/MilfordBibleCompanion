<script setup lang="ts">
  import dataSource from '../data/highlights.json';
  import indexSource from '../data/bible/Index.json';
	defineProps<{
	  bookData: Array<String>
	}>()
</script>

<template>
  <div>
    <div style="margin: 22px 0 0 0;">
			<div class="field has-addons">
			  <div class="control" style="margin: 0 10px 0 0">
			    <div class="select">
				    <select v-model="bookRef" placeholder="Select" @change="handleBook" v-on:change="setRefData" style="width: 155px;">
				      <option v-for="book in getBooks()" :label="handleBookMarker(book)" :value="book" />
				    </select>
				  </div>
				</div>
			  <div class="control" style="margin: 0 10px 0 0">
			    <div class="select">
				    <select v-model="chapterRef" placeholder="Select" @change="handleChapter" v-on:change="setRefData" style="width: 75px">
				      <option v-for="chapter in getChapters()" :label="handleChapterMarker(chapter)" :value="chapter" />
				    </select>
				  </div>
				</div>
			  <div class="control" style="margin: 0 10px 0 0">
			    <div class="select">
				    <select v-model="verseRef" placeholder="Select" @change="handleVerse" v-on:change="setRefData" style="width: 75px">
				      <option v-for="verse in getVerses()" :label="handleVerseMarker(verse)" :value="verse" />
				    </select>
				  </div>
				</div>
			</div>
    </div>
		<article class="message is-dark" style="margin: 25px 0 0 0">
		  <div class="message-body" style="font-size: 30px">
		    <div v-html="verseText"></div>
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
	const limitRef = ref<any>();
	const chapterRef = ref();
	const verseRef = ref();
	const verseText = ref();

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
			handleBookMarker(book: any) {
				let marker = book;
				for (const i in dataSource) {
					if (getRef(getObjKeys(dataSource[i])[0]).book === book
						&& marker.indexOf('*') === -1) {
						marker += ' *';
					}
				}
				return marker;
			},
			handleChapterMarker(chapter: any) {
				let marker = chapter;
				for (const i in dataSource) {
					if (getRef(getObjKeys(dataSource[i])[0]).chapter === Number(chapter)
						&& getRef(getObjKeys(dataSource[i])[0]).book === bookRef.value
						&& marker.indexOf('*') === -1) {
						marker += ' *';
					}
				}
				return marker;
			},
			handleVerseMarker(verse: any) {
				let marker = verse;
				for (const i in dataSource) {
					if (getRef(getObjKeys(dataSource[i])[0]).verse === Number(verse)
						&& getRef(getObjKeys(dataSource[i])[0]).book === bookRef.value
						&& marker.toString().indexOf('*') === -1) {
							marker += ' *';
					}
				}
				return marker;
			},
	    handleBook(book: any) {
	      bookRef.value = book.target.value;

	      for (const i in indexSource) {
	      	if (getObjKeys(indexSource[i])[0] === book.target.value) {
	      		limitRef.value = this.getIndex(indexSource[i], getObjKeys(indexSource[i])[0]);
	      	}
	      }

				chapterRef.value = this.getChapters()[0];
				verseRef.value = this.getVerses()[0];
				this.getVerse();
	    },
	    handleChapter(event: any) {
	    	chapterRef.value = event.target.value;
	    	verseRef.value = 1;
	    	this.getVerse();
	    },
	    handleVerse(event: any) {
	    	verseRef.value = event.target.value;
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
	    		chapters.push(i);
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
	    	await import('../data/bible/' + bookRef.value.replace(/\s/g, '') + '.json')
        .then(({default: json}) => {
        	// console.log(json);
        	let verse;
        	let text;
        	for (const i in json.chapters) {
        		if (Number(json.chapters[i].chapter) === Number(chapterRef.value)) {
        			for (const j in json.chapters[i].verses) {
        				if (Number(json.chapters[i].verses[j].verse) === Number(verseRef.value)) {
									verse = json.chapters[i].verses[j].verse;
									text = json.chapters[i].verses[j].text;
								}
							}
        		}
          }
          // console.log(`<span>${verse}</span>. ${text}`);
          verseText.value = `<span>${verse}</span>. ${text}`;
        });
	    },
	    setRefData () {
	    	this.$emit('set-ref-data', `${bookRef.value} ${chapterRef.value}:${verseRef.value}`);
	    }
		},
		beforeMount() {
		  this.assignBookData();
		  this.getVerse();
		}
	}
</script>