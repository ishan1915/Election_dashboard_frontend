import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const COLORS = {
  2009: "#60a5fa",
  2014: "#34d399",
  2019: "#fbbf24",
};

const EducationWinCorrelation = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/education-win-correlation/")
      .then((res) => {
        // Transform API data into chart format
        const grouped = {};
        res.data.forEach((d) => {
          if (!grouped[d.education]) grouped[d.education] = { education: d.education };
          grouped[d.education][d.year] = d.win_percentage;
        });
        setData(Object.values(grouped));
      })
      .catch((err) => console.error("Error fetching education trend:", err));
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-3 text-center">
        🎓 Education Level vs Winning Percentage (2009–2019)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="education"
            angle={-30}
            textAnchor="end"
            interval={0}
            height={80}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="2009" fill={COLORS[2009]} name="2009" />
          <Bar dataKey="2014" fill={COLORS[2014]} name="2014" />
          <Bar dataKey="2019" fill={COLORS[2019]} name="2019" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EducationWinCorrelation;
