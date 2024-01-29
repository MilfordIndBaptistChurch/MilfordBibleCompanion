import { getJsonData } from '../common/utils';
import indexSource from '../data/bible/Index.json';

const getChaptersCount = async (book) => await getJsonData('$.`' + (book || 'Genesis') + '`', indexSource);

const getChapters = async (book) => Array.from({ length: Object.keys(await getChaptersCount(book)).length }, (value, index) => index + 1)

const getChapter = async (book, selectedChapter) => {
	return await import(`../data/bible/${book.replace(/\s/g, '')}.json`)
  .then(({default: json}) => {
  	let verses = [];
  	for (const i in json.chapters) {
  		if(Number(json.chapters[i].chapter) === selectedChapter) {
  			for (const j in json.chapters[i].verses) {
  				verses.push({
						verse: {
							index: `#${json.chapters[i].verses[j].verse}`,
							text: json.chapters[i].verses[j].text
						}
  				});
  			}
  		}
  	}
  	return verses;
  });
}

export {
  getChaptersCount,
  getChapters,
  getChapter
}