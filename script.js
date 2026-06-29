(function () {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const shotImage = document.querySelector("[data-shot-image]");
  const shotCaption = document.querySelector("[data-shot-caption]");
  const shotTabs = document.querySelectorAll("[data-shot]");

  shotTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const source = tab.getAttribute("data-shot");
      const caption = tab.getAttribute("data-caption") || "";

      if (source && shotImage instanceof HTMLImageElement) {
        shotImage.src = source;
      }

      if (shotCaption) {
        shotCaption.textContent = caption;
      }

      shotTabs.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
    });
  });

  const copyButtons = document.querySelectorAll("[data-copy]");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const selector = button.getAttribute("data-copy");
      const target = selector ? document.querySelector(selector) : null;
      const text = target ? target.textContent || "" : "";

      if (!text) {
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        const original = button.textContent;
        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = original;
        }, 1400);
      } catch {
        button.textContent = "Select";
      }
    });
  });
})();
