var React = require('react');
var Stars = require('../components/Stars')
import { Link } from 'react-router'

var MovieItem = React.createClass({

    getInitialState: function() {
        return {};
    },

    render: function() {
        return (<Link to={this.props.url} className={this.props.className} >
                    <div className="col-movie">
                        <img className="width" src={this.props.cover} />
                        <div className="information">
                            <p className="title">{this.props.title}</p>
                            <p className="rating">
                                <Stars stars={this.props.rating} totalStars="5" />
                            </p>
                        </div>
                    </div>
                </Link>);
    }
});

module.exports = MovieItem;
