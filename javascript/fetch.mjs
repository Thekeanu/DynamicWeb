'use strict';

fetch('https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_parcours_bd/records?limit=10')
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
      const tableImage = document.createElement('td');
      const tableName = document.createElement('td');
      const tableDescription = document.createElement('td');
      const tableFav = document.createElement('td');

      // Gegevens van de API in de table cell zetten
      tableName.textContent = werk.naam_fresco_nl || 'Onbekende naam';
      tableDescription.textContent = `${werk.dessinateur || 'Onbekende tekenaar'} - ${werk.realisateur || 'Onbekende kunstenaar'} (${werk.maison_d_edition || 'Onbekende uitgever'}, ${werk.date || 'Onbekend jaar'})`;

      // Aanmaken image
      const image = document.createElement('IMG');
      image.src = werk.image || 'placeholder.jpg';
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
      tableR.appendChild(tableDescription);
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
        const tableImage = document.createElement('td');
        const tableName = document.createElement('td');
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