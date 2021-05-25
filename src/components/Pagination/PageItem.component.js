import React from 'react';

const PageItem = ({className, i, onPageClick}) => {
	return (
		<li className={className} key={i}>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a
				className="page-link"
				href=""
				data-page={i}
				onClick={onPageClick}
			>
				{i}
			</a>
		</li>
	)
}

export default PageItem;
