# DynamicWeb projectweek
  ## Projectbeschrijving en functionaliteiten
    het project was het maken van een dynamische website met data van de open api brussel comic book route. de functionaliteiten zijn: 
    -het sorteren van de data
    -zoekbalk
    -filer mogelijkheden
    -themaswitcher voor light en dark modus
    -map van met waypoints
    - toevoegen van favorieten
  ## Gebruikte API's met links
    API call naar: /api/explore/v2.1/catalog/datasets/bruxelles_parcours_bd/records?limit=50
    meer info hier: https://opendata.brussels.be/explore/dataset/bruxelles_parcours_bd/information

  ## Implementatie van elke technisch vereiste (waar in de code?/lijnnummer)
    DOM manipulatie:  
      -Elementen selecteren fetch.mjs lijn 13
      -Elementen manipuleren fetch.mjs lijn 28
      -Events aan elementen koppelen fetch.mjs lijn 58

    Modern JavaScript:  
      -Gebruik van constanten fetch.mjs lijn 4
      -Template literals fetch.mjs lijn 107
      -Iteratie over arrays fetch.mjs lijn 17
      -Array methodes fetch.mjs lijn 105
      -Arrow functions fetch.mjs lijn 58
      -Conditional (ternary) operator (moderne if..else) fetch.mjs lijn 104
      -Callback functions fetch.mjs lijn 86
      -Promises 
      -Async & Await Promises fetch.mjs lijn 8
      -Observer API (1 is voldoende)
   ## Data & API:  
      -Fetch om data op te halen fetch.mjs lijn 8
      -JSON manipuleren en weergeven fetch.mjs lijn 103  en fetch.mjs lijn 135

   ## Opslag & validatie:  
    -Formulier validatie themaswitcher.mjs lijn 91
    -Gebruik van LocalStorage fetch.mjs lijn 178

  ## Styling & layout:  
    -Basis HTML layout (flexbox of CSS grid kan hiervoor worden gebruikt) style.css lijn 88
    -Basis CSS in style.css 
    -Gebruiksvriendelijke elementen (verwijderknoppen, icoontjes,...) fetch.mjs lijn 149 en 154
  ## Installatiehandleiding:
    je kan het project clonen van github en dan dit lokaal runnen met de visual studio plugin live server door Ritwick Dey
    je moet geen login credentials hebben voor deze api en js moet ook niets aan het request aanpassen

  ## Screenshots van de applicatie
   
  ![index](https://github.com/user-attachments/assets/a1f0ff99-6dee-4a8a-9e1a-7846a9169919)
    ![darkmodus](https://github.com/user-attachments/assets/d4813bdb-becb-4688-9dae-d0e30f6d8280)
    ![image](https://github.com/user-attachments/assets/0085bbe7-1ba4-4227-8a7f-143bce2b9bee)
    ![image](https://github.com/user-attachments/assets/36436044-3ce1-4469-92b9-85847f8ce7a0)

  ## Gebruikte bronnen (inclusief AI chatlog)
    -w3schools : https://www.w3schools.com/jsref/dom_obj_event.asp
    -w3schools : https://www.w3schools.com/jsref/met_element_addeventlistener.asp
    -w3schools : https://www.w3schools.com/jsref/obj_focusevent.asp
    -w3schools : https://www.w3schools.com/jsref/obj_inputevent.asp
    -mdnwebdocs : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    -w3schools : https://www.w3schools.com/jsref/jsref_split.asp
    -github : https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
    -cursus: Dynamic Web PRG1 @S2
    -chatgpt: https://chatgpt.com/share/67eed4c4-2a68-8009-bfa5-fd4ffdd797d4
    
## Taakverdeling binnen het team

    Keanu: 
      -filters
      -sorteer knop 
      -lees meer knop
      -fetch javascript file
      tabel maken en invullen in html
      -API-data toevoegen
      
    Damian:
      -css en html file
      -themaswitcher javascript file
      -toon kaart 
      -search naam
      -knop voor themaswitcher
      -lijst favorieten gemaakt
      -knop van verwijderen van favoriete


    
  

