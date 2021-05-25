import {CLEAR_FORM, SET_ACTIVE_PAGE, SET_FORM_DATA, SET_TASK, SET_TASKS, SORTING_TASKS} from "./actionTypes";

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

export const setFormData = (field, value) => (
	{
		type: SET_FORM_DATA,
		payload: {
			field,
			value
		}
	}
)

export const setTask = (task) => (
	{
		type: SET_TASK,
		payload: task
	}
)

export const clearForm = () => (
	{
		type: CLEAR_FORM
	}
)