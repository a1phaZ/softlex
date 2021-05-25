import React from 'react';
import TaskRow from "./TaskRow.component";
import Loading from "../Loading/Loading.component";
import TasksTableHead from "./TasksTableHead.component";

const TaskTable = ({tasks, loading, sorting, sortTasks}) => {
	if (loading) {
		return <Loading loading={loading} />
	}
	const tBody = tasks.map(task => {
		return (
			<TaskRow key={task.id} {...task} />
		)
	});
	
	const names = ['id', 'Name', 'Email', 'Description', 'Status'];
	
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
