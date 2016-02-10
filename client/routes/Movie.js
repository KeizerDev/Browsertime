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
            <div className="container top">
                <div className="row">
                    {this.state.movies.map(function(object, i){
                        var divStyle = {
                          background: 'url(' + object.medium_cover_image + ') center'
                        };
                        var moviesUrl = "/movies/" + object.id;
                        return (<a className="col-md-2 col-xs-3" href={moviesUrl}>
 
                                <img className="width" src={object.medium_cover_image} />
                                <div className="information">
                                    <p className="title">The Hobbit: The Battle of the Five Armies</p>
                                    <p className="rating">
                                        <i className="fa fa-star active"></i><i className="fa fa-star active"></i><i className="fa fa-star active"></i><i className="fa fa-starr"></i><i className="fa fa-star"></i> 
                                    </p>
                                </div>
                        </a>)
                    })}
                </div>
            </div>
		);
	}
});

module.exports = Movie;
