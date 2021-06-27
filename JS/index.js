const r_l_btn = document.getElementById('r_l');
const modal = document.getElementById('r_l_modal');
const close_modal = document.getElementById('close');
const account = document.getElementById('acc');
const email_name = document.getElementById('email-name');
const g_profile = document.getElementById('g-profile');
const g_img = document.querySelector('.g-profile img');
const g_info = document.getElementById('g-info');
document.getElementsByClassName('snap-line')[0].style.display = 'block';

r_l_btn.addEventListener('click', () => {
  modal.style.display = 'block';
   document.getElementsByClassName('snap-line')[0].style.display =
     'none';
});

close_modal.addEventListener('click', () => {
  modal.style.display = 'none';
   document.getElementsByClassName('snap-line')[0].style.display =
     'block';
});

document.getElementById('close_d').addEventListener('click', () => {
  document.querySelectorAll('.h_dis').forEach((a) => {
    a.remove();
  });
  document.getElementById('modal_dest').style.display = 'none';
  document.getElementsByClassName('snap-line')[0].style.display =
    'block';
});

document.getElementById('close_fdest').addEventListener('click', () => {
  document.getElementById('modal_fdest').style.display = 'none';
  document.getElementsByClassName('snap-line')[0].style.display =
    'block';
});

function fdest() {
  document.getElementById('modal_fdest').style.display = 'block';
   document.getElementsByClassName('snap-line')[0].style.display =
     'none';
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    email_name.innerHTML = `${user.email}`;
    r_l_btn.style.display = 'none';
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
      alert(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      console(errorCode, errorMessage);
    });
  signup.reset();
});

const logout = document.getElementById('log-out');
logout.addEventListener('click', () => {
  /* e.preventDefault(); */
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
      document.getElementsByClassName('snap-line')[0].style.display =
        'block';
      modal.style.display = 'none';
    })
    .catch((error) => {
      alert(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

  signin.reset();
});

function login() {
  document.getElementById('toogle').style.transform =
    'translateX(100%)';
  document.getElementById('login-s').style.visibility = 'visible';
  document.getElementById('register').style.visibility = 'hidden';
}
function register() {
  document.getElementById('toogle').style.transform =
    'translateX(0%)';
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
const kinds = ['water','ice','sky','mountain','forest','animals','buildings','nature']
 async function renderItem() {
  let random_img = document.getElementsByClassName('random-img');
  for (let i = 0; i < random_img.length; i++) {
    setTimeout(() => {
      
    }, 500);
   await fetch(
      `https://source.unsplash.com/400x400/?${
        kinds[Math.floor(Math.random() * (7 - 0) + 0)]
      }`
    ).then((response) => {
      console.log(response);
      setTimeout(() => {},
      200);
      random_img[i].src = response.url;
    });
  }
}

/* setInterval(() => {
    if (document.getElementsByClassName('snap-line')[0].style.display == 'block') 
    renderItem();
  }, 8000); */

