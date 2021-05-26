import React from 'react';

const Alert = ({error, dismiss}) => {
	if (!error.length) return null;
	const messages = error.map((message, key) => <p key={key}>{message}</p>)
	return (
		<div className="alert alert-danger alert-dismissible fade show" role="alert">
			{messages}
			<button
				type="button"
				className="btn-close"
				data-bs-dismiss="alert"
				aria-label="Close"
				onClick={() => {
					dismiss([])
				}}
			/>
		</div>
	)
}

export default Alert;
