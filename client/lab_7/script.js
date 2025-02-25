const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const arrayName = await request.json();
  console.log(arrayName);
  const colE = [];
  mymap = null;
  let pinMap = [];

  async function searchPin(url) {
    try {
      const ur = await fetch(url);
      const arr = await ur.json();
      return arr;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  fetch(endpoint);

  function findMatches(wordToMatch, array) {
    if (wordToMatch.length !== 0) {
      document.querySelector('.suggestions').innerHTML = '';

      return arrayName.filter((place) => {
        const regex = new RegExp(wordToMatch, 'gi');
        return (
          place.zip.match(regex)
        );
      });
    }suggestions.innerHTML = '';
  }

  function displayMatches(event) {
    const endMatch = findMatches(event.target.value, arrayName).slice(0, 5);
    console.log('slice', endMatch);
    const html = endMatch.map((place) => `
        <li style ="width:100%">${place.name}
        <br>${place.address_line_1}
        <br>${place.zip}<br></li>`)
      .join('');

    suggestions.innerHTML = html;

    function getPoint(matchElement) {
      if (
        matchElement !== null
        && matchElement.geocoded_column_1 !== null
        && matchElement.geocoded_column_1.coordinates !== null
      ) {
        return [
          matchElement.geocoded_column_1.coordinates[1],
          matchElement.geocoded_column_1.coordinates[0]
        ];
      }
      return null;
    }
    pinMap = endMatch.map((item) => getPoint(item));
  }

  function mapInit() {
    mymap = L.map('mapid').setView([39.00, -76.95], 13);
    L.tileLayer(
      'https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=0im19NFqvOVkTZzwiWhj',
      {
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiamxpNzkiLCJhIjoiY2t1bXZsdHkyMDF6azJ1cGY4czB3N2RoNCJ9.TJk9AkHOXrQSxJ702X16UQ'
      }
    ).addTo(mymap);
  }

  function pinCount() {
    const i = 0;
    pinMap.forEach((zipElement) => {
      if (i == 0) {
        mymap.panTo(zipElement);
      }
      if (zipElement !== null) {
        if (colE !== zipElement) {
          colE.push(zipElement);
          L.marker(zipElement).addTo(mymap);
        }
      }
    });
    console.log(colE);
  }

  buttonClick = document.querySelector('.style');
  buttonClick.addEventListener('click', pinCount);
  searchInput.addEventListener('input', (evt) => {
    if (searchInput.value === '' || searchInput.value === null) {
      suggestions.innerHTML = '';
    } else {
      displayMatches(evt);
    }
  });
  mapInit();
  searchPin();
}

window.onload = windowActions;