import { useState } from 'react';

const StatisticLine = (props) => (
	<div>
		{props.text} {props.value}
	</div>
);
const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const average = (good * 1 + bad * -1) / all;
	const positive = good / all;
	if (all === 0) {
		return (
			<div>
				<h1>statistics</h1>
				<div>No feedback given</div>
			</div>
		);
	}
	return (
		<div>
			<h1>statistics</h1>
			<StatisticLine text="good" value={good} />
			<StatisticLine text="neutral" value={neutral} />
			<StatisticLine text="bad" value={bad} />
			<StatisticLine text="all" value={all} />
			<StatisticLine text="average" value={average} />
			<StatisticLine text="positive" value={positive * 100 + '%'} />
		</div>
	);
};
const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
);
const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={() => setGood(good + 1)} text="good" />
			<Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button handleClick={() => setBad(bad + 1)} text="bad" />
			<Statistics good={good} bad={bad} neutral={neutral} />
		</div>
	);
};

export default App;
