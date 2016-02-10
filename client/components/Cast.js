var React = require('react');

var Cast = React.createClass({

    getInitialState: function() {
        return {
            castList: []
        };
    },

    componentWillReceiveProps: function(nextProps){
        var castList = []
        console.log(nextProps)
        nextProps.castList.forEach(function(cast) {
            castList.push(<li>
                    <img src={cast.url_small_image} className="img-circle"/>
                    {cast.name} -->
                    {cast.character_name}
                </li>)
        });

        this.setState({castList: castList});
    },

    render: function() {

        return (<ul>{this.state.castList}</ul>);
    }
});

module.exports = Cast;
