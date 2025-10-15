import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const Filters = ({ filters, setFilters }) => {
  const [constituencyOptions, setConstituencyOptions] = useState([]);
  const [loadingConstituencies, setLoadingConstituencies] = useState(false);

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value?.value || "" };

    // Reset constituency if state changes
    if (key === "state") {
      newFilters.constituency = "";
    }

    setFilters(newFilters);
  };

  // Fetch constituencies whenever state changes
  useEffect(() => {
    if (!filters.state) {
      setConstituencyOptions([]);
      return;
    }

    const fetchConstituencies = async () => {
      setLoadingConstituencies(true);
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/constituencies/?state=${filters.state}`
        );
        const options = res.data.map((item) => ({
          value: item.name,
          label: item.name,
        }));
        setConstituencyOptions(options);
      } catch (error) {
        console.error("Error fetching constituencies:", error);
      } finally {
        setLoadingConstituencies(false);
      }
    };

    fetchConstituencies();
  }, [filters.state]);

  // Static options
  const filterOptions = {
    years: [
      { value: "2019", label: "2019" },
      { value: "2014", label: "2014" },
      { value: "2009", label: "2009" },
      { value: "2004", label: "2004" },
      { value: "1999", label: "1999" },
      { value: "1998", label: "1998" },
      { value: "1996", label: "1996" },
      { value: "1991", label: "1991" },
    ],
    genders: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Unknown", label: "Unknown" },
    ],
    states: [
      { value: "Andaman_&_Nicobar_Islands", label: "Andaman & Nicobar " },
      
      {value:"Andhra_Pradesh",label:"Andhra Pradesh"},
      {value:"Arunachal_Pradesh",label:"Arunachal Pradesh"},
      {value:"Assam",label:"Assam"},
      {value:"Bihar",label:"Bihar"},
      {value:"Chhattisgarh",label:"Chhattisgarh"},
      {value:"Chandigarh",label:"Chandigarh"},
      {value:"Dadra_&_Nagar_Haveli",label:"Dadra Nagar_Haveli"},
      {value:"Daman_&_Diu",label:"Daman & Diu"},
      {value:"Delhi",label:"Delhi"},
      {value:"Goa",label:"Goa"},
      {value:"Gujarat",label:"Gujarat"},
      {value:"Haryana",label:"Haryana"},
      {value:"Himachal_Pradesh",label:"Himachal Pradesh"},
      {value:"Jammu_&_Kashmir",label:"Jammu & Kashmir"},
      {value:"Jharkhand",label:"Jharkhand"},
      {value:"Kerala",label:"Kerala"},
      { value: "Karnataka", label: "Karnataka" },
      {value:"Lakshadweep",label:"Lakshadweep"},
      {value:"Madhya_Pradesh",label:"Madhya Pradesh"},
      { value: "Maharashtra", label: "Maharashtra" },
      {value:"Manipur",label:"Manipur"},
      {value:"Meghalaya",label:"Meghalaya"},
      {value:"Mizoram",label:"Mizoram"},
      {value:"Nagaland",label:"Nagaland"},
      {value:"Odisha",label:"Odisha"},
      {value:"Puducherry",label:"Puducherry"},
      {value:"Punjab",label:"Punjab"},
      {value:"Rajasthan",label:"Rajasthan"},
      {value:"Sikkim",label:"Sikkim"},
      {value:"Telangana",label:"Telangana"},
      {value:"Tripura",label:"Tripura"},
      {value:"Uttarakhand",label:"Uttarakhand"},
      {value:"West_Bengal",label:"West Bengal"},
      
      { value: "Tamil_Nadu", label: "Tamil Nadu" },
      { value: "Uttar_Pradesh", label: "Uttar Pradesh" },
    ],
    parties: [
      { value: "BJP", label: "BJP" },
      { value: "INC", label: "INC" },
      { value: "DMK", label: "DMK" },
      { value: "ADMK", label: "AIADMK" },
      {value:"AITC",label:"AITC"},
      {value:"BSP",label:"BSP"},
      {value:"SP",label:"SP"},
      {value:"TDP",label:"TDP"},
      {value:"SHS",label:"SHS"},
      { value: "Independent", label: "Independent" },
    ],
  };

  return (
    <div className="flex gap-4 flex-wrap p-4 bg-gray-100 rounded-lg shadow-sm">
      <Select
        placeholder="Year"
        options={filterOptions.years}
        onChange={(v) => handleChange("year", v)}
      />
      <Select
        placeholder="State"
        options={filterOptions.states}
        onChange={(v) => handleChange("state", v)}
      />
      <Select
        placeholder="Gender"
        options={filterOptions.genders}
        onChange={(v) => handleChange("gender", v)}
      />
      <Select
        placeholder="Party"
        options={filterOptions.parties}
        onChange={(v) => handleChange("party", v)}
      />
      <Select
        placeholder={
          filters.state
            ? loadingConstituencies
              ? "Loading constituencies..."
              : "Constituency"
            : "Select a state first"
        }
        isDisabled={!filters.state || loadingConstituencies}
        options={constituencyOptions}
        onChange={(v) => handleChange("constituency", v)}
      />
    </div>
  );
};

export default Filters;
