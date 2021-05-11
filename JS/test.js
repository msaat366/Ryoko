const apiKey =
  '5ae2e3f221c38a28845f05b63583c00e0e8aff14104cbcba69d1f000';

function apiGet(method, query) {
  return new Promise(function (resolve, reject) {
    var otmAPI =
      'https://api.opentripmap.com/0.1/en/places/' +
      method +
      '?apikey=' +
      apiKey;
    if (query !== undefined) {
      otmAPI += '&' + query;
    }
    fetch(otmAPI)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        resolve(data)
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
  /* console.log(data); */
  let poi = document.getElementById('poi');
  /* poi.innerHTML = '';
  if (data.preview) {
    poi.innerHTML += `<img src="${data.preview.source}" alt="Image Not Found">`;
  } else {
    poi.innerHTML += `<img src="" alt="Image Not Found">`;
  }
  poi.innerHTML += data.wikipedia_extracts
    ? data.wikipedia_extracts.html
    : data.info
    ? data.info.descr
    : 'No description';

  poi.innerHTML += `<p><a target="_blank" href="${data.otm}">Locate the place on map</a></p>`; */
}



function loadList() {
  apiGet(
    'radius',
    `radius=30000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
  ).then(function (data) {
    console.log(data);
    data.forEach((item) => apiGet('xid/' + item.xid).then((info) => onShowPOI(info))); 
  });
}

function firstLoad() {
  apiGet(
    'radius',
    `radius=30000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
  ).then(function (data) {
    count = data.count;
    offset = 0; 
    loadList();
  });
}

document
  .getElementById('search-d')
  .addEventListener('click', function (event) {
    let name = document.getElementById('text-box').value;
    console.log(name);
    window.open('../mumbai.html');
    apiGet('geoname', 'name=' + name).then(function (data) {
      console.log(data);
      let message = 'Name not found';
      if (data.status == 'OK' && data.country == 'IN') {
        message = data.name;
        lon = data.lon;
        lat = data.lat;
        firstLoad();
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
