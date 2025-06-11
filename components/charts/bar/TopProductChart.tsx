"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function TopProductChart() {
  const [series, setSeries] = useState([{ name: "Total Terjual", data: [] as number[] }]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTopProducts() {
      try {
        const res = await fetch("/api/top-products");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Data is not array");

        setCategories(data.map((item) => item.nama_produk));
        setSeries([{ name: "Total Terjual", data: data.map((item) => Number(item.total_terjual)) }]);
      } catch (error) {
        console.error("Failed to fetch top products:", error);
      }
    }

    fetchTopProducts();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        columnWidth: "20%",
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      x: {
        formatter: (_, { dataPointIndex }) => categories[dataPointIndex] || "",
      },
    },
    xaxis: {
      categories,
      labels: {
        show: true, // <- Sembunyikan nama di bawah chart
      },
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
  };

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="top-products-chart" className="min-w-[1000px]">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  );
}
