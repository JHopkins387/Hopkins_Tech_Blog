async function editFormHandler(event) {
    event.preventDefault();
    
    const post_content= document.querySelector('#blog-content').value.trim();
    const title = document.querySelector('#blog-title').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
  // console.log('clicked!!' + post_content + id)
  
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  
  
  
  document.querySelector('.edit-btn').addEventListener('click', editFormHandler);
  