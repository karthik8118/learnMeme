let memes = [];
let currentMemeIndex = 0;

// Load memes from JSON
async function loadMemes() {
    const response = await fetch('data/memes.json');
    memes = await response.json();
    showMeme();
}

// Show the current meme
function showMeme() {
    document.getElementById('meme-img').src = memes[currentMemeIndex].image;
    document.getElementById('meme-text').innerText = memes[currentMemeIndex].text;
}

// Next and Previous Meme
document.getElementById('next').addEventListener('click', () => {
    currentMemeIndex = (currentMemeIndex + 1) % memes.length;
    showMeme();
});

document.getElementById('prev').addEventListener('click', () => {
    currentMemeIndex = (currentMemeIndex - 1 + memes.length) % memes.length;
    showMeme();
});

// Shuffle Meme (Random)
document.getElementById('shuffle').addEventListener('click', () => {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * memes.length);
    } while (randomIndex === currentMemeIndex); // Ensure it's a new meme

    currentMemeIndex = randomIndex;
    showMeme();
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Change the theme button icon
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});

// Load memes on startup
loadMemes();
