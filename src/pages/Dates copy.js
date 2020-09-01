import React from 'react';
import '../App.css';
import Select from 'react-select'

function Dates() {


	return (
		<div className="dates">
			<h1>Google Calendar Analyzer</h1>
			<form>
				<div>
					<label>Choose Start Date:</label>
					<input type="date" id="startDate" />
				</div>
				<div>
					<label>Choose End Date:</label>
					<input type="date" id="endDate" />
				</div>
				<div>
					<Select
						options={value.allModels}
						labelFor='aircraftType'
						label='Aircraft Type'
						name='aircraftType'
						inputId='aircraftTypeInput'
						inputClass='addFlightInput dropdown'
						onChange={setAircraft}
					/>
				</div>
				<div>
					<button id="run">Run</button>
				</div>
			</form>
		</div>
	);
}

export default Dates;
