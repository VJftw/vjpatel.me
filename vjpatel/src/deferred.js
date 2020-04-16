// Font Awesome 5
import { library, dom } from "@fortawesome/fontawesome-svg-core";

import {
  faCheck,
  faMapMarker,
  faLock,
  faCogs,
  faCloud,
  faMusic,
  faRocket,
  faTv,
  faEnvelope,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import {
  faGithub,
  faLinkedin,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

function fontAwesome5() {
  // brands
  library.add(
    faGithub,
    faLinkedin,
    faTwitter,
  );
  // solids
  library.add(
    faCheck,
    faMapMarker,
    faLock,
    faCogs,
    faCloud,
    faMusic,
    faRocket,
    faTv,
    faEnvelope,
    faGlobe,
  );
  dom.watch();
}
fontAwesome5();


// Turbolinks
var Turbolinks = require("turbolinks");
Turbolinks.start();
Turbolinks.setProgressBarDelay(1);

document.addEventListener("turbolinks:load", function () {
  bulmaNav();
  fontAwesome5();
});

function bulmaNav() {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
}
