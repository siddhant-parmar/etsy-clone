import React, { Component } from 'react';


class Signup extends Component {
    render() {
        return (
            <div>
                <div className="container fill-graywhite">
                    <div className="container content">
                        <div className="login-container">
                            <div>
                                <p>Log in to HomeAway</p>
                                <p>Need an account? <a href="/sign-up">Sign Up</a></p>
                            </div>
                            <div>
                                <p>Need an Owner account? <a href="/owner-sign-up">Owner Sign Up</a></p>
                            </div>
                            <div className="login-form-container col-lg-4 col-md-4 col-sm-12 offset-lg-4 offset-md-4 border">
                                <div className="login-form-heading input-group pad-top-10 input-group-lg">
                                    Account login
                            </div>
                                <hr />
                                <div className="form-group login-form-control">
                                    <input type="text" name="email" id="email" className="form-control form-control-lg" placeholder="Email Address" onChange={this.emailChangeHandler} required />
                                </div>
                                <div className="form-group login-form-control">
                                    <input type="password" name="password" id="password" className="form-control form-control-lg" placeholder="Password" onChange={this.passwordChangeHandler} required />
                                </div>
                                <div className="form-group login-form-control">
                                    <a href="" className="">Forgot Password?</a>
                                </div>
                                <div className="form-group login-form-control">
                                    <button className="btn btn-login col-lg-12 col-md-12 col-sm-12" onClick={this.submitLogin} >Login </button>
                                </div>
                                <hr />
                                <div className="form-group login-form-control">
                                    <button className="btn fb-btn col-lg-12 col-md-12 col-sm-12">
                                        <img className="fb-logo flt-left" alt="fb-logo"></img>
                                        Log in with Facebook</button>
                                </div>
                                <div className="form-group login-form-control">
                                    <button className="btn google-btn col-lg-12 col-md-12 col-sm-12">
                                        <span><img className="google-logo flt-left" alt="google-logo"></img></span>
                                        Log in with Google</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;