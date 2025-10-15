import React, { useEffect, useState } from "react";
import axios from "axios";

const NarrowVictoryList = ({ year }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMargins = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/narrow-victory-margins/${year ? "?year=" + year : ""}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching narrow victory data:", error);
      }
    };
    fetchMargins();
  }, [year]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Narrowest Victory Margins {year ? `(${year})` : ""}
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No data available.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-2 border-b">#</th>
              <th className="p-2 border-b">Constituency</th>
              <th className="p-2 border-b">State</th>
              <th className="p-2 border-b">Candidate</th>
              <th className="p-2 border-b">Party</th>
              <th className="p-2 border-b text-right">Margin</th>
              <th className="p-2 border-b text-center">Year</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-2 border-b text-gray-600">{index + 1}</td>
                <td className="p-2 border-b font-medium text-gray-800">
                  {item.constituency}
                </td>
                <td className="p-2 border-b">{item.state}</td>
                <td className="p-2 border-b">{item.candidate}</td>
                <td className="p-2 border-b">{item.party}</td>
                <td className="p-2 border-b text-right font-semibold text-blue-600">
                  {item.margin.toLocaleString()}
                </td>
                <td className="p-2 border-b text-center">{item.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NarrowVictoryList;
