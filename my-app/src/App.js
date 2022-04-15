import * as React from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import '@progress/kendo-licensing';
import '@progress/kendo-theme-default/dist/all.css';
import { RangeFilterCell } from "./components/rangeFilterCell";
import { DropdownFilterCell } from "./components/dropdownFilterCell";
import { Buttony } from './components/Buttony.jsx';
import { activityData } from "./activityData.jsx";
import './App.css';


const timeframes = Array.from(
  new Set(
    activityData.map((p) => (p.TrackingData ? p.TrackingData.TimeFrame : ""))
  )
);

const activitiesArray = Array.from(
  new Set(
    activityData.map((p) => (p.Activity ? p.Activity : ""))
  )
);

const tense = Array.from(
  new Set(
    activityData.map((p) => (p.Activity ? p.TrackingData.Tense : ""))
  )
);

const ActivityFilterCell = (props) => (
  <DropdownFilterCell
    { ...props }
    data={ activitiesArray }
    defaultItem={ "Select Activity" }
  />
);

const TimeFrameFilterCell = (props) => (
  <DropdownFilterCell
    { ...props }
    data={ timeframes }
    defaultItem={ "Select Time Frame" }
  />
);

const TenseFilterCell = (props) => (
  <DropdownFilterCell
    {...props}
    data={ tense }
    defaultItem={ "Select Tense" }
  />
);

const App = () => {

  const [data, setData] = React.useState(activityData);
  const [filter, setFilter] = React.useState();

  const filterChange = (event) => {
    setData(filterBy(activityData, event.filter));
    setFilter(event.filter);
  };

  return (
    <div className="App">
      <header>
        Fitness Tracker
      </header>
        <main>
            <Buttony/>
            <Grid
              style={{
                height: "400px",
                width: "1200px",
            }}
              data={ data }
              filterable={ true }
              filter={ filter }
              onFilterChange={filterChange}
            >
              <Column 
                field="Activity" 
                title="Activity" 
                filterCell={ ActivityFilterCell } 
                width="300px" 
              />
              <Column
                field="TrackingData.TimeFrame"
                title="Time Frame"
                filterCell={ TimeFrameFilterCell }
                width="300px"
              />
              <Column
                field="TrackingData.Tense"
                title="Tense"
                filterCell={ TenseFilterCell }
                width="300px"
              />
              <Column
                field="TrackingData.Time"
                title="Hours"
                format="{0}"
                filterCell={ RangeFilterCell }
                width="300px"
              />
            </Grid>
        </main>
      <footer>Thank you for visiting my page :-)</footer>
    </div>
  );
}

export default App;
