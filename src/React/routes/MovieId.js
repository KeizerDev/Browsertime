var React = require('react')
var WebTorrent = require('webtorrent')
var TrailerMovieId = require('../components/TrailerMovieId')
var DetailMovie = require('../components/DetailMovie')

var MovieId = React.createClass({

    getInitialState: function() {
        return {
            movie: {
                images: [],
                hashes: []
            },
            torrentlist: [],
            isTrailer: false
        };
    },

    handleClick: function(event) {
        this.setState({isTrailer: !this.state.isTrailer});
    },

    componentDidMount: function() {
        $.get('/api/movie/' + this.props.params.id + '.json', function(result) {
            if (this.isMounted()) {
                this.setState({
                    movie: result,
                    torrentlist: result.hashes
                });
            }
        }.bind(this));
    },

    handlePlayMovieClick: function(event) {
        var client = new WebTorrent()
        console.log(this.state.movie.hashes[1])
        var magnetURI = this.state.movie.hashes[1]

        client.add(magnetURI, function (torrent) {
          // Got torrent metadata!
          console.log('Client is downloading:', torrent.infoHash)

          torrent.files.forEach(function (file) {
            // Display the file by appending it to the DOM. Supports video, audio, images, and
            // more. Specify a container element (CSS selector or reference to DOM node).
            file.appendTo('.play-container')
          })
        })
    },

    render: function() {
        var toggleTrailer = this.state.isTrailer ? <TrailerMovieId ytCode={this.state.movie.yt_trailer_code} /> : <div id="lolllll"><img src={this.state.movie.images[1]} /></div> ;

        return (<div className="container-fluid">
                    <div className="movie-cover top">
                        <div className="container">
                            <div className="row">
                            <div className="col-md-12 center play-container">
                                {toggleTrailer}
                            </div>
                                <div className="col-md-6 btn-movieid">
                                    <a className="btn-clickable" onClick={this.handlePlayMovieClick}>Play Movie</a>
                                </div>
                                <div className="col-md-6 btn-movieid">
                                    <a className="btn-clickable" onClick={this.handleClick}>Trailer</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container top-p">
                        <div className="row">
                            <DetailMovie col="col-md-8" title={this.state.movie.title} data={this.state.movie.description} typeDetail="text" />
                            <DetailMovie col="col-md-4" title="Movie Information" data={this.state.movie} typeDetail="more_information" />
                            <DetailMovie col="col-md-4" title="Cast" data={this.state.movie.cast} typeDetail="cast" />
                            <DetailMovie col="col-md-8" title="Suggested" data={this.state.movie.cast} typeDetail="related" />
                        </div>
                    </div>
                </div>);
    }
});

module.exports = MovieId;
