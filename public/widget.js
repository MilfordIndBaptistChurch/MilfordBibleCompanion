var elems = document.querySelectorAll('.mbc-widget');

var getRef = (bookRef) => {
	var book = bookRef.split(':')[0];
	var chapter = bookRef.split(':')[0];

	book = book.replace(parseInt(book.match(/\d+$/)[0], 10), '').trim();
	chapter = parseInt(chapter.match(/\d+$/)[0], 10);

	return {
		book,
		chapter,
		verse: Number(bookRef.split(':')[1])
	}
}

function appendCSS() {
  let css = document.createElement('link');
  css.rel = 'stylesheet';
  css.media = 'all';
  css.href = 'http://localhost:5173/widget.css';

  document.getElementsByTagName('head')[0].appendChild(css);
}

async function jsonData (bookRef) {
	var newBookRef = getRef(bookRef);
	var url = `https://mbc-json-files.netlify.app/${newBookRef.book.replace(/\//g, '')}.json`;
	return await fetch(url, {
		method: 'GET',
    headers: {
    	'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
	})
	  .then(async function (res) {
	  	const json = res.json().then(resp => {
	  		return resp.chapters[Number(newBookRef.chapter) - 1].verses[Number(newBookRef.verse) - 1].text
	  	});
	  	return json;
	  })
	  .then(function (res) {
	    return res;
	  })
	  .catch(function(error) {
	    console.log(error);
	  });
}

function loopElements () {
	elems.forEach(async (item) => {
	  var bookRef = item.innerHTML;
	  var jsonResults = await jsonData(bookRef);
	  var theme = item.dataset.theme;
	  if (theme === 'dark') {
		  item.classList.add('dark');
		}
		  item.innerHTML = `
			  <p>
			  	<a href="https://mbiblecompanion.co" target="_blank">
			  		<b>${bookRef} KJV</b>
			  	</a>
			  </p>
			  <p>
			  	${jsonResults}
			  </p>
		  `;
	});
}

appendCSS();

loopElements();
