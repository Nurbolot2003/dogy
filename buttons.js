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

  if(index===1){
    setTimeout(() => {
       document.querySelector('#loader2').style.display='none'
     contentRefs.style.display = 'block'
    },1200)
    
    contentStats.style.display = 'none'
  }else if(index===2){
    contentRefs.style.display = 'none'

    setTimeout(() => {
      contentStats.style.display = 'block'
     },1200)
  }
  
  
}

function closePopup(callback) {
  popup.classList.remove('m-popup-open');
  popup.classList.add('m-popup-close');
  
}