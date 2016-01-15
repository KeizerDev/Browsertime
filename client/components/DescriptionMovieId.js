var React = require('react');

var DescriptionMovieId = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
    },

    render: function() {
        return (<div className="row">
                    <div className="col-xs-4 col-lg-4">
                        <img className="img-responsive" src={this.props.movie.large_cover_image}/>
                    </div>
                    <div className="col-xs-8 col-lg-8">
                        <ul className="mdl-mini-footer__link-list">
                            <li>{this.props.movie.year}</li>
                            <li>{this.props.movie.language}</li>
                            <li><span className="label label-warning">{this.props.movie.rating}</span></li>
                        </ul>
                        <p>{this.props.movie.summary}</p>
                    </div>
                </div>);
    }
});

module.exports = DescriptionMovieId;
