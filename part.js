// particleAnimation.js

const canvasPart = document.getElementById('particleCanvas');
const ctxPart = canvasPart.getContext('2d');

canvasPart.width = window.innerWidth;
canvasPart.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 20;
const centerX = canvasPart.width / 2;
const centerY = canvasPart.height / 2;
const centerRepelForce = 0.01;

// Utility function to generate a random number favoring edges
function randomEdgePosition(size) {
    let pos;
    if (Math.random() > 0.5) {
        pos = Math.random() * (size / 4);
    } else {
        pos = size - Math.random() * (size / 4);
    }
    return pos;
}

// Particle class
class Particle {
    constructor() {
        this.x = randomEdgePosition(canvasPart.width);
        this.y = randomEdgePosition(canvasPart.height);
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.opacity = Math.random() * 0.5 + 0.5;
    }
    update() {
        const dx = this.x - centerX;
        const dy = this.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const repelForce = Math.min(centerRepelForce / distance, 0.05);

        this.x += this.speedX / 2 + forceDirectionX * repelForce;
        this.y += this.speedY / 2 + forceDirectionY * repelForce;

        if (this.x + this.size > canvasPart.width || this.x - this.size < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.size > canvasPart.height || this.y - this.size < 0) {
            this.speedY = -this.speedY;
        }
    }
    draw() {
        ctxPart.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctxPart.beginPath();
        ctxPart.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctxPart.closePath();
        ctxPart.fill();
    }
}

// Create particles
function initPart() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Handle particle updates
function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctxPart.beginPath();
                ctxPart.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                ctxPart.lineWidth = 0.5;
                ctxPart.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctxPart.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctxPart.stroke();
                ctxPart.closePath();
            }
        }
    }
}

// Animation loop
function animatePart() {
    ctxPart.clearRect(0, 0, canvasPart.width, canvasPart.height);
    handleParticles();
    requestAnimationFrame(animatePart);
}

initPart();
animatePart();

// Resize canvas on window resize
window.addEventListener('resize', function() {
    canvasPart.width = window.innerWidth;
    canvasPart.height = window.innerHeight;
});


document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const toggleSwitch = document.getElementById('toggleSwitch');

    toggleSwitch.addEventListener('change', () => {
        if (toggleSwitch.checked) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });
    
    // Ensure music continues from where it left off
    audioPlayer.addEventListener('pause', () => {
        if (!toggleSwitch.checked) {
            // Save the current time of the audio when paused due to toggle switch off
            audioPlayer.dataset.pauseTime = audioPlayer.currentTime;
        }
    });

    audioPlayer.addEventListener('play', () => {
        if (toggleSwitch.checked && audioPlayer.dataset.pauseTime) {
            // Continue playing from the last paused time
            audioPlayer.currentTime = parseFloat(audioPlayer.dataset.pauseTime);
            delete audioPlayer.dataset.pauseTime;  // Clear the pause time data
        }
    });
});
