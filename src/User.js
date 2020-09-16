import React from 'react';


function User(props) {
    return (
        <div className="User">
            <h1>User Component</h1>
            <h2>Welcome {props.display}</h2>
        </div>
    )
}

export default User;