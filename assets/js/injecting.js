  async function includeHTML() {
    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
      const file = el.getAttribute('data-include');
      try {
        const res = await fetch(file);
        if (res.ok) {
          el.innerHTML = await res.text();
           initDropdown(); 
           highlightActiveNav();
        } else {
          el.innerHTML = "Error loading " + file;
        }
      } catch (e) {
        el.innerHTML = "Error loading " + file;
      }
    }
  }
  document.addEventListener("DOMContentLoaded", includeHTML, initDropdown, highlightActiveNav);

   function initDropdown() {
    const btn = document.getElementById("productBtn");
    const menu = document.getElementById("dropdownMenu");

    if (!btn || !menu) return;

    let isOpen = false;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      isOpen = !isOpen;
      if (isOpen) {
        menu.classList.remove("opacity-0", "scale-95", "pointer-events-none");
        menu.classList.add("opacity-100", "scale-100", "pointer-events-auto");
      } else {
        menu.classList.add("opacity-0", "scale-95", "pointer-events-none");
        menu.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
      }
    });

    window.addEventListener("click", (e) => {
      if (isOpen && !btn.contains(e.target) && !menu.contains(e.target)) {
        isOpen = false;
        menu.classList.add("opacity-0", "scale-95", "pointer-events-none");
        menu.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
      }
    });
  }

  function highlightActiveNav() {
    const currentPath = window.location.pathname.replace(/^\.\//, '').replace(/\/$/, '');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      let href = link.getAttribute('href');

      href = href.replace(/^\.\//, '').replace(/^\//, '').replace(/\/$/, '');
      const normalizedPath = currentPath.replace(/^\//, '').replace(/\/$/, '');

      if (normalizedPath === href) {
        link.classList.add(
          'border-b-2', 'border-white', 'text-white', 'font-semibold'
        );
      } else {
        link.classList.remove(
          'border-b-2', 'border-white', 'font-semibold'
        );
      }
    });
  }




  