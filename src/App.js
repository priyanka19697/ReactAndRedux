import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Courses from './components/Courses';
import Default from './components/Default';
import AddCourses from './components/AddCourses';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/home" component={Home} />
						<Route exact path="/courses" component={Courses} />
						<Route exact path="/about" component={About} />
						<Route exact path="/course" component={AddCourses} />
						<Route exact path="/:slug" component={AddCourses} />
						<Route path="/" component={Default} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
