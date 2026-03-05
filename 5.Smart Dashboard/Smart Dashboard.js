// --- SCOPE ---
// We define this array in the Global Scope so the data persists 
// and doesn't reset every time the function runs.
let quotesHistory = []; 

// --- DOM SELECTION ---
const clockElement = document.getElementById('clock');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const fetchBtn = document.getElementById('fetch-btn');
const historyList = document.getElementById('history-list');

// ==========================================
// CONCEPT 1: Timers & Date (Digital Clock)
// ==========================================
function updateClock() {
    const now = new Date();
    // Use padStart to ensure we always have 2 digits (e.g., "05" instead of "5")
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    clockElement.innerText = `${hours}:${minutes}:${seconds}`;
}

// Update the clock every 1000 milliseconds (1 second)
setInterval(updateClock, 1000);
updateClock(); // Run immediately so it doesn't wait for the first second


// ==========================================
// CONCEPT 2: APIs & Async/Await
// ==========================================
async function getQuoteFromServer() {
    try {
        // Change text to show the user we are loading data
        quoteText.innerText = "⏳ Fetching data from server...";
        quoteAuthor.innerText = "";

        // 1. Send Request to the backend/API
        const response = await fetch('https://dummyjson.com/quotes/random');
        
        // 2. Convert the response text into a JavaScript Object (JSON)
        const data = await response.json(); 
        
        // 3. Update the HTML with the real data
        quoteText.innerText = `"${data.quote}"`;
        quoteAuthor.innerText = `- ${data.author}`;

        // ==========================================
        // CONCEPT 3: Objects & Arrays
        // ==========================================
        // Create an object holding the exact time and the new quote
        const newHistoryItem = {
            time: clockElement.innerText, // Grab current time from the UI
            text: data.quote,
            author: data.author
        };

        // Push this new object into our array
        quotesHistory.push(newHistoryItem);

        // Update the list on the screen
        updateHistoryUI();

    } catch (error) {
        // This block runs if the internet disconnects or the server fails
        quoteText.innerText = "❌ Error fetching data. Check your internet.";
        console.error(error);
    }
}

// ==========================================
// CONCEPT 4: DOM Manipulation
// ==========================================
function updateHistoryUI() {
    // Clear the old list first so we don't duplicate items
    historyList.innerHTML = '';

    // Loop through our array
    for (let i = 0; i < quotesHistory.length; i++) {
        const item = quotesHistory[i];

        // Create a new <li> element
        const li = document.createElement('li');
        
        // Apply the CSS class we defined in style.css
        li.className = "history-item"; 
        
        // Add the HTML content inside the <li> using our Object properties
        li.innerHTML = `
            <span class="time-badge">[${item.time}]</span> 
            "${item.text}" <span class="author-name">- ${item.author}</span>
        `;

        // Append the new <li> to the <ul> in the DOM
        historyList.appendChild(li);
    }
}

// Trigger the API function when the button is clicked
fetchBtn.addEventListener('click', getQuoteFromServer);