import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const PartySeatChange = ({ year1, year2 }) => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (!year1 || !year2) return;

    axios
      .get(`https://election-dashboard-nu9m.onrender.com/api/party-seat-change/?year1=${year1}&year2=${year2}`)
      .then((res) => {
        setData(res.data.details || []);
        setSummary({
          maxGain: res.data.max_gain,
          maxLoss: res.data.max_loss,
        });
      })
      .catch((err) => console.error("Error loading seat change data:", err));
  }, [year1, year2]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-center">
         Party Seat Change ({year1} → {year2})
      </h2>

      {summary && (
        <div className="text-center mb-4 text-sm">
          <p>Most gained: <strong>{summary.maxGain?.party}</strong> ({summary.maxGain?.seat_change} seats)</p>
          <p>Most lost: <strong>{summary.maxLoss?.party}</strong> ({summary.maxLoss?.seat_change} seats)</p>
        </div>
      )}

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="party" angle={-30} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="seat_change" fill="#f97316" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PartySeatChange;
