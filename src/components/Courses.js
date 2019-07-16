import React, { Component } from 'react';
import AddCourse from './AddCourse';
import { connect } from 'react-redux';
import { addCourse, bringCourses, deleteCourses } from '../actions/courseActions';
import { bringAuthors } from '../actions/authorActions';
import { Link } from 'react-router-dom';

//Adds course to list of courses

class Courses extends Component {
	handleClick = () => {
		console.log('working');
		this.props.history.push('/course');
	};

	handleDelete = id => {
		this.props.deleteCourses(id);
		const courses = this.state.courses.filter(course => {
			return course.id !== id;
		});
		this.setState({
			courses: courses,
		});
	};

	state = {
		courses: [],
		authors: [],
	};

	//bring things before page gets loaded
	componentWillMount() {
		this.props.bringCourses();
		this.props.bringAuthors();
	}

	render() {
		console.log(this.props, 'testtest');

		// getCourses()
		// 	.then(courses => {
		// 		console.log('ASYN COMPLETE', courses);0
		// 	})
		// 	.catch(() => {
		// 		console.log('fucked');
		// 	});
		const authorName = id => {
			var name;
			// for (var i = 0; i < this.props.authors.length; i++) {
			// 	console.log('check', this.props.authors[i].id);

			// 	if (this.props.authors[i].id === id) {
			// 		name = this.props.authors[i].name;
			// 		break;
			// 	}
			// 	console.log(name);
			// }
			// return name;
			if (this.props.authors) {
				if (this.props.authors.length > 0) {
					name = this.props.authors.find(function(author) {
						return author.id === id;
					});
					return name ? name.name : 'failed';
				}
			}
			return 'loading';
		};

		console.log(authorName(1));

		console.log('authorname', authorName(1));
		const courseList = this.props.courses.map(course => {
			return (
				<tr>
					<th>
						<button className="btn btn-disabled">Watch</button>
					</th>
					<td>
						{/* <a href="">{course.title}</a> */}
						<Link to={'/' + course.slug}>{course.title}</Link>
					</td>
					<td>{authorName(course.authorId)}</td>

					<td>{course.category}</td>
					<td>
						<button
							className="btn btn-outline-danger"
							onClick={e => {
								this.handleDelete(course.id);
							}}
						>
							Delete
						</button>
					</td>
				</tr>
			);
		});

		// const authorList = this.props.authors.map(author => {
		// 	return <li key={author.id}>{author.name}</li>;
		// });

		return (
			<div className="container">
				<h3 className="ml-2">Courses</h3>
				<button className="btn btn-primary m-2" onClick={this.handleClick}>
					Add Course
				</button>
				<table className="table">
					<thead>
						<tr>
							<th scope="col"> #</th>
							<th scope="col" className="">
								Title
							</th>
							<th scope="col" className="">
								Author
							</th>
							<th scope="col" className="">
								Category
							</th>
						</tr>
					</thead>
					<tbody>{courseList}</tbody>
				</table>
				{/* <AddCourse addCourse={this.props.addCourse} /> */}
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log('mstp', state);
	return {
		courses: state.courses,
		authors: state.authors,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		//key :arrow  function that will call dispatch function from actions
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

		bringAuthors: () => {
			dispatch(bringAuthors());
		},

		deleteCourses: id => {
			dispatch(deleteCourses(id));
		},
	};
};

export default connect(
	mapStateToProps, //state
	mapDispatchToProps //dispatch
)(Courses);
