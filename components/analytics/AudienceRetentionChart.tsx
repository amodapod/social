'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const retentionData = [
  { time: '0:00', value: 100 },
  { time: '0:30', value: 95 },
  { time: '1:00', value: 85 },
  { time: '1:30', value: 75 },
  { time: '2:00', value: 65 },
  { time: '2:30', value: 55 },
  { time: '3:00', value: 45 },
  { time: '3:30', value: 40 },
  { time: '4:00', value: 35 },
  { time: '4:30', value: 30 },
  { time: '5:00', value: 25 },
];

export default function AudienceRetentionChart() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={retentionData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value) => [`${value}%`, 'Retention']} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
