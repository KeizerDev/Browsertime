var React = require('react'),
	Router = require('react-router');
	
var Header = React.createClass({
	render: function() {
		return (<header>
					<div className="container-fluid">
						<div className="logo">	
							Browsertime
						</div>
					<PageNav />
					</div>
				</header>);
	}
});

var Sidebar = React.createClass({
	render: function() {
		return (
			<div className="sidebar">
				<div className="header">Last Seen Movies</div>
			</div>
			);
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
			<div className="nav">
					<ul>
						<li><Router.Link to="movies">Movies</Router.Link></li>
						<li><Router.Link to="series">TV Series</Router.Link></li>
						<div className="search-box">
							<input placeholder={this.state.text} ref="userInput" onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
						</div>
					</ul>
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (<div className="">
				<Header />
				<Sidebar />
					<div className="body-container">
						<Router.RouteHandler/>
					</div>
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
