const setTheme = (theme) => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
};

const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark-theme') {
        setTheme('light-theme');
        document.getElementById('themeToggle').textContent = 'Schakel naar Donker Thema';
    } else {
        setTheme('dark-theme');
        document.getElementById('themeToggle').textContent = 'Schakel naar Licht Thema';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    setTheme(savedTheme);

    if (savedTheme === 'dark-theme') {
        document.getElementById('themeToggle').textContent = 'Schakel naar Licht Thema';
    }

    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});

