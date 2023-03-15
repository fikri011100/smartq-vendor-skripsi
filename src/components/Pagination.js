import React from "react";

import "./Pagination.css";

const Pagination = (props) => {
	const { totalPage, pageNow, changePage } = props;
	let row = [];
	for (let i = 1; i <= totalPage; i++) {
		row.push(
			<button
				key={i}
				onClick={changePage}
				className={i === pageNow ? "active" : ""}
			>
				{i}
			</button>
		);
	}

	return <div className='pagination'>{row} </div>;
};

export default Pagination;
