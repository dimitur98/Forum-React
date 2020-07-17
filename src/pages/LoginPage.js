import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'

const LoginPage = () => {
    return(
        <div>
            <Header />
            <div class='container'>
                <h1>Login</h1>
                <div class="row">
                    <div class="col-md-4">
                        <section>
                            <form id="account" method="post">
                                <h4>Use a local account to log in.</h4>
                                <hr />
                                <div asp-validation-summary="All" class="text-danger"></div>
                                <div class="form-group">
                                    <label>
                                        Name:
                                        <input name="name" class="form-control" />
                                    </label>
                                </div>
                                <div class="form-group">
                                    <label>
                                        Password:
                                        <input name="password" class="form-control" />
                                    </label>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary">Log in</button>
                                </div>
                                <div class="form-group">
                                    <p>
                                        <a id="forgot-password" asp-page="./ForgotPassword">Forgot your password?</a>
                                    </p>
                                    <p>
                                        <Link to='/Register'>Register as a new user</Link>
                                    </p>
                                    <p>
                                        <Link>Resend email confirmation</Link>
                                    </p>
                                </div>
                            </form>
                        </section>      
                    </div>
                    <div class="col-md-6 col-md-offset-2">
                        <section>
                            <h4>Use another service to log in.</h4>
                            <hr />            
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoginPage