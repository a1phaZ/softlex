import React, {useCallback, useEffect, useReducer, useState} from "react";
import Form from "./components/Forms/Form.add.component";
import TaskTable from "./components/Tasks/TasksTable.component";
import Pagination from "./components/Pagination/Pagination.component";
import {
	setActivePage,
	setEditedTask,
	setEditId,
	setError,
	setTask,
	setTasks,
	setToken,
	sortingTasks
} from "./store/actions";
import useApi from "./hooks/useApi";
import {TOKEN_LIFE_TIME} from "./const/const";
import Navbar from "./components/Navbar/Navbar.component";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import FormLogin from "./components/Forms/Form.login.component";
import {reducer} from "./store/reducer";
import Alert from "./components/Alert/Alert.component";

const initialState = {
	activePage: 1,
	tasks: [],
	totalTaskCount: 0,
	sorting: {
		field: 'id',
		direction: 'abc'
	},
	token: null,
	timestamp: null,
	taskId: null,
	error: []
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [{response, error, isLoading}, doApiFetch] = useApi('/');
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
	
	const setEditedTaskToState = useCallback((task) => {
		dispatch(setEditedTask(task));
	}, [])
	
	const setTokenToState = useCallback((token) => {
		dispatch(setToken(token))
	}, []);
	
	const setId = useCallback((e) => {
		if (!e) {
			dispatch(setEditId(null));
			return;
		}
		const {id} = e.currentTarget.dataset;
		dispatch(setEditId(parseInt(id)))
	}, []);
	
	const setErrorMessage = useCallback((error) => {
		dispatch(setError(error))
	}, []);
	
	const getTaskToEdit = (id, tasks) => {
		const idx = tasks.findIndex(task => task.id === id);
		return tasks[idx];
	}
	
	const getLoggedIn = (token, timestamp) => {
		if (!token || !timestamp) return false;
		if (token && timestamp) {
			const now = new Date().getTime();
			return now - timestamp < TOKEN_LIFE_TIME
		}
		return false;
	}
	
	const logout = () => {
		dispatch(setToken(null));
	}
	
	const isLoggedIn = getLoggedIn(state.token, state.timestamp);
	
	const taskToEdit = getTaskToEdit(state.taskId, state.tasks);
	
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
	}, [doApiFetch, response, state, fetchData]);
	
	useEffect(() => {
		if (!response && !error) return;
		if (error) {
			setErrorMessage(error)
		}
		if (response && response.message) {
			const {message: {tasks, total_task_count: totalTaskCount}} = response;
			setTasksToState(tasks, totalTaskCount);
		}
	}, [response, error, setTasksToState, setErrorMessage]);
	
	return (
		<div className="App">
			<Router>
				<Navbar isLoggedIn={isLoggedIn} logout={logout}/>
				<div className={'container'}>
					<div className={'row'}>
						<div className={'col'}>
							<Alert error={state.error} dismiss={setErrorMessage}/>
							<Switch>
								<Route path={'/login'}>
									{isLoggedIn ? <Redirect to="/"/> : <FormLogin setToken={setTokenToState} setError={setErrorMessage}/>}
								</Route>
								<Route path={'/'}>
									<Form
										setTaskToState={setTaskToState}
										setEditedTaskToState={setEditedTaskToState}
										taskToEdit={taskToEdit}
										setId={setId}
										token={state.token}
										setError={setErrorMessage}
									/>
									<TaskTable
										tasks={state.tasks}
										loading={isLoading}
										sortTasks={sortTasks}
										sorting={state.sorting}
										isLoggedIn={isLoggedIn}
										onEditClick={setId}
									/>
									<Pagination
										total={state.totalTaskCount}
										activePage={state.activePage}
										onPageClick={changeActivePage}
									/>
								</Route>
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		</div>
	);
}

export default App;
