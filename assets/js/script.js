let memes = [];
let currentMemeIndex = 0;

async function loadMemes() {
    try {
        const response = await fetch('data/memes.json');
        const data = await response.json();
        memes = data.memes;
        if (memes.length > 0) showMeme();
    } catch (error) {
        console.error('Error loading memes:', error);
    }
}

function showMeme() {
    const meme = memes[currentMemeIndex];
    const memeContainer = document.querySelector('.meme-front');
    memeContainer.innerHTML = '';
    
    switch(meme.type) {
        case 'embed':
            const embedDiv = document.createElement('div');
            embedDiv.innerHTML = meme.content;
            embedDiv.className = 'media-content';
            memeContainer.appendChild(embedDiv);
            
            if (meme.script) {
                const script = document.createElement('script');
                script.src = meme.script;
                script.async = true;
                document.body.appendChild(script);
            }
            break;
            
        case 'url':
        case 'local':
            const img = document.createElement('img');
            img.className = 'media-content';
            img.src = meme.type === 'url' ? meme.url : meme.path;
            img.alt = meme.explanation;
            img.loading = 'lazy';
            memeContainer.appendChild(img);
            break;
    }
    
    document.getElementById('meme-text').innerText = meme.explanation;
}

// Event Listeners
document.querySelector('.meme-card').addEventListener('click', function() {
    this.classList.toggle('flipped');
});

document.getElementById('next').addEventListener('click', () => {
    currentMemeIndex = (currentMemeIndex + 1) % memes.length;
    showMeme();
});

document.getElementById('prev').addEventListener('click', () => {
    currentMemeIndex = (currentMemeIndex - 1 + memes.length) % memes.length;
    showMeme();
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
});

// Initialize
loadMemes();