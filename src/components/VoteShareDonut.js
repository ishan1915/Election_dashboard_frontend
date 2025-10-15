import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#3b82f6",
  "#f97316",
  "#10b981",
  "#8b5cf6",
  "#f43f5e",
  "#14b8a6",
  "#6366f1",
  "#84cc16",
  "#ec4899",
  "#06b6d4",
  "#a855f7",
];

const VoteShareDonut = ({ year }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/vote-share/?year=${year}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error("Error loading vote share:", err));
  }, [year]);

  if (!data.length) {
    return <p className="text-center text-gray-500">Loading vote share data...</p>;
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-center">
        🥧 Top 10 Parties by Vote Share ({year})
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="vote_share"
            nameKey="party"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60}
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoteShareDonut;
