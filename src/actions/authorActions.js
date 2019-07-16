import { getAuthors } from '../api/authorApi';

export const bringAuthors = () => {
	//function(dispatch) {
	//	calling dispatch function now
	//   return dispatch({
	// type: something
	//})
	//}

	return dispatch => {
		getAuthors().then(jsonObj => {
			console.log('from author actions', jsonObj);
			return dispatch({
				type: 'GET_AUTHORS',
				authors: jsonObj,
			});
		});
	};
};
