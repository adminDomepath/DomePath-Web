import { useEffect, useState } from "react";

const apps = [
  { src: "/assets/her2-icon.png", className: "app-icon--her2", label: "A focused health tool in development" },
  { src: "/assets/domory-icon-v3.png", className: "", label: "A memory and thinking app in development" },
  { src: "/assets/cps-icon-layer.png", className: "app-icon--cps", label: "A focused health tool in development" },
  { src: "/assets/coorder-icon-v2.png", className: "", label: "A focused work tool in development" },
];

const principles = [
  { number: "01", title: "Purposeful software", copy: "Every product begins with a real need and a clear reason to exist." },
  { number: "02", title: "Clarity by default", copy: "Thoughtful interfaces make useful technology feel natural from the first tap." },
  { number: "03", title: "Built with care", copy: "Deliberate design and dependable engineering shape every detail." },
];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.16 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="DomePath home" onClick={closeMenu}>
          <img src="/assets/domepath-mark.png" alt="" />
          <span>DomePath</span>
        </a>

        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((value) => !value)}>
          <span /><span /><span />
          <span className="sr-only">Toggle navigation</span>
        </button>

        <nav id="primary-navigation" className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#apps" onClick={closeMenu}>Apps</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="ambient ambient--blue" aria-hidden="true" />
          <div className="ambient ambient--lime" aria-hidden="true" />
          <img className="hero-mark" src="/assets/domepath-mark.png" alt="" aria-hidden="true" />

          <div className="hero-copy" data-reveal>
            <p className="eyebrow"><span /> Independent app studio</p>
            <h1>Small apps.<br /><em>Clearer paths.</em></h1>
            <p className="hero-intro">We create focused software that turns useful ideas into simple, thoughtful experiences.</p>
            <a className="primary-link" href="#about">Discover DomePath <span aria-hidden="true">↓</span></a>
          </div>

          <div className="hero-icons" aria-label="DomePath apps">
            {apps.map((app, index) => (
              <div className={`floating-app floating-app--${index + 1}`} key={app.src}>
                <img className={app.className} src={app.src} alt={app.label} />
              </div>
            ))}
          </div>
          <p className="hero-note">Designed with intention</p>
        </section>

        <section className="about section" id="about">
          <div className="section-label" data-reveal>About DomePath</div>
          <div className="about-grid">
            <h2 data-reveal>Technology should make life feel <em>lighter.</em></h2>
            <div className="about-copy" data-reveal>
              <p>DomePath is an independent brand creating its own family of applications. We focus on precise, useful products for work, health, and everyday thinking.</p>
              <p>Each app is different. The idea behind them is the same: remove noise, respect people’s time, and make every interaction feel clear.</p>
            </div>
          </div>
        </section>

        <section className="apps section" id="apps">
          <div className="apps-heading" data-reveal>
            <div>
              <div className="section-label">Our apps</div>
              <h2>A growing family<br />of focused ideas.</h2>
            </div>
            <p>Products in different stages of development, united by one quiet standard: usefulness without clutter.</p>
          </div>

          <div className="app-gallery" data-reveal>
            {apps.map((app, index) => (
              <div className={`gallery-app gallery-app--${index + 1}`} key={`gallery-${app.src}`}>
                <div className="app-glow" />
                <img className={app.className} src={app.src} alt={app.label} />
              </div>
            ))}
            <div className="development-badge"><span /> In development</div>
          </div>
        </section>

        <section className="principles section">
          <div className="principles-intro" data-reveal>
            <div className="section-label">Our approach</div>
            <h2>Simple is a<br />serious craft.</h2>
          </div>
          <div className="principle-list">
            {principles.map((principle) => (
              <article className="principle" key={principle.number} data-reveal>
                <span>{principle.number}</span>
                <div><h3>{principle.title}</h3><p>{principle.copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <img className="contact-mark" src="/assets/domepath-mark.png" alt="" aria-hidden="true" />
          <div className="contact-content" data-reveal>
            <div className="section-label">Get in touch</div>
            <h2>Have something<br />worth simplifying?</h2>
            <p>For product questions, support, or collaboration, we would be glad to hear from you.</p>
            <a href="mailto:leonardo.arias@domepath.com">leonardo.arias@domepath.com <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand brand--footer" href="#top" aria-label="Back to top"><img src="/assets/domepath-mark.png" alt="" /><span>DomePath</span></a>
        <p>Focused software, thoughtfully made.</p>
        <p>© {new Date().getFullYear()} DomePath</p>
      </footer>
    </div>
  );
}
