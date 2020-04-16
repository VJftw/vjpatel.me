// JS Goes here - ES6 supported
require('./favicon.ico');
import "./css/main.scss";

// import dayjs from 'dayjs';
// var relativeTime = require('dayjs/plugin/relativeTime');
// dayjs.extend(relativeTime);

ready(function () {
  bulmaNav();
});

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

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

// function lastFMTracks() {
//   if (jQuery('.lastfm-track').length) {

//     function updateLastFM() {
//       jQuery.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=mclarenvj&api_key=5b801a66d1a34e73b6e563afc27ef06b&limit=2&format=json&callback=?", function (data) {

//         let last_song = data.recenttracks.track[0];

//         let scrobble_time = "Now";

//         if (last_song.hasOwnProperty('date')) {
//           scrobble_time = dayjs.unix(last_song.date.uts);
//         }

//         jQuery('.lastfm-track').html(last_song.name);
//         jQuery('.lastfm-track').parent().attr('href', "http://last.fm/user/mclarenvj");
//         jQuery('.lastfm-artist').html(last_song.artist['#text']);
//         jQuery('.lastfm-timestamp').html(scrobble_time.fromNow());
//         jQuery('.lastfm-icon').removeClass('fa-spin').removeClass('fa-refresh').addClass('fa-headphones');
//       });
//     }

//     updateLastFM();
//     setInterval(updateLastFM, 60 * 1000);
//   }
// }
