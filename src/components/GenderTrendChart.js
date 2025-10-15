import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const GenderRepresentationChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://election-dashboard-nu9m.onrender.com/api/gender-representation/")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching gender data:", err));
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-center">Gender Representation Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Male" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="Female" stroke="#ec4899" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderRepresentationChart;
