// fetch and display projects card
fetch('./src/projects-data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-grid')

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

      container.appendChild(card)
    })
  })
  .catch(err => console.error(err))
