import * as React from "react"
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid"
import { filterBy } from "@progress/kendo-data-query"
import "@progress/kendo-licensing"
import "@progress/kendo-theme-default/dist/all.css"
import { RangeFilterCell } from "./components/RangeFilterCell"
import { DropdownFilterCell } from "./components/DropdownFilterCell"
import { activityData } from "./activityData.jsx"
import "./App.css"


const initialDataState = {
	skip: 0,
	take: 10,
}

const timeframes = Array.from(
	new Set(
		activityData.map((p) => (p.TrackingData ? p.TrackingData.TimeFrame : ""))
	)
)

const activitiesArray = Array.from(
	new Set(activityData.map((p) => (p.Activity ? p.Activity : "")))
)

const tense = Array.from(
	new Set(activityData.map((p) => (p.Activity ? p.TrackingData.Tense : "")))
)

const ActivityFilterCell = (props) => (
	<DropdownFilterCell
		{...props}
		data={activitiesArray}
		defaultItem={"Select Activity"}
	/>
)

const TimeFrameFilterCell = (props) => (
	<DropdownFilterCell
		{...props}
		data={timeframes}
		defaultItem={"Select Time Frame"}
	/>
)

const TenseFilterCell = (props) => (
	<DropdownFilterCell {...props} data={tense} defaultItem={"Select Tense"} />
)

const rowRender = (trElement, props) => {
	const mind = {
		color: "rgb(207, 106, 6)",
	}

	const defaultColor = {
		color: "rgb(0, 0, 0)",
	}

	const cardio = {
		color: "rgb(114, 11, 65)",
	}

	const dance = {
		color: "rgb(117, 10, 170)",
	}

	let rowColor
	switch (props.dataItem.Activity) {
		case "Yoga":
			rowColor = mind
			break
		case "Body Balance":
			rowColor = dance
			break
		case "Running":
			rowColor = cardio
			break
		case "Dance":
			rowColor = dance
			break
		default:
			rowColor = defaultColor
			break
	}

	const trProps = {
		style: rowColor,
	}

	return React.cloneElement(trElement, { ...trProps }, trElement.props.children)
}

const App = () => {
	const [data, setData] = React.useState(activityData)
	const [filter, setFilter] = React.useState()
	const [page, setPage] = React.useState(initialDataState)

	const filterChange = (event) => {
		setData(filterBy(activityData, event.filter))
		setFilter(event.filter)
	}

	const pageChange = (event) => {
		setPage(event.page)
	}

	return (
		<div className="App">
			<header>
				<img src={require("./fit-image.png")} alt="FiT"/> <h1>Fitness Tracker</h1>
			</header>
			<main>
				<Grid
					style={{
						height: "100%",
						width: "100%",
					}}
					data={data.slice(page.skip, page.take + page.skip)}
					skip={page.skip}
					take={page.take}
					filterable={true}
					filter={filter}
					onFilterChange={filterChange}
					total={data.length}
					pageable={true}
					onPageChange={pageChange}
					rowRender={rowRender}
				>
					<Column
						field="Activity"
						title="Activity"
						filterCell={ActivityFilterCell}
					/>
					<Column
						field="TrackingData.TimeFrame"
						title="Time Frame"
						filterCell={TimeFrameFilterCell}
					/>
					<Column
						field="TrackingData.Tense"
						title="Tense"
						filterCell={TenseFilterCell}
					/>
					<Column
						field="TrackingData.Time"
						title="Hours"
						format="{0}"
						filterCell={RangeFilterCell}
					/>
				</Grid>
			</main>
			<footer>
				<h2>Thank you for visiting my page :-)</h2>
			</footer>
		</div>
	)
}

export default App
