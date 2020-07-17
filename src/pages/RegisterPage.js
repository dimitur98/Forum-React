import React from 'react'

const RegisterPage = () => {
    return(
        <div class='container'>
            <h1>Register</h1>

            <div class="row">
                <div class="col-md-4">
                    <form >
                        <h4>Create a new account.</h4>
                        <hr />
                        <div asp-validation-summary="All" class="text-danger"></div>
                        <div class="form-group">
                            <label>
                                Name:
                                <input name='name' class="form-control" />
                            </label>
                        </div>
                        <div class="form-group">
                            <label>
                                Password:
                                <input name="password" class="form-control" />
                            </label>
                        </div>
                        <div class="form-group">
                            <label>
                                Confirm Password
                                <input name="confirmPassword" class="form-control" />
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                </div>
                <div class="col-md-6 col-md-offset-2">
                    <section>
                        <h4>Use another service to register.</h4>
                        <hr />            
                    </section>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage