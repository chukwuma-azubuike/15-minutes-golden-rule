/*eslint-disable*/
import * as React from 'react';
import { Card, Empty } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { THEME_CONFIG } from '../config';
import { IAjoChartProps } from './types';
import Utils from '../utils';
import moment from 'moment';
import {
  CustomisedAxisTick,
  CustomTooltip,
} from './CustomiseCharts';

const LineChartComp = (props: IAjoChartProps) => {
  const { data, title, xAxisDataKey, yAxisDataKey, loading } = props;

  const memoizedData = React.useMemo(
    () =>
      data
        ?.map((d) => {
          if (xAxisDataKey)
            return { ...d, createdAt: moment(d[xAxisDataKey]).valueOf() }; // date -> epoch
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
          <LineChart
            data={memoizedData}
            width={730}
            barGap={100}
            height={280}
            margin={{ left: -10, right: 10, top: 0, bottom: 12 }}
          >
            <Tooltip
              wrapperStyle={{
                border: 'none',
                borderRadius: '10px',
                lineHeight: '14px',
                fontSize: '14px',
              }}
              cursor={false}
              content={<CustomTooltip money />}
            />
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey={yAxisDataKey}
              stroke={THEME_CONFIG.primary}
            />
            <XAxis
              height={60}
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
              tickFormatter={(elm) => Utils.formatUTCDateToString(elm, 'lll')}
            />
            <YAxis
              height={60}
              tickLine={false}
              axisLine={false}
              fontWeight={200}
              dataKey={yAxisDataKey}
              tick={<CustomisedAxisTick money rotate={'-30'} />}
            />
            <CartesianGrid type="dashed" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Empty />
      )}
    </Card>
  );
};

export default LineChartComp;
