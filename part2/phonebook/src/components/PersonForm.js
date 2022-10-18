import React from 'react';

const PersonForm = ({ name, number, handleSubmit, handleChange }) => {
	console.log(handleSubmit);
	return (
		<form onSubmit={handleSubmit}>
			<h2>add a new</h2>
			<div>
				name: <input name="name" value={name} onChange={handleChange} />
			</div>
			<div>
				number:
				<input name="number" value={number} onChange={handleChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
