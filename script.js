document.addEventListener('DOMContentLoaded',()=>{
//    In JavaScript, the querySelector() method is a powerful function that allows you to select and retrieve elements from the DOM (Document Object Model) using CSS-style selectors. It returns the first element that matches the 
// specified selector.
    const quoteText=document.querySelector(".quote");
    const authorName=document.querySelector(".author .name");
    quoteBtn=document.querySelector("button");
    //for speech ,copy and twitter button
    soundBtn=document.querySelector(".sound");
    copyBtn=document.querySelector(".copy");
    twitterBtn=document.querySelector(".twitter");

    // random quote function
    // function randomQuote(){
    // //    quoteBtn.innerText="Loading Quote...";
    //    quoteBtn.classList.add("loading"); //styling it in css
    //     // console.log("Clicked");
    //     //fetching random quotes from API and parsing it into Javascript object
    //     fetch("https://api.quotable.io/random").then(res=> res.json()).then(result =>{
    //     console.log(result);
    //     quoteText.innerText = result.content; //through this, the quote from API will be set into inner text of class quote
    //     authorName.innerText=result.author;  
    //     quoteBtn.innerText="New Quote";  
    //     // after styling loading class, need to go back to button so that we can click on it again
        // quoteBtn.classList.remove("loading");
    // })
    // }
    const apiURL = "https://api.quotable.io/random";
async function randomQuote() {
  quoteBtn.classList.add("loading");
  try {
    const response = await fetch(apiURL);
    console.log(response);
    const data = await response.json();
    quoteText.innerText = data.content;
    authorName.innerText = data.author;
    // quoteBtn.innerText = "Quote";
    quoteBtn.classList.remove("loading");
  } catch (error) {
    console.error("Error", error);
    quoteText.innerText = "Failed to fetch a quote.";
    authorName.innerText = "";
    quoteBtn.innerText = "Retry";
    quoteBtn.classList.remove("loading");
  }
}


    // for speech 
    soundBtn.addEventListener("click",()=>{
        // The SpeechSynthesisUtterance interface of the Web Speech API represents a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.)
        let utterance= new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        speechSynthesis.speak(utterance); //speak method of speechSynthesis speaks the utterance
    }) 

    // for copying the quote
    copyBtn.addEventListener("click",()=>{
        //copying the quote text on copyBtn click
        // navigator clipboard: The Clipboard API adds to the Navigator interface the read-only clipboard property, which returns the Clipboard object used to read and write the clipboard's contents.
        // The Clipboard interface's writeText() property writes the specified text string to the system clipboard. 
        navigator.clipboard.writeText(quoteText.innerText);
    })
    
    // for twitter button
    twitterBtn.addEventListener("click",()=>{
       let tweeturl=`https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
       window.open(tweeturl,"_blank"); //opening a new twitter tab with passing quote in url
    // is passed as the second argument, which specifies that the new window should be opened in a new tab rather than replacing the current page.
    })
    quoteBtn.addEventListener("click",randomQuote);
})