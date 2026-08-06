// Beyond Burnups: small progressive-enhancement script.
// Only job: toggle the mobile nav. No frameworks, no build step.
document.addEventListener("DOMContentLoaded", function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    var isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close the mobile menu after a link is chosen.
  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});
