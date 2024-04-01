const logout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again later.');
    }
};
  
document.querySelector('#logout').addEventListener('click', logout);
  