var React = require('react');
var Stars = require('../components/Stars')
var MovieItem = require('../components/MovieItem')

var RelatedMovie = React.createClass({

    getInitialState: function() {
        return {
            movieList: []
        };
    },

    componentWillReceiveProps: function(nextProps){
        var movieList = []

        nextProps.movieList.map(function(movie, i){
            movieList.push(<MovieItem className="col-md-3 col-xs-6 no-padding" cover={movie.cover} title={movie.title} rating={movie.rating} url="/movie/sintel" />)
        });

        this.setState({movieList: movieList});
    },

    render: function() {
        return (<div className="container-fluid">
            {this.state.movieList}
        </div>);
    }
});

module.exports = RelatedMovie;
