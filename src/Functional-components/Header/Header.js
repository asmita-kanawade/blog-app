import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


const header = (props) => {
    let currentUser = localStorage.getItem('username');

    const doLogout = () => {
        localStorage.removeItem('username');
    }

    const search = (event) => {
        console.log('value is '+event.target.value);
        
    }

    return <div className="header">
        <div className="header-right">
            <input placeholder='Search by title or content' onChange={props.changed}/>
            {/* <input placeholder='Search by title or content' onChange={(event)=>search(event)}/> */}
            <Link className="active" to="#home">Home</Link>
            {currentUser ? <Link to="/AddBlogPost" >New post</Link> : "" }
            {currentUser ? "" : <Link to="/Signup">Signup</Link>}
            {currentUser ? "" : <Link to="/Login">Login</Link>}
            {currentUser ? <a href="/" onClick={()=>doLogout()}>Logout</a> : "" }
        </div>
    </div>
}

export default header;