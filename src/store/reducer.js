import {
	SET_ACTIVE_PAGE,
	SET_EDIT_ID,
	SET_EDITED_TASK, SET_ERROR,
	SET_TASK,
	SET_TASKS,
	SET_TOKEN,
	SORTING_TASKS
} from "./actionTypes";
import {TASK_PER_PAGE} from "../const/const";

export const reducer = (state, action) => {
	switch (action.type) {
		case SET_ACTIVE_PAGE: {
			return {
				...state,
				activePage: action.payload.activePage
			}
		}
		
		case SORTING_TASKS: {
			return {
				...state,
				sorting: {
					field: action.payload.field,
					direction: action.payload.direction
				}
			}
		}
		
		case SET_TASKS: {
			return {
				...state,
				tasks: action.payload.tasks,
				totalTaskCount: action.payload.totalTaskCount
			}
		}
		
		case SET_TASK: {
			if (state.tasks.length === TASK_PER_PAGE) {
				return {
					...state,
					totalTaskCount: state.totalTaskCount + 1
				}
			}
			return {
				...state,
				tasks: [...state.tasks, action.payload],
				totalTaskCount: state.totalTaskCount + 1
			}
		}
		
		case SET_EDITED_TASK: {
			const idx = state.tasks.findIndex(task => {
				return task.id === action.payload.task.id
			});
			let tasksWithEditEl = state.tasks;
			tasksWithEditEl.splice(idx, 1, action.payload.task);
			return {
				...state,
				tasks: tasksWithEditEl
			}
		}
		
		case SET_TOKEN: {
			const timestamp = new Date().getTime();
			return {
				...state,
				token: action.payload.token,
				timestamp
			}
		}
		
		case SET_EDIT_ID: {
			return {
				...state,
				taskId: action.payload.taskId
			}
		}
		
		case SET_ERROR: {
			let errorMessages = [];
			if (typeof action.payload.error === "object") {
				for (let [field, value] of Object.entries(action.payload.error)) {
					errorMessages.push(`${field} - ${value}`);
				}
			}
			if (typeof action.payload.error === 'string') {
				errorMessages.push(action.payload.error)
			}
			return {
				...state,
				error: errorMessages
			}
		}
		
		default: {
			return state;
		}
	}
}