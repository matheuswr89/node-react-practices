const items = [
    {
        id: 0,
        name: 'rock',
        color: 'hsl(349, 71%, 52%)'
    }, {
        id: 1,
        name: 'paper',
        color: 'hsl(230, 89%, 62%)'
    }, {
        id: 2,
        name: 'scissors',
        color: 'hsl(39, 89%, 49%)'
    },
    {
        id: 3,
        name: 'lizard',
        color: 'hsl(261, 73%, 60%)'
    }, {
        id: 4,
        name: 'spock',
        color: 'hsl(189, 59%, 53%)'
    }
];
const game = document.querySelector('.game');
const pentagon = document.querySelector('.pentagon');
const playerBtn = document.getElementById('player');
const houseBtn = document.getElementById('house');
const player = document.getElementById('player');
const playAgain = document.querySelector('.playAgain');
const houseImg = document.createElement('img');
const winner = document.querySelector('.winner');
const winnerDiv = document.querySelector('#winner-div');
const scoreText = document.getElementById('scoreText');
let score = 0;

// generate House selection
const generateHouseItem = () => {
    const getRandomId = () => Math.floor(Math.random() * 5) + 0;
    let i = getRandomId();
    const shadowHouse = `inset 0px 5px 0px 0px #ccc, 0px 6px 0px 0px ${items[i].color}, 0px 0px 0px 30px rgba(255,255,255,0.06), 0px 0px 0px 60px rgba(255,255,255,0.03), 0px 0px 0px 100px rgba(255,255,255,0.01)`;

    function getRandomItem() {
        houseImg.setAttribute('src', `images/icon-${items[getRandomId()].name}.svg`);
        houseBtn.appendChild(houseImg);
    }
    let timer = setInterval(() => getRandomItem(), 100);
    setTimeout(function () {
        clearInterval(timer);
        houseBtn.classList.remove('plainBtn');
        houseBtn.classList.add(items[i].name);
        houseImg.setAttribute('src', `images/icon-${items[i].name}.svg`);
    }, 1600);
    localStorage.setItem('houseId', i);
    localStorage.setItem('shadowHouse', shadowHouse);
}
const resultText = document.createElement('h1');
const playerImg = document.createElement('img');
// Play game
items.map(({ name, color, id }) => {
    const choice = document.getElementById(name);
    const shadow = `inset 0px 5px 0px 0px #ccc, 0px 6px 0px 0px ${color}, 0px 0px 0px 30px rgba(255,255,255,0.06), 0px 0px 0px 60px rgba(255,255,255,0.03), 0px 0px 0px 100px rgba(255,255,255,0.01)`;
    let result = ''
    choice.addEventListener('click', function () {
        playerImg.removeAttribute('img')

        pentagon.style.display = 'none';
        game.style.display = 'flex';
        playerBtn.classList.add('btn', 'playerBtn', name);

        generateHouseItem();
        const houseId = localStorage.getItem('houseId');
        const shadowHouse = localStorage.getItem('shadowHouse');

        if (id == houseId) {
            score;
            result = "Tie";
        } else if (id == houseId + 1) {
            score++;
            result = "you win";
            setTimeout(function () {
                playerBtn.style.boxShadow = shadow;
            }, 2000);
        } else if (id == 2 && houseId == 1) {
            score++;
            result = "you win";
            setTimeout(function () {
                playerBtn.style.boxShadow = shadow;
            }, 2000);
        } else if (id == 0 && houseId == 2) {
            score++;
            result = "you win";
            setTimeout(function () {
                playerBtn.style.boxShadow = shadow;
            }, 2000);
        } else if (id == 0 && houseId == 3) {
            score++;
            result = "you win";
            setTimeout(function () {
                playerBtn.style.boxShadow = shadow;
            }, 2000);
        } else if (id == 3 && houseId == 4) {
            score++;
            result = "you win";
            setTimeout(function () {
                playerBtn.style.boxShadow = shadow;
            }, 2000);
        } else if (id == 4 && houseId == 2) {
            score++;
            result = "you win";
            setTimeout(function () {
                playerBtn.style.boxShadow = shadow;
            }, 2000);
        } else if (id == 2 && houseId == 3) {
            score++;
            result = "you win";
            setTimeout(function () {
                playerBtn.style.boxShadow = shadow;
            }, 2000);
        } else if (id == 3 && houseId == 1) {
            score++;
            result = "you win";
            setTimeout(function () {
                playerBtn.style.boxShadow = shadow;
            }, 2000);
        } else if (id == 1 && houseId == 4) {
            score++;
            result = "you win";
            setTimeout(function () {
                playerBtn.style.boxShadow = shadow;
            }, 2000);
        } else if (id == 4 && houseId == 0) {
            score++;
            result = "you win";
            setTimeout(function () {
                playerBtn.style.boxShadow = shadow;
            }, 2000);
        } else {
            score--;
            result = "you lose";
            setTimeout(function () {
                houseBtn.style.boxShadow = shadowHouse;
            }, 2000);
        }

        if (score < 0) {
            score = 0
        }
        resultText.innerHTML = "";
        playerImg.setAttribute('src', `images/icon-${name}.svg`);
        player.appendChild(playerImg);
        resultText.appendChild(document.createTextNode(result));
        setTimeout(function () {
            scoreText.innerText = score;
            winnerDiv.appendChild(resultText);
            winner.style.display = 'block';
        }, 2000);
    });
    return
});

playAgain.onclick = function () {
    pentagon.style.display = 'block';
    game.style.display = 'none';
    winner.style.display = 'none';
    playerBtn.classList = '';
    houseBtn.classList = 'btn houseBtn plainBtn';
    playerBtn.style.boxShadow = '';
    houseBtn.style.boxShadow = '';
}

// Rules Modal
var modal = document.getElementById("rulesModal");
var btn = document.getElementById("rulesBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
