var React = require('react');

var Movie = React.createClass({

    getInitialState: function() {
        return {
            movies: []
        };
    },

    componentDidMount: function() {
        $.get('/api/movies', function(result) {
          var movies = result['data'].movies;
          if (this.isMounted()) {
            this.setState({
              movies: movies
            });
          }
        }.bind(this));
    },

	render: function() {
        console.log(this.state.movies)
		return (
            <div className="container-fluid">
                <div className="row">
                    {this.state.movies.map(function(object, i){
                        var divStyle = {
                          background: 'url(' + object.medium_cover_image + ') center / cover'
                        };
                        var moviesUrl = "/movies/" + object.id;
                        return (<a className="col-lg-2 col-md-3 col-sm-4 col-xs-6" href={moviesUrl}>
                            <div className="movie-card-image mdl-card mdl-shadow--2dp" style={divStyle} >
                                <div className="mdl-card__title mdl-card--expand"></div>
                                <div className="mdl-card__actions">
                                    <span className="movie-card-image__filename">{object.title}</span>
                                </div>
                            </div>
                        </a>)
                    })}
                </div>
            </div>
		);
	}
});

module.exports = Movie;
