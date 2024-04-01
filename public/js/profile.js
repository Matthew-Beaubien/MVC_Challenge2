const createPost = async (title, content, user_id) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content, user_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  
  const deleteOrEditPost = async (id, action) => {
    try {
      if (action === 'delete') {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          location.reload();
        } else {
          throw new Error('Failed to delete post');
        }
      } else if (action === 'edit') {
        document.location.href = `/edit-post/${id}`;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  
  document.querySelector('.new-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-desc').value.trim();
    const user_id = document.querySelector('#user-id').value;
    if (title && content) {
      await createPost(title, content, user_id);
    }
  });
  
  document.querySelector('.post-list').addEventListener('click', async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const action = event.target.getAttribute('data-action');
      await deleteOrEditPost(id, action);
    }
  });
  
  document.querySelector('#edit-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.querySelector('#edit-post-title').value.trim();
    const content = document.querySelector('#edit-post-content').value.trim();
    const postId = window.location.pathname.split('/').pop();
    if (title && content) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/post/${postId}`);
      } else {
        alert('Failed to update post');
      }
    }
});
  