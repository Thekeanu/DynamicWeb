
'use strict';

const gemeentes = [];
const auteurs = [];
const jaartallen = [];

  await fetch('https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_parcours_bd/records?limit=50')
  .then(response => response.json())
  .then(resultaat => {

    // Selecteren van de lijst
    const list = document.getElementById('locations-lijst');
   

    // Inzetten van de data in de lijst
    resultaat.results.forEach(werk => {
      //filters
      
      addFiltersPlaats(werk, gemeentes);
      addFiltersJaar(werk, jaartallen);
      addFiltersAuteurs(werk, auteurs);
      
      // Aanmaken table row
      const tableR = document.createElement('tr');
      
      // Aanmaken table kolommen
      const tableName = document.createElement('td');
      const tableImage = document.createElement('td');
      const tableDate = document.createElement('td');
      const tableDrawer = document.createElement('td');
      const tableDrawerKunst = document.createElement('td');
      const tableSurface = document.createElement('td');
      const tableAdress = document.createElement('td');
      const tableUitgever = document.createElement('td');
      const tableFav = document.createElement('td');


      // Gegevens van de API in de table cell zetten
      tableName.textContent = werk.naam_fresco_nl;
      tableDate.textContent = werk.date;
      tableDrawer.textContent = werk.dessinateur;
      tableSurface.textContent = werk.surface_m2;
      tableAdress.textContent = werk.adres;
      tableDrawerKunst.textContent = werk.realisateur;
      tableUitgever.textContent = werk.maison_d_edition;

      // Aanmaken image
      const image = document.createElement('IMG');
      image.src = werk.image;
      image.width = 100;
      tableImage.appendChild(image);

      // Aanmaken favorite button
      const buttonFav = document.createElement('button');
      buttonFav.innerText = "Toevoegen aan favorieten";
      buttonFav.addEventListener('click', () => addToFavorites(werk));
      tableFav.appendChild(buttonFav);
      
      // Toevoegen van cellen aan de tabel

      tableR.appendChild(tableImage);
      tableR.appendChild(tableName);
      tableR.appendChild(tableDrawer);
      tableR.appendChild(tableDrawerKunst);
      tableR.appendChild(tableUitgever);
      tableR.appendChild(tableDate);
      tableR.appendChild(tableSurface);
      tableR.appendChild(tableAdress);
      tableR.appendChild(tableFav);
      list.appendChild(tableR);
    });


    // Laad favorieten bij opstarten
    showFavorites();
    //laad filters in 
    showFiltersPlaats();
    showFiltersJaar();
    showFiltersAuteurs();
    //wacht voor aanpassingen
    listenFilters();


  })
  .catch(error => {
    document.getElementById('error-message').textContent = `Er ging iets mis: ${error.message}`;
    console.log(error.message);
  });

