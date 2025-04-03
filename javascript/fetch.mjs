'use strict';

fetch('https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_parcours_bd/records?limit=5')
  .then(response => response.json())
  .then(resultaat => {
    // Selecteren van de lijst
    const list = document.getElementById('locations-lijst');
    console.log(resultaat);

    // Inzetten van de data in de lijst
    resultaat.results.forEach(werk => { 
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

        tableName.textContent = werk.naam_fresco_nl;
        
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