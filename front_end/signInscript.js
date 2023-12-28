document.getElementById('signInForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    submitForm();
});

const submitForm = async () => {
    try {
      // Get form data
        const name = document.getElementById('name_Sign').value;
        const password = document.getElementById('pass_Sign').value;

        // Create a data object with the form values
        const data = {
        name: name,
        password: password
        };

        // Send POST request using Axios
        const response = await axios.post('http://localhost:2500/login', data);


      // Handle the response
      console.log('Server Response:', response.data);
      // You can perform additional actions based on the response, such as redirecting the user or updating the UI.
    } catch (error) {
      // Handle errors
      console.error('Error sending POST request:', error);
    }
  };

  
