var React = require('react');

var MovieQuery = React.createClass({

    getInitialState: function() {
        return {
            movies: []
        };
    },

    componentDidMount: function() {
        $.get('/api/search/' + this.props.params.query, function(result) {
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
            <div className="container-fluid movie-list">
                <div className="row">
                    {this.state.movies.map(function(object, i){
                        var divStyle = {
                          background: 'url(' + object.medium_cover_image + ') center'
                        };
                        var moviesUrl = "/movies/" + object.id;

                        return (<a className="col-lg-2 col-md-2 col-sm-3 col-xs-4 movie-card" href={moviesUrl}>
                            <img className="img-responsive" src={object.medium_cover_image} />
                            <div className="rating"><span className="label label-warning">{object.rating}</span></div>
                        </a>)
                    })}
                </div>
            </div>
		);
	}
});

module.exports = MovieQuery;
