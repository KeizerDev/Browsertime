var React = require('react'),
	Router = require('react-router');
	
var Header = React.createClass({
	render: function() {
		return (<header id="header">
					<div className="container">
						<div className="logo">
							<img src="http://localhost:8080/assets/img/z.svg" />
						</div>
						<div className="logo-text">BrowserTime</div>
					<PageNav />
					</div>
				</header>);
	}
});

var Footer = React.createClass({
	render: function() {
		return (<footer className="mdl-mini-footer">
		<div className="mdl-mini-footer__left-section">
			Made with a bunch of ♥ || Support this project: 146z8MPUeogNxpT3ptpBWjr6rkpviGd4JG
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
        window.location = "../search/"+this.refs.userInput.getDOMNode().value;
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
		return (
					<ul>
						<li><Router.Link to="movies">Movies</Router.Link></li>
						<li><Router.Link to="series">TV Series</Router.Link></li>
						<li><i className="glyphicon glyphicon-search"></i></li>
					</ul>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (<div className="">
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
