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

const pageLength = 10;

let offset = 0;
let lon = 0;
let lat = 0;

 
const poiImg = document.getElementsByClassName('poi_img');
const poiText = document.getElementsByClassName('poi-text');
 function onShowPOI(data) {
  setTimeout(() => {
    
  }, 400);
  

 
  /* poiText1.innerHTML */
  
  if (data.preview) {
    document.getElementById('modal_dest').style.display = 'block';
    document.getElementsByClassName('snap-line')[0].style.display =
      'none';
      data_s.push(data);
      for (let i = 0; i < 4 ; i++){
      poiImg[i].src = data_s[i].preview.source;
      poiText[i].innerHTML = '<h3>' + data_s[i].name + '</h3>';
      poiText[i].innerHTML +=
          '<p>' + data_s[i].wikipedia_extracts.text + '</p>';
        poiText[i].innerHTML +=
          `<a href="https://www.google.com/maps/search/${data_s[i].name},${ data_s[i].address.county? data_s[i].address.county: data_s[i].address.city}" target="_blank" rel="noopener noreferrer">Locate this on map</a>`;
    }
  } else {
    console.log('not found');
  }
}


async function loadList() {
 await apiGet(
    'radius',
    `radius=25000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json&kinds=cultural,other_temples,historic,natural,architecture`
  ).then(function (data) {
    if (data.length == 0) {
      alert("No places found")
    }
    else {
      alert('loading........');
    }
    data.forEach((item) => {
       setTimeout(() => {}, 400);
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

async function getcityinfo(name) {
  console.log("event started");
  for (let i = 0; i < 4; i++){
    poiImg[i].src = '';
    poiText[i].innerHTML ='';
  }
    //document.getElementsByClassName('hl-name')[0].innerHTML = name;
    data_s = [];
  await  apiGet('geoname', 'name=' + name).then(function (data) {
      console.log(data);  
      if (data.status == 'OK' && data.country == 'IN') {
        message = data.name;
        document.getElementsByClassName('hl-name')[0].innerHTML = message;
        lon = data.lon;   
        lat = data.lat;
        loadList();
      } else {
        alert("Sorry, but we can't seem to find this place");
      }
    });
  }

  var loc_click = document.querySelectorAll('.featured-location a');
  var search_name = document.querySelectorAll(
    '.featured-location a p'
  );
  for (let i = 0; i < loc_click.length; i++) {
    loc_click[i].addEventListener('click', () => {
     getcityinfo(search_name[i].innerHTML);
    });
}
  
  document.getElementById('search-d').addEventListener('click', () => {
  var name = document.getElementById('text-box').value;
    getcityinfo(name);
})

