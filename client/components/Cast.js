var React = require('react');

var Cast = React.createClass({

    getInitialState: function() {
        return {
            castList: []
        };
    },

    componentWillReceiveProps: function(props){
        var castList = []

        if (props.castList) {
            props.castList.forEach(function(cast) {
                castList.push(<li>
                        <img src={cast.url_small_image} className="img-circle"/>
                        <a href="http://www.imdb.com/name/nm">{cast.name}</a> as {cast.character_name}
                    </li>)
            });
        }

        this.setState({castList: castList});
    },

    render: function() {

        return (<ul>{this.state.castList}</ul>);
    }
});

module.exports = Cast;
