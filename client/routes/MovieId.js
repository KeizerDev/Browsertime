var Peer = require('simple-peer')
var React = require('react')
var TrailerMovieId = require('../components/TrailerMovieId')
var DetailMovie = require('../components/DetailMovie')

var MovieId = React.createClass({

    getInitialState: function() {
        return {
            movie: [],
            torrentlist: [],
            isTrailer: false
        };
    },

    handleClick: function(event) {
        this.setState({isTrailer: !this.state.isTrailer});
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
    },

    render: function() {
        var backgroundImage = {
            background: 'url(' + this.state.movie.background_image + ') center / cover'
        };

        var toggleTrailer = this.state.isTrailer ? <TrailerMovieId ytCode={this.state.movie.yt_trailer_code} /> :  <img src={this.state.movie.medium_cover_image} /> ;

        return (<div className="container-fluid">
                    <div className="movie-cover top" style={backgroundImage}>
                        <div className="container">
                            <div className="row">
                            <div className="col-md-12 center">
                                {toggleTrailer}
                            </div>
                                <div className="col-md-6 btn-movieid">
                                    <a href="#">Play Movie</a>
                                </div>
                                <div className="col-md-6 btn-movieid">
                                    <a href="#" onClick={this.handleClick}>Trailer</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container top-p">
                        <div className="row">
                            <DetailMovie col="col-md-8" title={this.state.movie.title} data={this.state.movie.description_full} typeDetail="text" />
                            <DetailMovie col="col-md-4" title="Movie Information" data={this.state.movie} typeDetail="more_information" />
                            <DetailMovie col="col-md-4" title="Cast" data={this.state.movie.cast} typeDetail="cast" />
                            <DetailMovie col="col-md-8" title="Suggested" data={this.state.movie.cast} typeDetail="related" />
                        </div>
                    </div>
                </div>);
    }
});

module.exports = MovieId;
