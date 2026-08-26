import { useEffect, useRef, useState } from "react";

const apps = [
  { src: "/assets/her2-icon-transparent-v3.png", normalizedSrc: "/assets/her2-icon-normalized-v1.png", label: "A focused health tool in development" },
  { src: "/assets/domory-icon-v3.png", normalizedSrc: "/assets/domory-icon-normalized-v1.png", label: "A memory and thinking app in development" },
  { src: "/assets/cps-icon-layer.png", normalizedSrc: "/assets/cps-icon-normalized-v1.png", label: "A focused health tool in development" },
  { src: "/assets/coorder-icon-v2.png", normalizedSrc: "/assets/coorder-icon-normalized-v1.png", label: "Coorder, a focused work tool", href: "https://coorder.domepath.com/" },
];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const video = videoRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateScroll = () => {
      frame = 0;
      const heroProgress = Math.min(Math.max(window.scrollY / Math.max(window.innerHeight, 1), 0), 1);
      const main = document.querySelector("main");
      const mainTop = main ? main.getBoundingClientRect().top + window.scrollY : 0;
      const mainRange = Math.max((main?.offsetHeight ?? window.innerHeight) - window.innerHeight, 1);
      const filmProgress = Math.min(Math.max((window.scrollY - mainTop) / mainRange, 0), 1);
      document.documentElement.style.setProperty("--hero-progress", heroProgress.toFixed(4));
      document.documentElement.style.setProperty("--film-progress", filmProgress.toFixed(4));
      setScrolled(window.scrollY > 32);

      if (video?.duration && Number.isFinite(video.duration)) {
        const targetTime = reducedMotion.matches
          ? video.duration * 0.72
          : Math.min(video.duration - 0.02, video.duration * filmProgress);

        if (Math.abs(video.currentTime - targetTime) > 0.016) video.currentTime = targetTime;
      }
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
    video?.addEventListener("loadedmetadata", updateScroll);
    reducedMotion.addEventListener("change", updateScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      video?.removeEventListener("loadedmetadata", updateScroll);
      reducedMotion.removeEventListener("change", updateScroll);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="page-stage">
      <div className="site-frame">
        <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
          <a className="brand" href="#top" aria-label="DomePath home" onClick={closeMenu}>
            <span className="brand-mark"><img src="/assets/domepath-mark-blue.png" alt="" /></span>
            <span>DomePath</span>
          </a>

          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((value) => !value)}>
            <span /><span />
            <span className="sr-only">Toggle navigation</span>
          </button>

          <nav id="primary-navigation" className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
            <a href="#about" onClick={closeMenu}>Studio</a>
            <a href="#apps" onClick={closeMenu}>Apps</a>
            <a className="nav-contact" href="#contact" onClick={closeMenu}>Get in touch</a>
          </nav>
        </header>

        <main>
          <div className="page-video" aria-hidden="true">
            <div className="page-video__sticky">
              <div className="page-video__hero-art">
                <img src="/assets/domepath-hero-sea-path-v1.webp" alt="" fetchPriority="high" />
              </div>
              <video ref={videoRef} muted playsInline preload="auto" poster="/assets/domepath-scroll-poster.webp" tabIndex={-1}>
                <source src="/assets/domepath-scroll.webm" type="video/webm" />
                <source src="/assets/domepath-scroll.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="cinematic-flow">
            <section className="hero-cinematic" id="top">
              <div className="hero-shade" aria-hidden="true" />

              <p className="hero-side hero-side--left">Focused software, thoughtfully made</p>
              <p className="hero-side hero-side--right">Independent app studio</p>

              <div className="hero-title" aria-label="Clearer Paths">
                <span>Clearer</span>
                <span>Paths</span>
              </div>

              <div className="hero-app-row" aria-label="DomePath applications">
                {apps.map((app, index) => app.href ? (
                  <a className={`hero-app hero-app--${index + 1}`} href={app.href} aria-label="Visit Coorder" key={app.src}>
                    <img src={app.src} alt={app.label} />
                  </a>
                ) : (
                  <div className={`hero-app hero-app--${index + 1}`} key={app.src}>
                    <img src={app.src} alt={app.label} />
                  </div>
                ))}
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
              {apps.map((app, index) => (
                <article className={`app-object app-object--${index + 1}`} key={`showcase-${app.src}`}>
                  {app.href ? (
                    <a className="app-object__link" href={app.href} aria-label="Visit Coorder">
                      <div className="app-object__frame">
                        <img src={app.normalizedSrc} alt={app.label} />
                      </div>
                    </a>
                  ) : (
                    <div className="app-object__frame">
                      <img src={app.normalizedSrc} alt={app.label} />
                    </div>
                  )}
                  <p><span>0{index + 1}</span> In development</p>
                </article>
              ))}
            </div>
          </section>

          <section className="closing" id="contact">
            <div className="closing-shade" aria-hidden="true" />
            <div className="closing-content" data-reveal>
              <div className="closing-brand"><span className="brand-mark"><img src="/assets/domepath-mark-blue.png" alt="" /></span> DomePath</div>
              <h2>Something worth<br />making clearer?</h2>
              <p>For product questions, support, or thoughtful collaboration, we would be glad to hear from you.</p>
              <a href="mailto:leonardo.arias@domepath.com">leonardo.arias@domepath.com</a>
            </div>
          </section>
        </main>

        <footer>
          <div className="footer-identity">
            <a className="footer-brand" href="#top"><span className="brand-mark"><img src="/assets/domepath-mark-blue.png" alt="" /></span><span>DomePath</span></a>
            <p>Independent app studio creating focused software for work, health, and everyday thinking.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#about">Studio</a>
            <a href="#apps">Apps</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-meta">
            <a href="mailto:leonardo.arias@domepath.com">leonardo.arias@domepath.com</a>
            <p>© {new Date().getFullYear()} DomePath</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
