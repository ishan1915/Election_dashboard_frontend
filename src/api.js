import axios from "axios";

const API_BASE = "https://election-dashboard-nu9m.onrender.com/api";

export const getCandidates = async (filters = {}) => {
  // ✅ Set default year to 2019 if not provided
  const queryFilters = {
    year: filters.year || "2019",
    ...filters,
  };

  const params = new URLSearchParams(queryFilters).toString();

  const res = await axios.get(`${API_BASE}/candidates/?${params}`);
  return res.data;
};
