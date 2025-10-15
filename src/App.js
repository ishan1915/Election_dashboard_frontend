import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getCandidates } from "./api";
import Filters from "./components/Filters";
import CandidateTable from "./components/CandidateTable";
import PartySeatChart from "./components/PartySeatChart";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";

function App() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    getCandidates(filters).then(setData);
  }, [filters]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* 🔗 Simple navigation bar */}
        <nav className="flex justify-center gap-6 mb-6">
          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-blue-600 font-semibold hover:underline"
          >
            Dashboard
          </Link>

          <Link
            to="/analytics"
            className="text-blue-600 font-semibold hover:underline"
          >
            Analytics
          </Link>
        </nav>

        {/* 🧭 Routes */}
        <Routes>
          {/* 🏠 Default page: your existing charts and tables */}
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-2xl font-bold text-center mb-6">
                  🗳️ Election Dashboard
                </h1>
                <Filters filters={filters} setFilters={setFilters} />
                <PartySeatChart data={data} />
                <CandidateTable data={data} />
              </div>
            }
          />

          {/* 📊 Separate dashboard page */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
