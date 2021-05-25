import React from 'react';

const TaskRow = ({id, username, email, text, status}) => {
	return (
		<tr>
			<th scope={'row'}>{id}</th>
			<td>{username}</td>
			<td>{email}</td>
			<td>{text}</td>
			<td>{status}</td>
		</tr>
	)
}

export default TaskRow;
