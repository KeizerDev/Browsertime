var React = require('react'),
	Router = require('react-router');

var Header = React.createClass({
	render: function() {
		return (<header id="header">
					<div className="container">
						<div className="logo">
							<img src="/images/logo.svg" />
    					</div>
						<div className="logo-text">BrowserTime</div>
	       				<PageNav />
					</div>
				</header>);
	}
});

var Footer = React.createClass({
	render: function() {
		return (<footer>
					<div className="container">
						<div className="row">
							<div className="col-md-10"></div>
							<div className="col-md-2">
								<select>
                                    <option value="">Country...</option>
                                    <option value="NL">Netherlands</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="US">United States of America</option>
								</select>
							</div>
						</div>
					</div>
	            </footer>);
	}
});

var PageNav = React.createClass({
	getInitialState: function() {
        return {text: 'Search'};
    },
    inputSubmit: function() {
        this.setState({text: ''});

        if(this.refs.userInput.getDOMNode().value != 'Search')
        window.location = "../search/" + this.refs.userInput.getDOMNode().value;
    },
    handleChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleKeyDown: function(e) {
        if (e.keyCode === 13 ) {
            return this.inputSubmit();
        }
    },
	render: function() {
            // <li><Router.Link to="series">TV Series</Router.Link></li>
    		return (
					<ul>
						<li><Router.Link to="movies">Movies</Router.Link></li>
						<li><i className="glyphicon glyphicon-search"></i></li>
					</ul>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (<div className="test">
				<Header />
				<Router.RouteHandler/>
				<Footer/>
			</div>);
	}
});

var routes = {
	Home: require('../routes/Home'),
	Movie: require('../routes/Movie'),
	MovieId: require('../routes/MovieId'),
	MovieQuery: require('../routes/MovieQuery'),
	Series: require('../routes/Serie')
};

var routes = (
	<Router.Route name="app" path="/" handler={App}>
		<Router.Route name="movies" path="/movies" handler={routes.Movie}/>
		<Router.Route name="movieid" path="/movies/:id" handler={routes.MovieId}/>
		<Router.Route name="series" path="/series" handler={routes.Series}/>
		<Router.Route name="moviequery" path="/search/:query" handler={routes.MovieQuery}/>
		<Router.DefaultRoute handler={routes.Movie}/>
	</Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.body);
});
