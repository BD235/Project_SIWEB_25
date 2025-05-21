'use client';

import React, { useEffect, useState } from 'react';
import { FaBirthdayCake, FaShoppingCart, FaUsers, FaDollarSign } from 'react-icons/fa';
import LineChartOne from "@/components/charts/line/LineChartOne";
import TopProductChart from "@/components/charts/bar/TopProductChart";
import Loading from '@/app/admin/loading';

interface Stat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: string;
}

export default function AnalyticMetrics() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const statsRes = await fetch('/api/stats');
        if (!statsRes.ok) throw new Error('Failed to fetch stats');
        const statsData = await statsRes.json();

        setStats([
          { title: 'Jumlah Produk', value: statsData.total_products, icon: <FaBirthdayCake className="text-rose-500" />, change: '+12%' },
          { title: 'Jumlah Pesanan', value: statsData.total_orders, icon: <FaShoppingCart className="text-rose-500" />, change: '+5%' },
          { title: 'Pelanggan', value: statsData.total_customers, icon: <FaUsers className="text-rose-500" />, change: '+8%' },
          { 
            title: 'Pendapatan', 
            value: `Rp ${(Number(statsData.total_revenue) ?? 0).toLocaleString('id-ID')}`, 
            icon: <FaDollarSign className="text-rose-500" />, 
            change: '+23%' 
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-rose-800 mt-1">{stat.value}</p>
                <p className="text-xs text-green-500 mt-1">{stat.change} from last month</p>
              </div>
              <div className="h-12 w-12 bg-rose-50 rounded-full flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Statistik Penjualan</h2>
        <div className="overflow-x-auto">
          <LineChartOne />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Top Produk</h2>
        <div className="overflow-x-auto">
          <TopProductChart />
        </div>
      </div>
    </>
  );
}
