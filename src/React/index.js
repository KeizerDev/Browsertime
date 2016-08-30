import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, NotFoundRoute, Link, IndexLink, browserHistory } from 'react-router'

var routes = {
    Home: require('./routes/Home'),
    Movie: require('./routes/Movie'),
    MovieId: require('./routes/MovieId'),
    MovieQuery: require('./routes/MovieQuery'),
    Series: require('./routes/Serie')
};

const ACTIVE = { color: 'red' }

class Header extends React.Component {
	render() {
		return (<header id="header">
					<div className="container">
						<div className="logo">
							<img src="/images/logo.svg" />
    					</div>
                        <div className="logo-text">BrowserTime</div>
                        <PageNav/>
					</div>
				</header>);
	}
}

class Footer extends React.Component {
	render() {
		return (<footer>
					<div className="container">
                        <div className="row">
                            <div className="col-md-10">
                                <pre>Bitcoin: 146z8MPUeogNxpT3ptpBWjr6rkpviGd4JG</pre>
                            </div>
							<div className="col-md-2">
                                <a href="https://github.com/TeamBrowsertime/Browsertime-API" className="btn btn-info col-md-12" role="button">Add movies</a>
							</div>
						</div>
					</div>
	            </footer>);
	}
}

class App extends React.Component {
  render() {
    return (
        <div className="page">
            <Header />
            <div className="">
                {this.props.children}
            </div>
            <Footer/>
        </div>
    )
  }
}

class PageNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {text: 'Search'};
    }

    inputSubmit() {
        this.setState({text: ''});

        if(this.refs.userInput.getDOMNode().value != 'Search')
        window.location = "../search/" + this.refs.userInput.getDOMNode().value;
    }
    handleChange(e) {
        this.setState({text: e.target.value});
    }
    handleKeyDown(e) {
        if (e.keyCode === 13 ) {
            return this.inputSubmit();
        }
    }
	render() {
            // <li><Router.Link to="series">TV Series</Router.Link></li>
    		return (
					<ul>
						<li><Link to="movies">Movies</Link></li>
						<li><i className="glyphicon glyphicon-search"></i></li>
                   </ul>
		);
	}
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={routes.Movie}/>
            <Route path="movies" component={routes.Movie}/>
            <Route path="/movie/:id" component={routes.MovieId}/>
            <Route path="series" component={routes.Series}/>
            <Route path="/search/:query" component={routes.MovieQuery}/>

            <Route path="*" component={routes.Page404} />
        </Route>
    </Router>
), document.getElementById('app'))
