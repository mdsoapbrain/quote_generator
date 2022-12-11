const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');




let apiQuotes = [];
// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// show new quotes
function newQuote(){
    loading();
    // pick a randon quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author;
    

    // check quote length to determine styling
    if (quote.text.length > 120 ){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    complete();

}



// get quotes from API
async function getQuotes(){
    loading();
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json()
        newQuote()
        
    }
    catch (error){
        // catcg error here
    }
    
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Eventlistener
newQuoteBtn.addEventListener('click', newQuote)


// on load
getQuotes();


