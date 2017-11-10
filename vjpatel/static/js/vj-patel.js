// vj-patel.js
jQuery(function () {
  $('table').addClass('table table-striped'); // Fix Bootstrap tables for Hugo...

  // Projects
  if (jQuery('.trello-features').length) {

    jQuery.getScript( "https://api.trello.com/1/client.js?key=4b1c19d05b3ada3ae1fbade211cbdb3b" ).done(function( script, textStatus ) {

      board_id = jQuery('.trello-features').attr('board');

      Trello.get('/boards/' + board_id + '/lists', { cards: 'open' }, function(responseJSON) {
        html = "";

        jQuery('.trello-features').html(html);
        responseJSON.forEach(function(list) {
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

            list.cards.forEach(function(card) {
              last_activity = moment(card.dateLastActivity);
              card_row = '<tr class="animated fadeIn"><td>' + card.name + '</td><td><small>'+ last_activity.fromNow() + '</small></td><td><span class="pull-right label ' + label + '">' + list.name + '</span></td></tr>';
              jQuery('.trello-features').append(card_row);
            });
          }
        });


      });
    });
  }

  // Last.fm tracks
  if (jQuery('.lastfm-track').length) {

    function updateLastFM() {
      jQuery.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=mclarenvj&api_key=5b801a66d1a34e73b6e563afc27ef06b&limit=2&format=json&callback=?", function(data) {

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
    setInterval(updateLastFM, 60*1000);
  }

  // Travis last build
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
      jQuery.each(repositories, function(i, repositoryName) {
        jQuery.getJSON("https://api.travis-ci.org/repos/" + repositoryName, function(data) {
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
    setInterval(updateBuildStatus, 120*1000);
  }

});
