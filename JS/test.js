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

 
 function onShowPOI(data) {
  setTimeout(() => {
    
  }, 400);
  
  const poiImg1 = document.getElementById('poi-img-1');
  const poiImg2 = document.getElementById('poi-img-2');
  const poiText = document.getElementsByClassName('poi-text');

 
  /* poiText1.innerHTML */
  
  if (data.preview) {
    document.getElementById('modal_dest').style.display = 'block';
    document.getElementsByClassName('snap-line')[0].style.display =
      'none';
    data_s.push(data);
    poiImg1.src = data_s[0].preview.source;
    poiImg2.src = data_s[1].preview.source;
    poiText[0].innerHTML = '<h3>' + data_s[0].name + '</h3>';
    poiText[0].innerHTML +=
    '<p>' + data_s[0].wikipedia_extracts.text + '</p>';
    poiText[1].innerHTML = '<h3>' + data_s[1].name + '</h3>';
    poiText[1].innerHTML +=
    '<p>' + data_s[1].wikipedia_extracts.text + '</p>';
  } else {
    console.log('not found');
  }
}


async function loadList() {
 await apiGet(
    'radius',
    `radius=25000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json&kinds=museums,historic,natural,architecture`
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

