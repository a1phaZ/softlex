import React from 'react';
import {getStatus} from "./Task.status";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

const TaskRow = ({id, username, email, text, status, isLoggedIn, onEditClick}) => {
	return (
		<tr>
			<th scope={'row'}>{id}</th>
			<td>{username}</td>
			<td>{email}</td>
			<td>{text}</td>
			<td>{getStatus(status)}</td>
			{
				isLoggedIn &&
				<td>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a
						type="button"
						className="btn btn-warning"
						data-id={id}
						onClick={onEditClick}
					>
						<FontAwesomeIcon icon={faEdit}/>
					</a>
				</td>
			}
		</tr>
	)
}

export default TaskRow;
