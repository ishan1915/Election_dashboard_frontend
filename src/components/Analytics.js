import React, { useState } from "react";
import Filter1 from "./Filter1";
import TurnoutSummaryChart from "./TurnoutSummaryChart";
import PartySeatChange from "./PartySeatChange";
import EducationWinCorrelation from "./EducationWinCorrelation";
import NarrowVictoryList from "./NarrowVictoryList";
import WomenCandidatesChart from "./WomenCandidateChart";
const Analytics = () => {
  const [filters, setFilters] = useState({ year: "2019" });

  return (
    <div className="p-6 space-y-6">
      <Filter1 filters={filters} setFilters={setFilters} />
      
      <TurnoutSummaryChart year={filters.year} />
       <PartySeatChange
       year1={Number(filters.year) - 5}   // previous election year
       year2={Number(filters.year)}       // current year
/>
     <EducationWinCorrelation year={filters.year}/>

     <NarrowVictoryList year={filters.year} />

     <WomenCandidatesChart year={filters.year} />

      
    </div>
  );
};

export default Analytics;