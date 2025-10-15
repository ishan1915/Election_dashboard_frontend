import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const getCandidates = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await axios.get(`${API_BASE}/candidates/?${params}`);
  return res.data;
};
