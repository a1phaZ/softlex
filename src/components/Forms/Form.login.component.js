import React, {useCallback, useEffect, useReducer} from 'react';
import {prepareForm} from "./Form.handlers";
import useApi from "../../hooks/useApi";
import {reducer} from "./Form.reducer";
import {clearForm, setFormData} from "../../store/actions";

const initialState = {};

const FormLogin = ({setToken, setError}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [{response, error, isLoading}, doApiFetch] = useApi('/login');
	
	const setFormValue = (e) => {
		const {value, dataset: {field}} = e.currentTarget;
		dispatch(setFormData(field, value))
	}
	
	const clearFormData = useCallback(() => {
		dispatch(clearForm());
	}, []);
	
	useEffect(() => {
		if (!response && !error) return;
		if (error) {
			console.log(error);
			setError(error);
			return;
		}
		if (response.message) {
			setToken(response.message.token);
		}
	}, [response, setToken, error, setError]);
	
	return (
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
				<label htmlFor="userPassword" className="form-label">Password</label>
				<input
					type="password"
					className="form-control"
					id="userPassword"
					autoComplete={'false'}
					data-field={'password'}
					onChange={setFormValue}
					value={state.password || ''}
					disabled={isLoading}
				/>
			</div>
			<button
				type="submit"
				className="btn btn-primary"
				disabled={isLoading}
			>
				{isLoading && <span className="spinner-border spinner-border-sm" role="status"/>}
				Login
			</button>
		</form>
	)
}

export default FormLogin;
