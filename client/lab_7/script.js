const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);
  // .then((blob) => blob.json())
  // .then((data) => arrayName.push(...data));

  const arrayName = await request.json();
  console.log(arrayName);

  function findMatches(wordToMatch, arrayName) {
    if (wordToMatch.length != 0) {
      return arrayName.filter((place) => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.category.match(regex) || place.zip.match(regex);
      });
    }
    suggestions.innerHTML = '';
  }

  /* function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } */

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, arrayName);
    console.log(matchArray);
    if (matchArray) {
      const html = matchArray.map((place) => {
        const regex = new RegExp(event.target.value, 'gi');
        const restaurantName = place.name;
        // replace(regex, `<span class='h1'>${event.target.value}</span>`);
        const foodCategory = place.category;
        // .replace(regex, `<span class='h1'>${event.target.value}</span>`);
        const zipCode = place.zip;

        return `
        
            <li><p class='name'>${restaurantName}<br/>
                <class='category'>${foodCategory}<br/>
                <class='address_line_1'>${place.address_line_1}<br/>
                <class='city'>${place.city}<br/>
                <class='zip'>${zipCode}</p>         
            </li>
            `;
      }).join('');
      suggestions.innerHTML = html;
    }
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;



