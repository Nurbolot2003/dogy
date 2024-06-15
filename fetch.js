document.addEventListener("DOMContentLoaded", async () => {
    tgg = window.Telegram.WebApp;
  
    const userg = tgg.initDataUnsafe?.user;
    let telegramId = 2016086256;
    
    if (!telegramId) {
      telegramId = localStorage.getItem('telegram_id');
    }
  
    try {
      const referralsResponse = await fetch(`https://myserver-4sii.onrender.com/referrals/${telegramId}`);
      if (!referralsResponse.ok) {
        throw new Error('Network response was not ok ' + referralsResponse.statusText);
      }
      const referralsData = await referralsResponse.json();
      console.log('Referral Data:', referralsData);
  
      const referralContent = document.getElementById('referals');
      const referralCodeContent = document.getElementById('referalCode');
      referralContent.innerHTML = `
       ${referralsData.invited_users_count}
      `;
      referralCodeContent.innerHTML = `
        https://t.me/ggg777_botbot?start=${referralsData.referral_code}
      `;
      
document.getElementById('copyRef').addEventListener('click', function() {
  const referralCode = `
  https://t.me/ggg777_botbot?start=${referralsData.referral_code}
` ;

  navigator.clipboard.writeText(referralCode).then(function() {
      console.log('Text copied to clipboard');
      document.getElementById('copyRef').textContent = 'Copied!'
  }).catch(function(error) {
      console.error('Could not copy text: ', error);
      alert('Failed to copy referral code.');
  });
});
    } catch (error) {
      console.error('Ошибка при получении данных о рефералах:', error);
    }
  
    try {
      const balanceResponse = await fetch(`https://myserver-4sii.onrender.com/getTotalBalance`);
      if (!balanceResponse.ok) {
        
        throw new Error('Network response was not ok ' + balanceResponse.statusText);
      }
      const balanceData = await balanceResponse.json();
      console.log('Balance Data:', balanceData);
      localStorage.setItem('totalBalance', balanceData.total_balanc)
      
      const totalBalanceContent = document.getElementById('totalBalance');
      totalBalanceContent.innerHTML = `
        ${balanceData.total_balance}
      `;
    } catch (error) {
      console.error('Ошибка при получении общей суммы балансов:', error);
    }
  
    try {
      const usersResponse = await fetch(`https://myserver-4sii.onrender.com/getTotalUsers`);
      if (!usersResponse.ok) {
        totalUsersContent.textContent = localStorage.getItem('totalUsers')
        throw new Error('Network response was not ok ' + usersResponse.statusText);
      }
      const usersData = await usersResponse.json();
      console.log('Users Data:', usersData);
      const fixedData = usersData.total_users / 7.3
      localStorage.setItem('onlineUsers', fixedData.toFixed(0))
      localStorage.setItem('totalUsers', usersData.total_users)

      document.getElementById('onlineUsers').innerHTML = `${fixedData.toFixed(0)}`
      const totalUsersContent = document.getElementById('totalUsers');
      totalUsersContent.innerHTML = `${usersData.total_users}
      `;
    } catch (error) {
      console.error('Ошибка при получении общего количества пользователей:', error);
    }
  });
  async function decreaseCounter(event) {
    const tg2 = window.Telegram.WebApp;
    const user2 = tg2.initDataUnsafe?.user;
    let telegramId = 1230986495;
  
    if (!telegramId) {
      telegramId = localStorage.getItem('telegram_id');
    }
  
    if (!telegramId) {
      console.error('Не удалось получить telegram_id.');
      return;
    }
  
    const userScore = parseInt(localStorage.getItem('userScore'));
    if (!userScore) {
      console.error('Не удалось получить userScore.');
      return;
    }
  
    try {
      const response = await fetch(`https://myserver-4sii.onrender.com/updateBalance/${telegramId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ balance: userScore }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      console.log('Баланс успешно обновлен.');
    } catch (error) {
      console.error('Ошибка при обновлении баланса:', error);
    }
  }
  