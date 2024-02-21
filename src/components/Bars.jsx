// For now, when the time is 15:50:10, it shows the y axis to be 10. But when the time is 15:50:13, especially when the new data is being generated, the y axis during the 15:50:10 changes again. I don't want the previous data to change.

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
  const [series, setSeries] = useState([{ data: [] }]);
  const [options] = useState({
    chart: {
      id: "realtime",
      height: 350,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Dynamic Updating Chart",
      align: "left",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
      range: 120000, // 1.5 hours
    },
    yaxis: {
      max: 100,
    },
    legend: {
      show: false,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newSeries = generateRandomData();
      setSeries([{ data: newSeries }]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomData = () => {
    const newData = [];
    const baseTime = new Date().getTime() - 30000; // 30 seconds ago
    for (let i = 0; i < 10; i++) {
      newData.push({
        x: baseTime + i * 3000, // Timestamps for every 3 seconds
        y: Math.floor(Math.random() * 100) + 1, // Random number between 1 and 100
      });
    }
    return newData;
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
