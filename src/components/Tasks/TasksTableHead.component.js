import React from 'react';
import {ABC, DESC} from "../../const/const";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";

const TasksTableHead = ({names, sorting, sortTasks}) => {
	return names.map((name, key) => {
		let direction = ABC;
		if (name.toLowerCase() === sorting.field) {
			direction = direction === sorting.direction ? DESC : ABC;
		}
		
		if (name.toLowerCase() === 'edit') {
			return <th scope={'col'} key={key}>{name}</th>
		}
		return (
			<th
				scope="col"
				key={key}
			>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a
					href={''}
					onClick={sortTasks}
					data-field={name.toLowerCase()}
					data-direction={direction}
				>
					{name}
					{
						sorting.field === name.toLowerCase() &&
						<FontAwesomeIcon icon={(direction === ABC ? faSortUp : faSortDown)} />
					}
					
				</a>
			</th>
		)
	})
}

export default TasksTableHead;
