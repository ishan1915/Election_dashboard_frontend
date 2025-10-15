import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const VictoryHistogram = ({ year }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://election-dashboard-nu9m.onrender.com/api/winner-margins/?year=${year}`)
      .then((res) => {
        const results = res.data.results || res.data;

        // Define bins (extend to handle large margins)
        const bins = [0, 10000, 50000, 100000, 200000, 500000, 1000000];
        const counts = bins.map((b, i) => ({
          range:
            i < bins.length - 1
              ? `${b.toLocaleString()} - ${bins[i + 1].toLocaleString()}`
              : `>${b.toLocaleString()}`,
          count: 0,
        }));

        // Count margins into bins
        results.forEach((c) => {
          const margin = parseFloat(c.margin || 0);
          let placed = false;

          for (let i = 0; i < bins.length - 1; i++) {
            if (margin >= bins[i] && margin < bins[i + 1]) {
              counts[i].count++;
              placed = true;
              break;
            }
          }

          if (!placed && margin >= bins[bins.length - 1]) {
            counts[counts.length - 1].count++;
          }
        });

        setData(counts);
      })
      .catch((err) => console.error("Error loading histogram data:", err));
  }, [year]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-center">
        Margin of Victory Distribution ({year})
      </h2>

      {data.length ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="range" angle={-30} textAnchor="end" height={200} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">Loading data...</p>
      )}
    </div>
  );
};

export default VictoryHistogram;
