<script setup lang="ts">
	import ChapterList from './ChapterList.vue';
	import Study from '../components/Study.vue';
  import indexSource from '../data/bible/Index.json';
  import dataSource from '../data/highlights.json';
</script>

<template>
  <div>
    <div class="selector">
			<div class="field has-addons">
			  <div class="control">
			    <div class="select">
				    <select v-model="bookRef.name" placeholder="Select" @change="() => handleBook({target: { value: bookRef.name }}).then(resp => resp.rest())" v-on:change="setRefData" class="book-select">
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
				<div class="control columns is-vcentered">
					<span class="show-cf">Show cf</span>
					<a-switch v-model:checked="showCFState.checked" :disabled="handleDisabled()" />
				</div>
				<div class="control columns is-vcentered">
					<span class="show-images">Show images</span>
					<a-switch v-model:checked="showImagesState.checked" />
				</div>
			</div>
    </div>
		<article v-if="!showChapterState.checked" class="message is-dark">
		  <div class="message-body" style="min-height: 175px;">
		  	<a-skeleton v-if="loading" active />
		  	<a-tooltip :open="copied">
		  		<template #title>Copied</template>
		  		<div class="tooltip-1">
		  			<font-awesome-icon icon="fa-far fa-copy" @click="copy(source)" />
		  		</div>
		  	</a-tooltip>
		    <div v-if="!loading" v-html="bookRef.text"></div>
		  </div>
		</article>
		<ChapterList v-bind:bookRef="bookRef" v-bind:showChapterState="showChapterState" />
	  <a-row style="margin: 20px 0 0 0">
	    <a-col :span="12">
				<UpCircleOutlined @click="() => nextPassage('up')" style="cursor: pointer; margin-right: 5px; font-size: 28px; color: #bfbfbf" />
				<DownCircleOutlined @click="() => nextPassage('down')" style="cursor: pointer; font-size: 28px; color: #bfbfbf" />
	    </a-col>
	    <a-col :span="12" style="text-align: right; user-select: none;">
			    <a-tag color="pink">Book</a-tag>
			    <a-tag color="red">Context</a-tag>
			    <a-tag color="orange">Audience</a-tag>
			    <a-tag color="green">Dispensation</a-tag>
			    <a-tag color="cyan">Geography</a-tag>
			    <a-tag color="blue">Questions</a-tag>
			    <a-tag color="purple">Lesson</a-tag>
	    </a-col>
	  </a-row>
    <div v-for="items in dataSource">
        <div v-for="item in items[`${bookRef.name} ${bookRef.selected.chapter}:${bookRef.selected.verse}` as keyof typeof items]">
          <div v-if="Array.isArray(item)" v-for="(studyRef, i) in item">
            <Study v-bind:index="i" v-bind:highlight="studyRef.highlight" v-bind:methods="studyRef.methods" />
          </div>
        </div>
  	</div>
		<article v-if="showCFState.checked && crossRef" class="message is-dark cf">
			<div class="message-header">
		    <p>Cross References (cf.)</p>
		  </div>
			<div class="message-body">
				<div v-html="crossRef"></div>
			</div>
		</article>
    <div v-if="showImagesState.checked" style="margin: 25px 0 0 0">
      <div class="tabs">
        <ul>
          <li class="is-active"><a>Images</a></li>
        </ul>
      </div>
      <div class="columns is-multiline" style="user-select: none;">
        <div class="column is-one-quarter-desktop is-half-tablet">
          <div class="card">
            <div class="card-image">
              <figure class="image is-3by2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Jerusalem-Grabeskirche-14-vom_Erloeserkirchturm-2010-gje.jpg/800px-Jerusalem-Grabeskirche-14-vom_Erloeserkirchturm-2010-gje.jpg" alt="">
              </figure>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">
                Holy Land Sites
              </a>
            </footer>
          </div>
        </div>
        <div class="column is-one-quarter-desktop is-half-tablet">
          <div class="card">
            <div class="card-image">
              <figure class="image is-3by2">
                <img src="https://www.c4israel.org.nz/wp-content/uploads-pcvi0001/2021/03/shutterstock_356008508.jpeg" alt="">
              </figure>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">
                Holy Land Sites
              </a>
            </footer>
          </div>
        </div>  
        <div class="column is-one-quarter-desktop is-half-tablet">
          <div class="card">
            <div class="card-image">
              <figure class="image is-3by2">
                <img src="https://enterthebible.org/wp-content/uploads/2021/07/OT-6_Ancient_NearEast.jpg" alt="">
              </figure>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">
                Bible Map
              </a>
            </footer>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 50px; user-select: none;">&nbsp;</div>
  </div>
</template>

