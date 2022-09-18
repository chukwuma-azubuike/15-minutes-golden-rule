/*eslint-disable*/

import { CardProps } from 'antd';

export interface IAggregatorSummary {
	activeDirectDownlines: number;
}

export interface IAjoChartProps extends CardProps {
	data: any[];
	title?: string;
	nameKey: string;
	dataKey?: string;
	xAxisDataKey: string;
	yAxisDataKey?: string;
}

export interface IAjoPieChartProps
	extends Omit<IAjoChartProps, 'xAxisDataKey' | 'yAxisDataKey'> {
	money?: boolean;
	dataKey: string;
	totalCount?: number;
	aggregatorSummary?: IAggregatorSummary;
}
