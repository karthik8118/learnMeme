let memes = [];
let currentMemeIndex = 0;

// Load memes from JSON file
async function loadMemes() {
    try {
        const response = await fetch('data/meme.json'); // Corrected file name
        if (!response.ok) throw new Error('Failed to fetch memes');
        const data = await response.json();
        memes = data.memes;
        if (memes.length > 0) showMeme();
    } catch (error) {
        console.error('Error loading memes:', error);
        document.querySelector('.meme-front').innerHTML = 'Failed to load memes 😢';
    }
}

// Display current meme
function showMeme() {
    const meme = memes[currentMemeIndex];
    const memeContainer = document.querySelector('.meme-front');
    memeContainer.innerHTML = '';
    
    const img = document.createElement('img');
    img.className = 'media-content';
    img.src = meme.path;
    img.alt = meme.explanation;
    img.loading = 'lazy';
    img.onerror = () => {
        img.src = 'assets/images/error.png'; // Fallback image
        console.error('Failed to load image:', meme.path);
    };
    memeContainer.appendChild(img);
    
    document.getElementById('meme-text').innerText = meme.explanation || 'No explanation available';
}

// Initialize theme
function initializeTheme() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    const themeToggle = document.getElementById('theme-toggle');
    
    if (darkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = "☀️";
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = "🌙";
    }
}

// Event Listeners
document.querySelector('.meme-card').addEventListener('click', function() {
    this.classList.toggle('flipped');
});

document.getElementById('next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentMemeIndex = (currentMemeIndex + 1) % memes.length;
    showMeme();
});

document.getElementById('prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentMemeIndex = (currentMemeIndex - 1 + memes.length) % memes.length;
    showMeme();
});

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
    localStorage.setItem('darkMode', isDarkMode);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    loadMemes();
});