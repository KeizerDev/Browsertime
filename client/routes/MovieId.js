var Peer = require('simple-peer')
var React = require('react')
var PlayerMovieId = require('../components/PlayerMovieId')
var DescriptionMovieId = require('../components/DescriptionMovieId')

var MovieId = React.createClass({

    getInitialState: function() {
        return {
            isDescription: true,
            movie: [],
            torrentlist: []
        };
    },

    handleClick: function(event) {
        this.setState({isDescription: !this.state.isDescription});
    },

    componentDidMount: function() {
        $.get('/api/movie/' + this.props.params.id, function(result) {
          var movie = result['data'].movie;

          if (this.isMounted()) {
            this.setState({
                movie: movie,
                torrentlist: movie.torrents
            });
          }
        }.bind(this));
        // this.initTorrent()
    },

    render: function() {
        console.log(this.state)
        var backgroundImage = {
            background: 'url(' + this.state.movie.background_image + ') center / cover'
        };

        var toggleShow = this.state.isDescription ? <DescriptionMovieId movie={this.state.movie}/> : <PlayerMovieId />;
        // var isSupported;
        // if (WebTorrent.WEBRTC_SUPPORT) {
        //     isSupported = (<div>Yes</div>)
        // } else {
        //     isSupported = (<div>No</div>)
        // }

        return (<div className="movie-detail" style={backgroundImage}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-10 col-lg-11">
                            <h2>{this.state.movie.title}</h2>
                        </div>
                        <div className="col-xs-2 col-lg-1 swap-icon">
                            <i className="material-icons" onClick={this.handleClick}>swap_horiz</i>
                        </div>
                    </div>
                    <div className="movie-container">
                        {toggleShow}
                    </div>
                    <div className="turnback">
                        <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                            <i className="material-icons up">arrow_back</i>
                        </button>
                    </div>
                </div>
            </div>);
    }
});

module.exports = MovieId;
