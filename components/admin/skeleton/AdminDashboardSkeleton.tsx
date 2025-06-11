'use client';

import React, { useEffect, useState } from 'react';

export default function AnalyticMetricsSkeleton() {
  const [barWidths, setBarWidths] = useState<number[]>([]);

  useEffect(() => {
    // Generate fixed random widths for bars on the client
    const widths = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 60 + 20)
    );
    setBarWidths(widths);
  }, []);

  return (
    <>
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
            <div className="flex justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart Skeleton */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] h-80 bg-gray-100 rounded-lg relative">
            <div className="absolute inset-4">
              <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded w-6"></div>
                ))}
              </div>
              <div className="ml-12 mr-4 h-full relative">
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-px bg-gray-200 w-full"></div>
                  ))}
                </div>
                <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 5 80 Q 25 60 45 70 T 85 40"
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                    fill="none"
                    className="animate-pulse"
                  />
                </svg>
              </div>
              <div className="absolute bottom-0 left-12 right-4 h-4 flex justify-between">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded w-8"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart Skeleton */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] h-80 bg-gray-100 rounded-lg relative">
            <div className="absolute inset-4">
              <div className="h-full flex flex-col justify-between py-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 h-12">
                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    <div
                      className="h-8 bg-gray-200 rounded"
                      style={{
                        width: barWidths[i] ? `${barWidths[i]}%` : '50%',
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
