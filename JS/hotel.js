
async function hotelinfo(name) {
 await fetch(
    `https://hotels4.p.rapidapi.com/locations/search?query=${name},Maharashtra&locale=en_US`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key':
          '404c652b0bmsh460b8152ce3550ep1a37eejsn60cfd81ae1a4',
        'x-rapidapi-host': 'hotels4.p.rapidapi.com',
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      var destId = new Array();
      for (
        let index = 0;
        index < response.suggestions[0].entities.length;
        index++
      ) {
        destId[index] =
          response.suggestions[0].entities[index].destinationId;
        //console.log(response.suggestions[0].entities[index].destinationId);
      }
      /* for (let index = 0; index < destId.length; index++) {
        console.log(destId[index]);
      } */
      fetch(
        'https://hotels4.p.rapidapi.com/properties/list?adults1=1&pageNumber=1&destinationId=' +
          destId[0] +
          '&pageSize=20&checkOut=2020-01-15&checkIn=2020-01-08&sortOrder=PRICE&locale=en_US&currency=USD',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key':
              '404c652b0bmsh460b8152ce3550ep1a37eejsn60cfd81ae1a4',
            'x-rapidapi-host': 'hotels4.p.rapidapi.com',
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          if (
            document.getElementsByClassName('snap-line')[0].style
              .display == 'none'
          ) {
            alert('Loading hotel data.......');
          }
          console.log(response);
          //console.log(response.data.body.searchResults.results);
          var hotelName = new Array();
          var hotelId = new Array();
          var hotelThumbnail = new Array();
          //const image = document.getElementById('name');
          for (let index = 0; index < 5; index++) {
            hotelName[index] =
              response.data.body.searchResults.results[index].name;
            hotelId[index] =
              response.data.body.searchResults.results[index].id;
            hotelThumbnail[index] =
              response.data.body.searchResults.results[
                index
              ].optimizedThumbUrls.srpDesktop;
            var newdiv = document.createElement('div');
            var img = document.createElement('img');
            img.src = hotelThumbnail[index];
            var th = document.createElement('th');
            th.innerHTML = `${index + 1}. ${hotelName[index]}`;
            newdiv.className = 'h_dis';
            var locate = document.createElement('a');
            locate.innerHTML = 'Locate On Map ';
            locate.target = "_blank";
            locate.href = `https://www.google.com/maps/search/${hotelName[index]}+${response.data.body.searchResults.results[index].neighbourhood}`;
            document.getElementById('hotel-info').appendChild(newdiv);
            newdiv.appendChild(img);
            newdiv.appendChild(th);
            th.appendChild(locate);
          }
          if (
            document.getElementsByClassName('snap-line')[0].style
              .display == 'block'
          ) {
            document.querySelectorAll('.h_dis').forEach((a) => {
              a.remove();
            });
          }
        });
    })
    .catch((err) => {
      console.error(err);
    });
}
var loc_click = document.querySelectorAll('.featured-location a');
var search_name = document.querySelectorAll('.featured-location a p');

for (let i = 0; i < loc_click.length; i++) {
  loc_click[i].addEventListener('click', () => {
      hotelinfo(search_name[i].innerHTML);
  });
}

document.getElementById('search-d').addEventListener('click', () => {
  var name = document.getElementById('text-box').value;  
    hotelinfo(name);
}
)