var React = require('react');

var Stars = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
    },

    render: function() {
        var num = Math.round(this.props.count * 2) / 2
        var stars = []
        for (var i = 0; i < 5; i++) {
            if ((i * 2) <= num) {
                stars.push(<i className="fa fa-star active"></i>)
            } else if ((i * 2)-1 == num) {
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
