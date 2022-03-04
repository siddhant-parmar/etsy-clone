import {Form,Button} from 'react-bootstrap';
import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
// import Header from '../Header/Header';

class Signup extends Component{
    
    constructor(){
        super();
        this.state = {
            Email: "",
            Fname: "",
            Password: "",
            validationError: false,
            passwordValidation: false
        }
    }

    emailHandler = (e) => {
        this.setState({
            Email: e.target.value
        })
    }

    fnameHandler = (e) => {
        this.setState({
            Fname: e.target.value
        })
        
    }

    passwordHandler = (e) => {
        this.setState({
            Password: e.target.value
        })
        
    }

    loginSubmit = (e) =>{
        // e.preventDefault();
        var cred = {
            Email: this.state.Email,
            Fname: this.state.Fname,
            Password: this.state.Password
        }
        console.log(cred);

        if(this.state.Password < 6){
            this.state.passwordValidation = true;
        }
        // axios.defaults.withCredentials = true;


        axios.post('http://localhost:8000/signup', cred);

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


        let errorAlert = null;
        if(this.state.validationError){
            errorAlert = 
            <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Sorry, the email you have entered is already in use.</strong>
                </div>
            </div>
        }   

        let passAlert = null;
        if(this.state.passwordValidation){
            passAlert = 
            <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Must be at least 6 characters.</strong>
                </div>
            </div>
        }  

        return(
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control id = "email" type="text" onChange = {this.emailHandler} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                {errorAlert}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control id = "fname" type = "text" onChange={this.fnameHandler} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id = "password" type = "password" onChange={this.passwordHandler} />
                </Form.Group>
                {passAlert}
                <Button variant="primary" type="submit" onClick = {this.loginSubmit}>
                    Register
                </Button>
            </Form>
        )
    }
    
}
export default Signup;



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
