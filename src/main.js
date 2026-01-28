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
fetch('./src/projects-data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-grid')
    const fragment = document.createDocumentFragment()

    data.projects.forEach(project => {
      const card = document.createElement('div')
      card.className = 'project-card'

      card.innerHTML = `
        <div class="card-media">
          <img src="${project.media.src}" alt="${project.media.alt}">
        </div>

        <div class="card-content">
          <h3>${project.index}. ${project.title}</h3>
          <p>${project.description}</p>

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

    // Clear min-height after content is loaded
    container.style.minHeight = 'auto';

    // Restore scroll position after projects are loaded
    const savedScrollPos = sessionStorage.getItem('scrollPos');
    if (savedScrollPos) {
      window.scrollTo(0, parseInt(savedScrollPos));
      sessionStorage.removeItem('scrollPos');
    }
  })
  .catch(err => console.error(err))

// fetch github stats
fetch('https://api.github.com/repos/iamovi/button-will-react')
  .then(res => res.json())
  .then(repoData => {
    document.getElementById('star-count').innerText = repoData.stargazers_count
    document.getElementById('fork-count').innerText = repoData.forks_count
  })
  .catch(err => {
    console.error('Error fetching GitHub stats:', err)
    document.getElementById('gh-stats').style.display = 'none'
  })
