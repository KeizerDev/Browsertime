var React = require('react');

var RelatedMovie = React.createClass({

    getInitialState: function() {
        return {
            movieList: []
        };
    },

    componentWillReceiveProps: function(nextProps){
        var movieList = []
        console.log(nextProps)
        nextProps.movieList.map(function(cast, i){
            movieList.push(<a className="col-md-2 col-xs-4" href="/movies/12">
                                <div className="col-movie">
                                    <img className="width" src={cast.url_small_image} />
                                    <div className="information">
                                        <p className="title">{cast.name}</p>
                                        <p className="rating">
                                        </p>
                                    </div>
                                </div>
                            </a>)
        });
                                            // <Stars stars="5" totalStars="5" />

        this.setState({movieList: movieList});
    },

    render: function() {
        return (<div className="container-fluid">
            {this.state.movieList}
        </div>);
    }
});

module.exports = RelatedMovie;
