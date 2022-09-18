/* global gapi */
import React from 'react';
import './App.css';
import BarChart from './BarChart';
import PieChart from './PieChart';
import DoughnutChart from './DoughnutChart';
// import getResponseList from './api';
import start from './api/client';
import { gapi } from 'gapi-script';
// import BarChart from './Charts/BarCharts';
// import PieChart from './Charts/PieCharts';
// import useGoogle from './hooks/useGoogle';

function App() {
	const [firstTime, setFirstTime] = React.useState();
	const [rateService, setRateService] = React.useState();
	const [enjoyedTheMost, setEnjoyedTheMost] = React.useState();
	const [attendingWednesday, setAttendingWednesday] = React.useState();

	React.useEffect(() => {
		//Api Call here
		// getResponseList();
		gapi.load('client', start);
		fetch(
			'https://mockend.com/chukwuma-azubuike/15-minutes-golden-rule/users'
		)
			.then((res) => res.json())
			.then((result) => console.log(result));
	}, []);

	// useGoogle();

	return (
		<div className="App">
			<div className="grid__container">
				<div className="col-3__container">
					<BarChart key="service-rating" />
					<BarChart key="enjoyed-the-most" />
					<PieChart key="first-timer" />
					{/* <BarChart />
					<BarChart />
					<PieChart /> */}
				</div>
				<div className="col-2__container">
					<DoughnutChart key="attending-on-wednesday" />
					<BarChart key="attendance-timeframe" />
					{/* <PieChart />
					<BarChart /> */}
				</div>
			</div>
		</div>
	);
}

export default App;
