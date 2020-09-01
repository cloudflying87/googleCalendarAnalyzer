import React, { useState } from 'react';
import './dates.css';
import Select from 'react-select'
import Input from '../components/Input'
import Button from '../components/Button'
import moment from 'moment'

function Dates() {

	const [state, setState ] = useState({
		startDate: moment().subtract(7,'days').format('yyyy-MM-DD'),
		endDate: moment().format('yyyy-MM-DD'),
		selection:['#','-','$'],
		message:'',
	})

	const getDate = ({target}) => {
		setState({...state,
			message:''})
		if (target.name === 'startDate'){
			setState({...state, 
				startDate: target.value})
		} else if (target.name === 'endDate') {
			console.log(moment(target.value).format('yyyy-MM-DD'))
			if (moment(target.value)<moment(state.startDate)){
				setState({...state,
				message:'End Date must be after Start Date'})
			} else {
				setState({...state, 
					endDate: target.value})
			}
			
		}
		
	}
	const getFilterValue = (value) =>{
		console.log(value)
	}
	const runFunction = (e) => {
		e.preventDefault()
		setState({...state,
			message:''})
		console.log(state)
		console.log(moment(state.endDate))
	}
	return (
		<div className="dates">
			<h1>Google Calendar Analyzer</h1>
			<form>
				<div>
					<Input
                        labelFor='startDate'
                        label='Start Date'
                        name='startDate'
                        type='date'
                        inputId='startDate'
                        inputClass='dateBoxes'
                        placeholder='Start Date'
                        handleInputChange={getDate}
                        value={state.startDate}
                    />
				</div>
				<div>
					<Input
                        labelFor='endDate'
                        label='End Date'
                        name='endDate'
                        type='date'
                        inputId='endDate'
                        inputClass='dateBoxes'
                        placeholder='End Date'
                        handleInputChange={getDate}
                        value={state.endDate}
                    />
				</div>
				<div className = "errorMessage">{state.message}</div>
				<div className='selectDiv'>
					<div className='selectDiv2'>
					<Select
						options={state.selection}
						labelFor='filterValue'
						label='Filter Box'
						name='filterValue'
						inputId='filterValue'
						inputClass='filterBox'
						onChange={getFilterValue}
					/>
					</div>	
				</div>
				
					<Button 
						text='Run'
						handleClick={runFunction}
						id='runButton'
						className='button'/> 
			</form>
		</div>
	);
}

export default Dates;
