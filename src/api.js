import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

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
