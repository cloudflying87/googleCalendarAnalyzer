
// Client ID and API key from the Developer Console
var CLIENT_ID = '795233169480-t05sb4lq99ptgmu00dak8hic65qs8sce.apps.googleusercontent.com';
var API_KEY = 'AIzaSyB3e1Cd7q2aZPf6uKax0ZFM4NOCA2KUfM8';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
}).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
}, function(error) {
    appendPre(JSON.stringify(error, null, 2));
});
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
} else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
}
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
    }

document.getElementById('endDate').value = moment().format("YYYY-MM-D") 


document.getElementById('run').addEventListener('click', function(clickButton){
    clickButton.preventDefault()
    
    const userStartDate = document.getElementById('startDate').value
    const minTime = userStartDate+'T00:00:00-05:00'

    
    const userEndDate = document.getElementById('endDate').value
    const maxTime = userEndDate+'T00:00:00-05:00'

    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (minTime),
        'timeMax': (maxTime),
        'showDeleted': true,
        'singleEvents': true,
        'orderBy': 'startTime',
        
    }).then(function(response) {
        var events = response.result.items;
        appendPre('Upcoming events:');
        // console.log(response.result)
        var mainMeet = []
        var mainMeetTime = []
        if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
            var event = events[i];
            let start = event.start.dateTime;
            let end = event.end.dateTime;
            
            
            if (!start) {
                start = event.summary + ' Was listed as all day '
            } else {
                var startTime = ((start.split('T'))[1])
            }

            if (!end){
                end = event.summary + ' Was listed as all day '
            } else {
                var endTime = ((end.split('T'))[1]).substring(0,5)
                
                
            }

            if (event.summary.charAt(0) === '#'){
                if(!mainMeet.includes(event.summary)){
                    mainMeet.push(event.summary)
                    mainMeetTime.push(parseInt(endTime) - parseInt(startTime))
                } else {
                    const addT = mainMeet.indexOf(event.summary)
                    mainMeetTime[addT] += parseInt(endTime) - parseInt(startTime)
                }
            
            }
            
            // console.log(moment(endTime).subtract)
            

        }
        } else {
        appendPre('No upcoming events found.');
        }
        var preDoc = document.getElementById('content')
        for (let i = 0; i < mainMeet.length; i++) {
            const list = document.createElement("li")
            list.append(mainMeet[i]+'-'+mainMeetTime[i])
            preDoc.append(list)
            
        }
        
        
    });

})
;
