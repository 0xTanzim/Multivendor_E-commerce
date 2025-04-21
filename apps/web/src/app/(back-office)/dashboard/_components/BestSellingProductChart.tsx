'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ProductData = {
  name: string;
  quantity: number;
};

type BestSellingProductChartProps = {
  productData: ProductData[];
};

const BestSellingProductChart = ({
  productData = [],
}: BestSellingProductChartProps) => {
  // Ensure we have data or provide placeholder
  const chartData =
    productData.length > 0
      ? productData
      : [{ name: 'No Data Available', quantity: 0 }];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle>Best Selling Products</CardTitle>
        <CardDescription>Top products by sales volume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="quantity"
                name="Units Sold"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BestSellingProductChart;
