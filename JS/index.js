const r_l_btn = document.getElementById('r_l');
const modal = document.getElementById('r_l_modal')
const close_modal = document.getElementById('close');
const account = document.getElementById('acc');
const email_name = document.getElementById('email-name');

r_l_btn.addEventListener('click', () => {

  modal.style.display = 'block';
 
})

close_modal.addEventListener('click', () => {
  modal.style.display = 'none';
})

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    email_name.innerHTML = `${user.email}`;
    r_l_btn.style.display = 'inline-block';
    account.style.display = 'inline-block';
    console.log(user);
  } else {
    account.style.display = 'none';
    r_l_btn.style.display = 'inline-block';
    console.log('User is not logged in');
  }
});
const signup = document.getElementById('register');
  signup.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signup['email'].value;
  const password = signup['password'].value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console(errorCode, errorMessage);
    });
    signup.reset();
});

const logout = document.getElementById('log-out');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
});

const signin = document.getElementById('login-s');
signin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signin['email-l'].value;
    const password = signin['password-l'].value;

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
          modal.style.display = 'none';
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