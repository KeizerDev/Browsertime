var React = require('react');

var TrailerMovieId = React.createClass({

    getInitialState: function() {
        return {
            trailer: []
        };
    },

       componentWillReceiveProps: function(nextProps){
        var trailer = []
        var trailerUrl = "http://www.youtube.com/embed/" + nextProps.ytCode
        console.log(nextProps)

        trailer.push(<iframe width="100%" src={trailerUrl}></iframe>)

        this.setState({trailer: trailer});
    },

    render: function() {
        var trailerUrl = "http://www.youtube.com/embed/" + this.props.ytCode + "?autoplay=1"

        return (<iframe className="yt-player" src={trailerUrl}></iframe>);
    }
});

module.exports = TrailerMovieId;
