import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const PartySeatChart = ({ data }) => {
  // Aggregate seats won per party
  const seatData = Object.values(
    data.reduce((acc, cur) => {
      if (cur.result_status === "Won") {
        acc[cur.party] = acc[cur.party] || { party: cur.party, seats: 0 };
        acc[cur.party].seats += 1;
      }
      return acc;
    }, {})
  );

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-6">
      <h2 className="text-lg font-bold mb-2">Party-wise Seat Share</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={seatData}>
          <XAxis dataKey="party" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="seats" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PartySeatChart;
