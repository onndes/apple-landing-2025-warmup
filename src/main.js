function burgerOpen() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const header = document.querySelector('.header');
  const body = document.body;

  if (!burger || !nav || !header) return;

  const closeMenu = () => {
    burger.classList.remove('is-open');
    nav.classList.remove('is-open');
    header.classList.remove('is-open');
    body.classList.remove('is-locked');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', (e) => {
    e.stopPropagation();

    const isOpen = burger.classList.toggle('is-open');
    nav.classList.toggle('is-open', isOpen);
    header.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    body.classList.toggle('is-locked', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!header.classList.contains('is-open')) return;
    if (header.contains(e.target)) return;
    closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

async function loadIncludes() {
  const includes = document.querySelectorAll('[data-include]');
  for (const el of includes) {
    const file = el.getAttribute('data-include');
    const resp = await fetch(file);
    if (resp.ok) el.outerHTML = await resp.text();
  }
  burgerOpen();
}

loadIncludes();

function checkDetailsState() {
  const detailsList = document.querySelectorAll('.navigation__menu details');
  if (!detailsList.length) return;

  const isDesktop = window.innerWidth >= 998;

  detailsList.forEach((detail) => {
    if (isDesktop) {
      detail.setAttribute('open', '');
    } else {
      detail.removeAttribute('open');
    }
  });
}

function waitForFooter() {
  const footer = document.querySelector('.navigation__menu');
  if (footer) {
    checkDetailsState();
    return;
  }

  requestAnimationFrame(waitForFooter);
}

document.addEventListener('DOMContentLoaded', () => {
  waitForFooter();
});

window.addEventListener('resize', checkDetailsState);


