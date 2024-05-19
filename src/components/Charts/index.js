import React from 'react';
import { Line, Pie } from '@ant-design/charts';

function Chart({ sortedTransactions }) {
  // Prepare data for Line chart
  const data = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount
  }));

  // Prepare data for Pie chart
  const spendingData = sortedTransactions.filter((transaction) => transaction.type === "expense");

  const newSpendings = [
    { tag: "food", amount: 0 },
    { tag: "education", amount: 0 },
    { tag: "office", amount: 0 }
  ];

  // Accumulate spending amounts based on tags
  spendingData.forEach((item) => {
    switch (item.tag) {
      case "food":
        newSpendings[0].amount += item.amount;
        break;
      case "education":
        newSpendings[1].amount += item.amount;
        break;
      default:
        newSpendings[2].amount += item.amount;
        break;
    }
  });

  // Configuration for Line chart
  const lineConfig = {
    data: data,
    width: 500,
    autoFit: false,
    xField: 'date',
    yField: 'amount',
  };

  // Configuration for Pie chart
  const pieConfig = {
    data: newSpendings,
    width: 500,
    autoFit: false,
    angleField: 'amount',
    colorField: 'tag',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div className="charts-wrapper">
      <div>
        <h2 class="text-center">Your Analytics</h2>
        <Line {...lineConfig} />
      </div>
      <div>
        <h2 class="text-center" >Your Spendings</h2>
        <Pie style={{display: 'flex', flexDirection: 'column', backgroundColor: 'pink', marginLeft:"100px"}} {...pieConfig} />
      </div>
    </div>
  );
}

export default Chart;
