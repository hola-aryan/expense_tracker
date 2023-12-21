var naam = document.getElementById('name')
var email = document.getElementById('email')
var password = document.getElementById('password')
var form = document.getElementById('form')

form.addEventListener('submit', check);

function check(e) {
    e.preventDefault();
  
    // Get user input values
    const names = naam.value;
    const emails = email.value;
    const passwords= password.value;
  
  
    // Simple client-side validation
    if (!names || !emails || !passwords) {
      alert('Please fill in all fields');
      return;
    }
  
    axios.post('http://localhost:2500/signIn', {
        names : names,
        emails : emails,
        passwords : passwords
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        alert('Error submitting data. Please try again.');
      })
      .finally(() => {
        // Reset form fields after request (whether success or failure)
        naam.value = "";
        email.value = "";
        password.value = "";
      });
  }