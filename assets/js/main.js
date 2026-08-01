/**
 * Edie — site behaviour.
 *
 * A single classic script loaded with `defer`, so the page also works when
 * index.html is opened straight from disk (ES modules are blocked by CORS
 * over the file:// protocol).
 *
 * The only behaviour on the site is the mobile menu. Everything else —
 * card hovers, the hero caption, focus rings — is handled in CSS.
 */
(function () {
  "use strict";

  var DESKTOP_BREAKPOINT = 768;

  function initMobileMenu() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var menu = document.querySelector("[data-menu]");

    if (!toggle || !menu) {
      return;
    }

    function isOpen() {
      return menu.dataset.open === "true";
    }

    /**
     * @param {boolean} open
     * @param {boolean} [restoreFocus] Send focus back to the toggle. Wanted
     *   when the menu is dismissed, but not when a link closes it: there the
     *   browser moves focus to the target section itself.
     */
    function setOpen(open, restoreFocus) {
      menu.dataset.open = String(open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("is-menu-open", open);

      if (!open && restoreFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(!isOpen(), true);
    });

    // Delegated: one listener covers every link in the overlay and the logo
    // in the header, which stays clickable on top of it.
    document.addEventListener("click", function (event) {
      if (isOpen() && event.target.closest("a")) {
        setOpen(false, false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false, true);
      }
    });

    // The overlay is hidden by CSS from the desktop breakpoint up, so the
    // scroll lock has to be released with it.
    window.addEventListener("resize", function () {
      if (isOpen() && window.innerWidth >= DESKTOP_BREAKPOINT) {
        setOpen(false, false);
      }
    });
  }

  initMobileMenu();
})();
