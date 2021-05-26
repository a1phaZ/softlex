export const prepareForm = (dataObject) => {
	let form = new FormData();
	for (const [field, value] of Object.entries(dataObject)) {
		form.append(field, value.toString());
	}
	return form;
}

