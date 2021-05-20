const apiKey =
  '5ae2e3f221c38a28845f05b63583c00e0e8aff14104cbcba69d1f000';
var data_s = [];
function apiGet(method, query) {
  return new Promise(function (resolve, reject) {
    var otmAPI =  
      'https://api.opentripmap.com/0.1/en/places/' +
      method +
      '?apikey=' +
      apiKey;
    if (query !== undefined) {
      otmAPI += '&' + query + '&country=IN';
    }
    fetch(otmAPI)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  });
}

const pageLength = 5;

let offset = 0;
let lon = 0;
let lat = 0;
let count = 0;

function onShowPOI(data) {
  setTimeout(() => {
    
  }, 400);
  
  const poiImg1 = document.getElementById('poi-img-1');
  const poiImg2 = document.getElementById('poi-img-2');
  
  if (data.preview) {
    data_s.push(data);
    poiImg1.src = data_s[0].preview.source;
    poiImg2.src = data_s[1].preview.source;
  } else {
    console.log("not found");
  }
}


function loadList() {
  apiGet(
    'radius',
    `radius=30000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json&kinds=museums,historic,natural,architecture`
  ).then(function (data) {
    data.forEach((item) => {
      apiGet('xid/' + item.xid).then((info) => {
        onShowPOI(info)
      })
    });
  });
}

/* function firstLoad() {
  apiGet(
    'radius',
    `radius=30000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count` 
  ).then(function (data) {
    count = data.count;
    offset = 0;
    loadList();
  });
} */

document
  .getElementById('search-d')
  .addEventListener('click', function (event) {
    let name = document.getElementById('text-box').value;
    console.log(name);
    data_s = []
    apiGet('geoname', 'name=' + name).then(function (data) {
      console.log(data);
      name.value = "";
      //let message = 'Name not found';
      if (data.status == 'OK' && data.country == 'IN') {
        document.getElementById('modal_dest').style.display = 'block';
        message = data.name;
        lon = data.lon;   
        lat = data.lat;
        loadList();
      } else {
        alert("Sorry, but we can't seem to find this place");
      }
      /* document.getElementById('info').innerHTML = `<p>${message}</p>`; */
    });
    event.preventDefault();
  });

/* document
  .getElementById('next_button')
  .addEventListener('click', function () {
    offset += pageLength;
    loadList();
  }); */
