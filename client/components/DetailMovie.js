var React = require('react');
var Cast = require('../components/Cast')

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
                detailMovie = (<Cast castList={this.props.data}/>)
            break;
            case "more_information":
                detailMovie = (<div>
                    Year: {this.props.data.year}<br/>
                    Rating: {this.props.data.rating}<br/>
                    Movie Length: {this.props.data.runtime}<br/>
                    Genre: {this.props.data.genres}<br/>
                    Language: {this.props.data.language}<br/>
                    MPA Rating: {this.props.data.mpa_rating}
                </div>)
            break;
        }

        return (<div className={this.props.col}>
                    <h2>{this.props.title}</h2>
                    <p className="p-left">{detailMovie}</p>
                </div>);
    }
});

module.exports = DetailMovie;
