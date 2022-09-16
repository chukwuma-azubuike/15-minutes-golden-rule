import React from 'react';
import './App.css';
import BarChart from './BarChart';
import PieChart from './PieChart';
import DoughnutChart from './DoughnutChart';
// import getResponseList from './api';
import start from './api/client';

function App() {
	const [firstTime, setFirstTime] = React.useState();
	const [rateService, setRateService] = React.useState();
	const [enjoyedTheMost, setEnjoyedTheMost] = React.useState();
	const [attendingWednesday, setAttendingWednesday] = React.useState();

	React.useEffect(() => {
		//Api Call here
		// getResponseList();
		gapi.load('client', start);
	}, []);

	return (
		<div className="App">
			<div className="grid__container">
				<div className="col-3__container">
					<BarChart key="service-rating" />
					<BarChart key="enjoyed-the-most" />
					<PieChart key="first-timer" />
				</div>
				<div className="col-2__container">
					<DoughnutChart key="attending-on-wednesday" />
					<BarChart key="attendance-timeframe" />
				</div>
			</div>
		</div>
	);
}

export default App;
