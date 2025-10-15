import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const WomenCandidatesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/women-candidates-percentage/")
      .then((res) => {
        setData(res.data.yearly_data || []);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">
        👩‍💼 Women Candidates Percentage by Year
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={{ value: "Election Year", position: "insideBottom", dy: 10 }} />
          <YAxis
            domain={[0, 50]}
            label={{
              value: "Percentage of Women Candidates",
              angle: -90,
              position: "Left",
            }}
          />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Bar dataKey="female_percentage" fill="#f43f5e" name="% of Women Candidates" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WomenCandidatesChart;
