import React, {useCallback, useEffect, useReducer, useState} from "react";
import Form from "./components/Form/Form.component";
import TaskTable from "./components/Tasks/TasksTable.component";
import Pagination from "./components/Pagination/Pagination.component";
import {SET_ACTIVE_PAGE, SET_TASK, SET_TASKS, SORTING_TASKS} from "./store/actionTypes";
import {setActivePage, setTask, setTasks, sortingTasks} from "./store/actions";
import useApi from "./hooks/useApi";
import {TASK_PER_PAGE} from "./const/const";

const initialState = {
	activePage: 1,
	tasks: [],
	totalTaskCount: 0,
	sorting: {
		field: 'id',
		direction: 'abc'
	}
}

const reducer = (state, action) => {
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
		
		default: {
			return state;
		}
	}
}


function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [{response, isLoading}, doApiFetch] = useApi('/');
	const [fetchData, setFetchData] = useState(true);
	
	const changeActivePage = (e) => {
		e.preventDefault();
		const {page = state.activePage, direction = 0} = e.currentTarget.dataset;
		const pageNumber = +page + +direction;
		dispatch(setActivePage(pageNumber));
		setFetchData(true);
	}
	
	const sortTasks = (e) => {
		e.preventDefault();
		const {field, direction} = e.currentTarget.dataset;
		dispatch(sortingTasks(field, direction));
		setFetchData(true);
	}
	
	const setTasksToState = useCallback((tasks, total) => {
		dispatch(setTasks(tasks, total));
	}, []);
	
	const setTaskToState = useCallback((task) => {
			dispatch(setTask(task));
	}, []);
	
	useEffect(() => {
		if (!fetchData) return;
		const {activePage, sorting: {field, direction}} = state;
		doApiFetch({
			params: {
				sort_field: field,
				sort_direction: direction,
				page: activePage.toString()
			}
		});
		setFetchData(false);
	},[doApiFetch, response, state, fetchData]);
	
	useEffect(() => {
		if (!response) return;
		const {tasks, total_task_count: totalTaskCount} = response;
		setTasksToState(tasks, totalTaskCount);
	}, [response, setTasksToState]);
	
	return (
		<div className="App">
			<div className={'container'}>
			  <div className={'row'}>
          <div className={'col'}>
          	<Form setTaskToState={setTaskToState}/>
						<TaskTable
							tasks={state.tasks}
							loading={isLoading}
							sortTasks={sortTasks}
							sorting={state.sorting}
						/>
						<Pagination
							total={state.totalTaskCount}
							activePage={state.activePage}
							onPageClick={changeActivePage}
						/>
          </div>
        </div>
			</div>
		</div>
	);
}

export default App;
