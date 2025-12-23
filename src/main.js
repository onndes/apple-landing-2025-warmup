document.querySelectorAll('[data-include]').forEach(async (el) => {
  const file = el.getAttribute('data-include');
  const resp = await fetch(file);
  if (resp.ok) el.outerHTML = await resp.text();
});

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
