// JS Goes here - ES6 supported
require('./favicon.ico');
import "./css/main.scss";
import "font-awesome-loader";

import "bootstrap";

import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

var Turbolinks = require("turbolinks");
Turbolinks.start();
Turbolinks.setProgressBarDelay(1);

import jQuery from 'jquery/src/core';
// import 'jquery/src/selector';
// import 'jquery/src/traversing';
// import 'jquery/src/callbacks';
// import 'jquery/src/deferred';
// import 'jquery/src/deferred/exceptionHook';
// import 'jquery/src/core/ready';
// import 'jquery/src/data';
// import 'jquery/src/queue';
// import 'jquery/src/queue/delay';
import 'jquery/src/attributes';
// import 'jquery/src/event';
// import 'jquery/src/event/focusin';
// import 'jquery/src/manipulation';
// import 'jquery/src/manipulation/_evalUrl';
// import 'jquery/src/wrap';
// import 'jquery/src/css';
// import 'jquery/src/css/hiddenVisibleSelectors';
// import 'jquery/src/serialize';
import 'jquery/src/ajax';
import 'jquery/src/ajax/xhr';
import 'jquery/src/ajax/script';
import 'jquery/src/ajax/jsonp';
import 'jquery/src/ajax/load';
// import 'jquery/src/event/ajax';
// import 'jquery/src/effects';
// import 'jquery/src/effects/animatedSelector';
// import 'jquery/src/offset';
// import 'jquery/src/dimensions';
// import 'jquery/src/deprecated';
// import 'jquery/src/exports/amd';
// import 'jquery/src/exports/global';


jQuery(function () {
  // googleAnalytics();

  jQuery('table').addClass('table table-striped'); // Fix Bootstrap tables for Hugo...

  projectsTrelloFeatures();
  lastFMTracks();
  travisLastBuild();
});

// function googleAnalytics() {
//   // Google analytics
//   (function (i, s, o, g, r, a, m) {
//     i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
//       (i[r].q = i[r].q || []).push(arguments)
//     }, i[r].l = 1 * new Date(); a = s.createElement(o),
//       m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
//   })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

//   ga('create', 'UA-97913793-1', 'auto');
//   ga('send', 'pageview');

// }


function projectsTrelloFeatures() {
  if (jQuery('.trello-features').length) {

    jQuery.getScript("https://api.trello.com/1/client.js?key=4b1c19d05b3ada3ae1fbade211cbdb3b").done(function (script, textStatus) {

      board_id = jQuery('.trello-features').attr('board');

      Trello.get('/boards/' + board_id + '/lists', { cards: 'open' }, function (responseJSON) {
        html = "";

        jQuery('.trello-features').html(html);
        responseJSON.forEach(function (list) {
          if (list.name != 'preBacklog') {

            switch (list.name) {
              case 'Deployed':
                label = 'badge-success';
                break;
              case 'Implement':
                label = 'badge-primary';
                break;
              case 'Backlog':
                label = 'badge-info';
                break;
              case 'Specify':
                label = 'badge-warning';
                break;
              default:
                label = 'badge-default';
            }

            list.cards.forEach(function (card) {
              // last_activity = moment(card.dateLastActivity);
              last_activity = dayjs(card.dateLastActivity);
              card_row = '<tr class="animated fadeIn"><td>' + card.name + '</td><td><small>' + last_activity.fromNow() + '</small></td><td><span class="pull-right badge ' + label + '">' + list.name + '</span></td></tr>';
              jQuery('.trello-features').append(card_row);
            });
          }
        });


      });
    });
  }
}

function lastFMTracks() {
  if (jQuery('.lastfm-track').length) {

    function updateLastFM() {
      jQuery.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=mclarenvj&api_key=5b801a66d1a34e73b6e563afc27ef06b&limit=2&format=json&callback=?", function (data) {

        let last_song = data.recenttracks.track[0];

        let scrobble_time = "Now";

        if (last_song.hasOwnProperty('date')) {
          scrobble_time = dayjs.unix(last_song.date.uts);
        }

        jQuery('.lastfm-track').html(last_song.name);
        jQuery('.lastfm-track').parent().attr('href', "http://last.fm/user/mclarenvj");
        jQuery('.lastfm-artist').html(last_song.artist['#text']);
        jQuery('.lastfm-timestamp').html(scrobble_time.fromNow());
        jQuery('.lastfm-icon').removeClass('fa-spin').removeClass('fa-refresh').addClass('fa-headphones');
      });
    }

    updateLastFM();
    setInterval(updateLastFM, 60 * 1000);
  }
}

function travisLastBuild() {
  if (jQuery('.travis-repo').length) {
    function setLastBuild(latestJob) {
      if (latestJob) {
        // let last_build_time = moment(latestJob.last_build_started_at).fromNow();
        let last_build_time = dayjs(latestJob.last_build_started_at);
        if (latestJob.last_build_finished_at) {
          // last_build_time = moment(latestJob.last_build_finished_at).fromNow();
          last_build_time = dayjs(latestJob.last_build_finished_at);
        }

        let label_status = 'danger';
        let icon_status = 'cross';
        // let text = 'Build Failed';

        switch (latestJob.last_build_result) {
          case 0:
            label_status = 'success';
            // text = "Build Success";
            icon_status = 'check';
            break;
          case null:
            label_status = 'info';
            // text = "Building";
            icon_status = 'refresh';
            break;
        }

        jQuery('.travis-repo').html(latestJob.slug + " #" + latestJob.last_build_number);
        jQuery('.travis-repo').parent().attr('href', "https://travis-ci.org/" + latestJob.slug + "/builds/" + latestJob.last_build_id);
        jQuery('.travis-timestamp').html(last_build_time.fromNow());
        jQuery('.travis-status').addClass('badge-' + label_status);
        jQuery('.travis-status-icon').addClass('fa-' + icon_status);
        jQuery('.travis-icon').removeClass('fa-spin').removeClass('fa-refresh');
      }
    }

    // Get list of jobs
    function updateBuildStatus() {
      var repositories = [
        "MonarchsofCoding/chitchat",
        "VJftw/vjpatel.me",
        "VJftw/invoke-tools"
      ];

      var latestJob;
      jQuery.each(repositories, function (i, repositoryName) {
        jQuery.getJSON("https://api.travis-ci.org/repos/" + repositoryName, function (data) {
          if (!latestJob) {
            latestJob = data;
          } else if ((!data.last_build_finished_at && data.last_build_started_at) && (latestJob.last_build_finished_at)) {
            // If job is in progress and current latestJob is not in progress.
            latestJob = data;
          } else if (latestJob.last_build_finished_at < data.last_build_finished_at) {
            latestJob = data;
          }
          setLastBuild(latestJob);
        });
      });
    }
    updateBuildStatus();
    setInterval(updateBuildStatus, 120 * 1000);
  }
}
