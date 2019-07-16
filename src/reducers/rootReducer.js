const initState = {
	courses: [],
	authors: [],
};

const rootReducer = (state = initState, action) => {
	if (action.type === 'ADD_COURSE') {
		let courses = [...state.courses, action.course];
		console.log('from root reducer', courses, state.courses);
		return {
			courses: courses,
		};
	} else if (action.type === 'GET_COURSES') {
		console.log('from reducer', action.courses);
		return {
			...state,
			courses: action.courses,
		};
	} else if (action.type === 'GET_AUTHORS') {
		console.log('from author reducer', action.authors);
		return {
			...state,
			authors: action.authors,
		};
	} else return state;
};

export default rootReducer;
