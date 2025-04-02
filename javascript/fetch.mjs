'use  strict';
  fetch('https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_parcours_bd/records?limit=2')
  .then( response => response.json())
  .then(resultaat => {
    // selecteren van de lijst
    const list = document.getElementById('locations');
    console.log(resultaat);
  // inzetten van de data in de lijst
    resultaat.results.forEach(werk => { 
      const li = document.createElement('li');  
      li.textContent = `${werk.naam_fresco_nl}`;
      list.appendChild(li);
    });
  })
  .catch(error => {
    //document.getElementById('error').textContent = `Er ging iets mis: ${error.message}`;
    console.log(error.message);
  });

//filter functies
filterNaam =  () => {
  naam = document.getElementById('filterNaam');
  naam.addEventlistener   
}





