import React from 'react';
import PageItem from "./PageItem.component";
import {TASK_PER_PAGE} from "../../const/const";

const Pagination = ({total, activePage, onPageClick}) => {
	const count = Math.ceil(total/TASK_PER_PAGE);
	
	if (count === 1 || count === 0) {
		return null
	}
	
	let pagination = [];
	for (let i=1; i<=count; i++) {
		const className = i === activePage ? "page-item active" : "page-item";
		const pageItem = <PageItem key={i} className={className} i={i} onPageClick={onPageClick} />
		pagination = [...pagination, pageItem];
	}
	
	return (
		<nav>
			<ul className="pagination justify-content-center">
				<li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a
						className="page-link"
						onClick={onPageClick}
						data-direction={-1}
						href={''}
					>
						Prev
					</a>
				</li>
				{pagination}
				<li className={`page-item ${activePage === count ? 'disabled' : ''}`}>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a
						className="page-link"
						onClick={onPageClick}
						data-direction={1}
						href={''}
					>
						Next
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default Pagination;
