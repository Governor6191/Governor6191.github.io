// Shared site chrome — nav + footer, injected into each page.
// Pass the active page key via <body data-page="home"> etc.

(function () {
  const NAV = [
    { key: 'home',     label: 'Home',     href: '/' },
    { key: 'research', label: 'Research', href: '/research.html' },
    { key: 'projects', label: 'Projects', href: '/projects.html' },
    { key: 'teaching', label: 'Teaching', href: '/teaching.html' },
    { key: 'cv',       label: 'CV',       href: '/cv/sylvester-arhin-mensah-cv.pdf', external: true },
    { key: 'contact',  label: 'Contact',  href: '/contact.html' },
  ];

  function renderNav(active) {
    return `
      <nav class="site-nav">
        <div class="site-nav-inner">
          <a class="brand" href="/">
            <span class="brand-mark">S</span>
            <span class="brand-name">Sylvester Arhin <em>Mensah</em></span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav-links" aria-label="Open navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div class="nav-links" id="site-nav-links">
            ${NAV.map(n => {
              const attrs = [];
              if (n.key === active) attrs.push('class="active" aria-current="page"');
              if (n.external) attrs.push('target="_blank" rel="noopener"');
              return `<a href="${n.href}" ${attrs.join(' ')}>${n.label}${n.external ? ' &nearr;' : ''}</a>`;
            }).join('')}
          </div>
          <a class="nav-cta" href="/contact.html">
            <span class="dot"></span>
            <span class="cta-label">Available for SU '26</span>
          </a>
        </div>
      </nav>
    `;
  }

  function renderFoot() {
    const year = new Date().getFullYear();
    return `
      <footer class="site-foot">
        <div class="wrap">
          <div class="foot-name">Sylvester <em>Arhin</em> Mensah</div>
          <div class="foot-grid">
            <div>
              <h5>The work</h5>
              <p style="max-width: 38ch; line-height: 1.7; font-family: var(--sans); font-size: 13px; color: rgba(255,255,255,0.7);">
                PhD student in Applied Mathematics &amp; Statistics at
                Mississippi State, working with Prof. Seongjai Kim on
                numerical methods, optimization, and image processing.
              </p>
            </div>
            <div>
              <h5>Site</h5>
              <ul>
                <li><a href="/research.html">Research</a></li>
                <li><a href="/projects.html">Projects</a></li>
                <li><a href="/teaching.html">Teaching</a></li>
                <li><a href="/cv/sylvester-arhin-mensah-cv.pdf" target="_blank" rel="noopener">CV (PDF) &nearr;</a></li>
                <li><a href="/contact.html">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5>Elsewhere</h5>
              <ul>
                <li><a href="https://github.com/Governor6191" target="_blank" rel="noopener">GitHub &nearr;</a></li>
                <li><a href="https://www.linkedin.com/in/mensah-sylvester-arhin-62a2b6242/" target="_blank" rel="noopener">LinkedIn &nearr;</a></li>
                <li><a href="https://www.math.msstate.edu/" target="_blank" rel="noopener">MSU Math &amp; Stats &nearr;</a></li>
                <li><a href="/cv/sylvester-arhin-mensah-cv.pdf" target="_blank" rel="noopener">CV (PDF) &nearr;</a></li>
              </ul>
            </div>
            <div>
              <h5>Contact</h5>
              <ul>
                <li><a href="mailto:mensahsylvesterarhin@gmail.com">mensahsylvesterarhin@gmail.com</a></li>
                <li>Starkville, MS &middot; CT</li>
                <li><a href="/contact.html">Get in touch &rarr;</a></li>
              </ul>
            </div>
          </div>
          <div class="foot-bar">
            <span>&copy; ${year} Sylvester Arhin Mensah</span>
            <span>Built from first principles &middot; <a href="https://github.com/Governor6191" target="_blank" rel="noopener">source</a></span>
          </div>
        </div>
      </footer>
    `;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const active = document.body.dataset.page || 'home';
    const navMount = document.getElementById('nav-mount');
    const footMount = document.getElementById('foot-mount');
    if (navMount) navMount.outerHTML = renderNav(active);
    if (footMount) footMount.outerHTML = renderFoot();

    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.getElementById('site-nav-links');
    if (nav && toggle && links) {
      function setOpen(open) {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      }

      toggle.addEventListener('click', () => {
        setOpen(!nav.classList.contains('is-open'));
      });
      links.addEventListener('click', e => {
        if (e.target instanceof Element && e.target.closest('a')) setOpen(false);
      });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') setOpen(false);
      });
    }
  });
})();
