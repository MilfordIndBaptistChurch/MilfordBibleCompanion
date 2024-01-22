const getAllChapters = async (bookRef, chapterRef) => {
	return await import(`../data/bible/${bookRef.value.replace(/\s/g, '')}.json`)
  .then(({default: json}) => {
  	let verses = [];
  	for (const i in json.chapters) {
  		if(Number(json.chapters[i].chapter) === chapterRef.value) {
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
  getAllChapters
}