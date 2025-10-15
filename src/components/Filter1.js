import React from "react";
import Select from "react-select";

const Filter1 = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value?.value || "" };
    setFilters(newFilters);
  };

  // Only year options remain
  const yearOptions = [
     
    { value: "2019", label: "2019" },
    { value: "2014", label: "2014" },
    { value: "2009", label: "2009" },
    { value: "2004", label: "2004" },
    { value: "1999", label: "1999" },
    { value: "1998", label: "1998" },
    { value: "1996", label: "1996" },
    { value: "1991", label: "1991" },
  ];

  return (
    <div className="flex gap-4 p-4 bg-gray-100 rounded-lg shadow-sm justify-center">
      <Select
        placeholder="Select Year"
        options={yearOptions}
        value={yearOptions.find((opt) => opt.value === filters.year) || null}
        onChange={(v) => handleChange("year", v)}
        className="w-48"
      />
    </div>
  );
};

export default Filter1;
