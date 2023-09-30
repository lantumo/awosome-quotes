const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const author = document.getElementById("author");
const twitter = document.getElementById("twitter");
const quoteBtn = document.getElementById("quote-container");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// get quotes from API
let apiQuotes = [];

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
function showNewQuote() {
  loading();
  // pick random quote from api quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  author.textContent = quote.author ? quote.author : "unknown";
  quote.text.length > 50
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  //   set text,hide loader
  quoteText.textContent = quote.text;
  complete();
}

console.log(apiQuotes);
async function getQuotes() {
  loading();

  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    showNewQuote();
  } catch (error) {
    console.log("whoops , no quote", error);
  }
}

console.log(newQuoteBtn);
// tweet Quote

function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
  window.open(twitterURL, "_blank");
}
// event listiners
newQuoteBtn.addEventListener("click", showNewQuote);
twitter.addEventListener("click", tweetQuote);
// onLoads
getQuotes();
loading();
