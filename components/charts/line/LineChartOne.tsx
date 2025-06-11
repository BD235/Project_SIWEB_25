"use client";

import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

// Dynamic import ReactApexChart supaya gak SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Fungsi untuk format Rupiah
function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function LineChartOne() {
  const [series, setSeries] = useState([
    { name: "Sales", data: [] as number[] },
    { name: "Revenue", data: [] as number[] },
  ]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/penjualan");
        const data = await res.json();

        const months = data.map((item: any) => item.month);
        const sales = data.map((item: any) => Number(item.sales_count));
        const revenue = data.map((item: any) => Number(item.total_revenue));

        setCategories(months);
        setSeries([
          { name: "Sales", data: sales },
          { name: "Revenue", data: revenue },
        ]);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      }
    }

    fetchData();
  }, []);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "area",
      height: 310,
      toolbar: { show: false },
    },
    stroke: {
      curve: "straight",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: { format: "yyyy-MM" },
      y: {
        formatter: (val, { w, seriesIndex }) => {
          const seriesName = w.config.series?.[seriesIndex]?.name;
          return seriesName === "Revenue" ? formatRupiah(val) : val.toString(); // Ensure val is a string
        },
      },
    },
    xaxis: {
      type: "category",
      categories: categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { fontSize: "12px", colors: ["#6B7280"] },
        formatter: (val: number) => val.toString(), // Ensure the formatter returns a string
      },
      title: {
        text: "Value", // Set a title for the y-axis
        style: { fontSize: "14px", color: "#6B7280" }, // Optional styling for the title
      },
    },
    responsive: [], // Disable resizing
  };

  return (
    <div className="w-full overflow-hidden">
      <ReactApexChart options={options} series={series} type="area" height={310} />
    </div>
  );
}
