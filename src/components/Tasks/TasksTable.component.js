import React from 'react';
import TaskRow from "./TaskRow.component";
import Loading from "../Loading/Loading.component";
import TasksTableHead from "./TasksTableHead.component";

const TaskTable = ({tasks, loading, sorting, sortTasks, isLoggedIn, onEditClick}) => {
	if (loading) {
		return <Loading loading={loading} />
	}
	const tBody = tasks.map(task => {
		return (
			<TaskRow key={task.id} isLoggedIn={isLoggedIn} {...task} onEditClick={onEditClick}/>
		)
	});
	
	const names = ['id', 'Name', 'Email', 'Description', 'Status'];
	
	if (isLoggedIn) names.push('Edit');
	
	return (
		<table className={'table'}>
			<thead>
				<tr>
					<TasksTableHead names={names} sorting={sorting} sortTasks={sortTasks}/>
				</tr>
			</thead>
			<tbody>
				{!loading && tBody}
			</tbody>
		</table>
	)
}

export default TaskTable;
