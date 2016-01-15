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

        var client = new WebTorrent()

        var torrentId = 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d'

        client.add(torrentId, onTorrent)

        function onTorrent (torrent) {
            // var torrentFileName = path.basename(torrent.name, path.extname(torrent.name)) + '.torrent'

            // '<a class="btn btn-primary btn-xs" href="' + torrent.magnetURI + '" role="button"><i class="fa fa-magnet"></i> Magnet URI</a> ' +
            // '<a class="btn btn-primary btn-xs" href="' + torrent.torrentFileURL + '" target="_blank" download="' + torrentFileName + '" role="button"><i class="fa fa-download"></i> Download .torrent</a> ' +
            // '<a id="downloadButton" class="btn btn-primary btn-xs" role="button"><i class="fa fa-download"></i> Download ' + torrent.name + '</a>'

            function updateSpeed () {
                var progress = (100 * torrent.progress).toFixed(1)
                console.log(progress)
                // '<b>Peers:</b> ' + torrent.swarm.wires.length + ' ' +
                // '<b>Progress:</b> ' + progress + '% ' +
                // '<b>Download speed:</b> ' + prettyBytes(client.downloadSpeed()) + '/s ' +
                // '<b>Upload speed:</b> ' + prettyBytes(client.uploadSpeed()) + '/s'
                // progressBar.setAttribute('aria-valuenow', progress)
                // progressBar.setAttribute('style', 'width: ' + progress + '%')
            }

            updateSpeed()
            setInterval(updateSpeed, 500)

            torrent.files.forEach(function (file) {
                // Create a video element
                file.appendTo('#player')

                // downloadButton.addEventListener('click', function () {
                //     var download = document.getElementById('download')
                //     download.classList.remove('hidden')

                //     // Get a url for each file
                //     file.getBlobURL(function (err, url) {
                //         if (err) return util.error(err)

                //         // Hide download progress
                //         download.classList.add('hidden')

                //         // Add a link to the page
                //         var a = document.createElement('a')
                //         a.download = window.URL.createObjectURL(url)
                //         a.click()
                //         window.URL.revokeObjectURL(url)
                //     })
                // })
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
            <div className="movie-detail" style={backgroundImage}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-lg-12"><h2>{this.state.movie.title}</h2></div>
                        <div className="col-xs-4 col-lg-4"><img className="img-responsive" src={this.state.movie.large_cover_image}/></div>
                        <div className="col-xs-8 col-lg-8">
           <ul className="mdl-mini-footer__link-list">
                                <li>{this.state.movie.year}</li>
                                <li>{this.state.movie.language}</li>
                                <li><span className="label label-warning">{this.state.movie.rating}</span></li>
                            </ul>
                            {this.state.movie.summary}
                        </div>
                            <div id="player"></div>
                            <div className="turnback">
                                <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                                    <i className="material-icons up">arrow_back</i>
                                </button>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
});

module.exports = Movie;
