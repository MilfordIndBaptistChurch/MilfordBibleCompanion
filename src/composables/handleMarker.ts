import dataSource from '../data/highlights.json';
import { getRef, getObjKeys } from '../common/utils';

const handleBookMarker = (book: any) => {
	let marker = book;
	for (const i in dataSource) {
		if (getRef(getObjKeys(dataSource[i])[0]).book === book
			&& marker.indexOf('*') === -1) {
			marker += ' *';
		}
	}
	return marker;
}
const handleChapterMarker = (chapter: any, bookRef: any) => {
	let marker = chapter;
	for (const i in dataSource) {
		if (getRef(getObjKeys(dataSource[i])[0]).chapter === chapter
			&& getRef(getObjKeys(dataSource[i])[0]).book === bookRef.value
			&& marker.indexOf('*') === -1) {
			marker += ' *';
		}
	}
	return marker;
}
const handleVerseMarker = (verse: any, bookRef: any) => {
	let marker = verse;
	for (const i in dataSource) {
		if (getRef(getObjKeys(dataSource[i])[0]).verse === verse
			&& getRef(getObjKeys(dataSource[i])[0]).book === bookRef.value
			&& marker.toString().indexOf('*') === -1) {
				marker += ' *';
		}
	}
	return marker;
}

export {
	handleBookMarker,
	handleChapterMarker,
	handleVerseMarker
}