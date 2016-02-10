var React = require('react');

var Stars = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
    },

    render: function() {
        var stars = [],
            rate = 0,
            rating = Math.round(this.props.stars) / 2

        for (var i = 0; i < this.props.totalStars; i++) {
            rate = i + 1;

            if (rate <= rating) {
                stars.push(<i className="fa fa-star active"></i>)
            } else if ((rate - 0.5) == rating) {
                stars.push(<i className="fa fa-star-half-o active"></i>)
            } else {
                stars.push(<i className="fa fa-star-o"></i>)
            }
        }

        return (<div>
            {stars}
        </div>);
    }
});

module.exports = Stars;
