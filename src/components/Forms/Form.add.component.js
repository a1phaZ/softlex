import React, {useCallback, useEffect, useReducer, useState} from 'react';
import useApi from "../../hooks/useApi";
import {clearForm, setFormData} from "../../store/actions";
import {reducer} from "./Form.reducer";
import {prepareForm} from "./Form.handlers";
import {getEditStatus} from "../Tasks/Task.status";

const initialState = {};

const Form = ({setTaskToState, setEditedTaskToState, taskToEdit, setId, token, setError}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [url, setUrl] = useState(() => {
		return taskToEdit ? `/edit/${taskToEdit.id}` : '/create'
	})
	const [{response, error, isLoading}, doApiFetch] = useApi(url);
	const [done, setDone] = useState(() => taskToEdit ? getEditStatus(taskToEdit.status).done * 10 : 0);
	
	const [adminEdit, setAdminEdit] = useState(() => taskToEdit ? getEditStatus(taskToEdit.status ).adminEdit : 0);
	const [editedTask, setEditedTask] = useState(null);
	
	const setFormValue = (e) => {
		const {value, dataset: {field}} = e.currentTarget;
		if (taskToEdit && !adminEdit) setAdminEdit(1);
		dispatch(setFormData(field, value))
	}
	
	const clearFormData = useCallback(() => {
		dispatch(clearForm());
	}, []);
	
	const onSubmit = async (e) => {
		e.preventDefault();
		const form = prepareForm(state);
		if (taskToEdit) {
			setUrl(`/edit/${taskToEdit.id}`);
			form.append('status', (done+adminEdit).toString());
			form.append('token', token);
		}
		if (taskToEdit) {
			const task = {...state, status: done+adminEdit};
			setEditedTask(task);
		}
		await doApiFetch({
			method: 'POST',
			form
		})
		
		clearFormData();
		setId(null);
	}
	
	useEffect(() => {
		if (!taskToEdit) return;
		for (let [field, value] of Object.entries(taskToEdit)) {
			dispatch(setFormData(field, value))
		}
		setDone(getEditStatus(taskToEdit.status).done * 10);
	}, [taskToEdit]);
	
	useEffect(() => {
		if (!response && !error) return;
		if (error) {
			setError(error);
			return;
		}
		if (response.message) {
			setTaskToState(response.message);
			return;
		}
		setEditedTaskToState(editedTask);
		
		setUrl('/create');
	}, [editedTask, response, setEditedTaskToState, setTaskToState, error, setError]);
	
	return (
		<form
			className={'mb-3'}
			onSubmit={onSubmit}
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
					disabled={isLoading || taskToEdit}
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
					disabled={isLoading || taskToEdit}
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
			{
				taskToEdit &&
				<div className="form-check mb-3">
					<input className="form-check-input" type="checkbox" checked={done === 10} id="done" onChange={() => !done ? setDone(10) : setDone(0)} />
						<label className="form-check-label" htmlFor="done">
							Done task
						</label>
				</div>
			}
			<button
				type="submit"
				className="btn btn-primary"
				disabled={isLoading}
			>
				{isLoading && <span className="spinner-border spinner-border-sm" role="status"/>}
				Save
			</button>
		</form>
	)
}

export default Form;
