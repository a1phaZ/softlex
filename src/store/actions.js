import {
	CLEAR_FORM,
	SET_ACTIVE_PAGE,
	SET_EDIT_ID, SET_EDITED_TASK, SET_ERROR,
	SET_FORM_DATA,
	SET_TASK,
	SET_TASKS,
	SET_TOKEN,
	SORTING_TASKS
} from "./actionTypes";

export const setActivePage = (activePage) => (
	{
		type: SET_ACTIVE_PAGE,
		payload: {
			activePage
		}
	}
)

export const sortingTasks = (field, direction) => (
	{
		type: SORTING_TASKS,
		payload: {
			field,
			direction
		}
	}
)

export const setTasks = (tasks, totalTaskCount) => (
	{
		type: SET_TASKS,
		payload: {
			tasks,
			totalTaskCount: +totalTaskCount
		}
	}
)

export const setTask = (task) => (
	{
		type: SET_TASK,
		payload: task
	}
)

export const setFormData = (field, value) => (
	{
		type: SET_FORM_DATA,
		payload: {
			field,
			value
		}
	}
)

export const clearForm = () => (
	{
		type: CLEAR_FORM
	}
)

export const setToken = (token) => (
	{
		type: SET_TOKEN,
		payload: {
			token
		}
	}
)

export const setEditId = (id) => (
	{
		type: SET_EDIT_ID,
		payload: {
			taskId: id
		}
	}
)

export const setEditedTask = (task) => (
	{
		type: SET_EDITED_TASK,
		payload: {
			task
		}
	}
)

export const setError = (error) => (
	{
		type: SET_ERROR,
		payload: {
			error
		}
	}
)