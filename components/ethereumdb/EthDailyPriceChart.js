import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Text, Table, Box } from "@/components/atoms";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Ethereum Price History",
    },
  },
};

export default function EthDailyPriceChart({ values, labels }) {
  console.log("sample data", values);

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "Ethereum",
          data: values,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  }, [labels, values]);

  console.log("data", data);

  return (
    <Box mb="2rem">
      <Line options={options} data={data} />
    </Box>
  );
}
