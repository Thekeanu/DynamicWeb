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
