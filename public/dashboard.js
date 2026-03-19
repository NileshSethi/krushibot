document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const res = await fetch('/api/auth/session', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.log('session check failed', res.status);
      window.location.href = 'login.html';
      return;
    }

    const data = await res.json();
    console.log('session data', data);
    document.getElementById('userInfo').textContent = `Logged in as: ${data.user.operator_id}`;
  } catch (err) {
    console.log('session error', err);
    window.location.href = 'login.html';
  }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});
