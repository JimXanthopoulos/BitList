// Login Start //

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopups = document.querySelectorAll('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopups.forEach(button => {
    button.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
        sideMenu.classList.remove('active'); 
    });
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});

// Login end //


// Carousel start //

const API_KEY = "b67bd6921d914c82ae53477698793fbd";  // you can add your own API key here if you want to test the site with your key.
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=20`;

let games = [];
let currentIndex = 0;

const imageEl = document.getElementById("carousel-image");
const titleEl = document.getElementById("carousel-title");

async function fetchGames() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

   
    games = data.results.filter(game => game.background_image);

    
    games.sort(() => Math.random() - 0.5);

    showGame();
    setInterval(nextGame, 5000);

  } catch (error) {
    console.error("Failed to fetch games:", error);
  }
}

function showGame() {
  const game = games[currentIndex];
  imageEl.style.opacity = 0;

  setTimeout(() => {
    imageEl.src = game.background_image;
    titleEl.textContent = game.name;
    imageEl.style.opacity = 1;
  }, 300);
}

function nextGame() {
  currentIndex = (currentIndex + 1) % games.length;
  showGame();
}

fetchGames();


// Carousel end //


const newGamesRow = document.getElementById('newGamesRow');

async function fetchTrendingGames() {
    try {
        const TRENDING_GAMES_URL = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-added&page_size=8`;

        const response = await fetch(TRENDING_GAMES_URL);
        const data = await response.json();

        displayTrendingGames(data.results);
    } catch (error) {
        console.error("Failed to fetch trending games:", error);
    }
}

function displayTrendingGames(games) {
    newGamesRow.innerHTML = "";

    games.forEach(game => {
        if (!game.background_image) return;

        const img = document.createElement('img');
        img.src = game.background_image;
        img.alt = game.name;
        img.title = game.name;

        newGamesRow.appendChild(img);
    });
}

fetchTrendingGames();




// Hamburger start //


const header = document.getElementById('mainHeader');
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 120) {
        header.classList.add('hide');
        hamburger.style.display = 'flex';
    } else {
        header.classList.remove('hide');
        hamburger.style.display = 'none';
        sideMenu.classList.remove('active');
    }
});

hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
});


// Hamburger end //