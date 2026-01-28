// Disable automatic scroll restoration to prevent jumps on refresh before content loads
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Save scroll position before reload
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('scrollPos', window.scrollY);
});

// Theme toggle logic - Run as early as possible
const themeToggle = document.getElementById('theme-toggle')
const body = document.body
const themeIcon = themeToggle.querySelector('i')

// Check for saved theme preference or default to system preference
const savedTheme = localStorage.getItem('theme')
const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

if (savedTheme === 'dark' || (!savedTheme && systemDarkMode)) {
  body.classList.add('dark-mode')
  themeIcon.className = 'bi bi-sun'
} else {
  body.classList.remove('dark-mode')
  body.classList.add('light-mode')
  themeIcon.className = 'bi bi-moon-stars'
}

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode')
    body.classList.add('light-mode')
    themeIcon.className = 'bi bi-moon-stars'
    localStorage.setItem('theme', 'light')
  } else {
    body.classList.remove('light-mode')
    body.classList.add('dark-mode')
    themeIcon.className = 'bi bi-sun'
    localStorage.setItem('theme', 'dark')
  }
})

// fetch and display projects card
let allProjects = [];

function renderProjects(projects) {
  const container = document.getElementById('project-grid')
  container.innerHTML = ''; // Clear previous projects
  const fragment = document.createDocumentFragment()

  projects.forEach(project => {
    const card = document.createElement('div')
    card.className = 'project-card'

    card.innerHTML = `
        <div class="card-media">
          <img src="${project.media.src}" alt="${project.media.alt}">
        </div>

        <div class="card-content">
          <h3>${project.index}. ${project.title}</h3>
          <p>${project.description}</p>
          
          <div class="contributed-by">
            ${project.contributor ?
        `Contributed by: <a href="${project.contributor.url}" target="_blank">${project.contributor.name}</a>` :
        `Created by: <a href="https://iamovi.github.io/" target="_blank">Ovi ren</a>`}
          </div>

          <div class="card-links">
            <a href="${project.links.code}" target="_blank">
              <i class="bi bi-github"></i> Code
            </a>
            <a href="${project.links.preview}" target="_blank">
              <i class="bi bi-eye"></i> Preview
            </a>
          </div>
        </div>
      `
    fragment.appendChild(card)
  })

  container.appendChild(fragment)
  container.style.minHeight = 'auto';
}

fetch('./src/projects-data.json')
  .then(res => res.json())
  .then(data => {
    allProjects = data.projects;
    renderProjects(allProjects);

    // Restore scroll position after projects are loaded
    const savedScrollPos = sessionStorage.getItem('scrollPos');
    if (savedScrollPos) {
      window.scrollTo(0, parseInt(savedScrollPos));
      sessionStorage.removeItem('scrollPos');
    }
  })
  .catch(err => console.error(err))

// Search functionality
const searchInput = document.getElementById('project-search');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredProjects = allProjects.filter(project => {
    const titleMatch = project.title.toLowerCase().includes(searchTerm);
    const descMatch = project.description.toLowerCase().includes(searchTerm);
    const contributorName = project.contributor ? project.contributor.name : "Ovi ren";
    const contributorMatch = contributorName.toLowerCase().includes(searchTerm);

    return titleMatch || descMatch || contributorMatch;
  });
  renderProjects(filteredProjects);
});

// fetch github stats with caching to avoid rate limits
// Strategy: Show cached data immediately, then background refresh if cache is older than 5 minutes
const CACHE_KEY = 'gh_stats_cache';
const REVALIDATE_AFTER = 5 * 60 * 1000; // 5 minutes

function updateStatsUI(stars, forks, contributors) {
  if (stars !== undefined) document.getElementById('star-count').innerText = stars;
  if (forks !== undefined) document.getElementById('fork-count').innerText = forks;
  if (contributors !== undefined) document.getElementById('contributor-count').innerText = contributors;
}

function fetchGitHubStats() {
  const repoUrl = 'https://api.github.com/repos/iamovi/button-will-react'
  return Promise.all([
    fetch(repoUrl).then(res => res.json()),
    fetch(`${repoUrl}/contributors`).then(res => res.json())
  ])
    .then(([repoData, contributorsData]) => {
      const stats = {
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        contributors: contributorsData.length,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(stats));
      updateStatsUI(stats.stars, stats.forks, stats.contributors);
      return stats;
    })
    .catch(err => {
      console.error('Error fetching GitHub stats:', err);
    });
}

const cachedStats = JSON.parse(localStorage.getItem(CACHE_KEY));
const now = Date.now();

if (cachedStats) {
  // Show cached data immediately
  updateStatsUI(cachedStats.stars, cachedStats.forks, cachedStats.contributors);

  // If data is older than 5 mins, refresh in background
  if (now - cachedStats.timestamp > REVALIDATE_AFTER) {
    fetchGitHubStats();
  }
} else {
  // No cache at all, full fetch
  fetchGitHubStats().catch(() => {
    document.getElementById('gh-stats').style.display = 'none';
  });
}
