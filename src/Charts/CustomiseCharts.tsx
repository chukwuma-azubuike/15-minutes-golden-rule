/* eslint-disable */
import { Alert } from 'antd';
import moment from 'moment';
import { THEME_CONFIG } from '../config';

export const CustomisedLabel = (props: any) => {
	const { x, y, stroke, value } = props;

	return (
		<text
			x={x}
			y={y}
			dy={-4}
			fill={THEME_CONFIG.primary}
			fontSize={10}
			textAnchor="middle"
		>
			{value}
		</text>
	);
};

export const CustomisedAxisTick = (props: any) => {
	const { x, y, stroke, money, payload, date, rotate } = props;

	return (
		<g transform={`translate(${x},${y})`}>
			<text
				x={0}
				y={0}
				dy={16}
				textAnchor="end"
				fontSize={10}
				transform={`rotate(${rotate})`}
			>
				{payload.value}
			</text>
		</g>
	);
};

export const CustomTooltip = (props: any) => {
	const { active, payload, label, opacity, color } = props;

	if (active && payload && payload.length) {
		return (
			<Alert
				style={{
					background: `${THEME_CONFIG.primary}${opacity}`,
					color,
				}}
				message={payload[0].value}
				description={moment(label).format('lll')}
			/>
		);
	}

	return null;
};
