const getRef = (dataIndex) => {
	const ref = Object.keys(dataIndex)[0];
	return {
		ref,
		book: ref.split(' ')[0],
		chapter: Number(ref.split(' ')[1].split(':')[0]),
		verse: Number(ref.split(' ')[1].split(':')[1])
	}
}

const getDefault = (newModel) => {
	return {
		book: newModel[0].book,
		chapter: Number(Object.keys(newModel[0].chapters)[0]),
		verse: newModel[0].chapters[Number(Object.keys(newModel[0].chapters)[0])][0]
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