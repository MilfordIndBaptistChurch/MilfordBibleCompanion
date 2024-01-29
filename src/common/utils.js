  import jsonata from 'jsonata';

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

const getObjKeys = (value) => {
	return Object.keys(value);
}

const getUniqueValues = (array) => (
  array.filter((currentValue, index, arr) => (
		arr.indexOf(currentValue) === index
	))
)

const getJsonData = async (string, source) => {
  const expression = jsonata(string);
  return await expression.evaluate(source);
}

export {
	getRef,
	getObjKeys,
	getUniqueValues,
	getJsonData
}