import React, { useEffect, useState } from "react";
import axios from "axios";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";  // ✅ Correct import
import "react-tooltip/dist/react-tooltip.css"; // ✅ Required CSS

const geoUrl = "/india.geojson";

const StateTurnoutMap = ({ year }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://election-dashboard-nu9m.onrender.com/api/turnout/?year=${year}`) // ✅ turnout API
      .then((res) => {
        const turnoutData = res.data.results || res.data;

        const aggregated = turnoutData.map((item) => ({
          state: item.state,
          avgTurnout: item.avg_turnout || item.turnout_percentage || 0,
        }));

        setData(aggregated);
      })
      .catch((err) => console.error("Error loading turnout data:", err));
  }, [year]);

  const colorScale = (val) =>
    val > 70 ? "#065f46" : val > 60 ? "#10b981" : val > 50 ? "#6ee7b7" : "#d1fae5";

  const normalize = (name) => name.toLowerCase().replace(/[\s_]+/g, "");

  if (!data.length) {
    return <p className="text-center text-gray-500">Loading turnout data...</p>;
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-center">
        🗺️ State-wise Turnout ({year})
      </h2>

      <div className="flex justify-center mb-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="w-5 h-5 bg-[#d1fae5] rounded"></span> {"< 50%"}
          <span className="w-5 h-5 bg-[#6ee7b7] rounded"></span> {"50–60%"}
          <span className="w-5 h-5 bg-[#10b981] rounded"></span> {"60–70%"}
          <span className="w-5 h-5 bg-[#065f46] rounded"></span> {"> 70%"}
        </div>
      </div>

      <ComposableMap
  projection="geoMercator"
  projectionConfig={{
    scale: 1200, // ✅ Bigger zoom for India
    center: [80, 22], // ✅ Center India roughly
  }}
  width={1000}
  height={800}
  style={{ width: "100%", height: "80vh" }} // ✅ Makes it responsive
>

        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName =
                geo.properties?.st_nm ||
                geo.properties?.NAME_1 ||
                geo.properties?.name ||
                "Unknown";

              const match = data.find(
                (d) => normalize(d.state) === normalize(stateName)
              );

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={match ? colorScale(match.avgTurnout) : "#ccc"}
                  stroke="#fff"
                  strokeWidth={0.5}
                  data-tooltip-id="map-tooltip"
                  data-tooltip-content={`${stateName}: ${
                    match ? match.avgTurnout.toFixed(1) : "N/A"
                  }%`}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* ✅ New Tooltip component */}
      <Tooltip id="map-tooltip" place="top" />
    </div>
  );
};

export default StateTurnoutMap;
