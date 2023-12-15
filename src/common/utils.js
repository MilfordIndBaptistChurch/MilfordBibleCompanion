const getRef = (dataIndex) => {
	const ref = Object.keys(dataIndex)[0];
	return {
		ref,
		book: ref.split(' ')[0],
		chapter: Number(ref.split(' ')[1].split(':')[0]),
		verse: Number(ref.split(' ')[1].split(':')[1])
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

export {
	getRef,
	getDefault,
	getObjKeys
}