<script lang="ts">
	import { ref, reactive } from 'vue';
	import router from '../router'
	import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons-vue';
	import { useClipboard } from '@vueuse/core'
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

	const crossRef = ref('');

	const source = ref('');

	const {
		copy,
		copied
	} = useClipboard({ source })

	const loading = ref(false);

	const selectedChapter = ref(undefined);
	const selectedVerse = ref(undefined);

	const showChapterState = reactive({
	  checked: false
	});

	const showCFState = reactive({
	  checked: true
	});

	const showImagesState = reactive({
	  checked: true
	});

	const constants = {
		GENESIS: 'Genesis'
	}

	export default {
		methods: {
			firstLetterUppercase(book: any) {
				return book.charAt(0).toUpperCase() + book.slice(1);
			},
			async setPathConfig () {
				const path = router.currentRoute.value.path;
				const book = path.replace(/\//g, '').split('-');

				let newBook = {
					name: '',
					chapter: 1,
					verse: 1
				};

				if (book.length > 3) {
					newBook = {
						name: `${book[0]} ${this.firstLetterUppercase(book[1])}`,
						chapter: Number(book[2]),
						verse: Number(book[3])
					}
				} else {
					newBook = {
						name: this.firstLetterUppercase(book[0]),
						chapter: Number(book[1]), 
						verse: Number(book[2])
					}
				}

		    bookRef.value.books = await getJsonData('$keys(*)', indexSource);
		    bookRef.value.name = newBook.name;
		    bookRef.value.selected.chapter = newBook.chapter;
		    bookRef.value.selected.verse = newBook.verse;
	      bookRef.value.chapters = await getChapters(newBook.name);
	      bookRef.value.chapter = await getChapter(newBook.name, newBook.chapter);
 				bookRef.value.verses = await getVerses(newBook.name, newBook.chapter);
				this.handleBook(undefined).then(resp => resp.rest());
				this.setRefData();
			},
			updateRoute () {
				router.push(
					{ path:
						`${bookRef.value.name.replace(/\s/g, '-')}-${bookRef.value.selected.chapter}-${bookRef.value.selected.verse}`
				});
			},
			async assignDefaults () {
		    bookRef.value.books = await getJsonData('$keys(*)', indexSource);
		    const newBook = { target: { value: constants.GENESIS } };
				this.handleBook(newBook).then(resp => resp.rest());
			},
			async nextPassage (direction: string) {
				const chapterLength = bookRef.value.verses.length;
				const selectedVerse = Number(bookRef.value.selected.verse);
				let value = { target: { value: 0 } };
				if (direction === 'up' && selectedVerse < chapterLength + 1) {
					value.target.value = selectedVerse - 1;
				} else if (direction === 'down' && selectedVerse > 0
					&& selectedVerse !== chapterLength) {
					value.target.value = selectedVerse + 1;
				}
				if (value.target.value > 0) {
					this.handleVerse(value);
					this.handleBook(undefined).then(resp => resp.rest());
				}
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
		      newModel.chapter = await getChapter(newModel.name, 1);
	 				newModel.verses = await getVerses(newModel.name, 1);

		      bookRef.value = newModel;
	    	}

	    	const _this = this;

				const methods = {
					async chapter () {
						const { name } = bookRef.value;
			      bookRef.value.selected = {
			      	chapter: selectedChapter.value,
			      	verse: 1
			      }
						bookRef.value.verses = await getVerses(name, selectedChapter.value);
						return this;
					},
					verse () {
				    bookRef.value = Object.assign(bookRef.value, {
				    	selected: {
				    		chapter: bookRef.value.selected.chapter,
				    		verse: selectedVerse.value
				    	}
				    });
						return this;
					},
					async rest () {
						crossRef.value = '';

						_this.handleCF();

						await getChapterVerses(bookRef);
		    		await getVerse(bookRef);

		    		_this.updateRoute();

		    		source.value = bookRef.value.rawText;

		    		setTimeout(() => loading.value = false, 500);
					}
				}

				return methods;
			},
			/** Handle disabled */
			handleDisabled () {
				return crossRef.value === '';
			},
			/** Handle CF */
			async handleCF () {
				const { name, selected: { chapter, verse } } = bookRef.value;
				if (!name) return;
				await import(`../data/extras/${name.replace(/\s/g, '')}.json`)
					.then(async ({default: json}) => {
						for (let i in json) {
							if (json[i].ref === `${chapter}:${verse}`) {
								crossRef.value = json[i].cf.join(', ');
							}
						}
					});
			},
	    /** Handle chapter */
	    async handleChapter(event: any) {
	    	selectedChapter.value =  event.target.value;
	    	this.handleBook(undefined).then(resp => { resp.chapter(); resp.rest(); });
	    },
	    /** Handle verse */
	    async handleVerse(event: any) {
	    	selectedVerse.value =  event.target.value;
	    	this.handleBook(undefined).then(resp => { resp.verse(); resp.rest(); });
	    },
	    /** Parent callback */
	    setRefData () {
	    	let { name, selected: { chapter, verse } } = bookRef.value;
	    	this.$emit('set-ref-data', `${name} ${chapter}:${verse}`);
	    }
		},
		/** Before mount */
		async beforeMount() {
			const path = router.currentRoute.value.path;
			if (path && path !== '/') {
				return await this.setPathConfig();
			}
		  await this.assignDefaults();
		}
	}
</script>