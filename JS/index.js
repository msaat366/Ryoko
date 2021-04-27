auth.onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
    console.log(user);
    }
    else {
        console.log('User is not logged in')
    }
})
const signup = document.getElementById('register');
signup.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signup['email'].value;
  const password = signup['password'].value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
        console(errorCode, errorMessage)
    });
    signup.reset();
});

const logout = document.getElementById('log');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

const signin = document.getElementById('login-s');
signin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signin['email-l'].value;
    const password = signin['password-l'].value;

      auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
          console.log(errorCode, errorMessage);
      });
    
    signin.reset();
});

 function login(){
    document.getElementById('toogle').style.transform = 'translateX(100%)';
    document.getElementById('login-s').style.visibility = 'visible';
    document.getElementById('register').style.visibility = 'hidden';
}
function register(){
    document.getElementById('toogle').style.transform = 'translateX(0%)';
    document.getElementById('register').style.visibility = 'visible';
    document.getElementById('login-s').style.visibility = 'hidden';
}
        
        /* function run(){
          const pass = document.getElementById('password').value;
          const passc = document.getElementById('passwordc').value;
          const signup = document.getElementById('signup');
          
          if(pass === passc){

          }
        }
 */