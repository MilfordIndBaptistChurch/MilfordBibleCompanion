import { getJsonData } from '../common/utils';
import { getChaptersCount } from './chapter';

const getVerses = async (book) => {
  const verseCount = await getChaptersCount(book);
  return Array.from({ length: verseCount['1'] }, (value, index) => index + 1);
}

const getVerse = async (bookRef) => {
	let { name, selected } = bookRef.value;
	if (!name) return;
	await import(`../data/bible/${name.replace(/\s/g, '')}.json`)
		.then(async ({default: json}) => {
			const passage = await getJsonData('$.chapters['+(selected.chapter-1)+'].verses['+(selected.verse-1)+']', json);
			bookRef.value.text = `<span>${passage.verse}</span>. ${passage.text}`;
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