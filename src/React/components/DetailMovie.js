var React = require('react');
var Stars = require('../components/Stars')
var Cast = require('../components/Cast')
var RelatedMovie = require('../components/RelatedMovie')

var DetailMovie = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
    },

    render: function() {
        var detailMovie = ""
        var movieList = [
            {
                title: "The Last Stand",
                rating: "5.9",
                cover: "http://www.gstatic.com/tv/thumb/movieposters/9337470/p9337470_p_v8_ac.jpg"
            },
            {
                title: "Batman Returns",
                rating: "9.3",
                cover: "http://www.gstatic.com/tv/thumb/iconics/12631/p12631_i_v8_aa.jpg"
            },
            {
                title: "The Revenant",
                rating: "8.6",
                cover: "http://static.rogerebert.com/uploads/movie/movie_poster/the-revenant-2015/large_large_oXUWEc5i3wYyFnL1Ycu8ppxxPvs.jpg"
            },
            {
                title: "The Revenant",
                rating: "8.6",
                cover: "http://static.rogerebert.com/uploads/movie/movie_poster/the-revenant-2015/large_large_oXUWEc5i3wYyFnL1Ycu8ppxxPvs.jpg"
            }
        ]


        switch(this.props.typeDetail) {
            case "text":
                detailMovie = this.props.data
            break;
            case "cast":
                detailMovie = <Cast castList={this.props.data} />
            break;
            case "more_information":
                detailMovie = <div>
                                <ul>
                                    <li><Stars stars={this.props.data.rating} totalStars="5" /></li>
                                    <li><b>Release Year:</b> {this.props.data.year}</li>
                                    <li>{this.props.data.duration} <b>Minutes</b></li>
                                    <li><b>Genre:</b> {this.props.data.genres}</li>
                                    <li><b>Language:</b> {this.props.data.language}</li>
                                    <li><b>MPA Rating:</b> {this.props.data.mpa_rating}</li>
                                </ul>
                        </div>
            break;
            case "related":
                detailMovie = <RelatedMovie movieList={movieList} />
            break;
        }

        return (<div className={this.props.col}>
                    <h2>{this.props.title}</h2>
                    <div className="p-left">
                        {detailMovie}
                    </div>
                </div>);
    }
});

module.exports = DetailMovie;
