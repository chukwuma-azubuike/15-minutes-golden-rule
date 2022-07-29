import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
// import faker from 'faker';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const labels = ['5', '4', '3', '2', '1'];

export const options = {
	indexAxis: 'y' as const,
	elements: {
		bar: {
			borderWidth: 1,
		},
		innerWidth: 100,
		outerWidth: 100,
	},
	responsive: true,
	plugins: {
		legend: {
			position: 'bottom' as const,
		},
		title: {
			display: true,
			text: 'Chart.js Horizontal Bar Chart',
		},
	},
};

export const data = {
	labels,
	datasets: [
		{
			label: 'Service Rating', // Dynamic
			data: [5, 4, 3, 2, 1], //Dynamic
			borderColor: 'rgb(255, 99, 132)',
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
	],
};

const BarChart = () => {
	return (
		<div className="chart-canvas__container">
			<Bar data={data} options={options} />
		</div>
	);
};

export default BarChart;
