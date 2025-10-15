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

const TurnoutSummaryChart = ({ year }) => {
  const [data, setData] = useState([]);
  const [highest, setHighest] = useState(null);

  useEffect(() => {
    if (!year) return;

    axios
      .get(`http://127.0.0.1:8000/api/turnout-summary/?year=${year}`)
      .then((res) => {
        setData(res.data.state_turnouts || []);
        setHighest({
          state: res.data.highest_state,
          turnout: res.data.highest_turnout,
        });
      })
      .catch((err) => console.error("Error loading turnout summary:", err));
  }, [year]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-center mb-2">
         State-wise Voter Turnout ({year})
      </h2>

      {highest && (
        <p className="text-center text-green-600 mb-4">
           Highest Turnout:{" "}
          <strong>{highest.state}</strong> ({highest.turnout}%)
        </p>
      )}

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="avg_turnout" fill="#3b82f6" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TurnoutSummaryChart;
