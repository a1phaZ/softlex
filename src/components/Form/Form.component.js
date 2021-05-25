import React, {useCallback, useEffect, useReducer} from 'react';
import useApi from "../../hooks/useApi";
import {CLEAR_FORM, SET_FORM_DATA} from "../../store/actionTypes";
import {clearForm, setFormData} from "../../store/actions";

const initialState = {};

const reducer = (state, action) => {
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

const Form = ({setTaskToState}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
 	const [{response, isLoading}, doApiFetch] = useApi('/create');
 	
 	const setFormValue = (e) => {
 		const {value, dataset: {field}} = e.currentTarget;
 		dispatch(setFormData(field, value))
	}
	
	const prepareForm = (dataObject) => {
 		let form = new FormData();
 		for (const [field, value] of Object.entries(dataObject)) {
 			form.append(field, value.toString());
		}
 		return form;
	}
	
	const clearFormData = useCallback(() => {
		dispatch(clearForm());
	}, []);
	
	useEffect(() => {
		if (!response) return;
		setTaskToState(response);
	}, [response, setTaskToState, clearFormData]);
 
	return(
		<form
			className={'mb-3'}
			onSubmit={async (e) => {
				e.preventDefault();
				const form = prepareForm(state);
				await doApiFetch({
					method: 'POST',
					form
				})
				clearFormData();
			}}
		>
			<div className={'mb-3'}>
				<label htmlFor={'userName'} className={'form-label'}>User name</label>
				<input
					type={'text'}
					className={'form-control'}
					id={'userName'}
					data-field={'username'}
					onChange={setFormValue}
					value={state.username || ''}
					disabled={isLoading}
				/>
			</div>
			<div className={'mb-3'}>
				<label htmlFor="userEmail" className="form-label">Email</label>
				<input
					type="email"
					className="form-control"
					id="userEmail"
					data-field={'email'}
					onChange={setFormValue}
					value={state.email || ''}
					disabled={isLoading}
				/>
			</div>
			<div className={'mb-3'}>
				<label htmlFor="taskText" className="form-label">Task text</label>
				<textarea
					className="form-control"
					id="taskText"
					data-field={'text'}
					onChange={setFormValue}
					value={state.text || ''}
					disabled={isLoading}
				/>
			</div>
			<button
				type="submit"
				className="btn btn-primary"
				disabled={isLoading}
			>
				{isLoading && <span className="spinner-border spinner-border-sm" role="status"></span>}
				Save
			</button>
		</form>
	)
}

export default Form;
