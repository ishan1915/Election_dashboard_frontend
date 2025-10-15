import React, { useState } from "react";
import StateTurnoutMap from "./StateTurnoutMap";
import GenderTrendChart from "./GenderTrendChart";
import VoteShareDonut from "./VoteShareDonut";
import VictoryHistogram from "./VictoryHistogram";
import Filter1 from "./Filter1";

const Dashboard = () => {
  const [filters, setFilters] = useState({ year: "2019" });

  return (
    <div className="p-6 space-y-6">
      <Filter1 filters={filters} setFilters={setFilters} />
      
      <StateTurnoutMap year={filters.year} />
      <VoteShareDonut year={filters.year}  />
      <VictoryHistogram year={filters.year} />
      <GenderTrendChart />
       
    </div>
  );
};

export default Dashboard;
