function burgerOpen() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const header = document.querySelector('.header');
  if (!burger || !nav || !header) return;

  burger.addEventListener('click', () => {
    console.log('text');
    const isOpen = burger.classList.toggle('is-open');
    nav.classList.toggle('is-open', isOpen);
    header.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
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
