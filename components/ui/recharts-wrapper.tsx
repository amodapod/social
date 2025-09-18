'use client';

import React from 'react';
import * as Recharts from 'recharts';

// Create type-safe wrappers for all components
const createWrapper = <T extends keyof typeof Recharts>(
  componentName: T
): React.FC<React.ComponentProps<typeof Recharts[T]>> => {
  return (props: React.ComponentProps<typeof Recharts[T]>) => {
    const Component = Recharts[componentName];
    return <Component {...props} />;
  };
};

// Export all the wrapped components
export const ResponsiveContainer = createWrapper('ResponsiveContainer');
export const AreaChart = createWrapper('AreaChart');
export const LineChart = createWrapper('LineChart');
export const BarChart = createWrapper('BarChart');

// Export other components directly
export const Area = Recharts.Area;
export const Line = Recharts.Line;
export const Bar = Recharts.Bar;
export const XAxis = Recharts.XAxis;
export const YAxis = Recharts.YAxis;
export const CartesianGrid = Recharts.CartesianGrid;
export const Tooltip = Recharts.Tooltip;
