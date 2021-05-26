import {CLEAR_FORM, SET_FORM_DATA} from "../../store/actionTypes";

export const reducer = (state, action) => {
	switch (action.type) {
		case SET_FORM_DATA: {
			return {
				...state,
				[action.payload.field]: action.payload.value
			}
		}
		
		case CLEAR_FORM: {
			const data = state;
			for (const [field] of Object.entries(data)){
				data[field] = '';
			}
			return data;
		}
		
		default: {
			return state;
		}
	}
}