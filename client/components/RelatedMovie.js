var React = require('react');
var Stars = require('../components/Stars')

var RelatedMovie = React.createClass({

    getInitialState: function() {
        return {
            movieList: []
        };
    },

    componentWillReceiveProps: function(nextProps){
        var movieList = []

        nextProps.movieList.map(function(movie, i){
            movieList.push(<a className="col-md-3 col-xs-6 no-padding" href="/movies/12">
                                <div className="col-movie">
                                    <img className="width" src={movie.cover} />
                                    <div className="information">
                                        <p className="title">{movie.title}</p>
                                        <p className="rating">
                                            <Stars stars={movie.rating} totalStars="5" />
                                        </p>
                                    </div>
                                </div>
                            </a>)
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
