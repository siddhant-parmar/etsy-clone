import {Form,Button} from 'react-bootstrap';
import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
// import Header from '../Header/Header';

class Login extends Component{
    
    constructor(){
        super();
        this.state = {
            Email: "",
            Password: ""
        }
    }

    emailHandler = (e) => {
        this.setState({
            Email: e.target.value
        })
    }

    passwordHandler = (e) => {
        this.setState({
            Password: e.target.value
        })
        
    }

    loginSubmit = (e) =>{
        e.preventDefault();
        var cred = {
            Email: this.state.Email,
            Password: this.state.Password
        }
        console.log(cred);

        // axios.defaults.withCredentials = true;


        axios.post('http://localhost:8000/login', cred);

        // .then((response) => {
        //     if (response.status === 200) {
        //         this.setState({
        //             isValidationFailure: true,
        //             formValidationFailure: false
        //         })
        //     }

        // }).catch((err) => {
        //     if (err) {
        //         if (err.response.status === 401) {
        //             this.setState({
        //                 isValidationFailure: false
        //             })
        //             console.log("Error messagw", err.response.status);
        //         }
        //         else {
        //             this.setState({
        //                 errorRedirect: true
        //             })
        //         }
        //     }

        // });
    }
    
    render(){
        return(
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control id = "email" type="text" placeholder="Enter email" onChange = {this.emailHandler} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id = "password" type="password" placeholder="Password" onChange={this.passwordHandler} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick = {this.loginSubmit}>
                    Submit
                </Button>
            </Form>
        )
    }
    
}
export default Login;



// import React from "react";
// import { Form, Button } from "react-bootstrap";
// import axios from 'axios';


// const Login = () => {
//   const [formValue, setformValue] = React.useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (event) => {
//     var data = {
//         Email: formValue.email,
//         Password: formValue.password
//     }

    
//     axios.post('http://localhost:8000/login', data).then((response) => {
//         if (response.status === 200) {
            
//         }

//     });
//   };

//   const handleChange = (event) => {
//     setformValue({
//       ...formValue,
//       [event.target.name]: event.target.value,
//     });
//   };
//   return (
//     <Form>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control
//           type="text"
//           name="email"
//           placeholder="Enter email"
//           value={formValue.email}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formValue.password}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit" onClick={handleSubmit}>
//         Login
//       </Button>
//     </Form>
//   );
// };
// export default Login;
