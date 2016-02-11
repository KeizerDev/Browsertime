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
                            Rating: <Stars stars={this.props.data.rating} totalStars="5" /><br/>
                            Year: {this.props.data.year}<br/>
                            Movie Length: {this.props.data.runtime}<br/>
                            Genre: {this.props.data.genres}<br/>
                            Language: {this.props.data.language}<br/>
                            MPA Rating: {this.props.data.mpa_rating}
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
