import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "realtime",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 3000,
          },
        },
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: "datetime",
        tickAmount: 10,
        labels: {
          formatter: function (val) {
            return new Date(val).toLocaleTimeString("en", { hour12: false });
          },
        },
      },
      yaxis: {
        min: 10,
        max: 90,
      },
    },
    series: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date();
      const newData = {
        x: newDate.getTime(),
        y: Math.floor(Math.random() * (90 - 10 + 1)) + 10,
      };
      setChartData((prevState) => ({
        ...prevState,
        series: [
          {
            data: [...prevState.series[0].data.slice(0, -1), newData], // Update only the latest data point
          },
        ],
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        width="500"
      />
    </div>
  );
};

export default ApexChart;
