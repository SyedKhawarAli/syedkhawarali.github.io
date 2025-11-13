const projectGroups = [
  { containerId: 'iosProjects', projects: window.iosProjects || [] },
  { containerId: 'csharpProjects', projects: window.csharpProjects || [] },
  { containerId: 'otherProjects', projects: window.otherProjects || [] }
];

const createElement = (tag, { className, html, text } = {}) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html) el.innerHTML = html;
  if (text) el.textContent = text;
  return el;
};

const createProjectCard = project => {
  const article = createElement('article', { className: 'project' });
  if (project.id) article.id = project.id;

  const header = createElement('header', { className: 'project__header' });
  const title = createElement('h4', { className: 'project__title' });
  if (project.link) {
    const link = createElement('a', { text: project.title });
    link.href = project.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    title.appendChild(link);
  } else {
    title.textContent = project.title;
  }
  header.appendChild(title);
  article.appendChild(header);

  const body = createElement('div', { className: 'project__body' });

  (project.description || []).forEach(paragraph => {
    body.appendChild(createElement('p', { html: paragraph }));
  });

  if (project.media?.length) {
    const mediaSection = createElement('div');
    mediaSection.appendChild(
      createElement('h5', {
        className: 'project-subheading',
        text: project.mediaTitle || 'Screenshots'
      })
    );

    const mediaGrid = createElement('div', { className: 'project__media' });
    project.media.forEach(item => {
      const img = new Image();
      img.src = item.src;
      img.alt = item.alt || project.title;
      mediaGrid.appendChild(img);
    });
    mediaSection.appendChild(mediaGrid);
    body.appendChild(mediaSection);
  }

  if (project.highlights?.length) {
    body.appendChild(
      createElement('h5', {
        className: 'project-subheading',
        text: project.highlightsTitle || 'Highlights'
      })
    );
    const list = createElement('ul', { className: 'project__highlights' });
    project.highlights.forEach(item => {
      list.appendChild(createElement('li', { html: item }));
    });
    body.appendChild(list);
  }

  article.appendChild(body);

  if (project.badges?.length) {
    const actions = createElement('div', {
      className: 'project__actions d-flex flex-wrap gap-3'
    });

    project.badges.forEach(badge => {
      const anchor = createElement('a', { className: 'project__badge' });
      anchor.href = badge.href;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';

      const img = new Image();
      img.src = badge.img;
      img.alt = badge.alt || `${project.title} badge`;
      anchor.appendChild(img);

      actions.appendChild(anchor);
    });

    article.appendChild(actions);
  }

  return article;
};

const renderProjects = ({ containerId, projects }) => {
  const mount = document.getElementById(containerId);
  if (!mount || !projects.length) return;

  const fragment = document.createDocumentFragment();
  projects.forEach(project => fragment.appendChild(createProjectCard(project)));
  mount.appendChild(fragment);
};

document.addEventListener('DOMContentLoaded', () => {
  projectGroups.forEach(renderProjects);
});
