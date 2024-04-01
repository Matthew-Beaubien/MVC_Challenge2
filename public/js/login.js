const loginHandler = async (event) => {
  event.preventDefault();

  const emailInput = document.querySelector('#email-login');
  const passwordInput = document.querySelector('#password-login');
  
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again later.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const usernameInput = document.querySelector('#name-signup');
  const emailInput = document.querySelector('#email-signup');
  const passwordInput = document.querySelector('#password-signup');
  
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (username && email && password) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again later.');
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);