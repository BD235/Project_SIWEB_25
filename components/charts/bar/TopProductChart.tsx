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
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        columnWidth: "10%", // kecilkan ini untuk rapatkan bar
      },
    },
    dataLabels: { enabled: false },
    xaxis: { categories },
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
      <style jsx>{`
        /* Optional: tambah CSS untuk kurangi jarak antar bar jika perlu */
        .apexcharts-bar-area .apexcharts-bar-series .apexcharts-bar {
          margin-right: 1px !important;
        }
      `}</style>
    </div>
  );
}
