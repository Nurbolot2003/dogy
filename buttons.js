document.addEventListener('DOMContentLoaded', function() {
  const tg = window.Telegram.WebApp;
  
  const user = tg.initDataUnsafe?.user;
  
  if (user) {
      const userName = user.first_name 
      const userLastName = user.last_name
      const userPhotoUrl = user.photo_url;

      // Update HTML elements with user data
      document.querySelector('.user-name').innerText = userName;
      document.querySelector('.last-name').innerText = userLastName;
      document.querySelector('.userAvatar').src = userPhotoUrl;
  } else {
      // Handle the case when user information is not available
      document.getElementById('user-name').innerText = 'User information not available';
      document.getElementById('userAvatar').style.display = 'none';
  }
});





const popup = document.getElementById('m-popup');
const content = document.getElementById('m-content');

function togglePopup(index) {
  if (popup.style.display === 'none' || popup.style.display === '') {
   
    popup.style.display = 'flex';
    content.innerHTML = `Текст для кнопки ${index}`;
    popup.classList.add('m-popup-open');
  } else {
    closePopup();
  }
}

function closePopup() {
 
  popup.classList.remove('m-popup-open');
  popup.classList.add('m-popup-close');
  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('m-popup-close');
  }, 300);
}


