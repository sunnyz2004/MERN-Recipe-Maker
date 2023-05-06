import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
    return <div className="auth">
    <Login/>
    <Register />
    </div>
}

const Login = () => {
    const [username, setUsername] = useState("") 
    const [password, setPassword] = useState("") 

    const [_, setCookies] = useCookies(["access_token"]) // name of cookie
    const navigate = useNavigate()

    const onSubmit = async(event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:3001/auth/login", { // The function then sends a POST request using Axios to the URL http://localhost:3001/auth/register 
                                                                // with the username and password values obtained from the form.
            username,
            password, 
            })

            // when we get the response back, let's see how it looks:
            setCookies("access_token", response.data.token) // set the access_token to that response.data.token value
            window.localStorage.setItem("userID", response.data.userID) // setting an item in the local storage of the browser with the key "userID" and the value of response.data.userID.
            navigate('/')
            console.log(response)
        } catch (err){
            console.error(err);
        }
    }
    
    return (<Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
        />
    )
    }
/* <below> 

The htmlFor attribute in a <label> element specifies which form element the label is bound 
to by matching the id attribute of the form element. In this case, the htmlFor attribute is set 
to "username", which matches the id attribute of the <input> element, so the label is associated 
with the input field. 

*/ 
const Register = () => {
const [username, setUsername] = useState("") 
const [password, setPassword] = useState("") 

const onSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post("http://localhost:3001/auth/register", { // The function then sends a POST request using Axios to the URL http://localhost:3001/auth/register 
                                                                // with the username and password values obtained from the form.
            username,
            password,
        })
        alert("Registration Completed! Login now.")
    } catch (err) {
        console.error(err)
    }

}
 // pass in the props
    return (<Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label = "Register"
        onSubmit={onSubmit}
        />
    )

}

const Form = ({username, setUsername, password, setPassword, label, onSubmit}) => {
     return(
<div className="auth-container"> 
        <form onSubmit={onSubmit}>
            <h2> {label} </h2> 
        <div className="form-group">
            <label htmlFor="username"> Username: </label>
            <input 
            type="text" 
            id="username" 
            value={username}
            onChange={(event) => setUsername(event.target.value)} 
        />
        </div>

        <div className="form-group">
        <label htmlFor="password"> Password: </label>
            <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(event) => setPassword(event.target.value)} 
        />
        </div>

        <button type = "submit"> {label}</button>
        </form> 
        
    </div>

     )
}