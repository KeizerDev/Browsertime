var React = require('react');

var Serie = React.createClass({
	render: function() {
		return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-4 col-xs-12">
                        <div className="movie-card-image mdl-card mdl-shadow--2dp">
                            <div className="mdl-card__title mdl-card--expand"></div>
                            <div className="mdl-card__actions">
                                <span className="movie-card-image__filename">Image.jpg</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
});

module.exports = Serie;
