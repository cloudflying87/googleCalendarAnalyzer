import React, { useState } from 'react';
import './dates.css';
import Select from 'react-select'
import Input from '../components/Input'
import Button from '../components/Button'
import { GoogleLogout } from 'react-google-login';
import moment from 'moment'

function Dates(props) {
	const gapi = window.gapi;
	console.log(props)
	const [state, setState] = useState({
		startDate: moment().subtract(7, 'days').format('yyyy-MM-DD'),
		endDate: moment().format('yyyy-MM-DD'),
		selection: ['#', '-', '$'],
		message: '',
	})
	
	const getDate = ({ target }) => {
		setState({
			...state,
			message: ''
		})
		if (target.name === 'startDate') {
			setState({
				...state,
				startDate: target.value
			})
		} else if (target.name === 'endDate') {
			console.log(moment(target.value).format('yyyy-MM-DD'))
			if (moment(target.value) < moment(state.startDate)) {
				setState({
					...state,
					message: 'End Date must be after Start Date'
				})
			} else {
				setState({
					...state,
					endDate: target.value,
					message: ''
				})
			}

		}

	}
	const getFilterValue = (value) => {
		console.log(value)
	}
	const checkStatus = (e) => {
		e.preventDefault()
		console.log('working2')
		if(gapi.client == 'undefined'){
			console.log('working')
			props.history.push('/')

		} else {
			runFunction ()
		}
	}
	const runFunction = () => {
		console.log(gapi.client)
		setState({
			...state,
			message: ''
		})
		
		gapi.client.calendar.events.list({
			'calendarId': 'primary',
			'timeMin': moment(state.startDate).toISOString(true),
			'timeMax' : moment(state.endDate).toISOString(true),
			'showDeleted': false,
			'singleEvents': true,
			'maxResults': 100,
			'orderBy': 'startTime'
		}).then(({result}) => {
			console.log(result.items)
		})
	}
	const logout = () => {
		gapi.auth2.getAuthInstance().signOut();
		props.history.push('/')
	}
	return (
		<div className="dates">
			<div className ='loginButton'>
			<GoogleLogout
				clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
				buttonText="Logout"
				onLogoutSuccess={logout}
			>
			</GoogleLogout>
			</div>
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
				<div className="errorMessage">{state.message}</div>
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
					handleClick={checkStatus}
					id='runButton'
					className='button' />
			</form>
		</div>
	);
}

export default Dates;
