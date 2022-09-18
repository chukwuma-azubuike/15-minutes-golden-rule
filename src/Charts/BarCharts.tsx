/*eslint-disable*/
import * as React from 'react';
import { Card, Empty } from 'antd';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	CartesianGrid,
} from 'recharts';
import { THEME_CONFIG } from '../config';
import { IAjoChartProps } from './types';
import moment from 'moment';
import Utils from '../utils';
import { CustomisedAxisTick, CustomTooltip } from './CustomiseCharts';

const BarChartComp = (props: IAjoChartProps) => {
	const { data, title, xAxisDataKey, yAxisDataKey, loading } = props;

	const memoizedData = React.useMemo(
		() =>
			data
				?.map((d) => {
					if (xAxisDataKey)
						return {
							...d,
							createdAt: moment(d[xAxisDataKey]).valueOf(),
						}; // date -> epoch
				})
				.sort((a, b) => a.createdAt - b.createdAt), // Sort epoch in ascending order
		[data]
	);

	return (
		<Card
			loading={loading}
			headStyle={{
				fontSize: '14px',
				fontWeight: 'lighter',
				margin: 0,
				paddingBottom: 0,
			}}
			title={title}
		>
			{data ? (
				<ResponsiveContainer width="100%" height={300}>
					<BarChart
						data={memoizedData}
						height={200}
						margin={{ left: -12, right: -12 }}
					>
						<Legend />
						<Bar
							barSize={5}
							radius={[10, 10, 10, 10]}
							fill={THEME_CONFIG.primary}
							type="natural"
							dataKey="amount"
						/>
						<XAxis
							scale="time"
							type="number"
							tickLine={false}
							axisLine={false}
							fontWeight={200}
							dataKey={xAxisDataKey}
							tick={<CustomisedAxisTick date rotate={'-30'} />}
							domain={[
								data[0][xAxisDataKey],
								data[data.length - 1][xAxisDataKey],
							]}
							tickFormatter={(elm) =>
								Utils.formatUTCDateToString(elm, 'lll')
							}
						/>
						<YAxis
							height={60}
							tickLine={false}
							axisLine={false}
							fontWeight={200}
							dataKey={yAxisDataKey}
							tick={<CustomisedAxisTick money rotate={'-30'} />}
						/>
						<Tooltip
							wrapperStyle={{
								border: 'none',
								lineHeight: '14px',
								fontSize: '14px',
								borderRadius: 12,
							}}
							cursor={false}
							content={<CustomTooltip money />}
						/>
						<CartesianGrid type="dashed" strokeDasharray="3 3" />
					</BarChart>
				</ResponsiveContainer>
			) : (
				<Empty />
			)}
		</Card>
	);
};

export default BarChartComp;
