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

        switch(this.props.typeDetail) {
            case "text":
                detailMovie = this.props.data
            break;
            case "cast":
                detailMovie = <Cast castList={this.props.data}/>
            break;
            case "more_information":
                detailMovie = <div>
                                <ul>
                                    <li><Stars stars={this.props.data.rating} totalStars="5" /></li>
                                    <li><b>Release Year:</b> {this.props.data.year}</li>
                                    <li>{this.props.data.runtime} <b>Minutes</b></li>
                                    <li><b>Genre:</b> {this.props.data.genres}</li>
                                    <li><b>Language:</b> {this.props.data.language}</li>
                                    <li><b>MPA Rating:</b> {this.props.data.mpa_rating}</li>
                                </ul>
                        </div>
            break;
            case "related":
                detailMovie = <RelatedMovie movieList={this.props.data} />
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
