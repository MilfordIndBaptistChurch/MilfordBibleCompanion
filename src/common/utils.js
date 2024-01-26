const getRef = (bookRef) => {
	let book = bookRef.split(':')[0];
	let chapter = bookRef.split(':')[0];

	book = book.replace(parseInt(book.match(/\d+$/)[0], 10), '').trim();
	chapter = parseInt(chapter.match(/\d+$/)[0], 10);

	return {
		book,
		chapter,
		verse: Number(bookRef.split(':')[1])
	}
}

const getDefault = (bookModel) => {
	return {
		book: bookModel[0].book,
		chapter: bookModel[0].chapters[0].chapter,
		verse: bookModel[0].chapters[0].verses[0]
	}
}

const getObjKeys = (value) => {
	return Object.keys(value);
}

const getUniqueValues = (array) => (
  array.filter((currentValue, index, arr) => (
		arr.indexOf(currentValue) === index
	))
)

export {
	getRef,
	getDefault,
	getObjKeys,
	getUniqueValues
}