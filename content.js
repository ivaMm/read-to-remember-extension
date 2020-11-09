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
  return Array.prototype.map.call(allAsins, function(a) { return a.id; }).join(" ");
}

function getHighlights() {  // just first book!
  // iterate through asins
  //window.location.href = `https://read.amazon.com/kp/notebook?contentLimitState=BLAHBLAHBLAH&index=52&asin=B083D667N2` //=> ${asin}
  const allHighlights = document.getElementsByClassName("kp-notebook-highlight");
  return Array.prototype.map.call(allHighlights, function(b) { return b.textContent; }).join("| ");
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
