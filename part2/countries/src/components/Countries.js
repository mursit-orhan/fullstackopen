import React from 'react';
const Country = ({ country }) => {
	const langs = [];
	for (const language in country.languages) {
		const element = country.languages[language];

		langs.push(element);
	}
	return (
		<div>
			<h1>{country.name.common}</h1>
			capital {country.capital.join('')} <br />
			area {country.area}
			<p>
				<strong>languages:</strong>
				<ul>
					{langs.map((lang) => (
						<li>{lang}</li>
					))}
				</ul>
				{country.flag}
			</p>
		</div>
	);
};

const Countries = ({ countries }) => {
	if (countries.length === 1) {
		return <Country country={countries[0]} />;
	}
	return countries.map(({ name }) => (
		<div key={name.common}>{name.common}</div>
	));
};

export default Countries;
