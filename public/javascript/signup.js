
async function signupFormHandler(event) {
  event.preventDefault();

  // this part will take the user's inputs from login.handlebars and assign to variables
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  //if all fields have the value sneeded, make a fetch post request to /api/users route after

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    // this aprt will check the response status using the .ok property on response object
    if (response.ok) {
      console.log('success');
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
}


document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);