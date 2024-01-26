const getChapter = async (bookName, selectedChapter) => {
	return await import(`../data/bible/${bookName.replace(/\s/g, '')}.json`)
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
  getChapter
}