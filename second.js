document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("load", function() {
    var loaderWrapper = document.getElementById("loader-wrapper");
    var content = document.getElementById("content");

    // Minimum loading time of 2 seconds
    setTimeout(function() {
        loaderWrapper.style.display = "none";
        content.style.display = "block";
        content.classList.add("visible");
    }, getRandomNumber()); // 2000ms = 2 seconds
});
  const tg = window.Telegram.WebApp;
  toggleNotcoin()

  const user = tg.initDataUnsafe?.user;

  if (user) {
      const userName = user.first_name;
      const userLastName = user.last_name;
      const userPhotoUrl = user.photo_url;
      const userId = user.id;
      localStorage.setItem('telegram_id', userId);

      // Update HTML elements with user data
      document.querySelector('.user-name').innerText =`${userName} ${userLastName}` ;
      document.querySelector('.last-name').innerText = `ID: ${userId}`;

      if (userPhotoUrl) {
          const userAvatar = document.querySelector('.userAvatar');
          userAvatar.src = userPhotoUrl;
          userAvatar.style.display = 'block';
      } else {
          document.querySelector('.userAvatar').src = 'meta/not.jpg';
      }
  } else {
      // Handle the case when user information is not available
      document.querySelector('.user-name').innerText ="name" ;
      document.querySelector('.last-name').innerText = 'userId';
  }
  updateFromLocalStorage();
});

window.addEventListener('beforeunload', function() {
  saveToLocalStorage();
});

var gameContainer = document.getElementById("game-container");
var gameButton = document.getElementById("game-button");
const counterElement = document.getElementById('attempts-display');

function saveToLocalStorage() {
  localStorage.setItem('counterValue', counterElement.textContent);
  localStorage.setItem('lastActiveTime', Date.now());
}

function makeRound() {
  gameContainer.style.borderRadius = "100%";
  gameContainer.style.transition = "all 1s";
  gameContainer.style.overflow = "hidden";
  
  document.querySelector(".tile-container").style.display = "none";
  document.querySelector(".grid-container").style.display = "none";
  setTimeout(function() {
    gameContainer.style.background = "none";
  }, 400);
  setTimeout(function() {
    document.querySelector(".coin").style.display = "flex"; 
  }, 600);
}

function makeRectangular() {
  gameContainer.style.background = "rgba(119, 123, 110, 0.6)";
  gameContainer.style.borderRadius = "0%";
  document.querySelector(".coin").style.transition = "all 1s";
  document.querySelector(".coin").style.display = "none";
  document.querySelector(".tile-container").style.display = "block";
  document.querySelector(".grid-container").style.display = "block";
}

function updateFromLocalStorage() {
  var savedCounter = parseInt(localStorage.getItem('counterValue')) || 9;
  updateCounter(savedCounter);
}

function resetClickCount() {
  gameButton.disabled = false;
  gameButton.textContent = "New Game";
  gameButton.style.display = "block";
  localStorage.removeItem("lastClickTime");
  localStorage.removeItem('counterValue');
  updateCounter(9)
}

function updateCounter(value) {
  counterElement.textContent = `${value}/9`;
  localStorage.setItem('counterValue', value);
}

function handleRestartClick() {
  let counterValue = parseInt(localStorage.getItem('counterValue'))
  counterValue = Math.max(0, counterValue - 1);
  updateCounter(counterValue);
}

const canvas = document.getElementById('firefliesCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firefly {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() * 1 - 0.5) * 2;
        this.speedY = (Math.random() * 1 - 0.5) * 2;
        this.alpha = Math.random();
    }

    update() {
        this.x += this.speedX / 3;
        this.y += this.speedY / 3;

        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
    }
}

const fireflies = [];
const numberOfFireflies = 50;

for (let i = 0; i < numberOfFireflies; i++) {
    fireflies.push(new Firefly());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireflies.forEach(firefly => {
        firefly.update();
        firefly.draw();
    });
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function toggleNotcoin(){
  document.getElementById('toggleSwitch').addEventListener('change', function() {
    if (this.checked) {
        document.body.style.backgroundImage = 'url("../meta/main_bg.png")';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = "cover"
    } else {
        document.body.style.background = 'black';
    }
  });
}

toggleNotcoin();