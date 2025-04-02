'use  strict';
  fetch('https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_parcours_bd/records?limit=2')
  .then( response => response.json())
  .then(resultaat => {
    // selecteren van de lijst
    const list = document.getElementById('locations-lijst');
    console.log(resultaat);
  // inzetten van de data in de lijst
    resultaat.results.forEach(werk => { 
      //aanmaken table row
      const tableR = document.createElement('tr');
      //aanmaken table kolom
      const tableName = document.createElement('td');
      const tableImage = document.createElement('td');
      const tableDate = document.createElement('td');
      const tableDrawer = document.createElement('td');
      const tableDrawerKunst = document.createElement('td');
      const tableSurface = document.createElement('td');
      const tableAdress = document.createElement('td');
      const tableUitgever = document.createElement('td');
      const tableFav = document.createElement('td');
      //gegevens van de api in de table cel zetten
      tableName.textContent = `${werk.naam_fresco_nl}`;
      tableDate.textContent = `${werk.date}`;
      tableDrawer.textContent = `${werk.dessinateur}`;
      tableSurface.textContent = `${werk.surface_m2}`;
      tableAdress.textContent = `${werk.adres}`;
      tableDrawerKunst.textContent = `${werk.realisateur}`;
      tableUitgever.textContent = `${werk.maison_d_edition}`;
      const image = document.createElement('IMG');
      const buttonFav = document.createElement('button');
      image.src = werk.image;
      buttonFav.name = `${werk.naam_fresco_nl}`;
      buttonFav.innerText = "voeg toe aan favorieten";
      tableFav.appendChild(buttonFav);
      tableImage.appendChild(image);
      //toevoegen van cel in de tabel
      
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
  })
  .catch(error => {
    document.getElementById('error-message').textContent = `Er ging iets mis: ${error.message}`;
    console.log(error.message);
  });

//filter functies
filterNaam =  () => {
  naam = document.getElementById('filterNaam');
  naam.addEventlistener   
}





