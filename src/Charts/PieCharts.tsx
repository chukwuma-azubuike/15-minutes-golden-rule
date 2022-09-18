/*eslint-disable*/
import * as React from 'react';
import { Card, Empty } from 'antd';
import {
	PieChart,
	Pie,
	Tooltip,
	Cell,
	LabelList,
	ResponsiveContainer,
} from 'recharts';
import { IAjoPieChartProps } from './types';
import { CustomTooltip } from './CustomiseCharts';
import { THEME_CONFIG } from '../config';

const PieChartComp = (props: IAjoPieChartProps) => {
	const {
		data,
		title,
		money,
		nameKey,
		loading,
		dataKey,
		totalCount,
		aggregatorSummary,
	} = props;

	const comparisonMap = new Map([
		['SAVINGS', undefined],
		['MPOS', undefined],
		['INSURANCE', undefined],
		['PAYMENTS', undefined],
		['LENDING', undefined],
	]);

	const compareProductVolume = () => {
		data?.forEach((obj) => {
			comparisonMap.set(
				obj.product,
				comparisonMap.get(obj.product)
					? obj.transactionAmount + comparisonMap.get(obj.product)
					: obj.transactionAmount
			);
		});

		const comparisonArr = Array.from(comparisonMap?.entries());

		const comparison = comparisonArr?.map((elm) => {
			if (elm[1] !== undefined) return { product: elm[0], value: elm[1] };
		});

		return comparison?.filter((elm) => elm !== undefined);
	};

	const calcActiveAgentDiff = (active: number, total: number) => {
		if (active < 1 || total < 1) return 0;
		return total - active;
	};

	const compareActiveAgents = () => {
		if (aggregatorSummary) {
			if (aggregatorSummary?.activeDirectDownlines < 1) return [];
			return [
				{
					status: 'Active',
					value: aggregatorSummary?.activeDirectDownlines,
				},
				{
					status: 'Inactive',
					value: calcActiveAgentDiff(
						aggregatorSummary?.activeDirectDownlines,
						totalCount || 0
					),
				},
			];
		}
		return [];
	};

	const memoizedComparison = React.useMemo(() => {
		if (aggregatorSummary)
			return compareActiveAgents().filter((elm) => elm.value > 0);

		return compareProductVolume();
	}, [data, aggregatorSummary]);

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
			{memoizedComparison.length > 0 ? (
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie
							data={memoizedComparison}
							dataKey={dataKey}
							nameKey={nameKey}
							cx="50%"
							cy="50%"
							outerRadius={120}
							innerRadius={60}
							spacing={10}
							paddingAngle={2}
							cornerRadius={6}
						>
							{memoizedComparison.map((entry, index) => (
								<Cell
									key={index}
									radius={4}
									fill={
										THEME_CONFIG.accents[
											index % THEME_CONFIG.accents.length
										]
									}
									style={{ color: 'white' }}
								/>
							))}
							<LabelList
								color="white"
								fontSize="small"
								fontWeight={100}
								position="inside"
								dataKey={nameKey}
								enableBackground={10}
								style={{ background: 'black', padding: '1rem' }}
							/>
						</Pie>
						<Tooltip
							wrapperStyle={{
								border: 'none',
								lineHeight: '14px',
								fontSize: '14px',
								borderRadius: 12,
							}}
							content={
								<CustomTooltip opacity={99} money={money} />
							}
						/>
					</PieChart>
				</ResponsiveContainer>
			) : (
				<Empty />
			)}
		</Card>
	);
};

export default PieChartComp;
