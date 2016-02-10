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

        return (<div><div className="movie-cover top" style={backgroundImage}>
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12 center">
                            <img src={this.state.movie.medium_cover_image} />
                        </div>
                            <div className="col-md-6">
                                <a href="#">Play Movie</a>
                            </div>
                            <div className="col-md-6">
                                <a href="#">Trailer</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container top-p">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>About {this.state.movie.title}</h2>
                            <p className="p-left">{this.state.movie.description_full}</p>
                        </div>
                        <div className="col-md-6">
                            <h3>Movie Information</h3>
                            <p className="p-left">
                                Year: {this.state.movie.year}<br/>
                                Rating: {this.state.movie.rating}<br/>
                                Movie Length: {this.state.movie.runtime}<br/>
                                Genre: {this.state.movie.genres}<br/>
                                Language: {this.state.movie.language}<br/>
                                MPA Rating: {this.state.movie.mpa_rating}

                            </p>
                        </div>
                        <div className="col-md-6">
                            <h3>Cast</h3>
                            <p className="p-left"></p>
                        </div>
                    </div>
                </div>
                </div>);
    }
});

module.exports = MovieId;
