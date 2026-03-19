// If already authenticated, go straight to dashboard
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = 'dashboard.html';
  }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const operator_id = document.getElementById('operator_id').value;
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('errorMsg');

  errorMsg.textContent = '';

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operator_id, password })
    });

    const data = await res.json();
    console.log('login response', data);

    if (res.status === 404 && data.message === 'USER_NOT_FOUND') {
      window.location.href = 'signup.html';
    } else if (res.status === 401 && data.message === 'INVALID_PASSWORD') {
      errorMsg.textContent = 'Invalid password.';
    } else if (res.ok && data.message === 'SUCCESS' && data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html';
    } else {
      errorMsg.textContent = data.error || data.message || 'Login failed.';
    }
  } catch (err) {
    errorMsg.textContent = 'Network error.';
  }
});
