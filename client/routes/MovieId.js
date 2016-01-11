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
          var movie = result['data'];

          if (this.isMounted()) {
            this.setState({
                movie: movie
            });
          }
        }.bind(this));
    },

	render: function() {
        console.log(this.state.movies)
        var backgroundImage = {
            background: 'url(' + this.state.movie.background_image + ') center / cover'
        };

        var isSupported;
        if (WebTorrent.WEBRTC_SUPPORT) {
            isSupported = (<div>Yes</div>)
        } else {
            isSupported = (<div>No</div>)
        }

        var client = new WebTorrent()
        if (this.state.torrentlist[0] != undefined) {
            var magnetURI = this.state.torrentlist[0].url

            client.add(magnetURI, function (torrent) {
              // Got torrent metadata!
              console.log('Client is downloading:', torrent.infoHash)

              torrent.files.forEach(function (file) {
                // Display the file by appending it to the DOM. Supports video, audio, images, and
                // more. Specify a container element (CSS selector or reference to DOM node).
                file.appendTo('body')
              })
            })
        }

		return (
            <div className="container">
                <div className="row">
                    <div className="container mdl-card mdl-shadow--2dp" style={this.backgroundImage}>
                        <h2>{this.state.movie.title}</h2>
                        <div className="">
                            {isSupported}
                        </div>
                    </div>
                </div>
            </div>
		);
	}
});

module.exports = Movie;
