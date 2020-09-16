
import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import './dates.css';

function Login(props) {
    const gapi = window.gapi;
    var DISCOVERYDOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
    var APIKEY = '';
    var CLIENTID = ''

    const [state, setState ] = useState({
		message:'',
    })
    
    
    const responseGoogle = () => {
        gapi.load('client:auth2', () => {
        
            gapi.client.init({
                apiKey: APIKEY,
                clientId: CLIENTID,
                discoveryDocs: DISCOVERYDOCS,
                scope: SCOPES
                // apiKey: process.env.APIKEY,
                // clientId: process.env.CLIENTID,
                // discoveryDocs: process.env.DISCOVERYDOCS,
                // scope: process.env.SCOPES
            })
    
            // gapi.client.load('calendar','v3')
            
            gapi.auth2.getAuthInstance().signIn()
            .then((props) => {
                console.log(props)
                props.history.push('/calendar')
        })

    })
        
    }

    const failLogin = () => {
        setState({...state,
        message:'You need to login into Google'})
    }

    return (
        <>
            <h1>Welcome to Google Calendar Analyzer</h1>
            <div className="loginButton">
                <GoogleLogin
                    clientId="795233169480-t05sb4lq99ptgmu00dak8hic65qs8sce.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={failLogin}
                    cookiePolicy={'single_host_origin'}
                />
                {/* <button onClick={responseGoogle}>Test</button> */}
            </div>
            <div className ='errorMessage'>{state.message}</div>
        </>

    );

}
export default Login