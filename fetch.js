document.getElementById('m-btn').addEventListener('click', async () => {
    const telegramId = localStorage.getItem('telegram_id');
  
    if (!telegramId) {
      alert('No telegram_id found in local storage.');
      return;
    }
  
    try {
      const response = await fetch(`https://myserver-4sii.onrender.com/referrals/${telegramId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      
      const referralContent = document.getElementById('referals');
      const referralCodeContent = document.getElementById('referalCode');
      referralContent.innerHTML = `
        <p>Количество приглашенных пользователей: ${data.invited_users_count}</p>
      `;
      referralCodeContent.innerHTML = `
        <p>Реферальный код: ${data.referral_code}</p>
      `;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  });
  