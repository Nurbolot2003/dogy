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
function toggleRefs(){
  popup.classList.add('m-popup-open');
  popup.classList.remove('m-popup-close');
    
    setTimeout(() => {
    document.querySelector('#loader2').style.display='none'
     contentRefs.style.display = 'flex'
     contentRefs.style.opacity = 1
    },600)
    
    contentStats.style.opacity = 0
  }
console.log(localStorage.getItem('userScore'))
function toggleStats(){
  popup.classList.add('m-popup-open');
  popup.classList.remove('m-popup-close');
  contentRefs.style.opacity= 0
  contentRefs.style.display = 'none'
  setTimeout(() => {
    document.querySelector('#loader2').style.display='none'
    contentStats.style.display = 'flex'
    contentStats.style.opacity = 1
   },500)
 }
    
  
  
 function decreaseCounter(){
  closePopup()
 }


function closePopup() {
  popup.classList.remove('m-popup-open');
  popup.classList.add('m-popup-close');
  
}

