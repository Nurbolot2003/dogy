let counter = 9;
const maxClicksPerDay = 9;
const button = document.getElementById('counterButton');
const counterDisplay = document.getElementById('counter');
const message = document.getElementById('message');
const timer = document.getElementById('timer');
const timeLeftDisplay = document.getElementById('timeLeft');

// Add event listener for the button


function updateTimer() {
    const now = new Date();
    const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeDiff = nextDay - now;
    const hours = Math.floor(timeDiff / 1000 / 60 / 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);
    timeLeftDisplay.textContent = `${hours}: ${minutes}: ${seconds}`;

    if (timeDiff <= 0) {
        resetCounter();
    }
}

function resetCounter() {
    counter = maxClicksPerDay;
    localStorage.setItem('counter', counter);
    localStorage.setItem('lastVisit', new Date().toDateString());
    localStorage.removeItem('messageDisplayed');
    button.style.display = 'inline-block';
    message.style.display = 'none';
    timer.style.display = 'none';
    counterDisplay.textContent = counter;
}

const today = new Date().toDateString();
if (localStorage.getItem('lastVisit') !== today) {
    resetCounter();
} else {
    counter = parseInt(localStorage.getItem('counter')) || maxClicksPerDay;
    counterDisplay.textContent = `${counter}/9`;
    if (counter === 0 || localStorage.getItem('messageDisplayed') === 'true') {
        button.style.display = 'none';
        message.style.display = 'block';
        timer.style.display = 'block';
    }
}

window.onbeforeunload = function() {
    localStorage.setItem('counter', counter);
    if (counter === 0) {
        localStorage.setItem('messageDisplayed', 'true');
    }
};

setInterval(updateTimer, 1000);
updateTimer();
