import { getCourses, saveCourse, deleteCourse } from '../api/courseApi';

export const addCourse = course => {
	//course.authorId = 1;

	return dispatch => {
		saveCourse(course).then(course => {
			console.log('jsonObj', course);
			return dispatch({
				type: 'ADD_COURSE',
				course: course,
			});
		});
	};
};

export const bringCourses = () => {
	return dispatch => {
		getCourses().then(jsonObj => {
			console.log('from actions', jsonObj);
			return dispatch({
				type: 'GET_COURSES',
				courses: jsonObj,
			});
		});
	};
};

export const deleteCourses = id => {
	return dispatch => {
		deleteCourse(id).then(jsonObj => {
			console.log('from actions', jsonObj);
			return dispatch({
				type: 'DELETE_COURSE',
				courses: jsonObj,
			});
		});
	};
};
