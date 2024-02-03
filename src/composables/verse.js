import { getJsonData } from '../common/utils';
import { getChaptersCount } from './chapter';
import dataSource from '../data/highlights.json';

const getVerses = async (bookName, selectedChapter) => {
  const verseCount = await getChaptersCount(bookName);
  return Array.from({ length: verseCount[selectedChapter] }, (value, index) => index + 1);
}

const getVerse = async (bookRef) => {
	const regex = /\*(.*?)\*/g;
	const spanTags = `<span style="display: inline;padding: 4px 7px;background: #FFEE88;">$1</span>`;
	let { name, selected } = bookRef.value;
	if (!name) return;
	await import(`../data/bible/${name.replace(/\s/g, '')}.json`)
		.then(async ({default: json}) => {
			const { name, selected } = bookRef.value;
			const passage = await getJsonData('$.chapters['+(selected.chapter-1)+'].verses['+(selected.verse-1)+']', json);
			const bibleRef = `${name} ${selected.chapter}:${passage.verse}`;
			const highlights = await getJsonData('$.`' + bibleRef + '`', dataSource);
			let updatedText = passage.text.replace(regex, spanTags);
			if (highlights) {
				updatedText = highlights.verse.replace(regex, spanTags);
			}
			bookRef.value.text = `${passage.verse}. ${updatedText}`;
			bookRef.value.rawText = `${bibleRef} - ${passage.text}`;
		});
}

const getChapterVerses = async (bookRef) => {
	let { name, selected: { chapter } } = bookRef.value;
	if (!name) return;
	await import(`../data/bible/${name.replace(/\s/g, '')}.json`)
  .then(async ({default: json}) => {
  	const verses = await getJsonData('$.chapters['+(chapter-1)+'].verses', json);
  	bookRef.value.chapter = verses;
  });
};

export {
  getVerses,
  getVerse,
  getChapterVerses,
}