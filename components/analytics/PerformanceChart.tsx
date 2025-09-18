'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const performanceData = [
  { name: 'Jan', views: 4000, subscribers: 2400, engagement: 2400 },
  { name: 'Feb', views: 3000, subscribers: 1398, engagement: 2210 },
  { name: 'Mar', views: 2000, subscribers: 9800, engagement: 2290 },
  { name: 'Apr', views: 2780, subscribers: 3908, engagement: 2000 },
  { name: 'May', views: 1890, subscribers: 4800, engagement: 2181 },
  { name: 'Jun', views: 2390, subscribers: 3800, engagement: 2500 },
  { name: 'Jul', views: 3490, subscribers: 4300, engagement: 2100 },
];

export default function PerformanceChart() {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <AreaChart
          data={performanceData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="views" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="subscribers" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="engagement" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
