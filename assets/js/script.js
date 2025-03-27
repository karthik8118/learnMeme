let memes = [];
let currentMemeIndex = 0;

async function loadMemes() {
    const response = await fetch('data/memes.json');
    memes = await response.json();
    showMeme();
}

function showMeme() {
    document.getElementById('meme-img').src = memes[currentMemeIndex].image;
    document.getElementById('meme-text').innerText = memes[currentMemeIndex].text;
}

document.getElementById('next').addEventListener('click', () => {
    currentMemeIndex = (currentMemeIndex + 1) % memes.length;
    showMeme();
});

document.getElementById('prev').addEventListener('click', () => {
    currentMemeIndex = (currentMemeIndex - 1 + memes.length) % memes.length;
    showMeme();
});

// Load memes on startup
loadMemes();
