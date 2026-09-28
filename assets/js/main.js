(() => {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

  /* ---------- Theme toggle ---------- */
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.dataset.theme || (prefersDark.matches ? "dark" : "light");

  const syncThemeToggle = () => {
    if (!themeToggle) return;
    const next = currentTheme() === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${next} theme`);
    themeToggle.title = `Switch to ${next} theme`;
  };

  themeToggle?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* Storage can be unavailable (private mode); the toggle still works for this visit. */
    }
    syncThemeToggle();
  });

  prefersDark.addEventListener?.("change", syncThemeToggle);
  syncThemeToggle();

  /* ---------- Header border once the page scrolls ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Highlight the nav link for the section in view ---------- */
  const navLinks = [...document.querySelectorAll(".nav a[href^='#']")];
  const sections = [...document.querySelectorAll("main section[id]")];

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => spy.observe(section));
  }

  /* ---------- Reveal content as it scrolls into view ---------- */
  const revealables = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealables.forEach((el) => revealer.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Copy email to clipboard ---------- */
  document.querySelectorAll("[data-copy]").forEach((button) => {
    const label = button.querySelector("[data-copy-label]");
    const originalText = label ? label.textContent : "";
    let resetTimer;

    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
      } catch (e) {
        // Clipboard access can be blocked; fall back to opening the mail client.
        window.location.href = `mailto:${value}`;
        return;
      }
      button.classList.add("is-copied");
      if (label) label.textContent = "Copied!";
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        button.classList.remove("is-copied");
        if (label) label.textContent = originalText;
      }, 2000);
    });
  });

  /* ---------- Keep the footer year current ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
