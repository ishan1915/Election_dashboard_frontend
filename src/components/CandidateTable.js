import React from "react";

const CandidateTable = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table-auto w-full border">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-3 py-2 border">State</th>
            <th className="px-3 py-2 border">Constituency</th>
            <th className="px-3 py-2 border">Candidate</th>
            <th className="px-3 py-2 border">Party</th>
            <th className="px-3 py-2 border">Year</th>
            <th className="px-3 py-2 border">Votes</th>
            <th className="px-3 py-2 border">Result</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="text-center hover:bg-gray-50">
              <td className="border px-3 py-2">{row.state}</td>
              <td className="border px-3 py-2">{row.constituency}</td>
              <td className="border px-3 py-2">{row.name}</td>
              <td className="border px-3 py-2">{row.party}</td>
              <td className="border px-3 py-2">{row.year}</td>
              <td className="border px-3 py-2">{row.votes.toLocaleString()}</td>
              <td className={`border px-3 py-2 font-semibold ${row.result_status === "Won" ? "text-green-600" : "text-red-600"}`}>
                {row.result_status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
