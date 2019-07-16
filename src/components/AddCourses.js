import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bringAuthors } from '../actions/authorActions';
import { addCourse, bringCourses } from '../actions/courseActions';

//Add one course and save page
class AddCourses extends Component {
	state = {
		course: {
			title: ' ',
			authorId: ' ',
			category: ' ',
		},
		author: ' ',
		component: 'Add Course',
	};

	checkExistence = () => {
		console.log(this.props, 'checking props for slug');
		if (this.props.match.params.slug) {
			console.log('Editing course');
			this.setState({
				component: 'Edit Course',
			});
			const selectedcourse = this.props.courses.find(course => {
				return this.props.match.params.slug === course.slug;
			});

			console.log('logging course', selectedcourse);

			const author =
				this.props.authors && selectedcourse
					? this.props.authors.find(author => {
							return selectedcourse.authorId === author.id;
					  })
					: null;

			console.log('logging author', author);
			console.log('author id', author.id);

			this.setState({
				course: {
					id: selectedcourse.id,
					title: selectedcourse.title,
					authorId: author.id,
					slug: selectedcourse.slug,
					category: selectedcourse.category,
				},
				author: author,
			});
			console.log(selectedcourse, 'course in edit');
		} else {
			console.log('No courseFound');
		}
	};

	//Should take author name and return author id

	componentWillMount() {
		this.checkExistence();
		this.props.bringAuthors();
		this.props.bringCourses();
	}

	handleChange = e => {
		if (e.target.id === 'author') {
			const author = name =>
				this.props.authors.find(author => {
					return author.name == name;
				});
			const id = author(e.target.value).id;
			console.log('author id', id);
			this.setState({
				course: {
					...this.state.course,
					authorId: id,
				},
			});
		} else {
			this.setState({
				course: {
					...this.state.course,
					[e.target.id]: e.target.value,
				},
			});
		}

		console.log(e.target.id, e.target.value);
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log('state in handle submit', this.state);
		this.props.addCourse(this.state.course);
		console.log('state when clicked add course before saving to db', this.state);
		this.setState({
			course: {
				id: null,
				title: null,
				slug: null,
				authorId: null,
				category: null,
			},
		});

		this.props.history.push('/courses');
	};

	render() {
		var select = document.getElementById('authors');
		var authorsList;
		console.log(this.props, 'from save render');
		if (this.props.authors) {
			if (this.props.authors.length > 0) {
				authorsList = this.props.authors.map(author => {
					return <option>{author.name}</option>;
				});
			}
		} else console.log('loading');

		return (
			<div className="container">
				<div className="form-group">
					<label htmlFor="Add course">
						<h3>{this.state.component}</h3>
					</label>
				</div>
				<div>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="title">
							<h4>Title</h4>
						</label>
						<input
							type="text"
							className="form-control"
							value={this.state.course.title}
							id="title"
							onChange={this.handleChange}
						/>
						<label htmlFor="author">
							<h4>Author</h4>
						</label>
						<select id="author" className="form-control" onChange={this.handleChange}>
							<option selected>{this.state.author ? this.state.author.name : 'Select Author'} </option>
							{authorsList}
						</select>
						<label htmlFor="category">
							<h4>Category</h4>
						</label>
						<input
							type="text"
							id="category"
							value={this.state.course.category}
							className="form-control"
							onChange={this.handleChange}
						/>
						<button className="m-3 btn btn-primary">Save</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log('mstpAddcourses', state);
	return {
		courses: state.courses,
		authors: state.authors,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		//key :arrow  function that will call dispatch function from actions

		bringAuthors: () => {
			dispatch(bringAuthors());
		},

		addCourse: course => {
			//dispatch(action) sent to reducer
			//dispatch({
			//	type:"ADD_COURSE",
			//	id: 1
			//})
			dispatch(addCourse(course));
		},

		bringCourses: () => {
			dispatch(bringCourses());
		},
	};
};

export default connect(
	mapStateToProps, //state
	mapDispatchToProps //dispatch
)(AddCourses);
