// import {Form,Button} from 'react-bootstrap';
// import React, { Component } from 'react';
// import axios from 'axios';
// import cookie from 'react-cookies';
// import { Navigate } from 'react-router';
// // import Header from '../Header/Header';

// class Login extends Component{
    
//     constructor(){
//         super();
//         this.state = {
//             Email: "",
//             Password: "",
//             // validationError: false,
//             // formValidationError: false,
//             // errorRedirect: false
//         }
//     }

//     emailHandler = (e) => {
//         this.setState({
//             Email: e.target.value
//         })
//     }

//     passwordHandler = (e) => {
//         this.setState({
//             Password: e.target.value
//         })
        
//     }

//     loginSubmit = (e) =>{
//         // e.preventDefault();
//         var cred = {
//             Email: this.state.Email,
//             Password: this.state.Password
//         }
//         console.log(cred);

//         axios.defaults.withCredentials = true;


//         axios.post('http://localhost:8000/login', cred);
//         // .then((response) => {
//         //     if (response.status === 200) {
//         //         this.setState({
//         //             validationError: true,
//         //             formValidationFailure: false
//         //         })
//         //     }

//         // }).catch((err) => {
//         //     if (err) {
//         //         if (err.response.status === 401) {
//         //             this.setState({
//         //                 validationError: false
//         //             })
//         //             console.log("Error messagw", err.response.status);
//         //         }
//         //         else {
//         //             this.setState({
//         //                 errorRedirect: true
//         //             })
//         //         }
//         //     }

//         // });
//     }
    
//     render(){

//         let passAlert = null;
//         if(this.state.validationError){
//             passAlert = 
//             <div>
//                 <div className="alert alert-danger" role="alert">
//                     <strong>Password was incorrect</strong>
//                 </div>
//             </div>
//         }  

//         // let redrirectVar = null;
//         // if (cookie.load('cookie')) {
//         //     redrirectVar = <Navigate to="/home" />
//         // }

//         // if (this.state.errorRedirect) {
//         //     redrirectVar = <Navigate to="/profile" />
//         // }

//         return(
//             <Form>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control id = "email" type="text" onChange = {this.emailHandler} />
//                     <Form.Text className="text-muted">
//                     </Form.Text>
//                 </Form.Group>
            
//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control id = "password" type="password" onChange={this.passwordHandler} />
//                 </Form.Group>
//                 {passAlert}
//                 <Button variant="primary" type="submit" onClick = {this.loginSubmit}>
//                     Submit
//                 </Button>
//             </Form>
//         )
//     }
    
// }
// export default Login;



import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Navigate } from 'react-router';
// import Header from '../Header/Header';
import {Form,Button} from 'react-bootstrap';

class Login extends Component {


    constructor() {
        super();

        this.state = {
            Email: "",
            Password: "",
            formValidationFailure: false,
            isValidationFailure: true,
            errorRedirect: false

        }


        //Bind events
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
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

    loginSubmit = (e) => {

        //e.preventDefault();

        var data = {
            Email: this.state.Email,
            Password: this.state.Password
        }

        if (this.state.Email == "" || this.state.Password == "") {

            this.setState({
                formValidationFailure: true
            });

            console.log('Form Error!');

        }
        else {
            axios.defaults.withCredentials = true;



            axios.post('http://localhost:8000/login', data)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            isValidationFailure: true,
                            formValidationFailure: false
                        })
                    }

                })
                .catch((err) => {
                    if (err) {
                        if (err.response.status === 401) {
                            this.setState({
                                isValidationFailure: false
                            })
                            console.log("Error message", err.response.status);
                        }
                        else {
                            this.setState({
                                errorRedirect: true
                            })
                        }
                    }

                });
        }

    }
    render() {

        let redrirectVar = null;
        if (cookie.load('cookie')) {
            redrirectVar = <Navigate to="/home" />
        }

        if (this.state.errorRedirect) {
            redrirectVar = <Navigate to="/error" />
        }

        let errorPanel = null;
        if (!this.state.isValidationFailure) {
            errorPanel = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Validation Error!</strong> Username and Password doesn't match!
                </div>
            </div>

        }

        let formErrorPanel = null;
        console.log('FormvalidationFailur', this.state.formValidationFailure);
        if (this.state.formValidationFailure) {
            formErrorPanel = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Validation Error!</strong> Username and Password are required!
        </div>
            </div>

        }
        return (
            <Form>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Email address</Form.Label>
                     <Form.Control id = "email" type="text" onChange = {this.emailHandler} />
                     <Form.Text className="text-muted">
                     </Form.Text>
                 </Form.Group>
            
                 <Form.Group className="mb-3" controlId="formBasicPassword">
                     <Form.Label>Password</Form.Label>
                     <Form.Control id = "password" type="password" onChange={this.passwordHandler} />
                 </Form.Group>
                 <Button variant="primary" type="submit" onClick = {this.loginSubmit}>
                     Submit
                 </Button>
            </Form>
        )
    }
};

export default Login;
