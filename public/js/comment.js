document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const commentBody = document.querySelector('.comment-input').value;
    const post_id = document.querySelector('#comment-button').getAttribute('data-post-id');
  
    try {
      const user_id = document.querySelector('#user-id')?.getAttribute('data-user-id');
  
      if (!user_id) {
        window.location.href = '/login';
        return;
      }
  
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ commentBody, post_id, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        location.reload();
      } else {
        console.error('Comment submission failed');
      }
    } catch (error) {
      console.error('Comment submission failed', error);
    }
});
  