// Favorieten opslaan in localStorage
function addToFavorites(werk) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.naam_fresco_nl === werk.naam_fresco_nl)) {
        favorites.push(werk);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${werk.naam_fresco_nl} is toegevoegd aan je favorieten!`);
        showFavorites();
    } else {
        alert(`${werk.naam_fresco_nl} staat al in je favorieten.`);
    }
}

// Favorieten weergeven
function showFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favList = document.getElementById('favorietes-lijst');
    favList.innerHTML = '';
    
    favorites.forEach(werk => {
        const tableR = document.createElement('tr');
        const tableName = document.createElement('td');
        const tableImage = document.createElement('td');
        const tableRemove = document.createElement('td');
        const tableDate = document.createElement('td');
        const tableDrawer = document.createElement('td');
        const tableDrawerKunst = document.createElement('td');
        const tableSurface = document.createElement('td');
        const tableAdress = document.createElement('td');
        const tableUitgever = document.createElement('td');
        const tableFav = document.createElement('td');


      // Gegevens van de API in de table cell zetten
      tableName.textContent = werk.naam_fresco_nl;
      tableDate.textContent = werk.date;
      tableDrawer.textContent = werk.dessinateur;
      tableSurface.textContent = werk.surface_m2;
      tableAdress.textContent = werk.adres;
      tableDrawerKunst.textContent = werk.realisateur;
      tableUitgever.textContent = werk.maison_d_edition;
        tableAdress.id = werk.commune_gemeente;
        const image = document.createElement('IMG');
        image.src = werk.image;
        image.width = 100;
        tableImage.appendChild(image);
        
        // Verwijderknop maken
        const removeBtn = document.createElement('button');
        removeBtn.innerText = "Verwijderen";
        removeBtn.addEventListener('click', () => removeFromFavorites(werk));
        tableRemove.appendChild(removeBtn);
        
        tableR.appendChild(tableImage);
      tableR.appendChild(tableName);
      tableR.appendChild(tableDrawer);
      tableR.appendChild(tableDrawerKunst);
      tableR.appendChild(tableUitgever);
      tableR.appendChild(tableDate);
      tableR.appendChild(tableSurface);
      tableR.appendChild(tableAdress);
        tableR.appendChild(tableRemove);
        favList.appendChild(tableR);
    });
}
// Favorieten verwijderen
function removeFromFavorites(werk) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.naam_fresco_nl !== werk.naam_fresco_nl);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showFavorites();
}

//toevoegen gemeente aan filters

function addFiltersPlaats(werk, gemeentes ){
  const gemeente = werk.commune_gemeente
  if(!gemeentes.some(gem => gemeente === gem)){
    gemeentes.push(gemeente);
  }
}

function addFiltersJaar(werk, jaartallen){
  const jaartal = werk.date;
  if(!jaartallen.some(jaar => Number(jaartal) === jaar)){
    jaartallen.push(Number(jaartal));
  }
}

function addFiltersAuteurs(werk, auteurs ){
  const auteur = werk.dessinateur;

  if(!auteurs.some(aut => auteur === aut)){
    auteurs.push(auteur);
  }
}

function showFiltersPlaats(){
  const selectElement = document.getElementById('location-filter');

  // Voeg voor elke gemeente een option tag toe aan het select element
  gemeentes.forEach(function(gemeente) {
  const option = document.createElement('option');
  option.textContent = gemeente;

  // Zet de value van de option tag (kan hetzelfde zijn als de tekst)
  option.value = gemeente; // bijvoorbeeld 'amsterdam'

  // Voeg de option toe aan het select element
  selectElement.appendChild(option);
});}

function showFiltersJaar(){
  const selectElement = document.getElementById('year-filter');

  // Voeg voor elke gemeente een option tag toe aan het select element
  jaartallen.forEach(function(jaartal) {
  const option = document.createElement('option');
  option.textContent = jaartal;

  // Zet de value van de option tag (kan hetzelfde zijn als de tekst)
  option.value = jaartal; // bijvoorbeeld 'amsterdam'

  // Voeg de option toe aan het select element
  selectElement.appendChild(option);
});}

function showFiltersAuteurs(){
  const selectElement = document.getElementById('author-filter');

  // Voeg voor elke gemeente een option tag toe aan het select element
  auteurs.forEach(function(auteur) {
  const option = document.createElement('option');
  option.textContent = auteur;

  // Zet de value van de option tag (kan hetzelfde zijn als de tekst)
  option.value = auteur; // bijvoorbeeld 'amsterdam'

  // Voeg de option toe aan het select element
  selectElement.appendChild(option);
});}

function listenFilters() {
  // Verkrijg de geselecteerde waarde van de filters
  const locationFilter = document.getElementById('location-filter');
  const auteurFilter = document.getElementById('author-filter');
  const jaarFilter = document.getElementById('year-filter');

  // Voeg een change event listener toe aan de filters
  locationFilter.addEventListener('change', filterData);
  auteurFilter.addEventListener('change', filterData);
  jaarFilter.addEventListener('change', filterData);
}

function filterData() {
  let locationFilterValue = document.getElementById('location-filter').value.toLowerCase().trim();
  if (locationFilterValue != "all" || locationFilterValue != "haren") {
    locationFilterValue = locationFilterValue.split("-");
    locationFilterValue = locationFilterValue[1];
 }
  const auteurFilterValue = document.getElementById('author-filter').value.toLowerCase().trim();
  const jaarFilterValue = document.getElementById('year-filter').value.trim();

  const list = document.getElementById('locations-lijst');
  const rows = list.querySelectorAll('tr');
  let filteredRows = 0;

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const locationCell = cells[7].textContent.toLowerCase(); // Gemeente kolom
    const auteurCell = cells[2].textContent.toLowerCase(); // Auteur kolom
    const jaarCell = cells[5].textContent.trim(); // Jaar kolom

    // Controleer of de rij voldoet aan alle geselecteerde filters
    const matchesLocation = locationFilterValue === 'all' || locationCell.includes(locationFilterValue);
    const matchesAuteur = auteurFilterValue === 'all' || auteurCell.includes(auteurFilterValue);
    const matchesJaar = jaarFilterValue === 'all' || jaarCell === jaarFilterValue;

    if (matchesLocation && matchesAuteur && matchesJaar) {
      row.style.display = "table-row";
      filteredRows++;
    } else {
      row.style.display = "none";
    }
  });

  // Geef een bericht als er geen gefilterde resultaten zijn
  const errorMessage = document.getElementById('error-message');
  if (filteredRows === 0) {
    errorMessage.textContent = 'Geen resultaten gevonden voor de geselecteerde filters.';
  } else {
    errorMessage.textContent = ''; // Verberg foutmelding als er resultaten zijn
  }
}


// is de favorieten sectie
document.getElementById("show-favorites").addEventListener("click", function() {
  const locationsSection = document.getElementById("locations");
  const favoritesSection = document.getElementById("favorieten");
  if (favoritesSection.style.display === "none") {
      favoritesSection.style.display = "block";
      locationsSection.style.display = "none";
      this.textContent = "Toon alle locaties";
  } else {
      favoritesSection.style.display = "none";
      locationsSection.style.display = "block";
      this.textContent = "Toon favorieten";
  }
});
