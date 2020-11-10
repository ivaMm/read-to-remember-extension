console.log("Hello");
// document.body.style.filter = 'blur(5px)';

function getBooks() {
  const allBooks = document.querySelectorAll('h2'); //h3
  return Array.prototype.map.call(allBooks, function(b) { return b.textContent; }).join("| ");
}

function getAuthors() {
  const allAuthors = document.querySelectorAll('p.a-spacing-base.a-spacing-top-mini.a-text-center.a-size-base.a-color-secondary.kp-notebook-searchable');
  return Array.prototype.map.call(allAuthors, function(a) { return a.textContent.slice(4); }).join("| ");
}

function getAsins() {
  const allAsins = document.getElementsByClassName("a-row kp-notebook-library-each-book");
  return Array.prototype.map.call(allAsins, function(a) { return `https://read.amazon.com/kp/notebook?contentLimitState=BLAHBLAHBLAH&index=52&asin=${a.id}` }); //.join(" ");
}

function getHighlights() {  // iterate through all books; return hash {title: title, author: author, highlights: [{content: content, location: location, note: note}] }
  const urls = getAsins();
  //urls.forEach(url => function() {
  urlss = [urls[0], urls[4], urls[21]]; //atm
  urlss.forEach(url => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let doc = this.responseXML;

        const allHighlights = doc.querySelectorAll("span#highlight");
        const highlights = Array.prototype.map.call(allHighlights, function(b) { return b.textContent; }); //.join("| ");

        const allLocations = doc.querySelectorAll('#annotationHighlightHeader');
        const locations = Array.prototype.map.call(allLocations, function(b) { return (b.textContent).replace(/.+[^\d]/, ""); }); //.join("| ");

        const allNotes = doc.querySelectorAll('#note');
        const notes = Array.prototype.map.call(allNotes, function(b) { return b.textContent; }); //.join("| ");


        const arrHighlightHash = highlights.map((h, index) => {
          return {
            content: h,
            location: locations[index],
            note: notes[index]
          }
        });

        const str = arrHighlightHash.map(hh => `${hh.content}, page: ${hh.location} , note: ${hh.note}`);
        const title = doc.querySelector('h3').textContent;
        const author = doc.querySelector('p.a-spacing-none.a-spacing-top-micro.a-size-base.a-color-secondary.kp-notebook-selectable.kp-notebook-metadata').textContent;
        alert(`BOOK: ${title}, AUTHOR: ${author}, HIGHLIGHTS: ${str.join(" | ")}`); //atm
      }
    };
    xhttp.open("GET", `${url}`, true);
    xhttp.responseType = "document";
    xhttp.send();
  });
}

function fetchData() {
 return {
    //title: title,
    //url: url,
    books: getBooks(),
    authors: getAuthors(),
    asins: getAsins(),
    highlights: getHighlights()
  }
}

function sendData(data) {
  const url = 'https://wagon-chat.herokuapp.com/engineering/messages';
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "author": "ReadToRemember chrome extension",
      "content": `I've found something cool! Your books: ${data.books} & authors: ${data.authors} & ASINS ${data.asins} & highlights: ${data.highlights}`
    })
  })
  alert('We are importing your highlights, please wait'); //atm
}

sendData(fetchData());
