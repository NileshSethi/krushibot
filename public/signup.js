// If already authenticated, skip signup
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = 'dashboard.html';
  }
});

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const operator_id = document.getElementById('operator_id').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('errorMsg');

  errorMsg.textContent = '';

  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operator_id, email, password })
    });

    const data = await res.json();
    console.log('signup response', data);

    if (res.status === 409 && data.message === 'USER_EXISTS') {
      window.location.href = 'login.html';
    } else if (res.ok && data.message === 'REGISTERED') {
      window.location.href = 'login.html';
    } else {
      errorMsg.textContent = data.error || data.message || 'Signup failed.';
    }
  } catch (err) {
    errorMsg.textContent = 'Network error.';
  }
});
