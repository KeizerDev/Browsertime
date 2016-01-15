var React = require('react');

var PlayerMovieId = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        this.initTorrent()
    },

    initTorrent: function() {

        // if (!Peer.WEBRTC_SUPPORT) {
        //   util.error('Sorry, your browser is unsupported. Please try again using Chrome.')
        // }

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
        return (<div id="player" style={{width : "100%"}}></div>);
    }
});

module.exports = PlayerMovieId;
