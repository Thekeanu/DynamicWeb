const setTheme = (theme) => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);

    if (theme === 'dark-theme') {
        document.documentElement.style.setProperty('--background-color', '#121212');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--table-header-bg', '#1e1e1e');
        document.documentElement.style.setProperty('--button-bg', '#333333');
        document.getElementById('themeToggle').textContent = 'Schakel naar Licht Thema';
    } else {
        document.documentElement.style.setProperty('--background-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#000000');
        document.documentElement.style.setProperty('--table-header-bg', '#007bff');
        document.documentElement.style.setProperty('--button-bg', '#007bff');
        document.getElementById('themeToggle').textContent = 'Schakel naar Donker Thema';
    }
};

const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark-theme') {
        setTheme('light-theme');
    } else {
        setTheme('dark-theme');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    setTheme(savedTheme);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});

document.getElementById("show-map").addEventListener("click", function() {
    const locationsSection = document.getElementById("locations");
    const favoritesSection = document.getElementById("favorieten");
    const mapSection = document.getElementById("map");

    // Checken of we op de kaart sectie zitten of niet
    if (mapSection.style.display === "none") {
        // Verberg de locaties en favorieten secties
        locationsSection.style.display = "none";
        favoritesSection.style.display = "none";
        
        // Toon de kaart sectie
        mapSection.style.display = "block";
        
        // Verander de knoptekst naar "Toon locaties"
        this.textContent = "Toon muurschilderingen";
    } else {
        // Als we al op de kaart sectie zijn, terug naar locaties sectie
        mapSection.style.display = "none";
        locationsSection.style.display = "block";
        favoritesSection.style.display = "none";
        
        // Verander de knoptekst terug naar "Toon kaart"
        this.textContent = "Toon kaart";
    }
});

document.getElementById('sort').addEventListener('click', function() {
    const list = document.getElementById('locations-lijst');
    const rows = Array.from(list.querySelectorAll('tr'));

    // Sorteer de rijen op basis van de naam van de tekenaar (kolom 1)
    rows.sort((rowA, rowB) => {
        const nameA = rowA.querySelectorAll('td')[1].textContent.trim().toLowerCase();
        const nameB = rowB.querySelectorAll('td')[1].textContent.trim().toLowerCase();
        
        // Vergelijk de namen en sorteer alfabetisch
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        } else {
            return 0;
        }
    });

    // Voeg de gesorteerde rijen terug in de lijst
    rows.forEach(row => list.appendChild(row));
});

document.addEventListener("DOMContentLoaded", function () {
    // Event listener voor live zoeken tijdens het typen
    document.getElementById("search-name").addEventListener("input", filterByName);
});

function filterByName() {
    let searchValue = document.getElementById("search-name").value.toLowerCase().trim();
    let list = document.getElementById("locations-lijst");
    let rows = list.getElementsByTagName("tr");
    let found = false;

    for (let row of rows) {
        let nameCell = row.getElementsByTagName("td")[1]; // Tweede kolom (Naam)
        if (nameCell) {
            let nameText = nameCell.textContent.toLowerCase();
            if (nameText.includes(searchValue)) {
                row.style.display = ""; // Toon rij
                found = true;
            } else {
                row.style.display = "none"; // Verberg rij
            }
        }
    }

    // Geef een foutmelding weer als er geen resultaten zijn
    let noResultsMessage = document.getElementById("no-results-message");
    noResultsMessage.textContent = found ? "" : "Geen resultaten gevonden.";
}
