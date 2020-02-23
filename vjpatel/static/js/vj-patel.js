// vj-patel.js
jQuery(function () {
  googleAnalytics()

  $('table').addClass('table table-striped'); // Fix Bootstrap tables for Hugo...

  projectsTrelloFeatures()
  lastFMTracks()
  travisLastBuild()
});

loadStyle();

function toggleStyle() {
  let links = document.getElementsByTagName("link")
  let oldStyleLink = links.item(links.length - 1);

  let currentStyle = sessionStorage.getItem("sessionStyle")
  if (currentStyle == "main.css") {
    sessionStorage.setItem("sessionStyle", "dark.css")
  } else {
    sessionStorage.setItem("sessionStyle", "main.css")
  }
  let head = document.getElementsByTagName("head").item(0);
  head.removeChild(oldStyleLink);

  loadStyle()
}

function loadStyle() {
  let sessionStyle = sessionStorage.getItem("sessionStyle")
  if (sessionStyle == null) {
    sessionStorage.setItem("sessionStyle", "main.css")
    loadStyle()
  }

  var newlink = document.createElement("link");
  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("type", "text/css");
  newlink.setAttribute("href", "/css/" + sessionStyle);
  document.getElementsByTagName("head").item(0).appendChild(newlink);
}

function googleAnalytics() {
  // Google analytics
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
      m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-97913793-1', 'auto');
  ga('send', 'pageview');

}

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
              last_activity = moment(card.dateLastActivity);
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

        last_song = data.recenttracks.track[0];

        if (last_song.hasOwnProperty('date')) {
          scrobble_time = moment.unix(last_song.date.uts).fromNow();
        } else {
          scrobble_time = "Now";
        }

        jQuery('.lastfm-track').html(last_song.name);
        jQuery('.lastfm-track').parent().attr('href', "http://last.fm/user/mclarenvj");
        jQuery('.lastfm-artist').html(last_song.artist['#text']);
        jQuery('.lastfm-timestamp').html(scrobble_time);
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
        if (latestJob.last_build_finished_at) {
          last_build_time = moment(latestJob.last_build_finished_at).fromNow();
        } else {
          last_build_time = moment(latestJob.last_build_started_at).fromNow();
        }

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
          default:
            label_status = 'danger';
            icon_status = 'cross';
          // text = "Build Failed";
        }

        jQuery('.travis-repo').html(latestJob.slug + " #" + latestJob.last_build_number);
        jQuery('.travis-repo').parent().attr('href', "https://travis-ci.org/" + latestJob.slug + "/builds/" + latestJob.last_build_id);
        jQuery('.travis-timestamp').html(last_build_time);
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
