import { useEffect, useState } from "react";

const apps = [
  { src: "/assets/her2-icon.png", label: "A focused health tool in development" },
  { src: "/assets/domory-icon-v3.png", label: "A memory and thinking app in development" },
  { src: "/assets/cps-icon-layer.png", label: "A focused health tool in development" },
  { src: "/assets/coorder-icon-v2.png", label: "A focused work tool in development" },
];

const principles = [
  { label: "Our products", value: "Own ideas" },
  { label: "Our scale", value: "Human" },
  { label: "Our standard", value: "Clear" },
  { label: "Our approach", value: "Intentional" },
];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateScroll = () => {
      frame = 0;
      const heroProgress = Math.min(Math.max(window.scrollY / Math.max(window.innerHeight, 1), 0), 1);
      document.documentElement.style.setProperty("--hero-progress", heroProgress.toFixed(4));
      setScrolled(window.scrollY > 32);

    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll);
    };

    const onPointerMove = (event) => {
      document.documentElement.style.setProperty("--pointer-x", `${(event.clientX / window.innerWidth - 0.5).toFixed(3)}`);
      document.documentElement.style.setProperty("--pointer-y", `${(event.clientY / window.innerHeight - 0.5).toFixed(3)}`);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="page-stage">
      <div className="site-frame">
        <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
          <a className="brand" href="#top" aria-label="DomePath home" onClick={closeMenu}>
            <span className="brand-mark"><img src="/assets/domepath-mark.png" alt="" /></span>
            <span>DomePath</span>
          </a>

          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((value) => !value)}>
            <span /><span />
            <span className="sr-only">Toggle navigation</span>
          </button>

          <nav id="primary-navigation" className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
            <a href="#about" onClick={closeMenu}>Studio</a>
            <a href="#apps" onClick={closeMenu}>Apps</a>
            <a href="#approach" onClick={closeMenu}>Approach</a>
            <a className="nav-contact" href="#contact" onClick={closeMenu}>Get in touch</a>
          </nav>
        </header>

        <main>
          <div className="cinematic-flow">
            <div className="cinematic-flow__media" aria-hidden="true">
              <img src="/assets/domepath-path-hero.png" alt="" />
            </div>

            <section className="hero-cinematic" id="top">
              <div className="hero-shade" aria-hidden="true" />

              <p className="hero-side hero-side--left">Focused software, thoughtfully made</p>
              <p className="hero-side hero-side--right">Independent app studio</p>

              <div className="hero-title" aria-label="Clearer Paths">
                <span>Clearer</span>
                <span>Paths</span>
              </div>

              <div className="hero-orbit" aria-label="DomePath applications">
                {apps.map((app, index) => (
                  <div className={`orbit-app orbit-app--${index + 1}`} key={app.src}>
                    <img src={app.src} alt={app.label} />
                  </div>
                ))}
                <div className="hero-emblem">
                  <img src="/assets/domepath-mark.png" alt="DomePath" />
                </div>
              </div>

            </section>

            <section className="story-dark" id="about">
              <div className="story-sticky">
                <div className="story-shade" aria-hidden="true" />

                <div className="story-scene story-scene--intro">
                  <p>We turn useful ideas into focused applications—designed to remove friction, respect people’s time, and make the next step feel obvious.</p>
                  <a href="#apps">Explore the studio</a>
                </div>

                <div className="story-scene story-scene--statement">
                  <p>DomePath is an independent brand creating its own family of software for work, health, and everyday thinking.</p>
                  <div className="story-categories" aria-label="Areas of focus">
                    <span>Health</span><span>Memory</span><span>Focus</span><span>Work</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="manifesto" id="apps">
            <div className="manifesto-copy" data-reveal>
              <p className="section-kicker">A family of focused ideas</p>
              <h2>Each app follows its own path.<br /><span>Every one begins with clarity.</span></h2>
            </div>

            <div className="app-constellation" data-reveal>
              <div className="constellation-line" aria-hidden="true" />
              {apps.map((app, index) => (
                <article className={`app-object app-object--${index + 1}`} key={`showcase-${app.src}`}>
                  <div className="app-object__halo" />
                  <img src={app.src} alt={app.label} />
                  <p><span>0{index + 1}</span> In development</p>
                </article>
              ))}
              <div className="studio-seal">
                <img src="/assets/domepath-mark.png" alt="" />
                <span>One studio<br />Four directions</span>
              </div>
            </div>
          </section>

          <section className="approach" id="approach">
            <div className="approach-heading" data-reveal>
              <p className="section-kicker">What stays constant</p>
              <h2>Built around a<br />quiet standard.</h2>
              <p>Different products, one shared belief: useful technology should feel lighter, calmer, and more direct.</p>
            </div>

            <div className="principle-grid" data-reveal>
              {principles.map((principle, index) => (
                <article key={principle.label}>
                  <span>0{index + 1}</span>
                  <h3>{principle.value}</h3>
                  <p>{principle.label}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="closing" id="contact">
            <div className="closing-media" aria-hidden="true"><img src="/assets/domepath-path-hero.png" alt="" /></div>
            <div className="closing-shade" aria-hidden="true" />
            <div className="closing-content" data-reveal>
              <div className="closing-brand"><span className="brand-mark"><img src="/assets/domepath-mark.png" alt="" /></span> DomePath</div>
              <h2>Something worth<br />making clearer?</h2>
              <p>For product questions, support, or thoughtful collaboration, we would be glad to hear from you.</p>
              <a href="mailto:leonardo.arias@domepath.com">leonardo.arias@domepath.com</a>
            </div>
          </section>
        </main>

        <footer>
          <a className="footer-brand" href="#top"><span className="brand-mark"><img src="/assets/domepath-mark.png" alt="" /></span><span>DomePath</span></a>
          <p>Focused software, thoughtfully made.</p>
          <p>© {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
