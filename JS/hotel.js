 //function gethotelinfo(value) {
   fetch(
    'https://hotels4.p.rapidapi.com/locations/search?query=aurangabad&locale=en_US',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key':
          '58633e0a85msh3d55deecfbf99f6p1f3c98jsn8184c535c83c',
        'x-rapidapi-host': 'hotels4.p.rapidapi.com',
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response); 
      length = response.suggestions[0].entities.length;
      var destId = new Array();
      for (let index = 0; index < 5; index++) {
        destId[index] = response.suggestions[0].entities[index].destinationId;
      }
      for (let index = 0; index < 5; index++) {
        console.log(destId[index]);
      }
      fetch(
        'https://hotels4.p.rapidapi.com/properties/list?adults1=1&pageNumber=1&destinationId=' +
          destId[0] +
          '&pageSize=25&checkOut=2020-01-15&checkIn=2020-01-08&sortOrder=PRICE&locale=en_US&currency=USD',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key':
              '58633e0a85msh3d55deecfbf99f6p1f3c98jsn8184c535c83c',
            'x-rapidapi-host': 'hotels4.p.rapidapi.com',
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          //console.log(response.data.body.searchResults.results);
          var hotelName = new Array();
          var hotelId = new Array();
          var hotelThumbnail = new Array();
          //const image = document.getElementById('name');
          for (let index = 0; index < 10; index++) {
            hotelName[index] =
              response.data.body.searchResults.results[index].name;
            hotelId[index] =
              response.data.body.searchResults.results[index].id;
            hotelThumbnail[index] =
              response.data.body.searchResults.results[
                index
              ].optimizedThumbUrls.srpDesktop;
            console.log(hotelName[index]);
            console.log(hotelId[index]);
            console.log(hotelThumbnail[index]);
            //image.src = hotelThumbnail[index];
            //document.getElementById('name').innerHTML += '<img src=""'
            //image.src = hotelThumbnail[index];
            /* document.getElementById('thumbnails').innerHTML += '<img src="' + hotelThumbnail[index] + '">';
				document.getElementById('name').innerHTML += "<h3>" + hotelName[index] + "</h3>"; */
          }

          //document.getElementById('moreName').innerHTML = "\n" + hotelName;

          /*var table = document.getElementById('newName')
			for (var i = 0; i < hotelName.length; i++) {
				var row = 
				`<tr>
				<td>${hotelName[i]}</td>
				</tr>`
			}*/
        });
    })
    .catch((err) => {
      console.error(err);
    });

  /*fetch("https://hotels4.p.rapidapi.com/properties/list?adults1=1&pageNumber=1&destinationId=" + destId[0] + "&pageSize=25&checkOut=2020-01-15&checkIn=2020-01-08&sortOrder=PRICE&locale=en_US&currency=USD", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "58633e0a85msh3d55deecfbf99f6p1f3c98jsn8184c535c83c",
			"x-rapidapi-host": "hotels4.p.rapidapi.com"
		}
	})
	.then(response => response.json())
	.then(response => {
		console.log(response);
	})
	.catch(err => {
		console.error(err);
	});*/

  //https://www.google.com/maps/search/vits+hotel+aurangabad
/* }

gethotelinfo(); */

