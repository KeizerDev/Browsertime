var Peer = require('simple-peer')
var React = require('react')
var PlayerMovieId = require('../components/PlayerMovieId')
var DescriptionMovieId = require('../components/DescriptionMovieId')

var MovieId = React.createClass({

    getInitialState: function() {
        return {
            isDescription: true,
            movie: [],
            torrentlist: []
        };
    },

    handleClick: function(event) {
        this.setState({isDescription: !this.state.isDescription});
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
        // this.initTorrent()
    },

    render: function() {
        console.log(this.state)
        var backgroundImage = {
            background: 'url(' + this.state.movie.background_image + ') center / cover'
        };

        var toggleShow = this.state.isDescription ? <DescriptionMovieId movie={this.state.movie}/> : <PlayerMovieId />;
        // var isSupported;
        // if (WebTorrent.WEBRTC_SUPPORT) {
        //     isSupported = (<div>Yes</div>)
        // } else {
        //     isSupported = (<div>No</div>)
        // }

        return (<div className="movie-visual">
                    <div className="movie-information" style={backgroundImage}>
                        <div className="shadow"></div>
                        <div className="container">
                            <div className="movie-play-button">
                                <i className="material-icons">play_arrow</i>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="movie-title">
                                        {this.state.movie.title}
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="movie-releasedate">
                                        Release Date:{this.state.movie.rating}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
});

module.exports = MovieId;
