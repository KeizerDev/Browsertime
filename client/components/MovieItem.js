var React = require('react');
var Stars = require('../components/Stars')

var MovieItem = React.createClass({

    getInitialState: function() {
        return {};
    },

    render: function() {
        return (<a className={this.props.className} href={this.props.url}>
                    <div className="col-movie">
                        <img className="width" src={this.props.cover} />
                        <div className="information">
                            <p className="title">{this.props.title}</p>
                            <p className="rating">
                                <Stars stars={this.props.rating} totalStars="5" />
                            </p>
                        </div>
                    </div>
                </a>);
    }
});

module.exports = MovieItem;
