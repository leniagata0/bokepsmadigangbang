// /scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
  // Search Form Logic
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const input = searchForm.querySelector('input[name="query"]');
      const query = input ? input.value.trim() : '';
      if (query) {
        const slugifiedQuery = query.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `/video/${slugifiedQuery}/1`; // Include /1 as discussed
      } else {
        window.location.href = `/video/`;
      }
    });
  }

  // Dark Mode Toggle Logic
  const toggleButton = document.getElementById('darkModeToggle');
  const body = document.body;
  const LIGHT_ICON = '☀️';
  const DARK_ICON = '🌙';
  const STORAGE_KEY = 'darkModeEnabled';

  function applyTheme(isDarkMode) {
    if (isDarkMode) {
      body.classList.add('dark-mode');
      toggleButton.textContent = DARK_ICON;
    } else {
      body.classList.remove('dark-mode');
      toggleButton.textContent = LIGHT_ICON;
    }
  }

  // Apply theme on load
  const savedMode = localStorage.getItem(STORAGE_KEY);
  if (savedMode === 'true') {
    applyTheme(true);
  } else if (savedMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Check system preference if no saved mode
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  // Toggle theme on button click
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const isCurrentlyDarkMode = body.classList.contains('dark-mode');
      const newMode = !isCurrentlyDarkMode;
      applyTheme(newMode);
      localStorage.setItem(STORAGE_KEY, newMode);
    });
  }
});
