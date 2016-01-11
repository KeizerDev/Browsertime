var Peer = require('simple-peer')
var React = require('react');

var Movie = React.createClass({

    getInitialState: function() {
        return {
            movie: [],
            torrentlist: []
        };
    },

    componentDidMount: function() {
        $.get('/api/movie/' + this.props.params.id, function(result) {
          var movie = result['data'].movie;

          if (this.isMounted()) {
            this.setState({
                movie: movie,
                torrentlist: movie.torrents
            });
          }
        }.bind(this));
        this.initTorrent()
    },

    initTorrent: function() {

        if (!Peer.WEBRTC_SUPPORT) {
          util.error('Sorry, your browser is unsupported. Please try again using Chrome.')
        }

        var client = new WebTorrent({rtcConfig: {"iceServers":[{"url":"stun:23.21.150.121","urls":"stun:23.21.150.121"},{"url":"turn:global.turn.twilio.com:3478?transport=udp","username":"0cb69480d0bd84c43f34da4e34bfff438fb8be84bec427c4bcfd2f7ba377bc41","credential":"mME7ogmF5Jrzr1A7qhhoL04lURLyn7CXDd1HD39vT5U=","urls":"turn:global.turn.twilio.com:3478?transport=udp"}]}})
        var magnetURI = "magnet:?xt=urn:btih:81BC3C5E2F9CE3F748B521F456C3504BF785D663&dn=the+throwaways+2015+dvdrip+xvid+etrg&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce";   

        client.add(magnetURI, onTorrent)

        function onTorrent (torrent) {
            var torrentFileName = path.basename(torrent.name, path.extname(torrent.name)) + '.torrent'

            util.log(
                '<a class="btn btn-primary btn-xs" href="' + torrent.magnetURI + '" role="button"><i class="fa fa-magnet"></i> Magnet URI</a> ' +
                '<a class="btn btn-primary btn-xs" href="' + torrent.torrentFileURL + '" target="_blank" download="' + torrentFileName + '" role="button"><i class="fa fa-download"></i> Download .torrent</a> ' +
                '<a id="downloadButton" class="btn btn-primary btn-xs" role="button"><i class="fa fa-download"></i> Download ' + torrent.name + '</a>'
            )

            function updateSpeed () {
                var progress = (100 * torrent.progress).toFixed(1)
                util.updateSpeed(
                '<b>Peers:</b> ' + torrent.swarm.wires.length + ' ' +
                '<b>Progress:</b> ' + progress + '% ' +
                '<b>Download speed:</b> ' + prettyBytes(client.downloadSpeed()) + '/s ' +
                '<b>Upload speed:</b> ' + prettyBytes(client.uploadSpeed()) + '/s'
                )
                progressBar.setAttribute('aria-valuenow', progress)
                progressBar.setAttribute('style', 'width: ' + progress + '%')
            }

            updateSpeed()
            setInterval(updateSpeed, 500)

            torrent.files.forEach(function (file) {
                // Create a video element
                file.appendTo('#player')

                downloadButton.addEventListener('click', function () {
                    var download = document.getElementById('download')
                    download.classList.remove('hidden')

                    // Get a url for each file
                    file.getBlobURL(function (err, url) {
                        if (err) return util.error(err)

                        // Hide download progress
                        download.classList.add('hidden')

                        // Add a link to the page
                        var a = document.createElement('a')
                        a.download = window.URL.createObjectURL(url)
                        a.click()
                        window.URL.revokeObjectURL(url)
                    })
                })
            })
        }
    },

	render: function() {
        console.log(this.state)
        var backgroundImage = {
            background: 'url(' + this.state.movie.background_image + ') center / cover'
        };

        var isSupported;
        if (WebTorrent.WEBRTC_SUPPORT) {
            isSupported = (<div>Yes</div>)
        } else {
            isSupported = (<div>No</div>)
        }

		return (
            <div className="container-fluid"  style={backgroundImage}>
                <div className="row">
                    <div className="container">
                        <div className="col-sm-5 col-md-4 col-lg-5"><img src={this.state.movie.large_cover_image}/></div>
                        <div className="col-sm-9 col-md-8 col-lg-7">
                            <h2>{this.state.movie.title}</h2>
                            <ul className="mdl-mini-footer__link-list">
                                <li>{this.state.movie.year}</li>
                                <li>{this.state.movie.language}</li>
                                <li>{this.state.movie.rating}</li>
                            </ul>
                            <p>{this.state.movie.summary}</p>
                            <div id="player"></div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
});

module.exports = Movie;
