document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.popup-button');
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => togglePopup(index + 1));
  });
});

const popup = document.getElementById('m-popup');
const content = document.getElementById('m-content');
const contentRefs = document.getElementById('m-contentRefs');
const contentStats = document.getElementById('m-contentStats');

function getRandomNumber(min = 400, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function togglePopup(index) {
  popup.classList.add('m-popup-open');
  popup.classList.remove('m-popup-close');
  setTimeout(() => {
    document.querySelector('#loader2').style.display='none'
  },1200)
  if(index===1){
    setTimeout(() => {
     contentRefs.style.display = 'block'
    },1200)
    
    contentStats.style.display = 'none'
  }else if(index===2){
    contentRefs.style.display = 'none'
    contentStats.style.display = 'block'
  }
  
  
}

function closePopup(callback) {
  popup.classList.remove('m-popup-open');
  popup.classList.add('m-popup-close');
  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('m-popup-close');
    if (callback) {
      callback();
    }
  }, 300);
}