const statusList = {
	0: 'Задача не выполнена',
	1: 'Задача не выполнена, отредактирована админом',
	10: 'Задача выполнена',
	11: 'Задача отредактирована админом и выполнена'
}

export const getStatus = (status) => {
	return statusList[status];
}

export const getEditStatus = (status) => {
	const done = Math.round(status / 10);
	const adminEdit = (status % 10);
	return {
		done,
		adminEdit
	}
}